// src/pages/TermsPage.tsx
// Requires: framer-motion, lucide-react, react-router-dom

import { useRef } from "react";
import { Link } from "react-router-dom";
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
  { id: "introduccion", label: "1. Introducción" },
  { id: "partes", label: "2. Partes y Alcance" },
  { id: "servicios", label: "3. De los Servicios" },
  { id: "precios", label: "4. Precios y planes" },
  { id: "pago", label: "5. Forma de pago" },
  { id: "cancelacion", label: "6. Cancelación" },
  { id: "privacidad", label: "7. Aviso de privacidad" },
  { id: "uso", label: "8. Uso permitido" },
  { id: "propiedad", label: "9. Propiedad intelectual" },
  { id: "responsabilidad", label: "10. Limitación de responsabilidad" },
  { id: "notificaciones", label: "11. Notificaciones" },
  { id: "legislacion", label: "12. Legislación" },
  { id: "vigencia", label: "13. Vigencia" },
  { id: "disposiciones", label: "14. Disposiciones finales" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-xs font-medium text-brand-red shrink-0">{number}.</span>
      <h2 className="text-xl font-semibold text-black">{title}</h2>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-black mb-2 mt-5 first:mt-0">{children}</h3>;
}

function Para({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return (
    <p className={`${small ? "text-sm" : "text-base"} text-gray-600 leading-relaxed font-light mb-3 last:mb-0`}>
      {children}
    </p>
  );
}

function AlphaItem({ letter, children }: { letter: string; children: React.ReactNode }) {
  return (
    <p className="text-gray-700 text-base font-light leading-relaxed">
      <span className="font-medium">{letter})</span>{" "}{children}
    </p>
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
          Términos y Condiciones{" "}
          <span className="text-brand-red">de Uso de Talma Tech</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="visible"
          className="text-sm text-gray-500 font-light mb-6"
        >
          Última actualización: 9/02/2026
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

          {/* Sticky sidebar */}
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

            {/* 1 */}
            <div id="introduccion" className="scroll-mt-28">
              <SectionHeading number="1" title="Introducción" />
              <Para>
                Estos Términos y Condiciones de Uso (los "Términos y Condiciones") regulan el acceso, contratación y uso del servicio digital Talma Tech (el "Servicio" o la "Plataforma"), operado y prestado por las personas físicas Julián Catalán Alcalá y Marco José Arellano Sánchez (en adelante, los "Prestadores" o colectivamente "Talma Tech").
              </Para>
              <Para>
                Los presentes Términos y Condiciones tienen por objeto establecer las condiciones bajo las cuales los clientes podrán contratar y utilizar el Servicio. Al contratar, registrarse o utilizar la Plataforma, el cliente acepta quedar sujeto a estos Términos y Condiciones en su versión vigente.
              </Para>
            </div>

            {/* 2 */}
            <div id="partes" className="scroll-mt-28">
              <SectionHeading number="2" title="Partes y Alcance del Servicio" />
              <SubHeading>Partes.</SubHeading>
              <Para>
                Las partes dentro de la prestación del Servicio son, por un lado, los Prestadores y, por otro, la persona física o moral que contrata el Servicio ("Cliente").
              </Para>
              <SubHeading>Objeto.</SubHeading>
              <Para>
                Talma Tech ofrece soluciones tecnológicas orientadas a la gestión de canales de denuncias y, en etapas posteriores, otros servicios digitales de cumplimiento normativo. En la etapa inicial, el Servicio consiste en la puesta a disposición de un canal de denuncias que el Cliente puede implementar en sus instalaciones adaptada a sus necesidades.
              </Para>
              <SubHeading>Conocimiento del Cliente.</SubHeading>
              <Para>
                El Cliente declara conocer la naturaleza, alcances y limitaciones del Servicio, así como las funcionalidades contratadas, y afirma contar con la capacidad y facultades necesarias para contratar y utilizar la Plataforma.
              </Para>
            </div>

            {/* 3 */}
            <div id="servicios" className="scroll-mt-28">
              <SectionHeading number="3" title="De los Servicios" />
              <SubHeading>Modalidades generales.</SubHeading>
              <Para>Los servicios se ofrecen en dos modalidades principales:</Para>
              <InfoBox>
                <p className="text-gray-700">
                  <span className="font-semibold text-black">Servicios sin asesoría:</span>{" "}
                  acceso al uso de la Plataforma y sus herramientas configurables por el Cliente. Planes: Starter, Avanzado y Premium.
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-black">Servicios con asesoría:</span>{" "}
                  además del acceso a la Plataforma, incluyen servicios profesionales de Talma Tech relativos al cumplimiento normativo, análisis y asesoría. Planes: Starter, Pro, Avanzado y Premium.
                </p>
              </InfoBox>
              <SubHeading>Diferencias entre modalidades.</SubHeading>
              <Para>
                Las diferencias entre planes incluyen el número de usuarios administradores permitidos; funciones avanzadas de integración y alcance de la asesoría profesional. Las características concretas de cada plan se describen en la ficha técnica asociada al plan contratado.
              </Para>
              <SubHeading>Alcance funcional de los servicios sin asesoría.</SubHeading>
              <Para>
                El Cliente puede utilizar la Plataforma para configurar cuestionarios, canales de denuncia, formularios y reglas internas conforme a sus necesidades. Talma Tech pone a disposición las herramientas; la configuración operativa y el contenido son responsabilidad del Cliente salvo pacto en contrario.
              </Para>
              <SubHeading>Alcance funcional de los servicios con asesoría.</SubHeading>
              <Para>
                En los planes con asesoría, Talma Tech presta apoyo profesional que puede incluir: emisión de opiniones de cumplimiento, análisis y propuestas técnicas para el diseño de canales de denuncias, recomendaciones sobre investigación de incidentes y apoyo en la formulación de protocolos internos. Salvo que expresamente se acuerde por escrito, las opiniones y recomendaciones no constituyen representación legal ni sustituyen asesoría jurídica externa especializada del Cliente.
              </Para>
            </div>

            {/* 4 */}
            <div id="precios" className="scroll-mt-28">
              <SectionHeading number="4" title="Precios, facturación y planes." />
              <SubHeading>Estructura de precios.</SubHeading>
              <Para>
                Los precios varían según la modalidad, el plan seleccionado y el periodo de facturación. Los precios y las condiciones comerciales aplicables a cada plan se muestran en la oferta comercial vigente al momento de la contratación.
              </Para>
              <SubHeading>Opciones de facturación.</SubHeading>
              <Para>
                El Cliente puede optar por facturación mensual o anual según lo disponible en la oferta. Las suscripciones anuales pueden incluir descuentos o beneficios específicos conforme a la promoción vigente.
              </Para>
              <SubHeading>Usuarios administradores.</SubHeading>
              <Para>
                Cada plan incluye un número máximo de usuarios con rol de administrador, es decir, con capacidad para configurar y gestionar el canal. Si el Cliente requiere más usuarios administradores que los contemplados en su plan.
              </Para>
              <SubHeading>Actualización de plan.</SubHeading>
              <Para>
                Si el Cliente solicita una actualiazción a un plan superior durante un periodo de facturación ya iniciado, Talma Tech habilitará inmediatamente las funcionalidades del plan superior en la Plataforma. El cobro correspondiente al nuevo plan comenzará a aplicarse a partir del siguiente periodo de facturación, es decir, no se prorratea ni se factura de forma retroactiva en el mismo ciclo; el Cliente disfrutará del servicio del plan superior desde el momento del cambio hasta el fin del periodo pagado, y el nuevo cobro se realizará en el siguiente ciclo.
              </Para>
              <SubHeading>Reducciones de plan.</SubHeading>
              <Para>
                Si el Cliente solicita una actualización un plan inferior, el cambio de cobro se hará efectivo a partir del siguiente periodo de facturación. Para garantizar la operatividad del Cliente en el nuevo plan, éste deberá designar y confirmar los usuarios administradores que permanecerán activos dentro del límite del plan inferior. Talma Tech podrá suspender o limitar funcionalidades que excedan las capacidades del plan hasta que el Cliente realice la correcta designación de administradores y ajuste de usuarios conforme al nuevo plan.
              </Para>
              <SubHeading>Política de modificaciones.</SubHeading>
              <Para>
                Cualquier cambio solicitado por el Cliente que implique configuración técnica de Talma Tech podrá estar sujeto a condiciones técnicas y plazos de implementación. Los cambios no liberan al Cliente de las obligaciones de pago correspondientes al periodo en curso.
              </Para>
            </div>

            {/* 5 */}
            <div id="pago" className="scroll-mt-28">
              <SectionHeading number="5" title="Forma de pago" />
              <SubHeading>Proveedor de Red de Medios de Pagos.</SubHeading>
              <Para>
                Las transacciones y cobros se procesan a través de Stripe LLC, proveedor externo de servicios de pago. Stripe LLC captura la información de pago y procesa cargos en nombre de Talma Tech, de conformidad con los términos que el Cliente acepte al ingresar sus datos de pago.
              </Para>
              <SubHeading>Responsabilidades en el pago a través de terceros.</SubHeading>
              <Para>Talma Tech utilizará los servicios de Stripe LLC para gestionar cobros; no obstante:</Para>
              <div className="ml-4 space-y-2 my-3">
                <AlphaItem letter="a">Talma Tech no se responsabiliza por errores operativos o incidentes técnicos originados por el proveedor de pagos.</AlphaItem>
                <AlphaItem letter="b">En caso de cobros indebidos o controversias derivadas de la ejecución de pagos por parte de Stripe LLC, el Cliente deberá notificar a Talma Tech para que se investigue y procese la corrección o reembolso conforme a las políticas internas y a la normativa aplicable. Talma Tech se compromete a colaborar y, en su caso, gestionar ajustes o reembolsos razonables cuando correspondan y se compruebe el error.</AlphaItem>
              </div>
              <SubHeading>Activación a través de pagos manuales.</SubHeading>
              <Para>
                Talma Tech ofrece soluciones adaptables a las necesidades de sus clientes. Por ello, facilita la opción de realizar los pagos correspondientes a los planes contratados de servicio de manera directa a la cuenta bancaria que se designen.
              </Para>
              <Para>
                El servicio de la Plataforma será proporcionado de la misma manera en la que se proporciona a los clientes que opten por la opción de pagos a través de terceros. No obstante:
              </Para>
              <div className="ml-4 space-y-2 my-3">
                <AlphaItem letter="a">Talma Tech no se responsabiliza por errores originados por el cliente.</AlphaItem>
                <AlphaItem letter="b">En caso de cobros indebidos o controversias derivadas de la ejecución de pagos por parte de Talma Tech, el Cliente deberá notificar a Talma Tech para que se investigue y procese la corrección o reembolso conforme a las políticas internas y a la normativa aplicable. Talma Tech se compromete a colaborar y, en su caso, gestionar ajustes o reembolsos razonables cuando correspondan y se compruebe el error.</AlphaItem>
              </div>
              <SubHeading>Facturación y comprobantes.</SubHeading>
              <Para>
                Talma Tech expedirá el comprobante correspondiente cuando el Cliente adquiera cualquier plan en la modalidad deseada. Para la emisión de su Comprobante Comprobante Fiscal Digital por Internet, el Cliente debe notificar por correo electrónico a{" "}
                <a href="mailto:contacto@talmatech.com" className="text-brand-red font-medium hover:underline">
                  contacto@talmatech.com
                </a>
                , que desea la emisión del mismo, por lo que deberá adjuntar en dicho correo electrónico su constancia de sitaución fiscal.
              </Para>
            </div>

            {/* 6 */}
            <div id="cancelacion" className="scroll-mt-28">
              <SectionHeading number="6" title="Cancelación y suspensión del servicio" />
              <SubHeading>Cancelación por parte del Cliente.</SubHeading>
              <Para>
                El Cliente puede solicitar la cancelación del servicio en cualquier momento. La cancelación producirá efectos al terminar el periodo de facturación vigente, por ejemplo, si se cancela a la mitad del mes, el servicio continuará activo hasta el fin del mes contratado y no habrá reembolso por la porción no utilizada..
              </Para>
            </div>

            {/* 7 */}
            <div id="privacidad" className="scroll-mt-28">
              <SectionHeading number="7" title="Aviso de privacidad y tratamiento de datos personales" />
              <SubHeading>Tratamiento de datos personales.</SubHeading>
              <Para>
                Talma Tech tratará los datos personales recabados durante la prestación del Servicio conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su normativa secundaria. El uso y tratamiento de datos se rige por el Aviso de Privacidad publicado por Talma Tech, al que el Cliente y los titulares deberán remitirse para conocer finalidades, categorías de datos, derechos ARCO y mecanismos de ejercicio. Puedes consultar el Aviso de Privacidad{" "}
                <Link to="/privacidad" className="text-brand-red font-medium hover:underline">
                  aquí
                </Link>.
              </Para>
              <SubHeading>Acceso a datos por parte del Cliente.</SubHeading>
              <Para>
                El Cliente, como responsable de la información de su propio entorno, podrá integrar y administrar datos de denunciantes, contratantes y cualquier información que reciba a través del canal. Talma Tech únicamente actúa como proveedor tecnológico y, salvo en los servicios con asesoría donde se prevea expresamente lo contrario, no asume responsabilidad por el contenido o veracidad de las denuncias ni por las decisiones que adopte el Cliente.
              </Para>
              <SubHeading>Enlace al aviso de privacidad.</SubHeading>
              <Para>
                El Aviso de Privacidad de Talma Tech estará disponible en la Plataforma y deberá ser consultado por los usuarios para efectos de información y ejercicio de derechos.
              </Para>
            </div>

            {/* 8 */}
            <div id="uso" className="scroll-mt-28">
              <SectionHeading number="8" title="Uso permitido y restricciones" />
              <SubHeading>Uso permitido.</SubHeading>
              <Para>
                El Cliente y los usuarios autorizados podrán utilizar la Plataforma de conformidad con su propósito legítimo: recepción y gestión de denuncias, seguimiento de casos, generación de reportes y uso de las herramientas ofrecidas por el plan contratado.
              </Para>
              <SubHeading>Usos prohibidos.</SubHeading>
              <Para>Queda prohibido, sin limitación, que el Cliente o usuarios:</Para>
              <div className="ml-4 space-y-2 my-3">
                <AlphaItem letter="a">Utilicen la Plataforma para actividades ilícitas, fraudulentas o que violen derechos de terceros;</AlphaItem>
                <AlphaItem letter="b">Remitan, almacenen o difundan material que constituya acoso, extorsión, amenazas, pornografía infantil, discriminación o que infrinja la ley;</AlphaItem>
                <AlphaItem letter="c">Intenten vulnerar, descompilar, desensamblar o realizar ingeniería inversa sobre la Plataforma;</AlphaItem>
                <AlphaItem letter="d">Introduzcan virus, malware, o cualquier código que dañe o impida el funcionamiento de la Plataforma;</AlphaItem>
                <AlphaItem letter="e">Accedan o traten datos que excedan las finalidades contratadas o que formen parte de información sensible sin autorización y sin las condiciones legales aplicables.</AlphaItem>
              </div>
              <Para>
                El incumplimiento de estas prohibiciones dará lugar a la suspensión inmediata del servicio y podrá implicar la terminación del contrato y la adopción de acciones legales.
              </Para>
              <SubHeading>Advertencia sobre denuncias anónimas.</SubHeading>
              <Para>
                Las denuncias anónimas pueden limitar la capacidad de investigación y verificación de hechos. Talma Tech no garantiza resultados o la materialización de acciones derivadas de denuncias anónimas; la gestión de la investigación y la toma de decisiones corresponde al Cliente cuando sea el caso.
              </Para>
            </div>

            {/* 9 */}
            <div id="propiedad" className="scroll-mt-28">
              <SectionHeading number="9" title="Propiedad intelectual y contenidos" />
              <SubHeading>Propiedad de la Plataforma.</SubHeading>
              <Para>
                Los derechos de propiedad intelectual relacionados con la Plataforma, su software, diseño, logos, interfaces y documentación pertenecen a Talma Tech. El Cliente opera en la Plataforma bajo un usuario determinado con un rol específico, de conformidad estos Términos y Condiciones y al plan contratado.
              </Para>
            </div>

            {/* 10 */}
            <div id="responsabilidad" className="scroll-mt-28">
              <SectionHeading number="10" title="Limitación de responsabilidad" />
              <SubHeading>Exclusiones.</SubHeading>
              <Para>
                En la máxima medida permitida por la ley, Talma Tech no será responsable por daños indirectos, lucro cesante, pérdida de datos o cualquier daño emergente derivado del uso o la imposibilidad de uso de la Plataforma, salvo en caso de dolo.
              </Para>
              <SubHeading>Responsabilidad por denuncias.</SubHeading>
              <Para>
                Talma Tech no asume responsabilidad por la veracidad de la información proporcionada por denunciantes ni por las decisiones que adopte el Cliente con base en la información recabada a través de la Plataforma.
              </Para>
              <SubHeading>Límites de garantía.</SubHeading>
              <Para>
                Talma Tech no garantiza que la Plataforma cumplirá ininterrumpidamente sin errores; sin embargo, implementará esfuerzos razonables para mantener la disponibilidad y corregir fallos conforme a las condiciones técnicas y operativas acordadas.
              </Para>
            </div>

            {/* 11 */}
            <div id="notificaciones" className="scroll-mt-28">
              <SectionHeading number="11" title="Notificaciones y comunicaciones" />
              <SubHeading>Dirección de notificaciones.</SubHeading>
              <Para>
                Las notificaciones relacionadas con la contratación, facturación y cuestiones técnicas se realizarán a las direcciones electrónicas y/o domicilios que el Cliente haya registrado en la Plataforma. El correo de contacto y el domicilio de Talma Tech se publicarán en la Plataforma y en el Aviso de Privacidad.
              </Para>
              <SubHeading>Consentimiento para comunicaciones.</SubHeading>
              <Para>
                El Cliente acepta recibir comunicaciones relativas a la prestación del servicio, novedades, incidencias y facturación a las direcciones registradas.
              </Para>
            </div>

            {/* 12 */}
            <div id="legislacion" className="scroll-mt-28">
              <SectionHeading number="12" title="Legislación aplicable y jurisdicción" />
              <Para>
                Estos Términos y Condiciones se regirán e interpretarán de conformidad con las leyes aplicables en los Estados Unidos Mexicanos. Para la solución de cualquier controversia derivada de la interpretación o ejecución de estos Términos y Condiciones y prestación del Servicio, las partes se someten a los Tribunales competentes de la Ciudad de México, renunciando expresamente a cualquier otra jurisdicción que pudiera corresponderles por razón de sus domicilios presentes o futuros.
              </Para>
            </div>

            {/* 13 */}
            <div id="vigencia" className="scroll-mt-28">
              <SectionHeading number="13" title="Vigencia y modificaciones" />
              <SubHeading>Vigencia.</SubHeading>
              <Para>
                Estos Términos y Condiciones entran en vigor desde la fecha de su publicación.
              </Para>
              <SubHeading>Modificaciones.</SubHeading>
              <Para>
                Talma Tech podrá modificar estos Términos y Condiciones en cualquier momento por razones operativas, legales o de producto. Las modificaciones se publicarán en la Plataforma y, cuando afecten condiciones, Talma Tech notificará a los Clientes con la antelación razonable que corresponda.
              </Para>
            </div>

            {/* 14 */}
            <div id="disposiciones" className="scroll-mt-28">
              <SectionHeading number="14" title="Disposiciones finales." />
              <SubHeading>Separabilidad.</SubHeading>
              <Para>
                Si alguna disposición de estos Términos y Condiciones fuera afectada de nulidad absoluta, las demás disposiciones permanecerán vigentes.
              </Para>
              <SubHeading>Acuerdo completo.</SubHeading>
              <Para>
                Estos Términos y la documentación vinculada constituyen el acuerdo íntegro entre las partes en relación con el Servicio.
              </Para>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TermsPage() {
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