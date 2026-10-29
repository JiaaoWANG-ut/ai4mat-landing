import { pathToFileURL } from "node:url";

const origin = "https://ai4mat.ai";
class PublicationNotReady extends Error {}

async function request(url, fetcher) {
  try {
    return await fetcher(url, { signal: AbortSignal.timeout(15000), cache: "no-store" });
  } catch (error) {
    if (error instanceof TypeError || error?.name === "TimeoutError") {
      throw new PublicationNotReady("The public endpoint could not be reached.");
    }
    throw error;
  }
}

export async function verifyApex(fetcher = fetch) {
  const home = await request(origin, fetcher);
  const html = await home.text();
  if (!home.ok || home.headers.get("x-ai4mat-release") !== "shared-workspace-v1") {
    throw new PublicationNotReady(`The apex is not serving the published entry point (HTTP ${home.status}).`);
  }
  if (!html.includes("下一次突破") || (html.match(/<canvas\b/g) || []).length !== 10 || /<img\b/i.test(html)) {
    throw new PublicationNotReady("The apex does not contain the verified interactive homepage.");
  }
  const health = await request(`${origin}/_stcore/health`, fetcher);
  if (!health.ok) throw new PublicationNotReady("The application health endpoint failed.");
  let status;
  try {
    status = await health.json();
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    throw new PublicationNotReady("The application health endpoint did not return JSON.");
  }
  if (status?.status !== "ok") {
    throw new PublicationNotReady("The application health check failed through the apex.");
  }
  const workspace = await request(`${origin}/workspace`, fetcher);
  if (!workspace.ok || !(await workspace.text()).includes('data-enhanced="true"')) {
    throw new PublicationNotReady("The enhanced workspace did not load through the apex.");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  let verified = false;
  let lastFailure = "No verified public response.";
  for (let attempt = 1; attempt <= 12; attempt += 1) {
    try {
      await verifyApex();
      verified = true;
      break;
    } catch (error) {
      if (!(error instanceof PublicationNotReady)) throw error;
      lastFailure = error.message;
      console.error(`Verification attempt ${attempt}: ${lastFailure}`);
    }
    if (attempt < 12) await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  if (!verified) throw new Error(`Apex publication could not be verified: ${lastFailure}`);
  console.log("Verified ai4mat.ai: live interactive homepage, application health, and enhanced workspace.");
}
