import { useState } from 'react';
import { Eyebrow, Reveal, SplitLines, Stagger, StaggerItem } from './motion';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getWhatsAppUrl = () => {
    const whatsappNumber = "213560174078";
    const textMessage = formData.name || formData.message
      ? `Bonjour, je souhaite vous contacter.\n\n*Nom :* ${formData.name}\n*Téléphone :* ${formData.phone}\n*Message :* ${formData.message}`
      : "Bonjour, je souhaite obtenir des informations sur vos résidences.";
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    // Open WhatsApp with prefilled message
    window.open(getWhatsAppUrl(), '_blank');
  };

  return (
    <section id="contact" className="relative py-28 md:py-40 bg-brand-green text-white overflow-hidden">
      <div aria-hidden className="absolute -left-48 bottom-[-12rem] w-[520px] h-[520px] rounded-full border border-brand-gold/10" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Info */}
          <div className="lg:col-span-5">
            <Eyebrow className="mb-6">Contactez-nous</Eyebrow>
            <SplitLines
              className="font-serif text-4xl md:text-6xl text-white mb-8 leading-[1.08]"
              lines={["Discutons de votre projet"]}
            />
            <Reveal delay={0.15}>
              <p className="text-white/65 mb-12 font-light leading-relaxed text-base md:text-lg">
                Notre équipe d'experts est à votre entière disposition pour vous guider dans votre acquisition.
              </p>
            </Reveal>

            <Stagger className="space-y-2">
              <StaggerItem className="flex items-start group py-4 border-b border-white/10">
                <span className="mr-5 mt-0.5 w-11 h-11 flex-shrink-0 rounded-full border border-brand-gold/40 flex items-center justify-center text-brand-gold transition-all duration-500 group-hover:bg-brand-gold group-hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></span>
                <div>
                  <h5 className="font-serif text-lg text-white">
                    Bureau Principal
                  </h5>
                  <p className="text-white/60 font-light text-sm">
                    7, Rue de la Madeleine N°05, Hydra, Alger
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem className="flex items-start group py-4 border-b border-white/10">
                <span className="mr-5 mt-0.5 w-11 h-11 flex-shrink-0 rounded-full border border-brand-gold/40 flex items-center justify-center text-brand-gold transition-all duration-500 group-hover:bg-brand-gold group-hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></span>
                <div>
                  <h5 className="font-serif text-lg text-white">
                    Contact Commercial
                  </h5>
                  <p className="text-white/60 font-light text-sm">
                    NOUICHI Abderrahim — Technico-Commercial
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem className="flex items-start group py-4 border-b border-white/10">
                <span className="mr-5 mt-0.5 w-11 h-11 flex-shrink-0 rounded-full border border-brand-gold/40 flex items-center justify-center text-brand-gold transition-all duration-500 group-hover:bg-brand-gold group-hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></span>
                <div>
                  <h5 className="font-serif text-lg text-white">
                    Téléphones
                  </h5>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-1">
                    <a
                      href="tel:+213560174078"
                      className="text-white/70 text-sm hover:text-brand-gold transition-colors"
                    >
                      0560 17 40 78
                    </a>
                    <span className="text-brand-gold/60 hidden sm:inline">•</span>
                    <a
                      href="tel:+213540430259"
                      className="text-white/70 text-sm hover:text-brand-gold transition-colors"
                    >
                      0540 43 02 59
                    </a>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem className="flex items-start group py-4 border-b border-white/10">
                <span className="mr-5 mt-0.5 w-11 h-11 flex-shrink-0 rounded-full border border-brand-gold/40 flex items-center justify-center text-brand-gold transition-all duration-500 group-hover:bg-brand-gold group-hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></span>
                <div>
                  <h5 className="font-serif text-lg text-white">
                    Email
                  </h5>
                  <a
                    href="mailto:provecolesroses@gmail.com"
                    className="text-white/70 text-sm hover:text-brand-gold transition-colors"
                  >
                    provecolesroses@gmail.com
                  </a>
                </div>
              </StaggerItem>
            </Stagger>
          </div>

          {/* Form */}
          <Reveal className="lg:col-span-7 lg:pl-10" delay={0.2} y={60}>
          <div className="bg-white text-gray-700 p-8 md:p-12 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)]">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="field-line">
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus-visible:outline-none transition-colors bg-transparent text-sm"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div className="field-line">
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus-visible:outline-none transition-colors bg-transparent text-sm"
                    placeholder="Votre numéro"
                    required
                  />
                </div>
              </div>

              <div className="field-line">
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">
                  Message / Contenu
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus-visible:outline-none transition-colors bg-transparent resize-none text-sm"
                  placeholder="Décrivez votre projet ou votre demande..."
                  required
                />
              </div>

              {/* Boutons d'action : Discutons-en + WhatsApp */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  className="btn-fill flex-1 bg-brand-green border border-brand-green text-white py-4 uppercase tracking-[0.2em] text-xs cursor-pointer font-medium text-center"
                >
                  Discutons-en
                </button>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 px-6 uppercase tracking-widest text-xs hover:bg-[#20ba57] transition-all duration-300 cursor-pointer font-medium btn-luxury"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>

              {submitted && (
                <p className="text-brand-green text-sm text-center pt-2 font-medium animate-[pageFadeIn_0.3s_ease-out]">
                  Votre demande a été initiée. Merci !
                </p>
              )}
            </form>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}