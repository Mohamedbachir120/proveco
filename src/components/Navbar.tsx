import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from './../assets/logo.png'

const NAV_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/projects", label: "Nos adresses" },
  { to: "/about", label: "Notre vision" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-brand-gray transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 my-3">
            <img src={logo} alt="Proveco logo" width={80} />
          </Link>

          <div className="hidden md:flex space-x-10 items-center">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? "text-brand-gold" : "hover:text-brand-gold"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="px-6 py-3 border border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-all duration-300 text-sm uppercase tracking-wider"
            >
              Échangeons
            </Link>
          </div>

          <button
            className="md:hidden text-brand-green focus:outline-none"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-brand-green shadow-2xl md:hidden z-50 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <button
            className="text-white mb-8 focus:outline-none"
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col space-y-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="text-white text-lg uppercase tracking-widest border-b border-white/20 pb-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 bg-brand-gold text-white px-6 py-3 text-center uppercase tracking-widest text-sm"
            >
              Échangeons
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
