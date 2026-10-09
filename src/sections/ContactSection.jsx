import { NewTabLink } from '../components/NewTabLink.jsx';
import { displayUrl } from '../lib/displayUrl.js';
import { contactChannels } from '../profileData.js';

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-red py-20 text-white sm:py-24"
    >
      <div className="page-container grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div data-reveal>
          <p className="font-mono text-sm font-bold text-white/76">
            Available for software builds, product work, and technical leadership
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
            Bring me the messy technical problem. I’ll help turn it into working software.
          </h2>
        </div>
        <div className="contact-panel" data-reveal>
          {contactChannels.map((channel) => (
            <ContactLink key={channel.href} {...channel} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Email opens the mail client in place; web profiles open in a new tab. */
function ContactLink({ href, icon: Icon }) {
  const Anchor = href.startsWith('mailto:') ? 'a' : NewTabLink;
  return (
    <Anchor href={href} className="contact-link">
      <Icon size={19} />
      {displayUrl(href)}
    </Anchor>
  );
}
