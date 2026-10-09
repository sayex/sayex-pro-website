import { SectionIntro } from '../components/SectionIntro.jsx';
import { capabilities } from '../profileData.js';

export function StackSection() {
  return (
    <section id="stack" className="section-shell">
      <SectionIntro
        eyebrow="Technical range"
        title="Full-stack depth with a teacher's communication layer."
        copy="The site is shaped around the same mix that shows up in the résumé: production software, clear explanation, business translation, and enough ops context to get work deployed."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {capabilities.map(({ icon: Icon, title, copy }) => (
          <article key={title} className="feature-card" data-reveal>
            <div className="feature-icon">
              <Icon size={22} />
            </div>
            <h3 className="mt-5 text-xl font-black text-white">{title}</h3>
            <p className="mt-3 leading-7 text-white/68">{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
