import { Button } from "@/components/ui/button";

type EventItem = {
  id: number;
  title: string;
  date: string;
  description: string;
  featured: boolean;
};

const events: EventItem[] = [
  {
    id: 1,
    title: "Yaz Macera Kampı",
    date: "15 Haziran – 30 Ağustos",
    description:
      "Doğa yürüyüşü, tırmanış ve takım oyunlarıyla çocuklar ve gençler için çok günlük kamp deneyimi.",
    featured: true,
  },
  {
    id: 2,
    title: "Kış Extreme Festivali",
    date: "20 Aralık – 5 Ocak",
    description:
      "Kış sporları, buz tırmanışı ve dağ evinde sıcak mola deneyimleriyle dolu bir festival.",
    featured: false,
  },
  {
    id: 3,
    title: "Kurumsal Takım Çalışması",
    date: "Yıl Boyu",
    description:
      "Takım bağlarını güçlendiren, liderlik ve iletişimi geliştiren özelleştirilmiş macera programları.",
    featured: false,
  },
  {
    id: 4,
    title: "Çiftler İçin Macera Haftasonu",
    date: "Her Hafta Sonu",
    description:
      "Birlikte adrenalin ve unutulmaz anılar: çiftlere özel romantik açık hava etkinlikleri.",
    featured: true,
  },
];

const EventsSection = () => {
  const goToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // sayfada contact bölümü yoksa hash'e yönlendir
      window.location.href = "/#contact";
    }
  };

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-primary">
            Diğer Alanlarımız
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Kafeteryamız, açık otoparkımız, mescidimiz ve yürüyüş alanlarımızla konforunuz için buradayız.
          </p>
          <div className="w-24 h-1 accent-gradient mx-auto mt-8 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className={`bg-white rounded-xl p-8 activity-card relative ${
                event.featured ? "ring-2 ring-accent border-accent/20" : ""
              }`}
            >
              {event.featured && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                    POPÜLER
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-xl font-montserrat font-bold text-primary mb-2">
                  {event.title}
                </h3>
                <div className="text-secondary font-medium mb-2">📅 {event.date}</div>
                {/* Fiyat alanları kaldırıldı */}
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {event.description}
              </p>

              <div className="flex gap-3">
                <Button
                  onClick={goToContact}
                  variant={event.featured ? "adventure" : "outline"}
                  size="sm"
                  className="flex-1"
                >
                  İletişime Geç
                </Button>
                <Button variant="ghost" size="sm">
                  Detaylar
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Size özel bir macera paketi mi arıyorsunuz?
          </p>
          <Button
            onClick={goToContact}
            variant="outline"
            size="lg"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            Etkinlik Ekibimizle İletişime Geçin
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
