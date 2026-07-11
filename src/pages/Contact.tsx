import { useState, type FormEvent } from "react";
import { submitContact } from "../services/projects.service";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

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

  return (
    <section className="pt-40 pb-24 bg-brand-gray/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h4 className="text-brand-gold uppercase tracking-widest text-sm mb-2">Contactez-nous</h4>
            <h1 className="font-serif text-4xl text-brand-green mb-8">Discutons de votre projet</h1>
            <p className="text-gray-500 mb-10 font-light">Notre équipe d'experts est à votre disposition.</p>

            <div className="space-y-6">
              <div className="flex items-start">
                <span className="text-brand-gold mr-4 text-xl">📍</span>
                <div>
                  <h5 className="font-serif text-lg text-brand-green">Bureau Principal</h5>
                  <p className="text-gray-500 font-light text-sm">123 Rue de la Liberté, Alger, Algérie</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-brand-gold mr-4 text-xl">✉️</span>
                <div>
                  <h5 className="font-serif text-lg text-brand-green">Email</h5>
                  <p className="text-gray-500 font-light text-sm">contact@proveco-dz.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 border border-brand-gray shadow-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Nom</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-green transition-colors bg-transparent"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-green transition-colors bg-transparent"
                    placeholder="Votre numéro"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Message</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-green transition-colors bg-transparent resize-none"
                  placeholder="Votre message"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-brand-green text-white py-4 uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors duration-300 mt-4 disabled:opacity-60"
              >
                {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
              </button>
              {status === "sent" && (
                <p className="text-brand-green text-sm text-center">Message envoyé. Merci !</p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-sm text-center">Une erreur est survenue, réessayez.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
