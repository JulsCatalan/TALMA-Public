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
  AlertTriangle,
  MessageSquareOff,
  Gavel,
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
    <section className="pt-32 pb-20 px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-gray-200 text-gray-500 text-xs font-medium mb-8"
          >
            Plataforma de cumplimiento normativo · México y LATAM
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl lg:text-6xl font-semibold leading-tight mb-6"
          >
            <span className="text-black">Tu empresa necesita un</span>{" "}
            <span className="text-brand-blue">canal de denuncias, quejas y sugerencias.</span>{" "}
            <span className="text-black">Nosotros te damos la plataforma y los abogados que investigan.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto font-light"
          >
            Recibe, gestiona y resuelve denuncias, quejas y sugerencias de forma
            estructurada. Con asesoría legal incluida o de forma autónoma.
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

          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-8 text-xs text-gray-400"
          >
            {["Anónimo y confidencial", "NOM-035 STPS", "Abogados especializados"].map((tag) => (
              <div key={tag} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                <span>{tag}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto mt-16"
        >
          <p className="text-center text-sm text-gray-400 mb-5 font-light tracking-wide uppercase">
            Dashboard en tiempo real con seguimiento continuo y trazable
          </p>
          <div className="relative">
            <div className="absolute inset-0 bg-brand-bone/40 transform -rotate-1" />
            <div className="relative bg-white border border-gray-150 shadow-2xl p-6 lg:p-8">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="col-span-2 space-y-3">
                  <div className="flex items-center justify-between p-4 bg-brand-blue text-white">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5" />
                      <div>
                        <div className="text-xs opacity-70">DENUNCIA</div>
                        <div className="font-semibold text-base">DEN-2025-00124</div>
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
                  <div className="p-5 bg-brand-blue text-white">
                    <div className="text-3xl font-semibold mb-0.5">48</div>
                    <div className="text-xs opacity-80">Total registros</div>
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


// ─── Problem Section ──────────────────────────────────────────────────────────

function ProblemSection() {
  const { ref, inView } = useSection();

  const problems = [
    {
      icon: <MessageSquareOff className="w-6 h-6 text-gray-400" />,
      title: "Las denuncias llegan por WhatsApp",
      desc: "Sin canal formal, la información se distorsiona, se pierde, o nunca llega a quien debe.",
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-gray-400" />,
      title: "Sin trazabilidad, no hay rendición de cuentas",
      desc: "Sin registro de quién recibió qué y cuándo, la empresa queda expuesta ante auditorías y litigios.",
    },
    {
      icon: <Gavel className="w-6 h-6 text-gray-400" />,
      title: "La NOM-035 exige un canal. La mayoría no lo tiene.",
      desc: "Empresas con más de 50 empleados están obligadas. El incumplimiento tiene consecuencias.",
    },
  ];

  return (
    <section ref={ref} className="py-20 px-6 lg:px-8 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <h2 className="text-2xl lg:text-3xl font-semibold mb-3 text-black">
            Sin un canal formal, tu empresa opera con riesgo
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="p-6 bg-white border border-gray-200"
            >
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center mb-4">
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

            <ul className="space-y-3 mb-8">
              {[
                "Canal unificado: denuncias, quejas y sugerencias",
                "Categorías de riesgo dentro de cada denuncia",
                "Denuncias anónimas con código de seguimiento",
                "Dashboard de gestión en tiempo real",
                "Control de estados, comentarios y evidencias",
                "Exportación a PDF y CSV",
                "Gestión por roles (owner / admin / estándar)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="https://cliente.talmatech.com/registro"
              className="inline-flex items-center justify-center w-full py-3 border border-gray-300 text-black text-sm font-medium hover:border-brand-blue hover:text-brand-blue transition-all"
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

            <ul className="space-y-3 mb-8">
              {[
                "Todo lo incluido en la opción 1",
                "Análisis legal de cada denuncia por abogados",
                "Reporte legal formal por escrito",
                "Plan de acción personalizado con recomendaciones",
                "Protección jurídica ante posibles litigios",
                "Orientación para tomar decisiones informadas",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="https://cliente.talmatech.com/registro"
              className="inline-flex items-center justify-center w-full py-3 bg-brand-blue text-white text-sm font-medium hover:bg-brand-blue/90 transition-all shadow-md shadow-brand-blue/20 group"
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
              "Anonimato garantizado",
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
                ¿Qué hace exactamente el abogado?
              </div>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Analiza la denuncia, redacta un reporte legal formal con sus hallazgos
                y propone un plan de acción concreto. Certeza jurídica en cada caso.
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
      icon: <Shield className="w-6 h-6 text-brand-blue" />,
      title: "Confidencialidad garantizada",
      desc: "Denuncias completamente anónimas. La empresa nunca accede a datos identificatorios sin autorización.",
    },
    {
      icon: <Eye className="w-6 h-6 text-brand-blue" />,
      title: "Trazabilidad total",
      desc: "Historial completo de acciones, comentarios y estados por cada registro.",
    },
    {
      icon: <Scale className="w-6 h-6 text-brand-blue" />,
      title: "Respaldo legal",
      desc: "Abogados especializados elaboran reportes legales y planes de acción que protegen a tu empresa.",
    },
    {
      icon: <Lock className="w-6 h-6 text-brand-blue" />,
      title: "URL personalizada",
      desc: "Canal propio con acceso cifrado. Los empleados saben que es oficial.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-brand-blue" />,
      title: "Métricas en tiempo real",
      desc: "Estados, tasas de resolución y tendencias. Exporta a PDF y CSV con un clic.",
    },
    {
      icon: <Users className="w-6 h-6 text-brand-blue" />,
      title: "Gestión por roles",
      desc: "Owner, admin y usuario estándar con permisos diferenciados.",
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
              custom={i * 0.5}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="p-6 border border-gray-100 hover:border-brand-blue/30 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 bg-brand-blue/8 flex items-center justify-center mb-4 group-hover:bg-brand-blue/15 transition-colors">
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


// ─── Normativa bar ────────────────────────────────────────────────────────────

function NormativaBar() {
  const { ref, inView } = useSection();

  return (
    <section ref={ref} className="py-12 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { value: "NOM-035-STPS-2018", label: "Identificación de factores de riesgo psicosocial" },
            { value: "Ley General de Responsabilidades Administrativas", label: "Marco anticorrupción para empresas" },
            { value: "Estándares internacionales de compliance", label: "ISO 37001 y mejores prácticas globales" },
          ].map((s, i) => (
            <motion.div
              key={s.value}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-center"
            >
              <div className="text-sm font-semibold text-white mb-1">{s.value}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
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
            Sin costos ocultos. Cancela cuando quieras.
          </p>

          <div className="inline-flex items-center gap-3 border border-gray-200 p-1 bg-white">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 text-sm font-medium transition-all ${
                billing === "monthly" ? "bg-gray-900 text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-5 py-2 text-sm font-medium transition-all ${
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
                <div key={plan.name} className="flex items-center justify-between p-4 border border-gray-100 hover:border-gray-200 transition-colors">
                  <div>
                    <div className="text-sm font-medium text-black">{plan.name}</div>
                    <div className="text-xs text-gray-400">{plan.admins}</div>
                  </div>
                  <div className="text-right">
                    <motion.div
                      key={`${plan.name}-${billing}`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
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
              {["Canal de denuncias, quejas y sugerencias 24/7", "Dashboard de gestión", "Exportación de reportes"].map((f) => (
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
                Abogados especializados investigan y emiten reporte legal por cada denuncia.
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
                      className="text-base font-semibold text-brand-blue"
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
              className="block w-full text-center py-3 bg-brand-blue text-white text-sm font-medium hover:bg-brand-blue/90 transition-all shadow-md shadow-brand-blue/20"
            >
              Comenzar ahora
            </a>
          </motion.div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Acceso 24/7 · Sin tarjeta de crédito requerida · Cancela cuando quieras
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
      q: "¿Qué tipos de registros se pueden enviar por el canal?",
      a: "El canal recibe tres tipos de registros: denuncias (incluyendo subcategorías de riesgo como acoso, fraude o conductas indebidas), quejas y sugerencias. Cada tipo tiene su propio flujo y configuración dentro de la plataforma.",
    },
    {
      q: "¿Las denuncias son realmente anónimas?",
      a: "Sí. Los denunciantes pueden enviar su reporte sin registrar ningún dato personal. Reciben un código único de seguimiento para consultar el estado de su caso sin revelar su identidad.",
    },
    {
      q: "¿Qué hace exactamente el abogado cuando llega una denuncia?",
      a: "Analiza la denuncia recibida, identifica el tipo de riesgo o infracción, redacta un reporte legal formal con sus hallazgos y propone un plan de acción con recomendaciones concretas.",
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
      a: "TALMA TECH está alineada con la NOM-035-STPS-2018 y apoya el cumplimiento de marcos como la Ley General de Responsabilidades Administrativas y estándares internacionales de compliance.",
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
      className="py-24 px-6 lg:px-8 bg-brand-blue text-white overflow-hidden relative"
    >
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-3xl lg:text-4xl font-semibold mb-8"
        >
          Activo el mismo día. Sin tarjeta de crédito.
        </motion.h2>
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="https://cliente.talmatech.com/registro"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-blue text-sm font-semibold hover:bg-gray-50 transition-all group shadow-xl"
          >
            Crear cuenta ahora
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#precios"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white text-sm font-medium hover:border-white/60 transition-all"
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
        <ProblemSection />
        <TwoProductsSection />
        <HowItWorksSection />
        <ValuePropsSection />
        <NormativaBar />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}