// src/pages/CookiesPage.tsx
// Requires: framer-motion, lucide-react, react-router-dom

import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Menu, Shield, Settings, Server, Info } from "lucide-react";
import type { Variants } from "framer-motion";

// ─── Smooth scroll ────────────────────────────────────────────────────────────

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function useSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

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
        <div className="flex items-center justify-between h-18 py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-red flex items-center justify-center">
              <img
                src="/talma-logo.webp"
                alt="Talma Tech Logo"
                className="object-center object-contain"
              />
            </div>
            <div className="leading-none">
              <span className="text-lg font-semibold tracking-tight text-brand-red">TALMA</span>
              <span className="text-lg font-semibold tracking-tight text-black">TECH</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[
              { id: "soluciones", label: "Soluciones" },
              { id: "como-funciona", label: "Cómo funciona" },
              { id: "precios", label: "Precios" },
            ].map(({ id, label }) => (
              <Link
                key={id}
                to={`/#${id}`}
                className="text-sm text-gray-600 hover:text-brand-red transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://cliente.talmatech.com/iniciar-sesion"
              className="text-sm text-gray-600 hover:text-brand-red transition-colors"
            >
              Iniciar sesión
            </a>
            <a
              href="https://cliente.talmatech.com/registro"
              className="px-5 py-2.5 bg-brand-red text-white text-sm font-medium hover:bg-brand-red/90 transition-all"
            >
              Comenzar ahora
            </a>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              <Link to="/#soluciones" className="block text-sm text-gray-700 py-2">Soluciones</Link>
              <Link to="/#como-funciona" className="block text-sm text-gray-700 py-2">Cómo funciona</Link>
              <Link to="/#precios" className="block text-sm text-gray-700 py-2">Precios</Link>
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <a href="https://cliente.talmatech.com/iniciar-sesion" className="block text-sm text-gray-700 py-2">Iniciar sesión</a>
                <a href="https://cliente.talmatech.com/registro" className="block text-center py-2.5 bg-brand-red text-white text-sm font-medium">Comenzar ahora</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="pt-32 pb-16 px-6 lg:px-8 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, #fff 39px, #fff 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #fff 39px, #fff 40px)",
          }}
        />
      </div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-red/5 -skew-x-6 origin-top-right pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-xs font-medium text-brand-red uppercase tracking-widest mb-5"
        >
          Legal
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
          className="text-4xl lg:text-5xl font-semibold text-white leading-tight max-w-3xl mb-6"
        >
          Política de Cookies{" "}
          <span className="text-brand-red">de Uso de Talma Tech</span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="visible"
          className="w-16 h-px bg-brand-red"
        />
      </div>
    </section>
  );
}

// ─── Index sidebar ─────────────────────────────────────────────────────────────

const sections = [
  { id: "introduccion", label: "1. Introducción" },
  { id: "que-son", label: "2. ¿Qué son las cookies?" },
  { id: "cookies-requeridas", label: "3. Cookies requeridas" },
  { id: "cambios", label: "4. Cambios a la política" },
];

// ─── Content ───────────────────────────────────────────────────────────────────

