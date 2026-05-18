import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ImpactSection from './components/ImpactSection';
import AboutPreview from './components/AboutPreview';
import EventHighlight from './components/EventHighlight';
import CommunitySection from './components/CommunitySection';
import InnovationSection from './components/InnovationSection';
import StartupRegistration from './components/StartupRegistration';
import MediaSection from './components/MediaSection';
import NewsSection from './components/NewsSection';
import PartnersSection from './components/PartnersSection';
import ContactSection from './components/ContactSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ImpactSection />
      <AboutPreview />
      <EventHighlight />
      <CommunitySection />
      <StartupRegistration />
      {/* <InnovationSection /> */}
      <MediaSection />
      <NewsSection />
      <PartnersSection />
      <ContactSection />
      <CTASection />
      <Footer />
    </div>
  );
}