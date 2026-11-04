import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const elem = document.querySelector(location.hash);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return;
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <div className="bg-white text-gray-700 antialiased flex flex-col min-h-screen">
      <Navbar />
      <main key={location.pathname} className="page-enter flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
