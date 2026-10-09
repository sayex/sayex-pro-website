import { workPrinciples } from '../profileData.js';

const ACCENT_BG = { red: 'bg-red', blue: 'bg-blue' };

export function SignalStrip() {
  return (
    <section className="border-y border-white/10 bg-white text-ink">
      <div className="page-container grid gap-4 py-5 md:grid-cols-3">
        {workPrinciples.map(({ label, accent }) => (
          <div key={label} className="flex items-center gap-3 text-sm font-bold">
            <span className={`pulse-node h-3 w-3 rounded-full ${ACCENT_BG[accent]}`} />
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}
