import { useState } from "react";
import { Button } from "@/components/ui/button";
import logom from "@/assets/logom.png"; // ✅ kendi logon

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Ana Sayfa", href: "#home" },
    { label: "Hakkımızda", href: "#about" },
    { label: "Aktiviteler", href: "#activities" },
    { label: "Konum", href: "#location" },
    //{ label: "Etkinlikler", href: "#events" },// şimdilik kaldırıldı
    { label: "İletişim", href: "#contact" }
  ];

  const smoothGo = (href: string) => {
    // href beklenen format: #id
    const id = href.startsWith("#") ? href.slice(1) : href;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // ilgili bölüm yoksa hash'e gitsin
      window.location.href = `/${href}`;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={logom}
              alt="Alpine Extreme Park Logo"
              className="w-10 h-10 object-contain"
            />
            <div className="font-montserrat font-bold text-xl text-primary">
              Alpine Extreme Park
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  smoothGo(item.href);
                }}
                className="text-muted-foreground hover:text-primary smooth-transition font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA (rezervasyon yerine iletişim) */}
          <div className="hidden md:block">
            <Button
              variant="adventure"
              size="sm"
              onClick={() => smoothGo("#contact")}
            >
              İletişime Geç
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menüyü aç/kapat"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-6 h-0.5 bg-primary transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`block w-6 h-0.5 bg-primary mt-1 transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-primary mt-1 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary smooth-transition font-medium px-2"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothGo(item.href);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4">
                <Button
                  variant="adventure"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    smoothGo("#contact");
                    setIsMenuOpen(false);
                  }}
                >
                  İletişime Geç
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
