const TONES = {
  dark: { eyebrow: 'text-blue-soft', title: 'text-white', copy: 'text-white/68' },
  light: { eyebrow: 'text-red-dark', title: 'text-ink', copy: 'text-ink/70' },
};

/**
 * Eyebrow, heading and lead paragraph that open a section.
 *
 * @param {object} props
 * @param {'dark' | 'light'} [props.tone] - Background the intro sits on.
 * @param {boolean} [props.reveal] - Fade in on scroll. Pass false when a parent already reveals it.
 */
export function SectionIntro({ eyebrow, title, copy, tone = 'dark', reveal = true }) {
  const colors = TONES[tone];
  return (
    <div className="max-w-3xl" data-reveal={reveal || undefined}>
      <p className={`font-mono text-sm font-bold ${colors.eyebrow}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-4xl font-black leading-tight sm:text-5xl ${colors.title}`}>
        {title}
      </h2>
      <p className={`mt-5 text-lg leading-8 ${colors.copy}`}>{copy}</p>
    </div>
  );
}
