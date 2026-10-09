import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { CodePanel } from '../components/CodePanel.jsx';
import { NewTabLink } from '../components/NewTabLink.jsx';
import { displayUrl } from '../lib/displayUrl.js';
import { contactLinks, signatureStats } from '../profileData.js';

export function HeroSection() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-24">
      <div className="absolute inset-0 -z-20">
        <img
          src="/media/eric-workstation.jpg"
          alt=""
          className="h-full w-full object-cover object-center opacity-55"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[rgba(3,8,18,0.62)]" />
      </div>
      <div className="absolute inset-x-0 top-16 -z-10 h-px bg-white/10" />
      {/* minmax(0,1fr) on phones: an auto column can't shrink below the code panel's longest
          line, which pushed the whole hero past the right edge of the screen. */}
      <div className="page-container grid grid-cols-[minmax(0,1fr)] items-center gap-10 pb-16 pt-10 md:grid-cols-[1.08fr_0.92fr] lg:pb-20 lg:pt-16">
        <HeroCopy />
        <div className="hero-visual grid gap-5 max-md:grid-cols-[minmax(0,1fr)]">
          <div className="profile-frame">
            <img
              src="/media/eric-profile.jpg"
              alt="Eric Sayer"
              className="h-full min-h-[380px] w-full scale-[1.12] object-cover object-[58%_40%]"
            />
            <div className="absolute bottom-4 left-4 right-4 border border-white/15 bg-ink/85 p-4 backdrop-blur">
              <p className="font-mono text-xs text-blue">{displayUrl(contactLinks.github)}</p>
              <p className="mt-1 text-sm text-white/72">
                React, mobile, backend, cloud, mentoring.
              </p>
            </div>
          </div>
          <CodePanel />
        </div>
      </div>
    </section>
  );
}

function HeroCopy() {
  return (
    <div className="hero-copy max-w-3xl">
      <div className="inline-flex items-center gap-2 border border-white/15 bg-white/8 px-3 py-2 text-sm font-semibold text-white shadow-hard backdrop-blur">
        <Sparkles size={16} className="text-blue" />
        Full-stack JavaScript developer
      </div>
      <h1 className="mt-7 text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl">
        Eric Sayer builds sharp product software.
      </h1>
      <p className="mt-7 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
        I build React, React Native/Expo, Node.js, API, database, and deployment workflows with the
        practical edge of an instructor, technical consultant, and product builder.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href="#work" className="primary-button">
          See the work <ArrowRight size={18} />
        </a>
        <NewTabLink href={contactLinks.resume} className="secondary-button">
          Resume <Download size={18} />
        </NewTabLink>
      </div>
      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        {signatureStats.map(({ value, label }) => (
          <div key={label} className="metric-tile">
            <div className="text-3xl font-black text-white">{value}</div>
            <p className="mt-2 text-sm leading-5 text-white/68">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
