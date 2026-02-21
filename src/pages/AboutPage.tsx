// src/pages/AboutPage.tsx
// Requires: framer-motion, lucide-react, react-router-dom

import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
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

// ─── Navbar (shared) ──────────────────────────────────────────────────────────

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
              <span className="text-lg font-semibold tracking-tight text-brand-red">
                TALMA
              </span>
              <span className="text-lg font-semibold tracking-tight text-black">
                TECH
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[
              { id: "soluciones", label: "Soluciones", home: true },
              { id: "como-funciona", label: "Cómo funciona", home: true },
              { id: "precios", label: "Precios", home: true },
            ].map(({ id, label, home }) => (
              home ? (
                <Link
                  key={id}
                  to={`/#${id}`}
                  className="text-sm text-gray-600 hover:text-brand-red transition-colors"
                >
                  {label}
                </Link>
              ) : (
                <button
                  key={id}
                  onClick={() => smoothScrollTo(id)}
                  className="text-sm text-gray-600 hover:text-brand-red transition-colors"
                >
                  {label}
                </button>
              )
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

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
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
    <section className="pt-32 pb-20 px-6 lg:px-8 bg-black overflow-hidden relative">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, #fff 39px, #fff 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #fff 39px, #fff 40px)",
          }}
        />
      </div>
      {/* Brand-red accent shape */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-red/5 -skew-x-6 origin-top-right pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-xs font-medium text-brand-red uppercase tracking-widest mb-5"
        >
          Nosotros
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
          className="text-4xl lg:text-6xl font-semibold text-white leading-tight max-w-4xl mb-8"
        >
          El control de tu empresa{" "}
          <span className="text-brand-red">al alcance de tu mano.</span>
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

// ─── Origen ───────────────────────────────────────────────────────────────────

function OrigenSection() {
  const { ref, inView } = useSection();
  return (
    <section ref={ref} className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Label column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            <div className="sticky top-28">
              <div className="w-8 h-px bg-brand-red mb-4" />
              <h2 className="text-2xl font-semibold text-black">Origen.</h2>
            </div>
          </motion.div>

          {/* Content column */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-9"
          >
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              Talma Tech nace de la observación de una realidad simple: muchas
              organizaciones saben que enfrentan riesgos legales y operativos,
              pero no disponen de herramientas prácticas y seguras para
              detectarlos y gestionarlos a tiempo. Partimos de la convicción de
              que la tecnología puede hacer estos procesos simples, trazables y
              accesibles; por eso empezamos ofreciendo un canal de denuncias
              robusto y escalable, pensado en convertirse en la puerta de entrada
              a un sistema integral de cumplimiento.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Misión & Visión ──────────────────────────────────────────────────────────

function MisionVisionSection() {
  const { ref, inView } = useSection();

  return (
    <section ref={ref} className="py-24 px-6 lg:px-8 bg-brand-bone/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Misión */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-white border border-gray-100 p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 bg-brand-red flex items-center justify-center shrink-0">
                <div className="w-2 h-2 bg-white" />
              </div>
              <h2 className="text-xl font-semibold text-black">Misión</h2>
            </div>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              Facilitar a las organizaciones el acceso a soluciones tecnológicas
              de cumplimiento normativo que les permitan conocer, controlar y
              mitigar sus riesgos de manera ágil y confiable, ofreciendo
              información accionable desde cualquier dispositivo para que puedan
              operar con tranquilidad.
            </p>
          </motion.div>

          {/* Visión */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-brand-red p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 bg-white flex items-center justify-center shrink-0">
                <div className="w-2 h-2 bg-brand-red" />
              </div>
              <h2 className="text-xl font-semibold text-white">Visión</h2>
            </div>
            <p className="text-base text-white/85 leading-relaxed font-light">
              Ser la plataforma de referencia número uno en soluciones integrales
              de cumplimiento normativo, reconocida por transformar la prevención
              y la gestión del riesgo en procesos eficientes, seguros y
              sostenibles para todo tipo de organizaciones.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Valores ──────────────────────────────────────────────────────────────────

const valores = [
  {
    name: "Cumplimiento",
    desc: "Priorizar la observancia de las normas en todas nuestras soluciones.",
  },
  {
    name: "Integridad",
    desc: "Actuar con ética y transparencia en el diseño y operación del servicio.",
  },
  {
    name: "Respeto",
    desc: "Proteger la confidencialidad y dignidad de las personas involucradas.",
  },
  {
    name: "Transparencia",
    desc: "Comunicar con claridad sobre los datos, procesos y resultados.",
  },
  {
    name: "Imparcialidad",
    desc: "Garantizar trato objetivo en la gestión de reportes y procedimientos.",
  },
  {
    name: "Ética",
    desc: "Tomar decisiones basadas en principios profesionales y de responsabilidad.",
  },
];

function ValoresSection() {
  const { ref, inView } = useSection();

  return (
    <section ref={ref} className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            <div className="sticky top-28">
              <div className="w-8 h-px bg-brand-red mb-4" />
              <h2 className="text-2xl font-semibold text-black">Valores</h2>
            </div>
          </motion.div>

          <div className="lg:col-span-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {valores.map((v, i) => (
              <motion.div
                key={v.name}
                variants={fadeUp}
                custom={i * 0.4}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="group border border-gray-100 p-6 hover:border-brand-red/30 hover:shadow-sm transition-all"
              >
                <div className="w-1 h-5 bg-brand-red mb-4" />
                <h3 className="text-sm font-semibold text-black mb-2">
                  {v.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Lo que hacemos ───────────────────────────────────────────────────────────

const queHacemos = [
  {
    num: "01",
    title: "Canal de denuncias",
    subtitle: "módulo inicial",
    desc: "Recepción, registro y seguimiento de reportes con diversas modalidades, con almacenamiento seguro de evidencia y trazabilidad de acciones.",
  },
  {
    num: "02",
    title: "Dashboard en tiempo real",
    subtitle: null,
    desc: "Información actualizada para monitorear incidentes, priorizar casos y asignar responsabilidades.",
  },
  {
    num: "03",
    title: "Expedientes seguros",
    subtitle: null,
    desc: "Resguardo estructurado de documentos y pruebas para auditoría y control interno.",
  },
  {
    num: "04",
    title: "Configuración flexible",
    subtitle: null,
    desc: "Herramientas adaptables a la operación del cliente.",
  },
  {
    num: "05",
    title: "Módulos de crecimiento",
    subtitle: null,
    desc: "Integración futura de módulos de capacitaciones y auditorías para cerrar el ciclo de prevención y mejora continua.",
  },
];

function QueHacemosSection() {
  const { ref, inView } = useSection();

  return (
    <section ref={ref} className="py-24 px-6 lg:px-8 bg-brand-bone/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            <div className="sticky top-28">
              <div className="w-8 h-px bg-brand-red mb-4" />
              <h2 className="text-2xl font-semibold text-black">
                Lo que hacemos
              </h2>
            </div>
          </motion.div>

          <div className="lg:col-span-9 space-y-0">
            {queHacemos.map((item, i) => (
              <motion.div
                key={item.num}
                variants={fadeUp}
                custom={i * 0.3}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="group flex gap-6 py-7 border-b border-gray-200 last:border-0 hover:bg-white hover:-mx-6 hover:px-6 transition-all duration-200"
              >
                <span className="text-xs font-medium text-brand-red mt-0.5 shrink-0 w-6">
                  {item.num}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-base font-semibold text-black">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <span className="text-xs text-gray-400 font-light">
                        ({item.subtitle})
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Impacto ──────────────────────────────────────────────────────────────────

function ImpactoSection() {
  const { ref, inView } = useSection();

  return (
    <section ref={ref} className="py-24 px-6 lg:px-8 bg-black overflow-hidden relative">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, #fff 39px, #fff 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #fff 39px, #fff 40px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-4"
          >
            <div className="w-8 h-px bg-brand-red mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">
              Cómo impacta en tu organización
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-8"
          >
            <p className="text-lg text-gray-300 leading-relaxed font-light">
              Talma Tech facilita la detección temprana de riesgos, documenta
              las respuestas de forma trazable y reduce la carga operativa
              asociada al cumplimiento normativo, permitiendo a las áreas
              responsables tomar decisiones informadas y oportunas.
            </p>
          </motion.div>
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-px mt-16 bg-gray-800">
          {[
            { label: "Detección temprana", desc: "de riesgos antes de que escalen" },
            { label: "Trazabilidad completa", desc: "de respuestas y acciones tomadas" },
            { label: "Decisiones informadas", desc: "con información accionable en tiempo real" },
          ].map((p, i) => (
            <motion.div
              key={p.label}
              variants={fadeUp}
              custom={i * 0.3}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="bg-black p-8"
            >
              <div className="text-brand-red text-xs font-medium uppercase tracking-widest mb-3">
                0{i + 1}
              </div>
              <div className="text-white font-semibold text-base mb-1.5">
                {p.label}
              </div>
              <div className="text-gray-500 text-sm font-light">{p.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTASection() {
  const { ref, inView } = useSection();

  return (
    <section ref={ref} className="py-24 px-6 lg:px-8 bg-brand-red text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-3xl lg:text-4xl font-semibold mb-4"
        >
          Comienza hoy con tu plataforma de cumplimiento
        </motion.h2>

        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <a
            href="https://cliente.talmatech.com/registro"
            className="inline-flex items-center px-8 py-4 bg-white text-brand-red text-sm font-semibold hover:bg-gray-50 transition-all group shadow-xl"
          >
            Crear cuenta ahora
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer (shared) ──────────────────────────────────────────────────────────

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
              Plataforma de cumplimiento normativo para organizaciones que buscan gestionar riesgos de forma proactiva.
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
            <a href="/politica-de-cookies" className="hover:text-white transition-colors">Política de cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <OrigenSection />
        <MisionVisionSection />
        <ValoresSection />
        <QueHacemosSection />
        <ImpactoSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}