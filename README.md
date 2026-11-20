# TIXORA

## Local development

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

## GitHub Pages deployment

The GitHub Actions workflow builds and deploys the site when changes are pushed
to `main`. In the repository settings, open **Pages** and set the build and
deployment source to **GitHub Actions**. The production build automatically uses
the repository subpath required by GitHub Pages.

The deployed site will be available at
`https://maahir972008.github.io/TIXORA/`.
