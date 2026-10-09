# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- Split the 430-line `App.jsx` into one file per section (`src/sections/`), shared components
  (`src/components/`) and a `usePageAnimations` hook (`src/hooks/`).
- Moved hardcoded content into `profileData.js`: contact labels, the signal strip, GitHub user
  and repository URLs. Link labels are now derived from the URL by `displayUrl`.
- Replaced the five copies of the page-width container classes with a `.page-container` class.
- Removed CSS that duplicated Tailwind's preflight, and raw hex colors that duplicated theme
  tokens.
- Loaded Google Fonts with `<link>` and `preconnect` in `index.html` instead of a CSS
  `@import`, so the font stylesheet downloads in parallel with the app CSS.
- Moved Vite, Tailwind and the React plugin to `devDependencies` and pinned every dependency
  to an exact version.
- The header GitHub button now opens in a new tab, like every other GitHub link.

### Fixed

- The red scroll-progress bar and the experience timeline line never appeared. Tailwind's
  `scale-x-0`/`scale-y-0` kept them at zero size underneath Anime.js's transform, and the
  timeline's scroll thresholds were written in GSAP order, which Anime.js reads as an empty
  range.
- The GitHub section intro faded in twice because it was a scroll-reveal target inside another
  one.
- The work-history link label was hardcoded to `avryq.app` for any job with a link.
- The code sample's `aria-label` sat on a plain `div`, where screen readers ignore it; it is now
  a labelled `figure`, and its line numbers are hidden from assistive tech.
- Animation cleanup now detaches the timeline's scroll observer instead of leaving it running.
- Patched known vulnerabilities in build tooling: Vite 8.0.14 to 8.0.16, plus PostCSS, nanoid
  and source-map-js through the lockfile.

### Added

- ESLint (flat config with React Hooks and Fast Refresh rules) and Prettier.
- Vitest + Testing Library tests for links, accessible names, the reveal behavior and
  `displayUrl`.
- GitHub Actions CI: lint, format check, tests, build and `npm audit`.

## [0.1.0] - 2026-05-21

### Added

- Initial React + Vite portfolio site.
