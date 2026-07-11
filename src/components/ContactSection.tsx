import  { useState } from 'react';

export default function ContactSection() {
  // État pour stocker les valeurs du formulaire
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gérer la soumission et la redirection vers WhatsApp
  const handleSubmit = (e:any) => {
    e.preventDefault();

    // Remplacer par votre numéro WhatsApp au format international (sans le "+")
    // Exemple pour l'Algérie : 213XXXXXXXXX
    const whatsappNumber = "213XXXXXXXXX"; 

    // Construction du texte du message
    const textMessage = `Bonjour, je souhaite vous contacter.

*Nom :* ${formData.name}
*Téléphone :* ${formData.phone}
*Message :* ${formData.message}`;

    // Encodage du texte pour l'URL
    const encodedText = encodeURIComponent(textMessage);

    // Lien de redirection vers WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    // Ouverture dans un nouvel onglet
    window.open(whatsappUrl, '_blank');
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
              Notre équipe d'experts est à votre disposition.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <span className="text-brand-gold mr-4 text-xl">📍</span>
                <div>
                  <h5 className="font-serif text-lg text-brand-green">
                    Bureau Principal
                  </h5>
                  <p className="text-gray-500 font-light text-sm">
                    123 Rue de la Liberté, Alger, Algérie
                  </p>
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

              {/* Nouveau champ pour le contenu/message */}
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

              {/* Bouton de soumission */}
              <button
                type="submit"
                className="w-full bg-brand-green text-white py-4 uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors duration-300 mt-4 cursor-pointer"
              >
                Envoyer sur WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}