import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronRight } from "lucide-react";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`/#${id}`);
    }
  };

  const navLinks = [
    { id: "soluciones", label: "Soluciones" },
    { id: "como-funciona", label: "Cómo funciona" },
    { id: "precios", label: "Precios" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/98 backdrop-blur-sm shadow-sm border-b border-gray-100"
          : "bg-white/95 backdrop-blur-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-blue flex items-center justify-center">
              <img
                src="/logo-talma.webp"
                alt="Talma Tech Logo"
                className="object-contain"
              />
            </div>
            <div className="leading-none">
              <span className="text-lg font-semibold tracking-tight text-brand-blue">
                TALMA
              </span>
              <span className="text-lg font-semibold tracking-tight text-black">
                TECH
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleNavClick(id)}
                className="text-sm text-gray-600 hover:text-brand-blue transition-colors cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://cliente.talmatech.com/iniciar-sesion"
              className="text-sm text-gray-600 hover:text-brand-blue transition-colors"
            >
              Iniciar sesión
            </a>
            <a
              href="https://cliente.talmatech.com/registro"
              className="px-5 py-2.5 bg-brand-blue text-white text-sm font-medium hover:bg-brand-blue/90 transition-all"
            >
              Comenzar ahora
            </a>
          </div>

          {/* Mobile button */}
          <button
            type="button"
            className="md:hidden p-2 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            {/* Label de sección */}
            <div className="px-6 pt-5 pb-1">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                Navegar
              </p>
            </div>

            {/* Links con flecha */}
            <div className="px-2">
              {navLinks.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleNavClick(id)}
                  className="flex items-center justify-between w-full px-4 py-4 text-sm text-gray-800 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="font-medium">{label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </button>
              ))}
            </div>

            {/* CTAs — grandes para dedo */}
            <div className="px-6 pt-4 pb-6 space-y-3">
              <a
                href="https://cliente.talmatech.com/iniciar-sesion"
                className="flex items-center justify-center w-full py-4 border border-gray-200 text-sm font-medium text-gray-800 hover:border-brand-blue hover:text-brand-blue transition-all"
              >
                Iniciar sesión
              </a>
              <a
                href="https://cliente.talmatech.com/registro"
                className="flex items-center justify-center w-full py-4 bg-brand-blue text-white text-sm font-medium hover:bg-brand-blue/90 transition-all"
              >
                Comenzar ahora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;