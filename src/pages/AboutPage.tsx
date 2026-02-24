// src/pages/AboutPage.tsx
// Requires: framer-motion, lucide-react, react-router-dom

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Variants } from "framer-motion";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

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
    <section className="pt-32 pb-20 px-6 lg:px-8 overflow-hidden relative">
      {/* Subtle background texture */}
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
          Nosotros
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
          className="text-4xl lg:text-6xl font-semibold text-black leading-tight max-w-4xl mb-8"
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