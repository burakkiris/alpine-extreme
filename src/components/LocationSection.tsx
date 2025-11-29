import { Button } from "@/components/ui/button";

const PHONE_DISPLAY = "0532 366 1316";
const PHONE_TEL = "tel:+905323661316";
const WHATSAPP_URL = "https://wa.me/905323661316";

const LocationSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30" id="location">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Metin kısmı */}
          <div>
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-primary">
              Maceranı Bul
            </h2>
            <div className="w-24 h-1 accent-gradient mb-8 rounded-full" />

            <div className="space-y-6">
              {/* Adres */}
              <div className="flex items-start gap-4">
                <div className="bg-accent text-accent-foreground p-3 rounded-full">
                  📍
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Adres</h3>
                  <p className="text-muted-foreground">
                    Alpine Extreme Park Alanlı<br />
                    55200 Atakum / Samsun
                  </p>
                </div>
              </div>

              {/* Nasıl Ulaşılır */}
              <div className="flex items-start gap-4">
                <div className="bg-secondary text-secondary-foreground p-3 rounded-full">
                  🚗
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Nasıl Gelinir?</h3>
                  <p className="text-muted-foreground">
                    Atakum atakent yukarısında, atakent merkeze yaklaşık 10 dk mesafededir.<br />
                    Navigasyon için Google Maps kullanabilirsiniz
                  </p>
                </div>
              </div>

              {/* Çalışma Saatleri */}
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-full">
                  ⏰
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Çalışma Saatleri</h3>
                  <p className="text-muted-foreground">
                    Pazartesi: 10:00 – 19:00<br />
                    Salı: 10:00 – 19:00<br />
                    Çarşamba: 10:00 – 19:00<br />
                    Perşembe: 10:00 – 19:00<br />
                    Cuma: 10:00 – 19:00<br />
                    Cumartesi: 10:00 – 19:00<br />
                    Pazar: 10:00 – 19:00
                  </p>
                </div>
              </div>
            </div>

            {/* Butonlar */}
            <div className="mt-8 space-y-4">
              <Button asChild variant="adventure" size="lg" className="w-full sm:w-auto">
                <a
                  href="https://www.google.com/maps/place/Alpine+Extremepark/@41.3294414,36.1955871,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Yol Tarifi Al
                </a>
              </Button>
              <div className="flex gap-4">
                <Button asChild variant="outline" size="sm">
                  <a href={PHONE_TEL}>📞 Bizi Ara</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="bg-green-500/10 border-green-500 text-green-700 hover:bg-green-500 hover:text-white"
                >
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    💬 WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Harita Embed */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden adventure-shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.053894901924!2d36.19558707562865!3d41.32944139958813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40887fc320c6c32b%3A0xc0e65c8b820d65c4!2sAlpine%20Extremepark!5e0!3m2!1str!2str!4v1758550453239!5m2!1str!2str"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
