import { Button } from "@/components/ui/button";

const PHONE_DISPLAY = "0501 017 0055";
const PHONE_TEL = "tel:+905010170055"; // arama için
const WHATSAPP_URL = "https://wa.me/905010170055"; // WhatsApp direkt mesaj
const EMAIL = "alpine.extremepark@gmail.com";
const INSTAGRAM_URL = "https://instagram.com/alpineextremepark";
const ADDRESS = `Alpine Extreme Park Alanlı, 55200 Atakum / Samsun`;

const ContactSection = () => {
  return (
    <section className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
            Maceraya Hazır mısınız?
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Alpine Extreme Park ekibimizle iletişime geçin; sorularınızı yanıtlayalım, 
            size en uygun açık hava deneyimini birlikte planlayalım.
          </p>
          <div className="w-24 h-1 bg-accent mx-auto mt-8 rounded-full" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* İletişim Bilgileri */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-montserrat font-bold mb-6">İletişim</h3>
              
              <div className="space-y-6">
                {/* Telefon */}
                <div className="flex items-center gap-4">
                  <div className="bg-accent text-accent-foreground p-3 rounded-full" aria-hidden>
                    📞
                  </div>
                  <div>
                    <div className="font-bold">Telefon</div>
                    <div className="opacity-90">
                      <a href={PHONE_TEL} className="underline underline-offset-4 hover:opacity-100">
                        {PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* E-posta */}
                <div className="flex items-center gap-4">
                  <div className="bg-accent text-accent-foreground p-3 rounded-full" aria-hidden>
                    ✉️
                  </div>
                  <div>
                    <div className="font-bold">E-posta</div>
                    <div className="opacity-90">
                      <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 hover:opacity-100">
                        {EMAIL}
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Adres */}
                <div className="flex items-center gap-4">
                  <div className="bg-accent text-accent-foreground p-3 rounded-full" aria-hidden>
                    📍
                  </div>
                  <div>
                    <div className="font-bold">Adres</div>
                    <div className="opacity-90 whitespace-pre-line">
                      {ADDRESS}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hızlı Aksiyonlar */}
            <div className="space-y-4">
              <h4 className="text-lg font-montserrat font-semibold">Hızlı Bağlantılar</h4>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Hemen Ara */}
                <Button 
                  asChild
                  variant="secondary" 
                  className="flex-1 bg-white/20 border-white/30 text-white hover:bg-white hover:text-primary"
                >
                  <a href={PHONE_TEL} aria-label="Hemen Ara">
                    📞 Hemen Ara
                  </a>
                </Button>

                {/* WhatsApp */}
                <Button 
                  asChild
                  variant="secondary"
                  className="flex-1 bg-green-500 border-green-500 text-white hover:bg-green-600"
                >
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ile yaz">
                    💬 WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Sosyal Medya & Çalışma Saatleri */}
          <div className="space-y-8">
            {/* Sosyal */}
            <div>
              <h3 className="text-2xl font-montserrat font-bold mb-6">Bizi Takip Edin</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Button 
                  asChild
                  variant="outline" 
                  className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary justify-start"
                >
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    📸 Instagram
                  </a>
                </Button>
              </div>
              
              <p className="text-sm opacity-75">
                Günlük paylaşımlar, güvenlik ipuçları ve etkinlik duyuruları için Instagram’da takip edin.
              </p>
            </div>
            
            {/* Çalışma Saatleri */}
            <div className="bg-white/10 rounded-xl p-6">
              <h4 className="text-lg font-montserrat font-semibold mb-4">Çalışma Saatleri</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Pazartesi: 10:00 – 22:00<br />
                    Salı: 10:00 – 22:00<br />
                    Çarşamba: 10:00 – 22:00<br />
                    Perşembe: 10:00 – 22:00<br />
                    Cuma: 10:00 – 22:00<br />
                    Cumartesi: 10:00 – 22:00<br />
                    Pazar: 10:00 – 22:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rezervasyon CTA KALDIRILDI - İSTEK ÜZERİNE */}
      </div>
    </section>
  );
};

export default ContactSection;
