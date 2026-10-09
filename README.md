# Eric Sayer Portfolio

Last updated: 2026-10-09 02:29 AM MDT

[![CI](https://github.com/sayex/sayex-pro-website/actions/workflows/ci.yml/badge.svg)](https://github.com/sayex/sayex-pro-website/actions/workflows/ci.yml)

Single-page portfolio site for Eric Sayer, built with React and Vite. It is a static site:
no backend, no environment variables, no secrets.

## Stack

- React 19 + Vite 8
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Anime.js 4 for entrance and scroll animations
- lucide-react icons
- Inter and JetBrains Mono from Google Fonts (linked in `index.html`)

## Prerequisites

- Node.js 20.19 or newer (CI runs Node 22)
- npm

## Setup

```bash
npm install
npm run dev
```

## Scripts

| Script                 | What it does                                         |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server                            |
| `npm run build`        | Production build into `dist/`                        |
| `npm run preview`      | Serve the production build locally                   |
| `npm run lint`         | ESLint (React Hooks + Fast Refresh rules)            |
| `npm run format`       | Format everything with Prettier                      |
| `npm run format:check` | Fail if anything is not Prettier-formatted           |
| `npm test`             | Run the Vitest suite once (`test:watch` to watch)    |
| `npm run check`        | Lint, format check, tests and build (CI also audits) |

## Project structure

```text
index.html                 Page shell, meta tags, font links
public/                    Static files served as-is (resume PDF, photos, icons, manifest)
src/
  main.jsx                 React entry point
  App.jsx                  Page layout: header + sections in order
  profileData.js           All profile content: links, stats, skills, jobs, projects, repos
  styles.css               Tailwind theme tokens and shared component classes
  hooks/
    usePageAnimations.js   Entrance, scroll-reveal, timeline and scroll-progress animations
  components/              Reusable pieces: SectionIntro, NewTabLink, CodePanel
  sections/                One file per page section (SiteHeader, HeroSection, ...)
  lib/displayUrl.js        Turns a URL into its on-page label (https://github.com/sayex -> github.com/sayex)
  test/setup.js            Vitest setup (jsdom stubs)
```

## Editing content

Almost every change to what the page says happens in `src/profileData.js`:

- **Jobs** go in `workHighlights`. Add an `href` and the entry shows a link labelled with its
  domain automatically.
- **Projects** go in `projects`; use `githubRepoUrl('RepoName')` for GitHub links.
- **Repositories** in the GitHub section are the names in `githubRepos`.
- **Contact rows** come from `contactChannels`; their labels are derived from the links.
- **Header links** come from `navItems`. The same list feeds the mobile menu, which replaces the
  header links below 768px.

Section headings and intro copy live in the matching file under `src/sections/`.

## Animations

`usePageAnimations` (called once in `App.jsx`) drives every animation. It targets elements by
the class names and `data-reveal` attribute listed in its `SELECTORS` map, so rename both
together. Anything marked `data-reveal` starts hidden and fades in when scrolled into view;
don't nest `data-reveal` elements. Visitors who prefer reduced motion get every section shown
immediately and no animation.

## Colors

Theme colors are tokens in the `@theme` block of `src/styles.css`. Red and blue come in
variants tuned for contrast, so pick the one that matches the job:

| Token        | Hex       | Use for                                                         |
| ------------ | --------- | --------------------------------------------------------------- |
| `red`        | `#ef233c` | Accents with no text on them: scroll bar, icons, dots, shadows  |
| `red-fill`   | `#e3112a` | Backgrounds behind white text: buttons, contact band, selection |
| `red-bright` | `#f13c52` | Red text on the dark code panel                                 |
| `red-dark`   | `#bd1027` | Red text on white (projects section)                            |
| `blue-fill`  | `#186bff` | Blue behind white text (primary button hover)                   |

Every text pair meets WCAG AA (4.5:1). `src/styles.contrast.test.js` checks them, including the
code panel where the hero photo shows through, so `npm test` fails if a token change drops one
below AA. Axe still flags the code panel's line numbers (2.7:1); they're decorative and hidden
from screen readers, which WCAG exempts.

## Continuous integration

`.github/workflows/ci.yml` runs on every pull request and on pushes to `main`. Right after
`npm ci` it runs `npm audit signatures`, which fails if any installed package lacks a valid npm
registry signature or has an invalid provenance attestation. Then come lint, format check, tests,
build and `npm audit` (all severities). Actions are pinned by commit SHA.

To run the signature check locally: `npm audit signatures`.

## Dependency updates

`.github/dependabot.yml` has Dependabot check npm packages and GitHub Actions every Monday:

- **npm:** all minor and patch bumps arrive together in one PR. Each major version gets its own
  PR, since those can need code changes. New releases wait 7 days (30 for majors) before
  Dependabot proposes them, so a broken or compromised version has time to be pulled first.
- **GitHub Actions:** all action bumps arrive in one PR, also after a 7-day wait. Dependabot
  updates both the pinned commit SHA and the `# vX.Y.Z` comment next to it.

Dependency versions are pinned exactly, so Dependabot PRs change both `package.json` and
`package-lock.json`. CI runs on each one; merge when it's green.

## Troubleshooting

- **`Cannot find module @rolldown/binding-...` or a Tailwind `oxide` error.** `node_modules`
  was installed on a different OS or CPU (Vite and Tailwind ship native binaries). Delete
  `node_modules` and run `npm install` on the machine you are building on.
- **`npm run format:check` fails in CI.** Run `npm run format` and commit the result.
- **Content runs off the right edge on phones.** A grid column defaults to `auto`, which can't
  shrink below its widest unbreakable content (a code line, a long URL). Give it
  `grid-cols-[minmax(0,1fr)]` or put `min-w-0` on the item, and let the wide content scroll or
  wrap. The hero does this so the code sample's longest line can't widen the page.
- **A section never appears.** It has `data-reveal` but the animation hook never saw it, usually
  because it was rendered after first mount. Render it with the page, or drop `data-reveal`.
- **The red scroll bar or timeline line doesn't move.** Collapse them with
  `[transform:scaleX(0)]`/`[transform:scaleY(0)]`, not Tailwind's `scale-x-0`/`scale-y-0`.
  Those set the separate CSS `scale` property, which multiplies with the transform Anime.js
  animates and keeps the element at zero size.

## Known limitations

- Dark theme only; there is no light mode.
