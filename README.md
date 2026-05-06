# ATH Website

Static-exported Next.js site for All Time High.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Verify

```bash
npm run lint
npm audit --audit-level=moderate
npm run build
```

`npm run build` writes the Cloudflare Pages deploy artifact to `out/`.

## Cloudflare Pages

Use these Pages build settings:

- Framework preset: Next.js (Static HTML Export)
- Build command: `npm run build`
- Build output directory: `out`
- Production branch: `main`

