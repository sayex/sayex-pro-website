import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { describe, expect, it } from 'vitest';

// Read from disk: Vitest turns CSS imports (even `?raw`) into empty strings, and under
// jsdom `import.meta.url` isn't a file URL. Vitest runs from the project root.
const styles = readFileSync(resolve(cwd(), 'src/styles.css'), 'utf8');

/** WCAG AA minimum for normal-size text. */
const AA_NORMAL_TEXT = 4.5;
const WHITE = [255, 255, 255];

function token(name) {
  const match = styles.match(new RegExp(`--color-${name}:\\s*#([0-9a-f]{6})\\b`, 'i'));
  if (!match) throw new Error(`--color-${name} not found in styles.css`);
  return [0, 2, 4].map((i) => parseInt(match[1].slice(i, i + 2), 16));
}

/** `top` at `alpha` opacity painted over `bottom`, like Tailwind's `bg-panel/92`. */
function blend(top, alpha, bottom) {
  return top.map((channel, i) => channel * alpha + bottom[i] * (1 - alpha));
}

function luminance(rgb) {
  const [r, g, b] = rgb.map((channel) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

// .terminal-panel is bg-panel/92 over the hero photo, which sits under HeroSection's
// rgba(3,8,18,0.62) overlay. Worst case is a white photo pixel showing through both.
const HERO_PHOTO_WORST = blend([3, 8, 18], 0.62, WHITE);
const CODE_PANEL = blend(token('panel'), 0.92, HERO_PHOTO_WORST);

describe('theme color contrast', () => {
  it.each([
    ['white on red-fill (buttons, contact band, selection)', WHITE, token('red-fill')],
    ['white on blue-fill (primary button hover)', WHITE, token('blue-fill')],
    ['red-bright keyword on the code panel', token('red-bright'), CODE_PANEL],
    ['red-dark eyebrow on white (projects section)', token('red-dark'), WHITE],
  ])('%s meets WCAG AA', (_label, text, background) => {
    expect(contrast(text, background)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
  });
});
