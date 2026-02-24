// src/pages/CookiesPage.tsx
// Requires: framer-motion, lucide-react, react-router-dom

import { useRef } from "react";;
import { motion, useInView } from "framer-motion";
import { Shield, Settings, Server, Info } from "lucide-react";
import type { Variants } from "framer-motion";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

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


// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="pt-32 pb-16 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, #000 39px, #000 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #fff 39px, #fff 40px)",
          }}
        />
      </div>

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
          className="text-4xl lg:text-5xl font-semibold text-black leading-tight max-w-3xl mb-6"
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