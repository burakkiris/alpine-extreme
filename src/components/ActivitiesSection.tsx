// src/components/ActivitiesSection.tsx
// Not: Bu sürümde difficulty/süre/CTA yok. Sadece görsel, başlık ve açıklama.

import ziplineImage from "@/assets/zipline.jpg";
import bungeeImage from "@/assets/bungee.jpg";
import salincakImage from "@/assets/salincak.jpg";
import insanSapanImage from "@/assets/insansapani.jpg";
import ipParkuruImage from "@/assets/ipparkuru.jpg";
import tirmanisImage from "@/assets/tirmanma.jpg";
import softplayImage from "@/assets/softplay.jpg";
import trambolinImage from "@/assets/trambolin.jpg";
import cocukParkurImage from "@/assets/cocukparkur.jpg";
import atvImage from "@/assets/atv.jpg";
import kaydirakImage from "@/assets/kaydirak.jpg";
import insaatOyunImage from "@/assets/insaat.jpg";
import saltotrambolinImage from "@/assets/saltotrambolin.jpg";



type Activity = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const activities: Activity[] = [
  {
    id: 1,
    title: "Zipline",
    description:
      "Ağaçların üzerinden süzülerek manzaranın tadını çıkarın. Güvenli ekipman ve eğitimli personel eşliğinde adrenalin.",
    image: ziplineImage,
  },
  {
    id: 2,
    title: "Serbest Düşme",
    description:
      "Boşluğa bırakmanın heyecanını güvenli sistemlerle yaşayın; yükseklik korkusunu yenmek için birebir.",
    image: bungeeImage,
  },
  {
    id: 3,
    title: "İnsan Sapanı",
    description:
      "Yüksek hızda fırlatma etkisiyle kısa ama yoğun bir adrenalin patlaması.",
    image: insanSapanImage,
  },
  {
    id: 4,
    title: "Dev Salıncak",
    description:
      "Geniş salınım açısıyla yüksekten yapılan etkileyici salıncak deneyimi.",
    image: salincakImage, // ayrı görsel yoksa şimdilik bungee görseliyle
  },
  {
    id: 5,
    title: "Dev İp Parkuru",
    description:
      "Denge ve çevikliği test eden etaplardan oluşan farklı zorluk seviyelerinde ip parkurları.",
    image: ipParkuruImage,
  },
  {
    id: 6,
    title: "Tırmanma Duvarı",
    description:
      "Başlangıçtan ileri seviyeye farklı rotalarla güvenli tırmanış.",
    image: tirmanisImage,
  },
  {
    id: 7,
    title: "Softplay",
    description:
      "Minikler için güvenli, yumuşak zeminli oyun alanı. Gözetim altında eğlence.",
    image: softplayImage,
  },
  {
    id: 8,
    title: "Trambolin",
    description:
      "Enerjiyi atmak ve koordinasyonu geliştirmek için eğlenceli zıplama alanı.",
    image: trambolinImage,
  },
  {
    id: 10,
    title: "Salto Trambolin",
    description:
      "Çocuklar için güvenli ve eğlenceli salto trambolin deneyimi.",
    image: saltotrambolinImage,
  },
  {
    id: 9,
    title: "Çocuk Parkuru",
    description:
      "Çocuklara özel güvenli engel parkuru ile macera dolu anlar.",
    image: cocukParkurImage,
  },
  {
    id: 10,
    title: "ATV–UTV Parkurları (Çocuklar için)",
    description:
      "Gözetmen eşliğinde güvenli parkurlarda ATV–UTV sürüş deneyimi.",
    image: atvImage,
  }
  
  

];

const ActivitiesSection = () => {
  return (
    <section className="py-20 px-4" id="activities">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-primary">
            Extreme Aktiviteler Sizi Bekliyor
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Her seviyeden maceraperest için tasarlanmış adrenalin dolu
            aktivitelerimiz arasından seçiminizi yapın.
          </p>
          <div className="w-24 h-1 accent-gradient mx-auto mt-8 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="activity-card bg-white rounded-xl overflow-hidden"
            >
              <div className="relative h-64">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-montserrat font-bold mb-3 text-primary">
                  {activity.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Alttaki "Tüm Aktiviteleri Gör" butonu kaldırıldı */}
      </div>
    </section>
  );
};

export default ActivitiesSection;