function ContentSection() {
  const { ref, inView } = useSection();

  return (
    <section ref={ref} className="py-16 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Sticky index */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            <div className="sticky top-28">
              <div className="w-8 h-px bg-brand-red mb-4" />
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
                Contenido
              </p>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => smoothScrollTo(s.id)}
                    className="block w-full text-left text-sm text-gray-500 hover:text-brand-red py-1.5 transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Body */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-9 space-y-14"
          >

            {/* 1. Introducción */}
            <div id="introduccion" className="scroll-mt-28">
              <SectionHeading number="1" title="Introducción" />
              <p className="text-base text-gray-600 leading-relaxed font-light">
                Talma Tech emplea cookies y tecnologías similares para garantizar
                el correcto funcionamiento de la Plataforma, proteger las sesiones
                de usuario y optimizar la experiencia.
              </p>
            </div>

            {/* 2. ¿Qué son? */}
            <div id="que-son" className="scroll-mt-28">
              <SectionHeading number="2" title="¿Qué son las cookies?" />
              <p className="text-base text-gray-600 leading-relaxed font-light">
                Son pequeñas unidades de texto que se almacenan en el dispositivo
                del usuario para permitir que la Plataforma recuerde información
                entre peticiones.
              </p>
            </div>

            {/* 3. Cookies requeridas */}
            <div id="cookies-requeridas" className="scroll-mt-28">
              <SectionHeading number="3" title="Cookies requeridas" />

              <div className="space-y-6 mt-6">

                {/* 3.1 Autenticación */}
                <CookieCard
                  icon={<Shield className="w-5 h-5 text-brand-red" />}
                  number="1"
                  title="Cookies de autenticación"
                  badge="imprescindibles"
                  badgeVariant="red"
                >
                  <p className="text-sm text-gray-600 leading-relaxed font-light mb-3">
                    Incluyen tokens de sesión basados en JWT que se almacenan en
                    cookies de sesión para autenticar y mantener la sesión del
                    usuario.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">
                    Estas cookies son necesarias para la autenticación, la gestión
                    de sesiones y la seguridad del acceso. Si se desactivan, la
                    Plataforma no podrá autenticar al usuario ni mantener sesiones
                    activas.
                  </p>
                </CookieCard>

                {/* 3.2 Funcionales */}
                <CookieCard
                  icon={<Settings className="w-5 h-5 text-gray-500" />}
                  number="2"
                  title="Cookies funcionales limitadas"
                  badge="no comerciales"
                  badgeVariant="gray"
                >
                  <p className="text-sm text-gray-600 leading-relaxed font-light mb-3">
                    Guardan preferencias de uso o configuraciones no críticas que
                    mejoran la experiencia.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">
                    No se usan para crear perfiles comerciales ni para publicidad.
                  </p>
                </CookieCard>

                {/* 3.3 Terceros */}
                <CookieCard
                  icon={<Server className="w-5 h-5 text-gray-500" />}
                  number="3"
                  title="Cookies de infraestructura de terceros"
                  badge="operativas"
                  badgeVariant="gray"
                >
                  <p className="text-sm text-gray-600 leading-relaxed font-light">
                    Para la prestación técnica del servicio, Talma Tech puede
                    utilizar servicios de almacenamiento digital a través de
                    terceros. Estos proveedores pueden usar cookies operativas
                    relacionadas con balanceo de carga, seguridad anti-abuso o
                    mantenimiento de sesión en entornos distribuidos. Su uso se
                    limita a fines operativos y de seguridad.
                  </p>
                </CookieCard>
              </div>

              {/* Note */}
              <div className="mt-6 border border-brand-red/20 bg-brand-red/4 p-5 flex gap-3">
                <Info className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  Talma Tech no utiliza cookies para publicidad ni para elaborar
                  perfiles comerciales. Las cookies no esenciales solo se usan
                  con el consentimiento cuando lleguen a implementarse (por
                  ejemplo, futuras analíticas).
                </p>
              </div>
            </div>

            {/* 4. Cambios */}
            <div id="cambios" className="scroll-mt-28">
              <SectionHeading number="4" title="Cambios a la política" />
              <p className="text-base text-gray-600 leading-relaxed font-light">
                Talma Tech podrá actualizar esta Política para reflejar cambios
                técnicos, legales u operativos. Cualquier modificación será
                publicada en la Plataforma.
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-xs font-medium text-brand-red">{number}.</span>
      <h2 className="text-xl font-semibold text-black">{title}</h2>
    </div>
  );
}

function CookieCard({
  icon,
  number,
  title,
  badge,
  badgeVariant,
  children,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  badge: string;
  badgeVariant: "red" | "gray";
  children: React.ReactNode;
}) {
  return (
    <div className="border border-gray-100 p-6 hover:border-gray-200 transition-colors">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <span className="text-xs text-gray-400">{number}.</span>
            <span className="text-sm font-semibold text-black">{title}</span>
            <span
              className={`text-xs px-2 py-0.5 font-medium ${
                badgeVariant === "red"
                  ? "bg-brand-red/10 text-brand-red"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {badge}
            </span>
          </div>
        </div>
      </div>
      <div className="pl-11">{children}</div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-black text-gray-500 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-brand-red flex items-center justify-center">
                <img src="/talma-logo.webp" alt="Talma Tech" className="object-contain" />
              </div>
              <div className="leading-none">
                <span className="text-sm font-semibold text-brand-red">TALMA</span>
                <span className="text-sm font-semibold text-white">TECH</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed font-light">
              Plataforma de cumplimiento normativo para organizaciones que buscan
              gestionar riesgos de forma proactiva.
            </p>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-300 uppercase tracking-wider mb-4">Producto</div>
            <ul className="space-y-2.5">
              {[
                { label: "Canal de Denuncias", href: "/#soluciones" },
                { label: "Capacitaciones", href: "/#soluciones" },
                { label: "Auditorías", href: "/#soluciones" },
                { label: "Precios", href: "/#precios" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-xs hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-300 uppercase tracking-wider mb-4">Nosotros</div>
            <ul className="space-y-2.5">
              {[
                { label: "Quiénes somos", href: "/nosotros", ext: false },
                { label: "Iniciar sesión", href: "https://cliente.talmatech.com/iniciar-sesion", ext: true },
                { label: "Crear cuenta", href: "https://cliente.talmatech.com/registro", ext: true },
              ].map((l) => (
                <li key={l.label}>
                  {l.ext ? (
                    <a href={l.href} className="text-xs hover:text-white transition-colors">{l.label}</a>
                  ) : (
                    <Link to={l.href} className="text-xs hover:text-white transition-colors">{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-medium text-gray-300 uppercase tracking-wider mb-4">Contacto</div>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:contacto@talmatech.com" className="text-xs hover:text-white transition-colors">
                  contacto@talmatech.com
                </a>
              </li>
              <li>
                <a href="mailto:soporte@talmatech.com" className="text-xs hover:text-white transition-colors">
                  soporte@talmatech.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs">
            © {new Date().getFullYear()} TALMA TECH. Todos los derechos reservados.
          </p>
          <div className="flex gap-5 text-xs">
            <a href="/privacidad" className="hover:text-white transition-colors">Privacidad</a>
            <a href="/terminos" className="hover:text-white transition-colors">Términos</a>
            <Link to="/politica-de-cookies" className="text-white">Política de cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ContentSection />
      </main>
      <Footer />
    </>
  );
}