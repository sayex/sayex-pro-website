import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// jsdom has no matchMedia. Report "reduced motion" so usePageAnimations takes its
// no-animation path: jsdom has no layout, so scroll-driven animations can't run here.
window.matchMedia = (query) => ({
  matches: query.includes('prefers-reduced-motion'),
  media: query,
  onchange: null,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
  dispatchEvent: () => false,
});

afterEach(cleanup);
