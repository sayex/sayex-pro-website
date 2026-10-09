# Eric Sayer Portfolio

Last updated: 2026-10-09 02:11 AM MDT

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

Section headings and intro copy live in the matching file under `src/sections/`.

## Animations

`usePageAnimations` (called once in `App.jsx`) drives every animation. It targets elements by
the class names and `data-reveal` attribute listed in its `SELECTORS` map, so rename both
together. Anything marked `data-reveal` starts hidden and fades in when scrolled into view;
don't nest `data-reveal` elements. Visitors who prefer reduced motion get every section shown
immediately and no animation.

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
- **A section never appears.** It has `data-reveal` but the animation hook never saw it, usually
  because it was rendered after first mount. Render it with the page, or drop `data-reveal`.
- **The red scroll bar or timeline line doesn't move.** Collapse them with
  `[transform:scaleX(0)]`/`[transform:scaleY(0)]`, not Tailwind's `scale-x-0`/`scale-y-0`.
  Those set the separate CSS `scale` property, which multiplies with the transform Anime.js
  animates and keeps the element at zero size.

## Known limitations

- The section links in the header are hidden below 768px and there is no mobile menu.
- Two color pairs miss the WCAG AA 4.5:1 contrast minimum for normal-size text: white on the
  brand red `#ef233c` (4.2:1, the red primary buttons) and the 76%-white eyebrow line in the
  contact section (2.9:1).
- Dark theme only; there is no light mode.
