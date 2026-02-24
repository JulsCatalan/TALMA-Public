// src/pages/PrivacyPage.tsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

// ─── Index ────────────────────────────────────────────────────────────────────

const sections = [
  { id: "responsable", label: "Responsable y ámbito" },
  { id: "objetivo", label: "Objetivo y finalidades" },
  { id: "datos", label: "Datos recabados" },
  { id: "fundamento", label: "Fundamento jurídico" },
  { id: "arco", label: "Derechos ARCO" },
  { id: "transferencias", label: "Transferencias" },
  { id: "seguridad", label: "Medidas de seguridad" },
  { id: "conservacion", label: "Conservación de datos" },
  { id: "cookies", label: "Cookies" },
  { id: "terminos", label: "Términos y condiciones" },
  { id: "cambios", label: "Cambios al aviso" },
  { id: "contacto", label: "Contacto" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-1 h-5 bg-brand-red shrink-0" />
      <h2 className="text-xl font-semibold text-black">{title}</h2>
    </div>
  );
}

function BulletItem({ children, variant = "red" }: { children: React.ReactNode; variant?: "red" | "gray" | "black" }) {
  const colors = {
    red: "bg-brand-red",
    gray: "bg-gray-400",
    black: "bg-black",
  };
  return (
    <li className="flex items-start gap-3">
      <div className={`w-2 h-2 ${colors[variant]} shrink-0 mt-2`} />
      <span className="text-gray-700">{children}</span>
    </li>
  );
}

function SubBulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <div className="w-1.5 h-1.5 bg-black shrink-0 mt-2" />
      <span className="text-gray-700">{children}</span>
    </li>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-black mb-2 mt-5">{children}</h3>;
}

function Para({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return (
    <p className={`${small ? "text-sm" : "text-base"} text-gray-600 leading-relaxed font-light mb-3 last:mb-0`}>
      {children}
    </p>
  );
}

function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-4">
      <p className="text-sm text-gray-700">{children}</p>
    </div>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-gray-100 bg-gray-50 p-5 my-4 space-y-2">
      {children}
    </div>
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
          className="text-4xl lg:text-5xl font-semibold text-white leading-tight max-w-3xl mb-4"
        >
          Aviso de Privacidad{" "}
          <span className="text-brand-red">de Talma Tech</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="visible"
          className="text-base text-gray-400 italic font-light mb-6"
        >
          "Los datos personales son privados en el trabajo y en cualquier lugar"
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate="visible"
          className="w-16 h-px bg-brand-red"
        />
      </div>
    </section>
  );
}

// ─── Content ──────────────────────────────────────────────────────────────────

