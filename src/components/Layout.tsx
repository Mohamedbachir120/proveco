import { useLocation, useOutlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import CursorRing from "./CursorRing";
import logoWhite from "./../assets/logo-white.png";
import { EASE } from "./motion";
import { scrollToElement, scrollToTop, startSmoothScroll } from "./smoothScroll";

/** Keeps the outgoing page rendered while its exit transition plays. */
function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}

function scrollToHash(hash: string) {
  window.setTimeout(() => {
    const elem = document.querySelector<HTMLElement>(hash);
    if (elem) scrollToElement(elem);
  }, 120);
}

export default function Layout() {
  const location = useLocation();
  const reduced = useReducedMotion();

  useEffect(() => startSmoothScroll(), []);

  // Same-page hash links (e.g. "Investir en Algérie" while already on the home page)
  useEffect(() => {
    if (location.hash) scrollToHash(location.hash);
  }, [location.hash]);

  const onExitComplete = () => {
    scrollToTop();
    if (location.hash) scrollToHash(location.hash);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-white text-gray-700 antialiased flex flex-col min-h-screen">
        <Navbar />
        <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
          <motion.main key={location.pathname} className="flex-grow relative">
            <FrozenOutlet />

            {/* Green curtain: rises over the old page, then lifts off the new one */}
            {!reduced && (
            <motion.div
              aria-hidden
              className="fixed inset-0 z-[70] bg-brand-green pointer-events-none flex items-center justify-center"
              initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
              animate={{
                clipPath: "inset(0% 0% 100% 0%)",
                transition: { duration: 0.9, ease: EASE, delay: 0.35 },
              }}
              exit={{
                clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
                transition: { duration: 0.6, ease: EASE },
              }}
            >
              <motion.img
                src={logoWhite}
                alt=""
                width={110}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -24, transition: { duration: 0.5, ease: EASE, delay: 0.25 } }}
                exit={{ opacity: [0, 1], y: [24, 0], transition: { duration: 0.5, ease: EASE, delay: 0.15 } }}
              />
            </motion.div>
            )}
          </motion.main>
        </AnimatePresence>
        <Footer />
        <WhatsAppButton />
        <CursorRing />
      </div>
    </MotionConfig>
  );
}
