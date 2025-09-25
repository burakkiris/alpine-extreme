const SHOW_EVENTS = false;

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import LocationSection from "@/components/LocationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import EventsSection from "@/components/EventsSection";
import ContactSection from "@/components/ContactSection";
import logom from "@/assets/logom.png"; // Kendi logon

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        <section id="home">
          <HeroSection />
        </section>
        
        <section id="about">
          <AboutSection />
        </section>
        
        <section id="activities">
          <ActivitiesSection />
        </section>
        
        <section id="location">
          <LocationSection />
        </section>
        
        <TestimonialsSection />
        
        {/* Events — gizlendi */}
        {SHOW_EVENTS && (
          <section id="events">
            <EventsSection />
          </section>
        )}
        
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-foreground text-background py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            {/* Logo */}
            <img 
              src={logom} 
              alt="Alpine Extreme Park Logo" 
              className="w-8 h-8 object-contain" 
            />
            <div className="font-montserrat font-bold text-lg">
              Alpine Extreme Park
            </div>
          </div>
          <p className="text-sm opacity-75 mb-4">
            Unutulmaz maceralarının yeni adresi
          </p>
          <div className="text-xs opacity-50 mb-2">
            © {new Date().getFullYear()} Alpine Extreme Park. Tüm hakları saklıdır.
          </div>
          <div className="text-xs opacity-70">
            Bu site{" "}
            <a 
              href="https://bksoftstudio.com.tr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold underline hover:text-primary"
            >
              BK SoftStudio
            </a>{" "}
            tarafından geliştirilmiştir.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;