function ContentSection() {
  const { ref, inView } = useSection();

  return (
    <section ref={ref} className="py-16 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Sticky sidebar index */}
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

            {/* Responsable */}
            <div id="responsable" className="scroll-mt-28">
              <SectionHeading title="Responsable y ámbito de aplicación" />
              <Para>
                Julián Catalán Alcalá y Marco José Arellano Sánchez (los "Responsables"), con domicilio en Anillo Periférico Boulevard Adolfo López Mateos 4829, Parques del Pedregal, Tlalpan, 14010, Ciudad de México, son responsables del tratamiento de los datos personales recabados a través de la plataforma digital Talma Tech ("Plataforma" o "Talma Tech"), así como de los medios, módulos y servicios conectados a la Plataforma.
              </Para>
              <Para>
                Este aviso de privacidad se aplica a los datos personales que los Responsables recaben, utilicen, conserven y traten directa o indirectamente a través de Talma Tech y mediante cualquier medio electrónico, óptico, sonoro o visual, conforme a lo previsto en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares ("LFPDPPP").
              </Para>
              <Para>
                Asimismo, la LFPDPPPP dispone que los Responsables debe poner a disposición de las personas titulares el aviso de privacidad y regula la forma en que debe entregarse cuando los datos se obtengan por medios electrónicos o digitales. Por ello, este aviso será accesible públicamente y se encontrará visible en la página de inicio de Talma Tech para consulta previa y permanente.
              </Para>
            </div>

            {/* Objetivo */}
            <div id="objetivo" className="scroll-mt-28">
              <SectionHeading title="Objetivo de Talma Tech y finalidades del tratamiento" />
              <Para>
                Talma Tech es una plataforma digital de Compliance diseñada para que personas morales gestionen y supervisen su cumplimiento normativo en tiempo real. En su etapa inicial, la Plataforma ofrece una solución tecnológica que permite a clientes disponer de un canal de denuncias para recibir reportes, quejas u observaciones por parte de personas trabajadoras, clientes, proveedores o externos.
              </Para>

              <Para>
                Los datos personales se recaban y tratan para las siguientes finalidades primarias (necesarias para la prestación del servicio):
              </Para>
              <InfoBox>
                <ul className="space-y-2">
                  <BulletItem>Registrar y administrar cuentas de usuario y perfiles institucionales;</BulletItem>
                  <BulletItem>Gestionar y documentar procesos de cumplimiento normativo limitándose a lo relacionado con la gestión de canales de denuncia;</BulletItem>
                  <BulletItem>Verificación de identidad y autenticación de usuarios;</BulletItem>
                  <BulletItem>Cumplimiento de obligaciones legales y regulatorias aplicables a los clientes de Talma Tech.</BulletItem>
                  <BulletItem>Recepción, registro, atención e investigación de denuncias.</BulletItem>
                  <BulletItem>Comunicación con la persona denunciante o con el contratante cuando sea necesario para el seguimiento del reporte.</BulletItem>
                  <BulletItem>Integración y conservación de expedientes relacionados con la denuncia para efectos de cumplimiento interno o para atender requerimientos legales o regulatorios del cliente.</BulletItem>
                </ul>
              </InfoBox>

              <Para>
                Finalidades secundarias (no esenciales para la prestación directa del servicio y sujetas a opciones del titular):
              </Para>
              <InfoBox>
                <ul className="space-y-2">
                  <BulletItem variant="gray">Análisis estadístico y mejora de la Plataforma;</BulletItem>
                  <BulletItem variant="gray">Envío de comunicaciones institucionales o informativas acerca de actualizaciones del servicio;</BulletItem>
                </ul>
              </InfoBox>

              <Para small>
                Las finalidades que requieran un consentimiento específico se identificarán de forma clara en el momento de la recolección y en el aviso simplificado conforme a la ley.
              </Para>
            </div>

            {/* Datos */}
            <div id="datos" className="scroll-mt-28">
              <SectionHeading title="Categorías y ejemplos de datos personales recabados" />
              <Para>
                De acuerdo con la relación jurídica y la funcionalidad utilizada, Talma Tech podrá recabar de manera enunciativa más no limitativa las siguientes categorías de datos:
              </Para>

              <SubHeading>a) Personas contratantes del servicios:</SubHeading>
              <ul className="space-y-2 ml-4 mb-4">
                <SubBulletItem>Datos de identificación y contacto: Nombre, domicilio, correo electrónico, teléfono.</SubBulletItem>
                <SubBulletItem>Datos de identidad oficiales: Registro Federal de Contribuyentes.</SubBulletItem>
                <SubBulletItem>Datos laborales y administrativos: Puesto, área.</SubBulletItem>
                <SubBulletItem>Documentación bancaria: Número de cuenta, número de CLABE, nombre del beneficiario, entidad bancaria.</SubBulletItem>
              </ul>

              <SubHeading>b) Personas denunciantes:</SubHeading>
              <ul className="space-y-2 ml-4 mb-4">
                <SubBulletItem>Datos de identificación y contacto (si los proporcionan): Nombre, domicilio, correo electrónico, teléfono, edad, lugar de trabajo.</SubBulletItem>
                <SubBulletItem>Datos de identidad oficiales (si los proporcionan): Registro Federal de Contribuyentes, INE.</SubBulletItem>
              </ul>

              <SubHeading>c) Otros datos:</SubHeading>
              <ul className="space-y-2 ml-4 mb-4">
                <SubBulletItem>Datos técnicos: Correo electrónico, tipo de usuario, e identificadores de sesión (JWT en cookies)</SubBulletItem>
              </ul>

              <NoteBox>
                Talma Tech no recaba datos personales sensibles de forma rutinaria. En el supuesto excepcional de que se requiera tratamiento de datos sensibles, tales como salud, afiliación sindical, origen étnico u otros, esto se hará únicamente cuando sea estrictamente necesario, con fundamento legal y consentimiento reforzado, aplicando medidas de protección adicionales conforme a la LFPDPPP.
              </NoteBox>
            </div>

            {/* Fundamento */}
            <div id="fundamento" className="scroll-mt-28">
              <SectionHeading title="Fundamento jurídico del tratamiento" />
              <Para>
                El tratamiento de datos personales se realizará con base en: (i) el consentimiento del titular cuando la finalidad lo exija; (ii) la ejecución de un contrato o relación jurídica entre la persona contratante y los Responsables; (iii) el cumplimiento de obligaciones legales y regulatorias aplicables al cliente usuario; y (iv) los demás fundamentos previstos por la LFPDPPP y su Reglamento.
              </Para>
            </div>

            {/* ARCO */}
            <div id="arco" className="scroll-mt-28">
              <SectionHeading title="Derechos de Acceso, Rectificación, Cancelación u Oposición." />
              <Para>
                Los titulares podrán ejercer los derechos de Acceso, Rectificación, Cancelación u Oposición ("ARCO"), así como revocar el consentimiento cuando proceda, en los términos de la LFPDPPP. Por disposición legal, la solicitud de ejercicio de derechos deberá contener los requisitos mínimos que permiten identificar al solicitante y localizar los datos.
              </Para>
              <InfoBox>
                <p className="text-gray-700">
                  Medio para ejercer derechos ARCO: correo electrónico{" "}
                  <a href="mailto:contacto@talmatech.com" className="text-brand-red font-medium hover:text-brand-red/80 transition-colors">
                    contacto@talmatech.com
                  </a>.
                </p>
                <p className="text-gray-700">
                  Los Responsables notificarán al titular la procedencia o no de la solicitud en un plazo máximo de 20 días hábiles, y en caso de ser procedente, dará cumplimiento en los 15 días hábiles siguientes, de conformidad con lo establecido en la LFPDPPP. Si se requiere ampliación, podrá hacerse una sola vez y por un periodo igual cuando las circunstancias lo justifiquen.
                </p>
                <p className="text-gray-700">
                  Las solicitudes ARCO serán atendidas con trato sensible y confidencial; al presentarlas, el área de protección de datos podrá requerir documentación que acredite la identidad o representación del solicitante, conforme al procedimiento establecido en el aviso.
                </p>
              </InfoBox>
            </div>

            {/* Transferencias */}
            <div id="transferencias" className="scroll-mt-28">
              <SectionHeading title="Transferencias y tratamiento con terceros." />
              <Para>
                Con el objeto de almacenar la información de la Plataforma, los Responsables podrán transferir o alojar datos personales en proveedores de servicios tecnológicos, entre ellos, servicios de cómputo en la nube. En particular, se resguardará el contenido e infraestructura de la Plataforma en servidores de Hostinger, AWS y Supabase para almacenamiento, procesamiento y continuidad operativa.
              </Para>
              <Para>
                Un servidor es el sistema físico o virtual que almacena, procesa y transmite datos para la operación de servicios digitales. Cuando se contrata un proveedor de Hostinger AWS y Supabase, estos actúan como encargados del tratamiento de conformidad con los términos contractuales aplicables, y los Responsables continúan siéndolo en términos de la LFPDPPP, debiendo asegurarse de que el encargado observe las medidas de seguridad y obligaciones previstas por la ley.
              </Para>
              <Para small>
                Este aviso informa expresamente que se podrán realizar transferencias a proveedores de Hostinger. La identificación de terceros concretos y las finalidades específicas de la transferencia serán detalladas en la versión integral del aviso y en los anexos contractuales correspondientes.
              </Para>
            </div>

            {/* Seguridad */}
            <div id="seguridad" className="scroll-mt-28">
              <SectionHeading title="Medidas de seguridad" />
              <Para>
                Los Responsables implementan medidas de seguridad administrativas, técnicas y físicas razonables y proporcionales para proteger los datos personales contra daño, pérdida, alteración, destrucción, acceso o tratamiento no autorizado. Estas medidas incluyen controles de acceso, cifrado en tránsito y en reposo cuando proceda, registros de auditoría y procedimientos de respuesta a incidentes.
              </Para>
            </div>

            {/* Conservación */}
            <div id="conservacion" className="scroll-mt-28">
              <SectionHeading title="Conservación de datos" />
              <Para>
                Los datos personales se conservarán durante el tiempo necesario para cumplir las finalidades para las que fueron recabados, así como para cumplir obligaciones legales y/o contractuales aplicables. Cuando el dato deje de ser necesario, se dispondrá su supresión conforme a criterio jurídico y administrativo y a las políticas internas de retención que se establezcan y publiquen en la versión integral del aviso.
              </Para>
            </div>

            {/* Cookies */}
            <div id="cookies" className="scroll-mt-28">
              <SectionHeading title="Cookies y tecnologías de rastreo" />
              <Para>
                Talma Tech utiliza cookies y tecnologías similares para fines funcionales, analíticos y, en su caso, de personalización. Las cookies de autenticación esenciales son necesarias para la operación de la Plataforma; otras cookies requerirán información clara y, cuando aplique, consentimiento previo y granular por parte del usuario.
              </Para>
            </div>

            {/* Términos */}
            <div id="terminos" className="scroll-mt-28">
              <SectionHeading title="Términos y condiciones" />
              <Para>
                Además del aviso de privacidad, Talma Tech contará con Términos y Condiciones que regirán el acceso y uso de la Plataforma, tales como la contratación, obligaciones del usuario, limitación de responsabilidad, propiedad intelectual, jurisdicción, entre otros. Los Términos estarán disponibles en el sitio y deberán ser aceptados por los usuarios cuando así proceda.
              </Para>
            </div>

            {/* Cambios */}
            <div id="cambios" className="scroll-mt-28">
              <SectionHeading title="Cambios al aviso y versión pública" />
              <Para>
                La versión integral de este aviso se publicará en la página de inicio de Talma Tech y en un enlace de fácil acceso para todos los usuarios. Cualquier modificación se comunicará mediante la publicación de la nueva versión en el sitio y, cuando legalmente proceda, mediante notificación directa a los titulares.
              </Para>
            </div>

            {/* Contacto */}
            <div id="contacto" className="scroll-mt-28">
              <SectionHeading title="Contacto" />
              <InfoBox>
                <p className="text-gray-700">
                  Para cualquier duda, aclaración o ejercicio de derechos ARCO:{" "}
                  <a href="mailto:contacto@talmatech.com" className="text-brand-red font-medium hover:underline">
                    contacto@talmatech.com
                  </a>. Responsable: Julián Catalán Alcalá y Marco José Arellano Sánchez. Domicilio: Anillo Periférico Boulevard Adolfo López Mateos 4829, Parques del Pedregal, Tlalpan, 14010, Ciudad de México.
                </p>
                <p className="text-gray-700 text-sm">
                  Correos contacto de Talma Tech:{" "}
                  <a href="mailto:contacto@talmatech.com" className="text-brand-red font-medium hover:underline">contacto@talmatech.com</a>,{" "}
                  <a href="mailto:soporte@talmatech.com" className="text-brand-red font-medium hover:underline">soporte@talmatech.com</a>.
                </p>
              </InfoBox>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrivacyPage() {
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