import { Link } from "react-router-dom";
import logoWhite from "./../assets/logo-white.png";

export default function Footer() {
  return (
    <footer className="bg-brand-green text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <img src={logoWhite} alt="Logo proveco" width={100} className="hover:opacity-90 transition-opacity" />
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              Promoteur immobilier de référence en Algérie.
            </p>
          </div>
          <div>
            <h5 className="text-brand-gold uppercase tracking-widest text-xs mb-6 font-semibold">
              Navigation
            </h5>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">
                  Nos réalisations
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">
                  Notre vision
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">
                  Échangeons
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-brand-gold uppercase tracking-widest text-xs mb-6 font-semibold">
              Légal
            </h5>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">
                  Mentions Légales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-gold hover:translate-x-1 inline-block transition-all duration-300">
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-brand-gold uppercase tracking-widest text-xs mb-6 font-semibold">
              Suivez-nous
            </h5>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook PROVECO"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold hover:scale-110 transition-all duration-300 rounded-full text-xs font-semibold"
              >
                FB
              </a>
              <a
                href="#"
                aria-label="Instagram PROVECO"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold hover:scale-110 transition-all duration-300 rounded-full text-xs font-semibold"
              >
                IG
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-xs text-gray-400 text-center">
          <p>&copy; {new Date().getFullYear()} PROVECO Promotion. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
