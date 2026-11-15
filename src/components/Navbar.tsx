import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import logo from './../assets/logo.png';
import logoWhite from './../assets/logo-white.png';
import { EASE } from "./motion";
import { setScrollLocked } from "./smoothScroll";

const NAV_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/projects", label: "Nos adresses" },
  { to: "/about", label: "Notre vision" },
  { to: "/#investir", label: "Investir en Algérie" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();

  // Pages that open on a dark full-bleed hero get a transparent bar until scrolled
  const overHero = pathname === "/" || /^\/projects\/[^/]+/.test(pathname);
  const solid = isScrolled || !overHero || menuOpen;

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 80);
      // Hide while scrolling down past the first screen, show again on scroll up
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > window.innerHeight * 0.6);
        lastY = y;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    setScrollLocked(menuOpen);
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
          solid
            ? "bg-white/90 backdrop-blur-xl shadow-[0_10px_30px_-18px_rgba(8,72,81,0.35)] border-b border-brand-gray/70"
            : "bg-transparent border-b border-white/10"
        }`}
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div
            className={`flex justify-between items-center transition-all duration-500 ${
              isScrolled ? "h-20" : "h-24"
            }`}
          >
            <Link
              to="/"
              className="relative flex-shrink-0 flex items-center gap-3 transition-transform duration-300 hover:scale-[1.03]"
            >
              <img
                src={logo}
                alt="Proveco logo"
                width={isScrolled ? 68 : 80}
                className={`transition-all duration-500 ${solid ? "opacity-100" : "opacity-0"}`}
              />
              <img
                src={logoWhite}
                alt=""
                aria-hidden
                width={isScrolled ? 68 : 80}
                className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-500 ${
                  solid ? "opacity-0" : "opacity-100"
                }`}
              />
            </Link>

            <div className="hidden md:flex space-x-9 items-center">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `nav-link-animated text-[13px] uppercase tracking-[0.18em] transition-colors duration-300 py-1 ${
                      isActive && !link.to.includes("#")
                        ? "text-brand-gold active"
                        : solid
                        ? "text-gray-800 hover:text-brand-gold"
                        : "text-white/90 hover:text-brand-gold"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className={`btn-fill px-7 py-3 border text-[13px] uppercase tracking-[0.18em] font-medium transition-colors duration-500 ${
                  solid
                    ? "border-brand-green bg-brand-green text-white"
                    : "border-white/70 text-white"
                }`}
              >
                <span>Échangeons</span>
              </Link>
            </div>

            <button
              className={`md:hidden focus:outline-none p-2 rounded transition-colors ${
                solid ? "text-brand-green" : "text-white"
              }`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
            >
              <span className="relative block w-7 h-5">
                <span
                  className={`absolute left-0 h-[2px] w-7 bg-current transition-all duration-500 ${
                    menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-5 bg-current transition-all duration-300 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[2px] w-7 bg-current transition-all duration-500 ${
                    menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu: full-screen green overlay, links staggered in */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-brand-green md:hidden flex flex-col justify-between px-8 pt-32 pb-10"
            initial={{ clipPath: "circle(0% at 92% 5%)" }}
            animate={{ clipPath: "circle(150% at 92% 5%)" }}
            exit={{ clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div>
              <motion.span
                className="text-brand-gold uppercase tracking-[0.3em] text-xs font-semibold block mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3 } }}
              >
                Menu
              </motion.span>
              <motion.div
                className="flex flex-col"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}
              >
                {NAV_LINKS.map((link) => (
                  <span key={link.to} className="block overflow-hidden border-b border-white/10">
                    <motion.span
                      className="block"
                      variants={{ hidden: { y: "100%" }, show: { y: "0%", transition: { duration: 0.8, ease: EASE } } }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setMenuOpen(false)}
                        className="block py-5 text-white text-3xl font-serif hover:text-brand-gold hover:pl-2 transition-all duration-300"
                      >
                        {link.label}
                      </Link>
                    </motion.span>
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.7, ease: EASE } }}
            >
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="block w-full bg-brand-gold text-white px-6 py-4 text-center uppercase tracking-widest text-sm font-semibold"
              >
                Échangeons
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
