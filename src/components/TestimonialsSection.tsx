import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Vite env
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      setErrorMsg(
        "Email ayarları eksik. .env(.local) dosyasındaki VITE_EMAILJS_* değerlerini girip dev sunucuyu yeniden başlatın."
      );
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      setStatus("ok");
      formRef.current.reset();
    } catch (err: any) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMsg(err?.text || err?.message || "Gönderim sırasında bir hata oluştu.");
    }
  };

  return (
    <section className="py-20 px-4" id="contact-form">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-primary">
            Bize Yazın
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sorularınız ve talepleriniz için formu doldurun; en kısa sürede dönüş yapalım.
          </p>
          <div className="w-24 h-1 accent-gradient mx-auto mt-8 rounded-full" />
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto">
          <form ref={formRef} onSubmit={onSubmit} className="grid gap-4">
            {/* Eğer EmailJS template'inde alıcıyı dinamik vermek istiyorsan {{to_email}} kullan ve bu hidden alanı bırak */}
            <input type="hidden" name="to_email" value="alpine.extremepark@gmail.com" />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="from_name"
                placeholder="Ad Soyad *"
                required
                className="w-full border rounded px-4 py-2"
                autoComplete="name"
              />
              <input
                type="email"
                name="from_email"
                placeholder="E-posta *"
                required
                className="w-full border rounded px-4 py-2"
                autoComplete="email"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="phone"
                placeholder="Telefon"
                className="w-full border rounded px-4 py-2"
                autoComplete="tel"
              />
              <select name="activity" className="w-full border rounded px-4 py-2" defaultValue="">
                <option value="" disabled>
                  Aktivite (opsiyonel)
                </option>
                <option>Zipline</option>
                <option>Bungee / Serbest Düşme</option>
                <option>İnsan Sapanı</option>
                <option>Dev Salıncak</option>
                <option>İp Parkuru</option>
                <option>Tırmanma Duvarı</option>
                <option>Softplay</option>
                <option>Çocuk Parkuru</option>
                <option>Trambolin</option>
                <option>ATV–UTV</option>
                <option>Airsoft</option>
                <option>Diğer</option>
              </select>
            </div>

            <textarea
              name="message"
              placeholder="Mesajınız *"
              required
              rows={5}
              className="w-full border rounded px-4 py-2"
            />

            <Button type="submit" disabled={status === "loading"} variant="adventure" className="w-full">
              {status === "loading" ? "Gönderiliyor…" : "Gönder"}
            </Button>

            {status === "ok" && <p className="text-green-700 text-sm mt-2">Teşekkürler! Mesajınız alındı.</p>}
            {status === "error" && <p className="text-red-700 text-sm mt-2">Gönderilemedi. {errorMsg}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;