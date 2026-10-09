import { ExternalLink } from 'lucide-react';
import { NewTabLink } from '../components/NewTabLink.jsx';
import { SectionIntro } from '../components/SectionIntro.jsx';
import { projects } from '../profileData.js';

export function ProjectsSection() {
  return (
    <section className="bg-white py-20 text-ink sm:py-24">
      <div className="page-container">
        <SectionIntro
          eyebrow="Selected builds"
          title="Project work that connects software to real-world use."
          copy="The portfolio section leans into applied work: event platforms, vendor systems, APIs, reporting, and collaborative full-stack applications."
          tone="light"
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ name, type, description, stack, href, icon: Icon }) {
  return (
    <article className="project-card" data-reveal>
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center bg-ink text-white">
          <Icon size={22} />
        </div>
        {href && (
          <NewTabLink href={href} className="icon-button-light" aria-label={`${name} on GitHub`}>
            <ExternalLink size={18} />
          </NewTabLink>
        )}
      </div>
      <p className="mt-6 font-mono text-sm text-red-dark">{type}</p>
      <h3 className="mt-2 text-2xl font-black text-ink">{name}</h3>
      <p className="mt-4 leading-7 text-ink/70">{description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {stack.map((item) => (
          <span key={item} className="tech-pill-light">
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
