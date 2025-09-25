const AboutSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-primary">
            Samsun Alpine Extreme Park’a Hoş Geldiniz
          </h2>
          <div className="w-24 h-1 accent-gradient mx-auto mb-8 rounded-full" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-montserrat font-semibold text-primary mb-4">
              Macera ile Doğanın Buluştuğu Yer
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
            Samsun’un Atakum ilçesinde yer alan Alpine Extreme Park, adrenalin dolu aktiviteler ile 
  doğal güzelliği bir araya getiriyor. Amacımız; sınırlarınızı zorlayacağınız, aynı zamanda 
  kendinizi güvende hissedeceğiniz unutulmaz açık hava deneyimleri sunmak.
</p>
<p className="text-lg text-muted-foreground leading-relaxed">
  İnsan sapanı, ip parkuru, serbest düşme, dev salıncak, zipline ve 
  tırmanma duvarı gibi heyecan verici aktivitelerin yanı sıra; softplay alanları, trambolin, 
  çocuk parkuru ve ATV–UTV turları ile her yaştan ziyaretçiye hitap ediyoruz. 
  Airsoft sahamızda strateji dolu anlar yaşayabilir, yürüyüş alanlarımızda doğayla 
  baş başa kalabilirsiniz. Günün sonunda ise kafeterya, mescid ve geniş otopark 
  imkanlarımızla keyifli bir mola verebilirsiniz.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-6 bg-white rounded-lg adventure-shadow">
              <div className="text-3xl font-montserrat font-bold text-accent mb-2">#1</div>
              <div className="text-sm text-muted-foreground">Karadeniz Bölgesinin En Büyüğü</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg adventure-shadow">
              <div className="text-3xl font-montserrat font-bold text-accent mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Eğlence Ve Adrenalin</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg adventure-shadow">
              <div className="text-3xl font-montserrat font-bold text-accent mb-2">10+</div>
              <div className="text-sm text-muted-foreground">Extreme Aktivite Sayısı</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg adventure-shadow">
              <div className="text-3xl font-montserrat font-bold text-accent mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Güvenlik Başarısı</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;