// src/pages/HomePage.tsx
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Shield,
  Scale,
  Eye,
  Lock,
  TrendingUp,
  Users,
  ChevronDown,
  Check,
} from "lucide-react";
import type { Variants } from "framer-motion";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";


// ─── Animation Helpers ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

function useSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}


// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-gray-200 text-gray-500 text-xs font-medium mb-8"
          >
            Plataforma de cumplimiento normativo
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="text-4xl lg:text-6xl font-semibold leading-tight mb-6"
          >
            <span className="text-black">Tu empresa necesita un</span>{" "}
            <span className="text-brand-blue">canal de denuncias, quejas y sugerencias.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto font-light"
          >
            Nosotros te damos la plataforma y los abogados que analizan.
            Recibe, gestiona y resuelve denuncias, quejas y sugerencias de forma
            estructurada. Con asesoría legal incluida o de forma autónoma.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-3 justify-center mb-14"
          >
            <a
              href="https://cliente.talmatech.com/registro"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-blue text-white text-sm font-medium hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20 group"
            >
              Comenzar ahora
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 text-black text-sm font-medium hover:border-brand-blue hover:text-brand-blue transition-all"
            >
              Ver cómo funciona
            </a>
          </motion.div>

        </div>

        {/* Dashboard Preview — mobile-first */}
        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          animate="visible"
          className="max-w-lg lg:max-w-3xl mx-auto mt-24"
        >
          <p className="text-center text-xs text-gray-400 mb-5 font-light tracking-widest uppercase">
            Dashboard en tiempo real con seguimiento continuo y trazable
          </p>

          <div className="relative">
            <div className="absolute inset-0 bg-brand-bone/50 transform rotate-1 translate-y-1" />
            <div className="relative bg-white border border-gray-200 shadow-xl overflow-hidden">

              {/* Header — flex wrap para que el badge baje en móvil si no cabe */}
              <div className="bg-brand-blue px-4 py-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 bg-white/10 flex items-center justify-center shrink-0">
                    <FileText className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-white/60 font-medium uppercase tracking-wider leading-none mb-0.5">
                      Denuncia
                    </div>
                    <div className="text-white font-semibold text-sm whitespace-nowrap">
                      DEN-2025-00124
                    </div>
                  </div>
                </div>
                <div className="ml-auto shrink-0 px-2.5 py-1 bg-white/15 text-white text-[10px] font-medium tracking-wide whitespace-nowrap">
                  EN INVESTIGACIÓN
                </div>
              </div>

              <div className="p-4 space-y-3">

                {/* Stats 2 cols — siempre 2, nunca se rompe */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3">
                    <div className="text-2xl font-semibold text-brand-blue leading-none mb-1">48</div>
                    <div className="text-xs text-gray-400">Total registros</div>
                  </div>
                  <div className="bg-gray-50 p-3">
                    <div className="text-2xl font-semibold text-black leading-none mb-1">96%</div>
                    <div className="text-xs text-gray-400">Tasa resolución</div>
                  </div>
                </div>

                {/* Barras de estado */}
                <div className="bg-gray-50 p-3 space-y-2.5">
                  {[
                    { label: "Nuevas", value: 12, pct: 50 },
                    { label: "En proceso", value: 24, pct: 100 },
                    { label: "Completadas", value: 10, pct: 42 },
                    { label: "Archivadas", value: 2, pct: 8 },
                  ].map(({ label, value, pct }) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 w-22 shrink-0">{label}</span>
                      <div className="flex-1 h-1.5 bg-gray-200 min-w-0">
                        <div className="h-full bg-brand-blue" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-medium text-gray-700 w-5 text-right shrink-0">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Mini grid 2x2 — nunca 4 cols en mobile */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {[
                    { n: 3, label: "Denuncias" },
                    { n: 5, label: "Quejas" },
                    { n: 4, label: "Sugerencias" },
                    { n: 2, label: "Sin asignar" },
                  ].map(({ n, label }) => (
                    <div key={label} className="bg-gray-50 border border-gray-100 p-3 flex items-center gap-3">
                      <div className="text-xl font-semibold text-black shrink-0">{n}</div>
                      <div className="text-xs text-gray-400 leading-tight">{label}</div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}


// ─── Two Products ─────────────────────────────────────────────────────────────

function TwoProductsSection() {
  const { ref, inView } = useSection();

  return (
    <section id="soluciones" ref={ref} className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4 text-black">
            Dos formas de operar, un solo canal
          </h2>
          <p className="text-base text-gray-500 font-light max-w-2xl mx-auto">
            Ambas incluyen la plataforma completa. La diferencia está en quién investiga.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-0 max-w-5xl mx-auto border border-gray-200">

          {/* Plataforma sola */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-200"
          >
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Opción 1
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Plataforma, tu equipo gestiona
            </h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
              Tu equipo interno recibe, registra y da seguimiento a las denuncias, quejas y sugerencias.
              Ideal si ya cuentas con área legal propia.
            </p>

            <motion.ul
              variants={stagger}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-3 mb-8"
            >
              {[
                "Canal unificado: denuncias, quejas y sugerencias",
                "Categorías de riesgo dentro de cada denuncia",
                "Denuncias anónimas con código de seguimiento",
                "Dashboard de gestión en tiempo real",
                "Control de estados, comentarios y evidencias",
                "Exportación a PDF y CSV",
                "Gestión por roles (dueño / administrador / usuario estándar)",
              ].map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  className="flex items-start gap-2.5 text-sm text-gray-600"
                >
                  <Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            <a
              href="https://cliente.talmatech.com/registro"
              className="inline-flex items-center justify-center w-full py-3 border border-gray-300 text-black text-sm font-medium hover:border-brand-blue hover:text-brand-blue transition-all cursor-pointer"
            >
              Ver planes sin asesoría
            </a>
          </motion.div>

          {/* Con asesoría */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="p-8 lg:p-10 relative bg-brand-bone/20"
          >
            <div className="absolute top-0 right-0 px-3 py-1 bg-brand-blue text-white text-xs font-medium">
              RECOMENDADO
            </div>
            <div className="text-xs font-medium text-brand-blue uppercase tracking-wider mb-4">
              Opción 2
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Plataforma y abogados especializados
            </h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
              Cada denuncia es analizada por abogados especializados en cumplimiento.
              Reporte legal formal y plan de acción incluidos. Tu empresa nunca queda sin soporte jurídico.
            </p>

            <motion.ul
              variants={stagger}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-3 mb-8"
            >
              {[
                "Todo lo incluido en la opción 1",
                "Análisis legal de cada denuncia por abogados",
                "Reporte legal formal por escrito",
                "Plan de acción personalizado con recomendaciones",
                "Orientación para tomar decisiones informadas",
              ].map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  className="flex items-start gap-2.5 text-sm text-gray-700"
                >
                  <Check className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            <a
              href="https://cliente.talmatech.com/registro"
              className="inline-flex items-center justify-center w-full py-3 bg-brand-blue text-white text-sm font-medium hover:bg-brand-blue/90 transition-all shadow-md shadow-brand-blue/20 group cursor-pointer"
            >
              Comenzar con asesoría legal
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* What's the same */}
        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto mt-6 p-5 bg-gray-50 border border-gray-200"
        >
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-medium">
            Ambas opciones incluyen siempre
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {[
              "Canal disponible 24/7",
              "Acceso desde cualquier dispositivo",
              "Soporte técnico",
              "Cumplimiento NOM-035",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


// ─── How It Works ──────────────────────────────────────────────────────────────

function HowItWorksSection() {
  const { ref, inView } = useSection();

  const steps = [
    {
      n: "01",
      title: "Activas el canal",
      desc: "Configuras tu URL personalizada en minutos. Accesible desde cualquier dispositivo, sin instalar nada.",
    },
    {
      n: "02",
      title: "Llega un registro",
      desc: "Una denuncia, queja o sugerencia. Las denuncias pueden ser anónimas y el denunciante recibe un código de seguimiento.",
    },
    {
      n: "03",
      title: "Se investiga",
      desc: "Tu equipo gestiona el caso, o nuestros abogados lo analizan y emiten reporte legal formal.",
    },
    {
      n: "04",
      title: "Resolución documentada",
      desc: "Todo queda registrado. Exportas el historial a PDF o CSV. Evidencia clara ante cualquier auditoría.",
    },
  ];

  return (
    <section
      id="como-funciona"
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
            Cómo funciona
          </h2>
          <p className="text-base text-gray-500 font-light max-w-xl mx-auto">
            De la denuncia a la resolución, todo en un solo lugar
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              variants={fadeUp}
              custom={i * 0.5}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative"
            >
              <div className="bg-white border border-gray-200 p-6 h-full">
                <div className="text-3xl font-semibold text-gray-100 mb-4 leading-none">
                  {step.n}
                </div>
                <h4 className="text-sm font-semibold text-black mb-2">{step.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-light">{step.desc}</p>
              </div>
              {i < 3 && (
                <div className="hidden lg:block absolute top-8 -right-3.5 z-10">
                  <ArrowRight className="w-5 h-5 text-gray-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Callout: legal */}
        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-8 border border-brand-blue/20 bg-brand-blue/5 p-6 max-w-3xl mx-auto"
        >
          <div className="flex gap-4">
            <Scale className="w-6 h-6 text-brand-blue shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-black mb-1">
                ¿Qué hace exactamente nuestro equipo legal?
              </div>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Analiza la denuncia, redacta un reporte legal formal con sus hallazgos
                y propone un plan de acción concreto.
              </p>
            </div>
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
      icon: <Shield className="w-5 h-5 text-brand-blue" />,
      title: "Confidencialidad garantizada",
      desc: "Denuncias completamente anónimas. La empresa nunca accede a datos identificatorios sin autorización.",
    },
    {
      icon: <Eye className="w-5 h-5 text-brand-blue" />,
      title: "Trazabilidad total",
      desc: "Historial completo de acciones, comentarios y estados por cada registro.",
    },
    {
      icon: <Scale className="w-5 h-5 text-brand-blue" />,
      title: "Respaldo legal",
      desc: "Abogados especializados elaboran reportes legales y planes de acción que protegen a tu empresa.",
    },
    {
      icon: <Lock className="w-5 h-5 text-brand-blue" />,
      title: "URL personalizada",
      desc: "Canal propio con acceso cifrado.",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-brand-blue" />,
      title: "Métricas en tiempo real",
      desc: "Estados, tasas de resolución y tendencias. Exporta a PDF y CSV con un clic.",
    },
    {
      icon: <Users className="w-5 h-5 text-brand-blue" />,
      title: "Gestión por roles",
      desc: "Dueño, administrador y usuario estándar con permisos diferenciados.",
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
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {props.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              custom={i * 0.15}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="p-6 border border-gray-100 hover:border-brand-blue/30 hover:shadow-sm transition-all group cursor-default"
            >
              <div className="w-9 h-9 bg-brand-blue/8 flex items-center justify-center mb-4 group-hover:bg-brand-blue/15 transition-colors">
                {p.icon}
              </div>
              <h3 className="text-sm font-semibold text-black mb-2">{p.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">{p.desc}</p>
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
            Nuestros Planes
          </h2>
          <p className="text-base text-gray-500 font-light max-w-xl mx-auto mb-8">
            Sin costos ocultos. Cancela cuando quieras.
          </p>

          <div className="inline-flex items-center gap-3 border border-gray-200 p-1 bg-white">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 text-sm font-medium transition-all cursor-pointer ${
                billing === "monthly" ? "bg-gray-900 text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-5 py-2 text-sm font-medium transition-all cursor-pointer ${
                billing === "annual" ? "bg-brand-blue text-white" : "text-gray-600 hover:text-black"
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
                Plataforma, tu equipo gestiona
              </h3>
              <p className="text-sm text-gray-500 font-light">
                Canal completo. Tu equipo interno maneja las investigaciones.
              </p>
            </div>

            <div className="space-y-2.5 mb-6">
              {sinAsesoria.map((plan) => (
                <div
                  key={plan.name}
                  className="flex items-center justify-between p-4 border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div>
                    <div className="text-sm font-medium text-black">{plan.name}</div>
                    <div className="text-xs text-gray-400">{plan.admins}</div>
                  </div>
                  <div className="text-right">
                    <motion.div
                      key={`${plan.name}-${billing}`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-base font-semibold text-brand-blue"
                    >
                      Desde {billing === "monthly" ? fmt(plan.monthly) : fmt(plan.annual)}
                    </motion.div>
                    <div className="text-xs text-gray-400">
                      MXN/{billing === "monthly" ? "mes" : "año"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              {[
                "Canal de denuncias, quejas y sugerencias 24/7",
                "Dashboard de gestión",
                "Exportación de reportes",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-3.5 h-3.5 text-gray-400" />
                  {f}
                </div>
              ))}
            </div>

            <a
              href="https://cliente.talmatech.com/registro"
              className="block w-full text-center py-3 bg-gray-100 text-black text-sm font-medium hover:bg-gray-200 transition-all cursor-pointer"
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
            className="bg-white border-2 border-brand-blue p-7 relative"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-blue text-white text-xs font-medium">
              RECOMENDADO
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-black mb-1">
                Plataforma y Servicios de Cumplimiento
              </h3>
              <p className="text-sm text-gray-500 font-light">
                Abogados especializados analizan y emiten reporte legal por cada denuncia.
              </p>
            </div>

            <div className="space-y-2.5 mb-6">
              {conAsesoria.map((plan) => (
                <div
                  key={plan.name}
                  className="flex items-center justify-between p-4 border border-brand-blue/20 bg-brand-blue/4 hover:bg-brand-blue/8 transition-colors"
                >
                  <div>
                    <div className="text-sm font-medium text-black">{plan.name}</div>
                    <div className="text-xs text-gray-400">{plan.admins}</div>
                  </div>
                  <div className="text-right">
                    <motion.div
                      key={`${plan.name}-${billing}`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-base font-semibold text-brand-blue"
                    >
                      Desde {billing === "monthly" ? fmt(plan.monthly) : fmt(plan.annual)}
                    </motion.div>
                    <div className="text-xs text-gray-400 flex items-center gap-1.5">
                      MXN/{billing === "monthly" ? "mes" : "año"}
                      {billing === "annual" && (
                        <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-medium">
                          −15%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              {[
                "Todo lo del plan básico",
                "Reporte legal formal por cada denuncia",
                "Plan de acción personalizado",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-3.5 h-3.5 text-brand-blue" />
                  {f}
                </div>
              ))}
            </div>

            <a
              href="https://cliente.talmatech.com/registro"
              className="block w-full text-center py-3 bg-brand-blue text-white text-sm font-medium hover:bg-brand-blue/90 transition-all shadow-md shadow-brand-blue/20 cursor-pointer"
            >
              Comenzar ahora
            </a>
          </motion.div>
        </div>
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
      q: "¿Qué tipos de registros se pueden enviar por el canal?",
      a: "El canal recibe tres tipos de registros: denuncias (incluyendo subcategorías de riesgo como conductas con apariencia de delito), quejas y sugerencias. Cada tipo tiene su propio flujo y configuración dentro de la plataforma.",
    },
    {
      q: "¿Las denuncias son realmente anónimas?",
      a: "Sí. Los denunciantes pueden enviar su reporte sin registrar ningún dato personal. Reciben un código único de seguimiento para consultar el estado de su caso sin revelar su identidad.",
    },
    {
      q: "¿Qué hace exactamente nuestro equipo legal cuando llega una denuncia?",
      a: "Analiza la denuncia recibida, identifica el tipo de riesgo, redacta un reporte legal formal con sus hallazgos y propone un plan de acción con recomendaciones concretas.",
    },
    {
      q: "¿Cuánto tiempo tarda en estar activo el canal?",
      a: "Tu canal personalizado puede estar activo el mismo día que completes el registro y la configuración inicial.",
    },
    {
      q: "¿Puedo cambiar de plan si mi empresa crece?",
      a: "Sí. Puedes hacer upgrade o downgrade en cualquier momento desde tu panel de administración. Los cambios se aplican en el siguiente ciclo de facturación.",
    },
    {
      q: "¿Qué normativas cumple la plataforma?",
      a: "TALMA TECH está alineada con la NOM-035-STPS-2018 y estándares internacionales de compliance, tal como la ISO 37002.",
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
              custom={i * 0.1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="border border-gray-200"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
              >
                <span className="text-sm font-medium text-black pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
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
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
      className="py-24 px-6 lg:px-8 bg-brand-blue text-white overflow-hidden relative"
    >
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-3xl lg:text-4xl font-semibold mb-4"
        >
          Tu empresa merece un canal de denuncias profesional
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-base text-white/70 font-light mb-10 max-w-xl mx-auto"
        >
          Crea tu cuenta hoy y ten el canal activo antes de que termine el día.
        </motion.p>
        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="https://cliente.talmatech.com/registro"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-blue text-sm font-semibold hover:bg-gray-50 transition-all group shadow-xl cursor-pointer"
          >
            Crear cuenta ahora
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#precios"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white text-sm font-medium hover:border-white/60 transition-all cursor-pointer"
          >
            Ver precios
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
        <TwoProductsSection />
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