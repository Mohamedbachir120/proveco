import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from './../assets/logo.png';

const NAV_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/projects", label: "Nos adresses" },
  { to: "/about", label: "Notre vision" },
  { to: "/#investir", label: "Investir en Algérie" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-1 border-b border-brand-gray/80"
          : "bg-white/90 backdrop-blur-sm border-b border-brand-gray py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div
          className={`flex justify-between items-center transition-all duration-500 ${
            isScrolled ? "h-20" : "h-24"
          }`}
        >
          <Link
            to="/"
            className="flex-shrink-0 flex items-center gap-3 transition-transform duration-300 hover:opacity-90 hover:scale-[1.02]"
          >
            <img src={logo} alt="Proveco logo" width={80} className="transition-all duration-300" />
          </Link>

          <div className="hidden md:flex space-x-9 items-center">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-link-animated text-sm uppercase tracking-widest transition-colors duration-300 py-1 ${
                    isActive ? "text-brand-gold active" : "text-gray-800 hover:text-brand-gold"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="btn-luxury px-7 py-3 border border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-all duration-300 text-sm uppercase tracking-wider font-medium"
            >
              Échangeons
            </Link>
          </div>

          <button
            className="md:hidden text-brand-green focus:outline-none p-2 rounded hover:bg-brand-gray/30 transition-colors"
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
        className={`fixed top-0 right-0 h-full w-80 bg-brand-green shadow-2xl md:hidden z-50 transition-transform duration-400 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 flex flex-col h-full justify-between">
          <div>
            <div className="flex justify-between items-center mb-10">
              <span className="text-brand-gold uppercase tracking-[0.2em] text-xs font-semibold">
                Menu
              </span>
              <button
                className="text-white focus:outline-none p-2 rounded hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(false)}
                aria-label="Fermer le menu"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col space-y-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-lg font-serif uppercase tracking-widest border-b border-white/10 pb-3 hover:text-brand-gold hover:pl-2 transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="block w-full bg-brand-gold text-white px-6 py-4 text-center uppercase tracking-widest text-sm font-semibold shadow-lg hover:bg-opacity-90 transition-all"
            >
              Échangeons
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
