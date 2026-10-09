import { usePageAnimations } from './hooks/usePageAnimations.js';
import { ContactSection } from './sections/ContactSection.jsx';
import { GithubSection } from './sections/GithubSection.jsx';
import { HeroSection } from './sections/HeroSection.jsx';
import { ProjectsSection } from './sections/ProjectsSection.jsx';
import { SignalStrip } from './sections/SignalStrip.jsx';
import { SiteHeader } from './sections/SiteHeader.jsx';
import { StackSection } from './sections/StackSection.jsx';
import { WorkSection } from './sections/WorkSection.jsx';

export default function App() {
  usePageAnimations();

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-white">
      <div className="scroll-progress fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-red [transform:scaleX(0)]" />
      <SiteHeader />
      <main>
        <HeroSection />
        <SignalStrip />
        <StackSection />
        <WorkSection />
        <ProjectsSection />
        <GithubSection />
        <ContactSection />
      </main>
    </div>
  );
}
