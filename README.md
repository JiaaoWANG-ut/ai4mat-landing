# AI4MAT apex delivery

The production entry point is [public/_worker.js](./public/_worker.js), a
Cloudflare Pages advanced-mode worker. It forwards the apex site's requests to
the shared AI4MAT application at `https://upload.ai4mat.ai`, including the live
interactive homepage, workspace, uploads, downloads, and authenticated history.
The original React template below is retained as source history, not as a second
copy of the production product.

The worker uses one fixed upstream, streams request/response bodies, preserves
cookies and download headers, and does not cache private responses or retry
unconfirmed uploads. `X-AI4MAT-Frontend-Host: ai4mat.ai` tells the application to
construct its URLs for the public apex host; the backend allows only that exact
owned hostname and does not use it for authentication.

Use Node 22 or a supported current LTS release:

```sh
npm ci
npm run test:edge
npm run build
```

The lockfile uses the public npm registry while preserving dependency versions and
integrity hashes; the original private mirror is not reachable from public builds.

Vite copies the worker from `public/` to `dist/_worker.js`. Deploy **dist/** to
the existing Cloudflare Pages project. Keep `upload.ai4mat.ai` routed directly to
the application's dedicated tunnel, not to this worker, to avoid a routing loop.

Verify the actual root page and `/workspace` after deployment. A successful
delivery response carries `X-AI4MAT-Release: shared-workspace-v1`; changing this
repository alone is not proof that the hosting project's publishing hook ran.

### Authorized production workflow

[Publish AI4MAT apex](./.github/workflows/publish-apex.yml) can publish the same
entry point as a dedicated Worker using [wrangler.apex.json](./wrangler.apex.json).
It manages only the `ai4mat.ai/*` route, not unrelated domains or the application's
direct `upload.ai4mat.ai` origin.

The workflow uses only this repository's standard `CLOUDFLARE_API_TOKEN` publishing
secret (or its `CF_API_TOKEN` alias). It does not print credentials, read unrelated
secrets, or import credentials from another project. The token must authorize
Workers publishing and the apex zone's Workers route. The account identifier in
the configuration is non-secret and selects the existing site account.

Missing authorization fails the job before deployment. After deployment, the job
requires the actual apex to serve the new release, ten live scenes, a healthy
application, and the enhanced workspace; a Git push alone cannot pass this check.

After configuring the repository publishing secret, an operator with the existing
SSH repository permission can trigger a deliberate release without needing a
GitHub administration token. Push a unique `ai4mat-apex-*` tag pointing at the
tested commit, or rerun the workflow from GitHub Actions. Release runs are serialized.

## Original client template

An experimental lunar observatory website template with a split hero layout, flowing interactive ASCII moon field, manifesto video section, facilities directory with detail pages, live observation feed, archive carousel, and monochrome footer.

## Features

- Split hero with editorial text panel on the left and interactive ASCII moon field on the right
- Hero title styled with local `Geist Pixel` line variant
- Manifesto section with left video and right editorial text
- Facilities directory with four-column layout and per-facility detail pages
- Live observation section with video, status line, and dynamic coordinates
- 3D archive carousel with fullscreen preview overlay
- Monochrome footer and overall observatory UI language

## Tech Stack

- React 19 + TypeScript + Vite
- React Router
- Tailwind CSS v3
- GSAP + ScrollTrigger
- Geist font package

## Quick Start

1. Install dependencies: `npm install`
2. Edit `src/config.ts`
3. Add images to `public/images/`
4. Add videos to `public/videos/`
5. Run the dev server: `npm run dev`
6. Build for production: `npm run build`

## Configuration

All editable content is defined in `src/config.ts`. Do not modify the ASCII field logic or section interaction logic unless you are fixing a real bug.

### `siteConfig`

```ts
export const siteConfig = {
  language: "",
  siteTitle: "",
  siteDescription: "",
}
```

### `navigationConfig`

```ts
export const navigationConfig = {
  brandName: "",
  links: [
    // { label: "", href: "#archives" }
  ],
}
```

### `heroConfig`

```ts
export const heroConfig = {
  eyebrow: "",
  titleLines: [],
  leadText: "",
  supportingNotes: [],
}
```

### `manifestoConfig`

```ts
export const manifestoConfig = {
  videoPath: "",
  text: "",
}
```

### `facilitiesConfig`

```ts
export const facilitiesConfig = {
  sectionLabel: "",
  detailBackText: "",
  detailNotFoundText: "",
  detailReturnText: "",
  items: [
    {
      slug: "",
      name: "",
      code: "",
      address: "",
      status: "",
      email: "",
      phone: "",
      ctaText: "",
      ctaHref: "",
      image: "",
      utcOffset: 0,
      article: {
        title: "",
        paragraphs: [],
      },
    },
  ],
}
```

### `observationConfig`

```ts
export const observationConfig = {
  sectionLabel: "",
  videoPath: "",
  statusText: "",
  latLabel: "",
  lonLabel: "",
  initialLat: 0,
  initialLon: 0,
}
```

### `archivesConfig`

```ts
export const archivesConfig = {
  sectionLabel: "",
  vaultTitle: "",
  closeText: "",
  items: [
    {
      src: "",
      label: "",
    },
  ],
}
```

### `footerConfig`

```ts
export const footerConfig = {
  copyrightText: "",
  statusText: "",
}
```

## Required Images

Place all images in `public/images/`.

If the required image assets do not already exist, write image-generation prompts based on the user's request and this template's visual style, call the `generate_image` tool, save the generated files into `public/images/`, and then reference those final file paths in `src/config.ts`.

### Facilities Directory

- One image per facility item in `facilitiesConfig.items`
- Recommended ratio: portrait, ideally 3:4
- Recommended minimum size: 1200 x 1600
- High-contrast monochrome or heavily desaturated imagery works best

### Archives

- One image per archive item in `archivesConfig.items`
- Recommended ratio: portrait or near-portrait
- Recommended minimum size: 1200px on the short edge
- Images should hold up under grayscale display

## Required Videos

Place all videos in `public/videos/`.

If the required video assets do not already exist, write video-generation prompts based on the user's request and this template's visual style, call the `generate_video` tool, save the generated files into `public/videos/`, and then reference those final file paths in `src/config.ts`.

### Manifesto Video

- One video used by `manifestoConfig.videoPath`
- Recommended ratio: 16:9

### Observation Feed Video

- One video used by `observationConfig.videoPath`
- Recommended ratio: 16:9

## Design

**Colors**

- Primary hero and archive sections: black
- Content sections: white / off-white
- Typography is monochrome with no accent color system

**Fonts**

- Hero title: `Geist Pixel` line variant
- UI and body text: `IBM Plex Mono`
- ASCII field: `Fragment Mono`

**Motion**

- Interactive ASCII moon field in hero
- Scroll-triggered manifesto reveal
- Facilities column reveal on scroll
- Observation video reveal
- 3D archive carousel and preview burst animation

## Notes

- Empty config values hide the relevant section or element
- `heroConfig.supportingNotes` works best with exactly 3 items for the current staggered composition
- `facilitiesConfig.items` powers both the facilities grid and the facility detail pages
- Facility detail routes rely on client-side routing, so static hosting should support SPA fallback to `index.html`
