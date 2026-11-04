import { useState } from 'react';

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
    <section id="contact" className="py-24 bg-brand-gray/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h4 className="text-brand-gold uppercase tracking-widest text-sm mb-2">
              Contactez-nous
            </h4>
            <h2 className="font-serif text-4xl text-brand-green mb-8">
              Discutons de votre projet
            </h2>
            <p className="text-gray-500 mb-10 font-light">
              Notre équipe d'experts est à votre entière disposition pour vous guider dans votre acquisition.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <span className="text-brand-gold mr-4 text-xl">📍</span>
                <div>
                  <h5 className="font-serif text-lg text-brand-green">
                    Bureau Principal
                  </h5>
                  <p className="text-gray-600 font-light text-sm">
                    7, Rue de la Madeleine N°05, Hydra, Alger
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-brand-gold mr-4 text-xl">👤</span>
                <div>
                  <h5 className="font-serif text-lg text-brand-green">
                    Contact Commercial
                  </h5>
                  <p className="text-gray-600 font-light text-sm">
                    NOUICHI Abderrahim — Technico-Commercial
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-brand-gold mr-4 text-xl">📞</span>
                <div>
                  <h5 className="font-serif text-lg text-brand-green">
                    Téléphones
                  </h5>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-1">
                    <a
                      href="tel:+213560174078"
                      className="text-gray-600 font-light text-sm hover:text-brand-gold transition-colors"
                    >
                      0560 17 40 78
                    </a>
                    <span className="text-gray-400 hidden sm:inline">•</span>
                    <a
                      href="tel:+213540430259"
                      className="text-gray-600 font-light text-sm hover:text-brand-gold transition-colors"
                    >
                      0540 43 02 59
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-brand-gold mr-4 text-xl">✉️</span>
                <div>
                  <h5 className="font-serif text-lg text-brand-green">
                    Email
                  </h5>
                  <a
                    href="mailto:provecolesroses@gmail.com"
                    className="text-gray-600 font-light text-sm hover:text-brand-gold transition-colors"
                  >
                    provecolesroses@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-10 border border-brand-gray shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-green transition-colors bg-transparent"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-green transition-colors bg-transparent"
                    placeholder="Votre numéro"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Message / Contenu
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-green transition-colors bg-transparent resize-none"
                  placeholder="Décrivez votre projet ou votre demande..."
                  required
                />
              </div>

              {/* Boutons d'action : Discutons-en + WhatsApp */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-brand-green text-white py-4 uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors duration-300 cursor-pointer font-medium text-center"
                >
                  Discutons-en
                </button>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 px-6 uppercase tracking-widest text-sm hover:bg-[#20ba57] transition-colors duration-300 cursor-pointer font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>

              {submitted && (
                <p className="text-brand-green text-sm text-center pt-2">
                  Votre demande a été initiée. Merci !
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}