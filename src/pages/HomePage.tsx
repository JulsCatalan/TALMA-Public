// src/pages/HomePage.tsx
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  GraduationCap,
  ClipboardCheck,
  Shield,
  Scale,
  Eye,
  Lock,
  TrendingUp,
  Users,
  AlertCircle,
  ChevronDown,
  Check,
  X,
} from "lucide-react";
import type { Variants } from "framer-motion";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";


// ─── Animation Helpers ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.08 },
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
    <section className="pt-32 pb-20 px-6 lg:px-8 bg-linear-to-b from-brand-bone/20 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-brand-red/20 bg-brand-red/5 text-brand-red text-xs font-medium mb-8"
          >
            Plataforma de cumplimiento normativo
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl lg:text-6xl font-semibold leading-tight mb-6"
          >
            <span className="text-black">Gestión de</span>{" "}
            <span className="text-brand-red">canales de denuncias</span>{" "}
            <span className="text-black">internas, quejas y sugerencias</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto font-light"
          >
            Plataforma integral para detectar riesgos organizacionales, alineada
            con estándares nacionales e internacionales
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-3 justify-center mb-14"
          >
            <a
              href="https://cliente.talmatech.com/registro"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-red text-white text-sm font-medium hover:bg-brand-red/90 transition-all shadow-lg shadow-brand-red/20 group"
            >
              Comenzar ahora
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 text-black text-sm font-medium hover:border-brand-red hover:text-brand-red transition-all"
            >
              Ver cómo funciona
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-8 text-xs text-gray-400"
          >
            {["Adaptable", "Seguro", "Preventivo"].map((tag) => (
              <div key={tag} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-red" />
                <span>{tag}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* About blurb */}
        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center mt-16 mb-16"
        >
          <p className="text-base text-gray-600 leading-relaxed font-light">
            <span className="text-black font-medium">TALMA TECH</span> es una
            plataforma tecnológica de cumplimiento normativo enfocada en
            optimizar los procesos internos de las organizaciones mediante un
            análisis continuo de riesgos inherentes y residuales. Iniciamos con
            un canal de denuncias y evolucionamos hacia módulos de capacitaciones
            y auditorías continuas, diseñados para fortalecer la cultura de
            cumplimiento de forma práctica y eficiente.
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          variants={fadeUp}
          custom={5}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          <p className="text-center text-sm text-gray-400 mb-5 font-light tracking-wide uppercase">
            Dashboard actualizado en tiempo real, con seguimiento continuo y
            control trazable
          </p>
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-brand-red/8 to-brand-red/3 transform -rotate-1" />
            <div className="relative bg-white border border-gray-150 shadow-2xl p-6 lg:p-8">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="col-span-2 space-y-3">
                  <div className="flex items-center justify-between p-4 bg-brand-red text-white">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5" />
                      <div>
                        <div className="text-xs opacity-70">DENUNCIA</div>
                        <div className="font-semibold text-base">
                          DEN-2025-00124
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-white/20 text-xs font-medium">
                      EN INVESTIGACIÓN
                    </div>
                  </div>
                  <div className="space-y-2.5 p-4 border border-gray-100">
                    <div className="h-2.5 bg-black w-2/3" />
                    <div className="h-2 bg-gray-200 w-full" />
                    <div className="h-2 bg-gray-200 w-5/6" />
                    <div className="h-2 bg-gray-200 w-4/5" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-5 bg-brand-red text-white">
                    <div className="text-3xl font-semibold mb-0.5">48</div>
                    <div className="text-xs opacity-80">Total denuncias</div>
                  </div>
                  <div className="p-5 border border-gray-100">
                    <div className="text-3xl font-semibold text-black mb-0.5">96%</div>
                    <div className="text-xs text-gray-500">Tasa resolución</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { n: 12, label: "Nuevas" },
                  { n: 24, label: "En proceso" },
                  { n: 10, label: "Completadas" },
                  { n: 2, label: "Archivadas" },
                ].map(({ n, label }) => (
                  <div key={label} className="p-3.5 bg-gray-50 border border-gray-100">
                    <div className="text-xl font-semibold text-black">{n}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const { ref, inView } = useSection();
  const stats = [
    { value: "100%", label: "Anónimo y confidencial" },
    { value: "24/7", label: "Canal disponible siempre" },
    { value: "NOM-035", label: "Cumplimiento normativo" },
  ];

  return (
    <section ref={ref} className="py-12 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-center"
            >
              <div className="text-2xl font-semibold text-white mb-1">
                {s.value}
              </div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Solutions ────────────────────────────────────────────────────────────────

function SolutionsSection() {
  const { ref, inView } = useSection();

  return (
    <section
      id="soluciones"
      ref={ref}
      className="py-24 px-6 lg:px-8 bg-brand-bone/30"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4 text-black">
            Cumplimiento integral para tu empresa
          </h2>
          <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">
            Herramientas profesionales diseñadas para simplificar el
            cumplimiento normativo
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="border border-brand-red bg-white p-8 relative group hover:shadow-lg transition-shadow"
          >
            <div className="absolute top-0 right-0 px-3 py-1 bg-brand-red text-white text-xs font-medium">
              DISPONIBLE
            </div>
            <div className="mt-4 mb-6">
              <div className="w-10 h-10 bg-brand-red flex items-center justify-center mb-5">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">
                Canal de Denuncias
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                Sistema completo de gestión de denuncias. Opcional: asesoría legal con
                reportes elaborados por abogados especialistas en cumplimiento
                normativo.
              </p>
            </div>
            <ul className="space-y-2.5 mb-7">
              {[
                "URL personalizada para tu empresa",
                "Denuncias anónimas con código de seguimiento",
                "Dashboard de gestión en tiempo real",
                "Exportación CSV y PDF",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <div className="w-4 h-4 bg-brand-red flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1 h-1 bg-white" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://cliente.talmatech.com/registro"
              className="block w-full text-center py-3 bg-brand-red text-white text-sm font-medium hover:bg-brand-red/90 transition-all"
            >
              Comenzar ahora
            </a>
          </motion.div>

          {/* Coming Soon x2 */}
          {[
            {
              icon: <GraduationCap className="w-5 h-5 text-gray-500" />,
              title: "Capacitaciones",
              desc: "Cursos online para tu personal sobre prevención de riesgos, ética empresarial y cumplimiento normativo.",
              items: [
                "Biblioteca de cursos especializados",
                "Certificados de completación",
                "Seguimiento de progreso",
                "Contenido actualizado constantemente",
              ],
            },
            {
              icon: <ClipboardCheck className="w-5 h-5 text-gray-500" />,
              title: "Auditorías",
              desc: "Sistema avanzado de gestión documental y auditorías para cumplimiento normativo continuo.",
              items: [
                "Gestión de políticas internas",
                "Control de contratos y documentos",
                "Auditorías automatizadas",
                "Alertas de vencimientos",
              ],
            },
          ].map((sol, i) => (
            <motion.div
              key={sol.title}
              variants={fadeUp}
              custom={i + 2}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="border border-gray-200 bg-gray-50 p-8 relative opacity-70"
            >
              <div className="absolute top-0 right-0 px-3 py-1 bg-gray-800 text-white text-xs font-medium">
                PRÓXIMAMENTE
              </div>
              <div className="mt-4 mb-6">
                <div className="w-10 h-10 bg-gray-200 flex items-center justify-center mb-5">
                  {sol.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">
                  {sol.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  {sol.desc}
                </p>
              </div>
              <ul className="space-y-2.5 mb-7">
                {sol.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-500">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                disabled
                className="block w-full text-center py-3 bg-gray-200 text-gray-500 text-sm font-medium cursor-not-allowed"
              >
                Próximamente
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ──────────────────────────────────────────────────────────────

function HowItWorksSection() {
  const { ref, inView } = useSection();
  const [tab, setTab] = useState<"sin" | "con">("con");

  const sinAsesoria = [
    {
      n: 1,
      title: "Recepción",
      desc: "La denuncia llega de forma anónima o identificada a través de tu canal personalizado, disponible 24/7.",
      active: true,
    },
    {
      n: 2,
      title: "Gestión interna",
      desc: "Tu equipo interno gestiona y da seguimiento a la denuncia de forma autónoma, tomando sus propias decisiones sin apoyo externo.",
      active: false,
    },
    {
      n: 3,
      title: "Resolución autónoma",
      desc: "El cliente implementa sus propias resoluciones y recomendaciones según su criterio interno.",
      active: false,
    },
  ];

  const conAsesoria = [
    {
      n: 1,
      title: "Recepción",
      desc: "La denuncia llega de forma anónima o identificada a través de tu canal personalizado, disponible 24/7.",
      active: true,
    },
    {
      n: 2,
      title: "Análisis legal",
      desc: "Nuestros abogados especializados en cumplimiento normativo analizan la denuncia y elaboran un reporte legal fundamentado con sus hallazgos.",
      active: true,
    },
    {
      n: 3,
      title: "Reporte + Plan de acción",
      desc: "Recibes un reporte legal con resoluciones concretas y un plan de acción detallado para implementar en tu organización.",
      active: true,
    },
  ];

  const steps = tab === "sin" ? sinAsesoria : conAsesoria;

  return (
    <section
      id="como-funciona"
      ref={ref}
      className="py-24 px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4 text-black">
            Cómo funciona
          </h2>
          <p className="text-base text-gray-500 font-light max-w-xl mx-auto">
            Elige la modalidad que mejor se adapte a tu organización
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex border border-gray-200 p-1">
            <button
              onClick={() => setTab("sin")}
              className={`px-6 py-2.5 text-sm font-medium transition-all ${
                tab === "sin"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Sin asesoría legal
            </button>
            <button
              onClick={() => setTab("con")}
              className={`px-6 py-2.5 text-sm font-medium transition-all ${
                tab === "con"
                  ? "bg-brand-red text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Con asesoría legal
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {steps.map((step, i) => (
                <div key={step.n} className="relative">
                  <div
                    className={`border-2 p-7 h-full transition-all ${
                      step.active
                        ? "border-brand-red/20 bg-brand-red/3"
                        : "border-gray-100 bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center text-lg font-semibold mb-5 ${
                        step.active
                          ? "bg-brand-red text-white"
                          : "bg-gray-300 text-white"
                      }`}
                    >
                      {step.n}
                    </div>
                    <h4 className="text-base font-semibold mb-2 text-black">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-3.5 z-10">
                      <ArrowRight
                        className={`w-5 h-5 ${
                          step.active ? "text-brand-red" : "text-gray-300"
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Difference callout */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className={`border p-6 max-w-3xl mx-auto ${
                tab === "con"
                  ? "border-brand-red/20 bg-brand-red/5"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              {tab === "con" ? (
                <div className="flex gap-4">
                  <Scale className="w-6 h-6 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-black mb-1">
                      ¿Qué incluye la asesoría legal?
                    </div>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                      Nuestros abogados especializados en cumplimiento normativo
                      analizan cada denuncia, redactan un reporte legal formal
                      y proponen un plan de acción concreto. Tu empresa recibe
                      orientación profesional para tomar decisiones informadas
                      y protegerse legalmente.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-gray-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-black mb-1">
                      Sin asesoría legal
                    </div>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                      Tu equipo interno gestiona las denuncias de forma
                      autónoma. La plataforma te da las herramientas para
                      recibir, registrar y hacer seguimiento, pero las
                      decisiones y resoluciones son responsabilidad de tu
                      organización.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Comparison table */}
        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 max-w-3xl mx-auto"
        >
          <h3 className="text-lg font-semibold text-black mb-6 text-center">
            Diferencias clave
          </h3>
          <div className="border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
              <div className="p-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Característica
              </div>
              <div className="p-4 text-xs font-medium text-gray-700 uppercase tracking-wide border-l border-gray-200">
                Sin asesoría
              </div>
              <div className="p-4 text-xs font-medium text-brand-red uppercase tracking-wide border-l border-gray-200">
                Con asesoría
              </div>
            </div>
            {[
              ["Canal de denuncias 24/7", true, true],
              ["Dashboard de gestión", true, true],
              ["Denuncias anónimas", true, true],
              ["Código de seguimiento", true, true],
              ["Reporte legal formal", false, true],
              ["Plan de acción personalizado", false, true],
              ["Protección legal para la empresa", false, true],
            ].map(([feat, sin, con], i) => (
              <div
                key={i}
                className="grid grid-cols-3 border-b border-gray-100 last:border-0"
              >
                <div className="p-3.5 text-sm text-gray-700">{feat as string}</div>
                <div className="p-3.5 border-l border-gray-100 flex items-center">
                  {sin ? (
                    <Check className="w-4 h-4 text-gray-500" />
                  ) : (
                    <X className="w-4 h-4 text-gray-300" />
                  )}
                </div>
                <div className="p-3.5 border-l border-gray-100 flex items-center">
                  {con ? (
                    <Check className="w-4 h-4 text-brand-red" />
                  ) : (
                    <X className="w-4 h-4 text-gray-300" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Value Props ──────────────────────────────────────────────────────────────

function ValuePropsSection() {
  const { ref, inView } = useSection();

  const props = [
    {
      icon: <Shield className="w-6 h-6 text-brand-red" />,
      title: "Confidencialidad garantizada",
      desc: "Los denunciantes pueden reportar de forma completamente anónima. Tu empresa nunca accede a datos identificatorios sin autorización.",
    },
    {
      icon: <Eye className="w-6 h-6 text-brand-red" />,
      title: "Trazabilidad total",
      desc: "Cada denuncia tiene un historial completo de acciones, comentarios y cambios de estado. Control total sobre cada caso, en todo momento.",
    },
    {
      icon: <Scale className="w-6 h-6 text-brand-red" />,
      title: "Asesoría legal especializada",
      desc: "Abogados especializados en cumplimiento normativo elaboran reportes legales y planes de acción que protegen a tu empresa.",
    },
    {
      icon: <Lock className="w-6 h-6 text-brand-red" />,
      title: "URL personalizada y segura",
      desc: "Tu canal de denuncias tiene una dirección propia para tu empresa, con acceso cifrado y autenticado.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-brand-red" />,
      title: "Reportes y métricas en tiempo real",
      desc: "Visualiza el estado de todas las denuncias, tasas de resolución y tendencias con exportaciones a PDF y CSV.",
    },
    {
      icon: <Users className="w-6 h-6 text-brand-red" />,
      title: "Gestión por roles",
      desc: "Owners, administradores y usuarios estándar con permisos diferenciados. Control granular sobre quién ve qué.",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-8 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4 text-black">
            Por qué TALMA TECH
          </h2>
          <p className="text-base text-gray-500 font-light max-w-xl mx-auto">
            Diseñado para que las organizaciones detecten riesgos antes de que
            se conviertan en problemas mayores
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {props.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              custom={i * 0.5}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="p-6 border border-gray-100 hover:border-brand-red/30 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 bg-brand-red/8 flex items-center justify-center mb-4 group-hover:bg-brand-red/15 transition-colors">
                {p.icon}
              </div>
              <h3 className="text-sm font-semibold text-black mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

function PricingSection() {
  const { ref, inView } = useSection();
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const sinAsesoria = [
    { name: "Starter", admins: "3 usuarios", monthly: 1199, annual: 12230 },
    { name: "Avanzado", admins: "8 usuarios", monthly: 2499, annual: 25489 },
    { name: "Premium", admins: "15 usuarios", monthly: 4199, annual: 42830 },
  ];

  const conAsesoria = [
    { name: "Starter", admins: "3 usuarios", monthly: 2749, annual: 28040 },
    { name: "Pro", admins: "6 usuarios", monthly: 4749, annual: 48440 },
    { name: "Avanzado", admins: "10 usuarios", monthly: 6749, annual: 68840 },
    { name: "Premium", admins: "15 usuarios", monthly: 8749, annual: 89240 },
  ];

  const fmt = (n: number) =>
    n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

  return (
    <section id="precios" ref={ref} className="py-24 px-6 lg:px-8 bg-brand-bone/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4 text-black">
            Planes simples y transparentes
          </h2>
          <p className="text-base text-gray-500 font-light max-w-xl mx-auto mb-8">
            Elige la modalidad que mejor se adapte a tu organización
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 border border-gray-200 p-1 bg-white">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 text-sm font-medium transition-all ${
                billing === "monthly"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-5 py-2 text-sm font-medium transition-all ${
                billing === "annual"
                  ? "bg-brand-red text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Anual{" "}
              <span className="text-xs opacity-80 ml-1">
                {billing === "annual" ? "✓ −15%" : "↓ −15%"}
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Sin Asesoría */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-white border border-gray-200 p-7"
          >
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-black mb-1">
                Sin Asesoría
              </h3>
              <p className="text-sm text-gray-500 font-light">
                Gestiona denuncias de forma autónoma con tu equipo interno
              </p>
            </div>

            <div className="space-y-2.5 mb-6">
              {sinAsesoria.map((plan) => (
                <AnimatePresence key={plan.name} mode="wait">
                  <div className="flex items-center justify-between p-4 border border-gray-100 hover:border-gray-200 transition-colors">
                    <div>
                      <div className="text-sm font-medium text-black">
                        {plan.name}
                      </div>
                      <div className="text-xs text-gray-400">{plan.admins}</div>
                    </div>
                    <div className="text-right">
                      <motion.div
                        key={`${plan.name}-${billing}`}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-base font-semibold text-brand-red"
                      >
                        Desde {billing === "monthly" ? fmt(plan.monthly) : fmt(plan.annual)}
                      </motion.div>
                      <div className="text-xs text-gray-400">
                        MXN/{billing === "monthly" ? "mes" : "año"}
                      </div>
                    </div>
                  </div>
                </AnimatePresence>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              {["Canal de denuncias 24/7", "Dashboard de gestión", "Exportación de reportes"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-3.5 h-3.5 text-gray-400" />
                  {f}
                </div>
              ))}
            </div>

            <a
              href="https://cliente.talmatech.com/registro"
              className="block w-full text-center py-3 bg-gray-100 text-black text-sm font-medium hover:bg-gray-200 transition-all"
            >
              Ver detalles
            </a>
          </motion.div>

          {/* Con Asesoría */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-white border-2 border-brand-red p-7 relative"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-red text-white text-xs font-medium">
              RECOMENDADO
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-black mb-1">
                Con Servicios de Cumplimiento
              </h3>
              <p className="text-sm text-gray-500 font-light">
                Investigación legal profesional incluida con cada denuncia
              </p>
            </div>

            <div className="space-y-2.5 mb-6">
              {conAsesoria.map((plan) => (
                <div
                  key={plan.name}
                  className="flex items-center justify-between p-4 border border-brand-red/20 bg-brand-red/4 hover:bg-brand-red/8 transition-colors"
                >
                  <div>
                    <div className="text-sm font-medium text-black">
                      {plan.name}
                    </div>
                    <div className="text-xs text-gray-400">{plan.admins}</div>
                  </div>
                  <div className="text-right">
                    <motion.div
                      key={`${plan.name}-${billing}`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-base font-semibold text-brand-red"
                    >
                      Desde {billing === "monthly" ? fmt(plan.monthly) : fmt(plan.annual)}
                    </motion.div>
                    <div className="text-xs text-gray-400 flex items-center gap-1.5">
                      MXN/{billing === "monthly" ? "mes" : "año"}
                      {billing === "annual" && (
                        <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-medium">−15%</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              {[
                "Todo lo del plan Sin Asesoría",
                "Reporte legal formal",
                "Plan de acción personalizado",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-3.5 h-3.5 text-brand-red" />
                  {f}
                </div>
              ))}
            </div>

            <a
              href="https://cliente.talmatech.com/registro"
              className="block w-full text-center py-3 bg-brand-red text-white text-sm font-medium hover:bg-brand-red/90 transition-all shadow-md shadow-brand-red/20"
            >
              Comenzar ahora
            </a>
          </motion.div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Acceso 24/7 · Sin tarjeta de crédito · Cancela cuando
          quieras
        </p>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQSection() {
  const { ref, inView } = useSection();
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "¿Las denuncias son realmente anónimas?",
      a: "Sí. Los denunciantes pueden enviar su queja sin registrar ningún dato personal. Reciben un código único de seguimiento para consultar el estado de su denuncia sin revelar su identidad.",
    },
    {
      q: "¿Qué incluye la asesoría legal?",
      a: "Nuestros abogados especializados en cumplimiento normativo analizan cada denuncia, redactan un reporte legal formal y elaboran un plan de acción con recomendaciones concretas para tu organización.",
    },
    {
      q: "¿Cuánto tiempo tarda en estar activa la plataforma?",
      a: "Tu canal de denuncias personalizado puede estar activo el mismo día que completes el registro y la configuración inicial.",
    },
    {
      q: "¿Puedo cambiar de plan si mi empresa crece?",
      a: "Sí. Puedes hacer upgrade o downgrade en cualquier momento desde tu panel de administración. Los cambios se aplican en el siguiente ciclo de facturación.",
    },
    {
      q: "¿Qué normativas cumple la plataforma?",
      a: "TALMA TECH está alineada con la NOM-035-STPS-2018 (factores de riesgo psicosocial), y apoya el cumplimiento de marcos como la Ley General de Responsabilidades Administrativas y estándares internacionales de compliance.",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-8 bg-white" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4 text-black">
            Preguntas frecuentes
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i * 0.3}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="border border-gray-200"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-medium text-black">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-gray-500 font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
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
    <section
      ref={ref}
      className="py-24 px-6 lg:px-8 bg-brand-red text-white overflow-hidden relative"
    >
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-3xl lg:text-4xl font-semibold mb-8"
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

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <SolutionsSection />
        <HowItWorksSection />
        <ValuePropsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}