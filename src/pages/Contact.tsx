import { useState, type FormEvent } from "react";
import { submitContact } from "../services/projects.service";
import { useInView } from "../hooks/useInView";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const contactView = useInView({ threshold: 0.1 });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitContact({ name, phone, message });
      setStatus("sent");
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  function getWhatsAppUrl() {
    const whatsappNumber = "213560174078";
    const textMessage = name || message
      ? `Bonjour, je souhaite vous contacter.\n\n*Nom :* ${name}\n*Téléphone :* ${phone}\n*Message :* ${message}`
      : "Bonjour, je souhaite obtenir des informations sur vos résidences.";
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`;
  }

  return (
    <section className="pt-40 pb-24 bg-brand-gray/30 overflow-hidden">
      <div ref={contactView.ref} className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div
            className={`reveal-fade-up ${
              contactView.isVisible ? "is-visible" : ""
            }`}
          >
            <span className="text-brand-gold uppercase tracking-widest text-xs mb-3 block font-semibold">
              Contactez-nous
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-brand-green mb-6">
              Discutons de votre projet
            </h1>
            <p className="text-gray-500 mb-10 font-light text-base leading-relaxed">
              Notre équipe d'experts est à votre disposition pour vous guider
              dans le choix de votre futur bien d'exception.
            </p>

            <div className="space-y-6">
              <div className="flex items-start group p-3 -ml-3 rounded-md hover:bg-white/60 transition-all duration-300">
                <span className="text-brand-gold mr-4 text-xl group-hover:scale-110 transition-transform duration-300">
                  📍
                </span>
                <div>
                  <h5 className="font-serif text-lg text-brand-green">
                    Bureau Principal
                  </h5>
                  <p className="text-gray-600 font-light text-sm">
                    7, Rue de la Madeleine N°05, Hydra, Alger
                  </p>
                </div>
              </div>

              <div className="flex items-start group p-3 -ml-3 rounded-md hover:bg-white/60 transition-all duration-300">
                <span className="text-brand-gold mr-4 text-xl group-hover:scale-110 transition-transform duration-300">
                  👤
                </span>
                <div>
                  <h5 className="font-serif text-lg text-brand-green">
                    Contact Commercial
                  </h5>
                  <p className="text-gray-600 font-light text-sm">
                    NOUICHI Abderrahim — Technico-Commercial
                  </p>
                </div>
              </div>

              <div className="flex items-start group p-3 -ml-3 rounded-md hover:bg-white/60 transition-all duration-300">
                <span className="text-brand-gold mr-4 text-xl group-hover:scale-110 transition-transform duration-300">
                  📞
                </span>
                <div>
                  <h5 className="font-serif text-lg text-brand-green">
                    Téléphones
                  </h5>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-1">
                    <a
                      href="tel:+213560174078"
                      className="text-gray-600 font-light text-sm hover:text-brand-gold transition-colors font-medium"
                    >
                      0560 17 40 78
                    </a>
                    <span className="text-gray-400 hidden sm:inline">•</span>
                    <a
                      href="tel:+213540430259"
                      className="text-gray-600 font-light text-sm hover:text-brand-gold transition-colors font-medium"
                    >
                      0540 43 02 59
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start group p-3 -ml-3 rounded-md hover:bg-white/60 transition-all duration-300">
                <span className="text-brand-gold mr-4 text-xl group-hover:scale-110 transition-transform duration-300">
                  ✉️
                </span>
                <div>
                  <h5 className="font-serif text-lg text-brand-green">
                    Email
                  </h5>
                  <a
                    href="mailto:provecolesroses@gmail.com"
                    className="text-gray-600 font-light text-sm hover:text-brand-gold transition-colors font-medium"
                  >
                    provecolesroses@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`bg-white p-8 md:p-10 border border-brand-gray shadow-md card-luxury reveal-fade-up delay-150 ${
              contactView.isVisible ? "is-visible" : ""
            }`}
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">
                    Nom
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-green transition-colors bg-transparent text-sm"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-green transition-colors bg-transparent text-sm"
                    placeholder="Votre numéro"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-green transition-colors bg-transparent resize-none text-sm"
                  placeholder="Votre message"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex-1 bg-brand-green text-white py-4 uppercase tracking-widest text-xs hover:bg-brand-gold transition-colors duration-300 disabled:opacity-60 cursor-pointer font-medium text-center btn-luxury"
                >
                  {status === "sending" ? "Envoi en cours…" : "Discutons-en"}
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
              {status === "sent" && (
                <p className="text-brand-green text-sm text-center font-medium animate-[pageFadeIn_0.3s_ease-out]">
                  Message envoyé avec succès. Merci !
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-sm text-center">
                  Une erreur est survenue, veuillez réessayer.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
