import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import worker from "../public/_worker.js";
import { verifyApex } from "../scripts/verify-apex.mjs";

test("forwards only to the fixed application origin and preserves the path", async (t) => {
  let forwarded;
  t.mock.method(globalThis, "fetch", async (request, options) => {
    forwarded = request;
    assert.equal(options.redirect, "manual");
    return new Response("interactive homepage", { headers: { "Content-Type": "text/html" } });
  });
  const result = await worker.fetch(new Request("https://ai4mat.ai/workspace?study=1", {
    headers: { "X-AI4MAT-Frontend-Host": "attacker.invalid", "X-Forwarded-Host": "attacker.invalid" },
  }));
  assert.equal(forwarded.url, "https://upload.ai4mat.ai/workspace?study=1");
  assert.equal(forwarded.headers.get("host"), "upload.ai4mat.ai");
  assert.equal(forwarded.headers.get("x-ai4mat-frontend-host"), "ai4mat.ai");
  assert.equal(forwarded.headers.get("x-forwarded-host"), null);
  assert.equal(await result.text(), "interactive homepage");
  assert.equal(result.headers.get("cache-control"), "no-store");
  assert.equal(result.headers.get("x-ai4mat-release"), "shared-workspace-v1");
});

test("protocol-relative paths cannot turn the worker into an open proxy", async (t) => {
  t.mock.method(globalThis, "fetch", async (request) => {
    assert.equal(new URL(request.url).hostname, "upload.ai4mat.ai");
    assert.equal(new URL(request.url).pathname, "//attacker.invalid/resource");
    return new Response("not found", { status: 404 });
  });
  const result = await worker.fetch(new Request("https://ai4mat.ai//attacker.invalid/resource"));
  assert.equal(result.status, 404);
});

test("streams upload bodies and preserves session and multipart headers", async (t) => {
  const body = "--boundary\r\nContent-Disposition: form-data; name=\"files\"; filename=\"sample.xyz\"\r\n\r\nH 0 0 0\r\n--boundary--";
  t.mock.method(globalThis, "fetch", async (request) => {
    assert.equal(request.method, "POST");
    assert.equal(request.headers.get("cookie"), "session=test-session");
    assert.equal(request.headers.get("content-type"), "multipart/form-data; boundary=boundary");
    assert.equal(request.headers.get("x-forwarded-for"), "198.51.100.5");
    assert.equal(await request.text(), body);
    return Response.json({ files: [{ name: "sample.xyz" }] });
  });
  const result = await worker.fetch(new Request("https://ai4mat.ai/upload", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "multipart/form-data; boundary=boundary",
      Cookie: "session=test-session",
      "CF-Connecting-IP": "198.51.100.5",
    },
  }));
  assert.equal(result.status, 200);
  assert.deepEqual(await result.json(), { files: [{ name: "sample.xyz" }] });
});

test("preserves private cookies and download response headers", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response("original bytes", {
    headers: {
      "Set-Cookie": "session=test-session; Path=/; HttpOnly; SameSite=Lax",
      "Content-Disposition": "attachment; filename*=utf-8''sample.xyz",
    },
  }));
  const result = await worker.fetch(new Request("https://ai4mat.ai/file/1/download"));
  assert.equal(result.headers.get("set-cookie"), "session=test-session; Path=/; HttpOnly; SameSite=Lax");
  assert.equal(result.headers.get("content-disposition"), "attachment; filename*=utf-8''sample.xyz");
  assert.equal(await result.text(), "original bytes");
});

test("keeps application redirects on the public frontend", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response(null, {
    status: 303, headers: { Location: "https://upload.ai4mat.ai/history" },
  }));
  const result = await worker.fetch(new Request("https://ai4mat.ai/file/1/process", { method: "POST" }));
  assert.equal(result.status, 303);
  assert.equal(result.headers.get("location"), "/history");
});

test("does not rewrite external OAuth provider redirects", async (t) => {
  const location = "https://accounts.google.com/o/oauth2/auth?redirect_uri=https%3A%2F%2Fai4mat.ai%2Fauth%2Fcallback";
  t.mock.method(globalThis, "fetch", async () => new Response(null, { status: 302, headers: { Location: location } }));
  const result = await worker.fetch(new Request("https://ai4mat.ai/login"));
  assert.equal(result.headers.get("location"), location);
});

test("preview-domain authentication starts at the canonical host", async (t) => {
  const upstream = t.mock.method(globalThis, "fetch", async () => { throw new Error("should not fetch"); });
  const result = await worker.fetch(new Request("https://preview.pages.dev/login"));
  assert.equal(result.status, 302);
  assert.equal(result.headers.get("location"), "https://ai4mat.ai/login");
  assert.equal(upstream.mock.callCount(), 0);
});

test("never retries an unconfirmed upload or returns success on origin failure", async (t) => {
  t.mock.method(console, "error", () => {});
  const upstream = t.mock.method(globalThis, "fetch", async () => { throw new TypeError("network unavailable"); });
  const result = await worker.fetch(new Request("https://ai4mat.ai/upload", { method: "POST", body: "file" }));
  assert.equal(result.status, 502);
  assert.equal(upstream.mock.callCount(), 1);
  assert.match((await result.json()).detail, /请勿重复提交/);
});

test("prevents a misconfigured origin from recursively calling itself", async (t) => {
  const upstream = t.mock.method(globalThis, "fetch", async () => { throw new Error("should not fetch"); });
  const result = await worker.fetch(new Request("https://upload.ai4mat.ai/"));
  assert.equal(result.status, 508);
  assert.equal(upstream.mock.callCount(), 0);
});

test("production routing is limited to the requested apex", async () => {
  const config = JSON.parse(await readFile(new URL("../wrangler.apex.json", import.meta.url), "utf8"));
  assert.equal(config.main, "public/_worker.js");
  assert.equal(config.workers_dev, false);
  assert.deepEqual(config.routes, [{ pattern: "ai4mat.ai/*", zone_name: "ai4mat.ai" }]);
});

test("publication verification rejects a legacy page even if it returns HTTP 200", async () => {
  await assert.rejects(
    verifyApex(async () => new Response("<h1>Old site</h1>")),
    /not serving the published entry point/,
  );
});

test("publication verification checks the actual homepage, health, and workspace", async () => {
  const visited = [];
  await verifyApex(async (url) => {
    visited.push(url);
    if (url === "https://ai4mat.ai") {
      return new Response(`下一次突破${"<canvas></canvas>".repeat(10)}`, {
        headers: { "X-AI4MAT-Release": "shared-workspace-v1" },
      });
    }
    if (url.endsWith("/_stcore/health")) return Response.json({ status: "ok" });
    return new Response('<form data-enhanced="true"></form>');
  });
  assert.deepEqual(visited, ["https://ai4mat.ai", "https://ai4mat.ai/_stcore/health", "https://ai4mat.ai/workspace"]);
});

test("publication verification will not accept static homepage images", async () => {
  await assert.rejects(
    verifyApex(async () => new Response(`下一次突破${"<canvas></canvas>".repeat(10)}<img src="/old.png">`, {
      headers: { "X-AI4MAT-Release": "shared-workspace-v1" },
    })),
    /does not contain the verified interactive homepage/,
  );
});
