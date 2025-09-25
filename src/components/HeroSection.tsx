import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-mountain.jpg";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const goToActivities = (e: React.MouseEvent) => {
    e.preventDefault();
    // sayfada #activities elementi varsa oraya smooth scroll
    const el = document.getElementById('activities');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    // yoksa fallback olarak hash navigate
    navigate('/#activities');
  };

  const watchVideo = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: gerçek video linki ile değiştir
    window.open('https://www.instagram.com/alpineextremepark/', '_blank', 'noopener');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 parallax"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-montserrat font-bold mb-6 animate-fade-in">
          Alpine Extreme Park —{" "}
          <span className="accent-gradient bg-clip-text text-transparent">
            Adrenalin Zirvesine!
          </span>
        </h1>
        
        <p className="inline-block px-3 py-2 bg-black/20 rounded-lg text-xl md:text-2xl mb-8 font-poppins animate-slide-up font-light">
  Zipline, bungee jumping, insan sapanı ve dev salıncak gibi adrenalin dolu aktivitelerle Alpine Extreme Park’ta sınırlarını zorla!
</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
          <Button onClick={goToActivities} variant="hero" size="hero" className="min-w-[200px]">
            Aktiviteleri Keşfet
          </Button>
          <Button onClick={watchVideo} variant="outline" size="hero" className="min-w-[200px] bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary">
            Videoyu İzle
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;