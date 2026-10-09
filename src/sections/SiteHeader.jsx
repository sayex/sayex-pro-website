import { GitBranch } from 'lucide-react';
import { NewTabLink } from '../components/NewTabLink.jsx';
import { contactLinks, navItems } from '../profileData.js';

export function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
      <nav className="page-container flex h-16 items-center justify-between">
        <a href="#top" className="group flex items-center gap-3" aria-label="Eric Sayer home">
          <span className="grid h-10 w-10 place-items-center shadow-hard">
            <img src="/favicon.svg" alt="" className="h-10 w-10" />
          </span>
          <span className="hidden text-sm font-semibold text-white sm:block">Eric Sayer</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(({ label, href }) => (
            <a key={href} href={href} className="nav-link">
              {label}
            </a>
          ))}
        </div>
        <NewTabLink
          href={contactLinks.github}
          className="icon-button"
          aria-label="Open Eric Sayer on GitHub"
        >
          <GitBranch size={19} />
        </NewTabLink>
      </nav>
    </header>
  );
}
