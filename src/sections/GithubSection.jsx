import { BriefcaseBusiness, ExternalLink, GitBranch } from 'lucide-react';
import { NewTabLink } from '../components/NewTabLink.jsx';
import { SectionIntro } from '../components/SectionIntro.jsx';
import { contactLinks, githubRepos, githubUser } from '../profileData.js';

export function GithubSection() {
  return (
    <section id="github" className="section-shell">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div data-reveal>
          <SectionIntro
            eyebrow="GitHub"
            title="Connected to the public developer trail."
            copy="The GitHub profile is wired into the site with direct project links and a focused set of repositories that align with the résumé."
            reveal={false}
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <NewTabLink href={contactLinks.github} className="primary-button">
              Open GitHub <GitBranch size={18} />
            </NewTabLink>
            <NewTabLink href={contactLinks.linkedin} className="secondary-button">
              LinkedIn <BriefcaseBusiness size={18} />
            </NewTabLink>
          </div>
        </div>
        <div className="grid gap-3" data-reveal>
          {githubRepos.map(({ name, url }) => (
            <NewTabLink key={name} href={url} className="repo-row">
              <span className="font-mono text-sm text-white/55">{githubUser}/</span>
              <strong className="text-lg text-white">{name}</strong>
              <ExternalLink className="ml-auto text-blue-soft" size={18} />
            </NewTabLink>
          ))}
        </div>
      </div>
    </section>
  );
}
