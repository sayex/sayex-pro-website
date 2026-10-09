import { useEffect, useRef, useState } from 'react';
import { ArrowRight, GitBranch, Menu, X } from 'lucide-react';
import { NewTabLink } from '../components/NewTabLink.jsx';
import { contactLinks, navItems } from '../profileData.js';

const MOBILE_NAV_ID = 'mobile-nav';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);

  // While the mobile menu is open, Esc or a press anywhere outside the header closes it.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const closeOnOutsidePress = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnOutsidePress);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnOutsidePress);
    };
  }, [menuOpen]);

  const MenuIcon = menuOpen ? X : Menu;

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-xl"
    >
      <nav aria-label="Main">
        <div className="page-container flex h-16 items-center justify-between">
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
          <div className="flex items-center gap-2">
            <NewTabLink
              href={contactLinks.github}
              className="icon-button"
              aria-label="Open Eric Sayer on GitHub"
            >
              <GitBranch size={19} />
            </NewTabLink>
            {/* Below 768px the section links live in the panel this button toggles. */}
            <button
              ref={menuButtonRef}
              type="button"
              className="icon-button md:hidden"
              aria-label="Site menu"
              aria-expanded={menuOpen}
              aria-controls={MOBILE_NAV_ID}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <MenuIcon size={19} />
            </button>
          </div>
        </div>
        <div
          id={MOBILE_NAV_ID}
          hidden={!menuOpen}
          className="border-t border-white/10 bg-ink md:hidden"
        >
          {navItems.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {label}
              <ArrowRight size={18} />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
