import { CheckCircle2, ExternalLink } from 'lucide-react';
import { NewTabLink } from '../components/NewTabLink.jsx';
import { SectionIntro } from '../components/SectionIntro.jsx';
import { displayUrl } from '../lib/displayUrl.js';
import { workHighlights } from '../profileData.js';

export function WorkSection() {
  return (
    <section id="work" className="section-shell timeline-shell">
      <SectionIntro
        eyebrow="Experience"
        title="A career built across code, instruction, support, and operations."
        copy="The through line is pragmatic delivery: understand the business, build the system, document the decisions, and help the people around the code get stronger."
      />
      <div className="relative mt-12">
        <div className="absolute left-5 top-0 hidden h-full w-px bg-white/10 md:block" />
        <div className="timeline-progress absolute left-5 top-0 hidden h-full w-px origin-top bg-red [transform:scaleY(0)] md:block" />
        <div className="space-y-6">
          {workHighlights.map((entry) => (
            <TimelineEntry key={`${entry.role}-${entry.company}`} {...entry} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({ period, role, company, href, icon: Icon, points }) {
  return (
    <article className="timeline-item" data-reveal>
      <div className="timeline-marker">
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-sm text-blue-soft">{period}</p>
          {href && (
            <NewTabLink href={href} className="timeline-link">
              {displayUrl(href)} <ExternalLink size={13} />
            </NewTabLink>
          )}
        </div>
        <h3 className="mt-2 text-2xl font-black text-white">{role}</h3>
        <p className="mt-1 font-semibold text-white/72">{company}</p>
        <ul className="mt-5 grid gap-3">
          {points.map((point) => (
            <li key={point} className="flex gap-3 text-white/68">
              <CheckCircle2 className="mt-1 shrink-0 text-red" size={18} />
              <span className="leading-7">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
