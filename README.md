# AVORA Residences

A fictional Bengaluru residential developer's landing page, built from the supplied Figma design with Next.js, Tailwind CSS, and GSAP ScrollTrigger.

Use Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open the URL printed by Next.js. On systems with limited filesystem watchers, use `WATCHPACK_POLLING=true npm run dev`.

For a static production preview:

```sh
npm run build
python3 -m http.server 3000 --bind 127.0.0.1 --directory out
```

## Deploy to GitHub Pages

1. Put the contents of `avora-residences` at the root of a GitHub repository with `main` as its default branch. Include the hidden `.github` directory so GitHub can find the workflow.
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the source under **Build and deployment**.
3. Open **Actions**, select **Deploy AVORA Residences to GitHub Pages**, and run it on `main`. Future pushes to `main` deploy automatically. The deployment job links to the published site.

The workflow uses Node.js 24, builds the static export in `out/`, and reads the path from GitHub Pages. A project site works at `https://OWNER.github.io/REPOSITORY/`. A user site or custom domain can serve the site at `/`.

The enquiry form prepares a draft in the browser for copying or opening in a mail client. A recipient or submission endpoint can be connected when one is available.

## Cloud artwork

The foreground bank and distant clusters were created with the built-in ImageGen tool and exported to WebP with their transparent backgrounds preserved.

- `public/assets/avora-cloud-foreground.webp` — Create a photorealistic wide foreground cumulus cloud bank for a luxury architecture website, isolated on genuine transparent alpha. 3:2 landscape. One broad continuous cumulus bank; low uneven crest in the center to frame an architectural subject, tall soft billows on the left and slightly lower ones on the right, dense layered cloud beneath. Creamy neutral white highlights and gently cool slate-blue shadow, naturally soft wispy edges and realistic fine detail, subtle sunlight from above left. Top third is mostly transparent; fill the bottom across the full width with cloud all the way to the frame edge. Use layered depth and a natural irregular silhouette. Clouds only, no sky, no ground, no building, no text, no frame, no checkerboard painted into the image.
- `public/assets/avora-cloud-distant.webp` — Photorealistic distant white cumulus cloud clusters, isolated on genuine transparent alpha, for layering behind the architectural subject of a premium website. Wide 3:2 layout. Two asymmetrical tall cumulus towers growing up from a thin, low, connected horizontal cloud band, the left tower stands at the far left, the right cluster stands at the far right, leaving the upper middle largely transparent. Bright ivory sunlit crests with cool blue-gray undersides and fine soft wisps. Backlit aerial photographic realism. Clouds only, no colored sky, no ground, no object, no text, no border, no painted checkerboard.
