import { useEffect } from 'react';
import { animate, onScroll, stagger } from 'animejs';

/**
 * Class and attribute hooks the animations target. They carry no styles of their own,
 * so renaming one only needs a matching change here and in the markup.
 */
const SELECTORS = {
  heroCopyChildren: '.hero-copy > *',
  heroVisual: '.hero-visual',
  codeTokens: '.code-token',
  pulseNodes: '.pulse-node',
  revealTargets: '[data-reveal]',
  timelineShell: '.timeline-shell',
  timelineProgress: '.timeline-progress',
  scrollProgress: '.scroll-progress',
};

/** Added to `[data-reveal]` elements once shown; styles.css hides them until then. */
const VISIBLE_CLASS = 'is-visible';

/**
 * Run the page's entrance, scroll-reveal, timeline and scroll-progress animations once
 * after mount. When the visitor prefers reduced motion, every reveal target is shown
 * immediately and nothing animates.
 */
export function usePageAnimations() {
  useEffect(() => {
    const revealTargets = document.querySelectorAll(SELECTORS.revealTargets);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealTargets.forEach((element) => element.classList.add(VISIBLE_CLASS));
      return undefined;
    }

    const stopAll = [
      playIntro(),
      revealOnScroll(revealTargets),
      syncTimelineProgress(),
      trackScrollProgress(),
    ];
    return () => stopAll.forEach((stop) => stop());
  }, []);
}

/** Hero entrance plus the looping pulse dots. Returns a cleanup function. */
function playIntro() {
  const animations = [
    animate(SELECTORS.heroCopyChildren, {
      opacity: [0, 1],
      y: [24, 0],
      delay: stagger(90),
      duration: 850,
      ease: 'outExpo',
    }),
    animate(SELECTORS.heroVisual, {
      opacity: [0, 1],
      scale: [0.96, 1],
      duration: 900,
      delay: 180,
      ease: 'outExpo',
    }),
    animate(SELECTORS.codeTokens, {
      opacity: [0.35, 1],
      y: [8, 0],
      delay: stagger(55),
      duration: 650,
      ease: 'outCubic',
    }),
    animate(SELECTORS.pulseNodes, {
      scale: [1, 0.82, 1],
      opacity: [0.45, 1, 0.45],
      delay: stagger(260),
      duration: 1800,
      loop: true,
      ease: 'inOutSine',
    }),
  ];
  return () => animations.forEach((animation) => animation.revert());
}

/** Fade each target up the first time it scrolls into view. Returns a cleanup function. */
function revealOnScroll(targets) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(VISIBLE_CLASS);
        animate(entry.target, { opacity: [0, 1], y: [28, 0], duration: 760, ease: 'outCubic' });
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.18 },
  );
  targets.forEach((target) => observer.observe(target));
  return () => observer.disconnect();
}

/** Grow the experience timeline's red line as the section scrolls past. */
function syncTimelineProgress() {
  const animation = animate(SELECTORS.timelineProgress, {
    scaleY: [0, 1],
    ease: 'linear',
    // anime.js thresholds read "<viewport point> <target point>" (the reverse of GSAP's
    // ScrollTrigger order): start when the section's top reaches 78% down the viewport,
    // finish when its bottom reaches 28%.
    autoplay: onScroll({
      target: SELECTORS.timelineShell,
      enter: '78% top',
      leave: '28% bottom',
      sync: true,
    }),
  });
  // revert() also detaches the linked scroll observer; pause() would leave it listening.
  return () => animation.revert();
}

/** Scale the top progress bar to how far down the page the visitor has scrolled. */
function trackScrollProgress() {
  const bar = document.querySelector(SELECTORS.scrollProgress);
  if (!bar) return () => {};

  let frame = 0;
  const update = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      animate(bar, { scaleX: progress, duration: 250, ease: 'outQuad' });
    });
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  return () => {
    window.removeEventListener('scroll', update);
    cancelAnimationFrame(frame);
  };
}
