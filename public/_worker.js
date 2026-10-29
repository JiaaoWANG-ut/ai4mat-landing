const ORIGIN = "https://upload.ai4mat.ai";
const APEX = "ai4mat.ai";
const RELEASE = "shared-workspace-v1";

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    if (incoming.hostname === new URL(ORIGIN).hostname) {
      return new Response("AI4MAT: upstream routing loop prevented.", {
        status: 508,
        headers: { "Cache-Control": "no-store" },
      });
    }

    if (incoming.hostname !== APEX && ["/login", "/logout", "/auth/callback"].includes(incoming.pathname)) {
      const canonical = new URL(`https://${APEX}`);
      canonical.pathname = incoming.pathname;
      canonical.search = incoming.search;
      return Response.redirect(canonical, 302);
    }

    const upstream = new URL(ORIGIN);
    upstream.pathname = incoming.pathname;
    upstream.search = incoming.search;
    const forwarded = new Request(upstream, request);
    forwarded.headers.set("Host", upstream.host);
    forwarded.headers.set("X-AI4MAT-Frontend-Host", APEX);
    forwarded.headers.delete("Forwarded");
    forwarded.headers.delete("X-Forwarded-Host");
    const clientIP = request.headers.get("CF-Connecting-IP");
    if (clientIP) forwarded.headers.set("X-Forwarded-For", clientIP);

    let response;
    try {
      response = await fetch(forwarded, { redirect: "manual" });
    } catch (error) {
      if (!(error instanceof TypeError)) throw error;
      console.error("AI4MAT: the application origin could not be reached.");
      return Response.json(
        { detail: "暂时无法连接 AI4MAT 工作台，请稍后重试。上传结果未确认时，请勿重复提交。" },
        { status: 502, headers: { "Cache-Control": "no-store", "X-AI4MAT-Release": RELEASE } },
      );
    }

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "no-store");
    headers.set("X-AI4MAT-Release", RELEASE);
    const location = headers.get("Location");
    if (location) {
      const destination = new URL(location, ORIGIN);
      if (destination.origin === ORIGIN) {
        destination.host = incoming.host;
        destination.protocol = incoming.protocol;
        headers.set("Location", `${destination.pathname}${destination.search}${destination.hash}`);
      }
    }
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  },
};
