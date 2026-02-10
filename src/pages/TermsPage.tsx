// src/pages/TermsPage.tsx
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-red flex items-center justify-center">
                <img src="/talma-logo.webp" alt="Talma Tech Logo" className="object-center object-contain"/>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-brand-red">TALMA</span>
                <span className="text-xl font-bold tracking-tight text-black">TECH</span>
              </div>
            </Link>

            <Link 
              to="/" 
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-red transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 px-6 lg:px-8 bg-linear-to-b from-brand-bone/20 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            Términos y Condiciones de Uso de Talma Tech
          </h1>
          <p className="text-sm text-gray-500">
            Última actualización: 9/02/2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            
            {/* 1. Introducción */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                1. Introducción
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Estos Términos y Condiciones de Uso (los "Términos y Condiciones") regulan el acceso, contratación y uso del servicio digital Talma Tech (el "Servicio" o la "Plataforma"), operado y prestado por las personas físicas Julián Catalán Alcalá y Marco José Arellano Sánchez (en adelante, los "Prestadores" o colectivamente "Talma Tech").
              </p>
              <p className="text-gray-700 leading-relaxed">
                Los presentes Términos y Condiciones tienen por objeto establecer las condiciones bajo las cuales los clientes podrán contratar y utilizar el Servicio. Al contratar, registrarse o utilizar la Plataforma, el cliente acepta quedar sujeto a estos Términos y Condiciones en su versión vigente.
              </p>
            </div>

            {/* 2. Partes y Alcance del Servicio */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                2. Partes y Alcance del Servicio
              </h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Partes.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Las partes dentro de la prestación del Servicio son, por un lado, los Prestadores y, por otro, la persona física o moral que contrata el Servicio ("Cliente").
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Objeto.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Talma Tech ofrece soluciones tecnológicas orientadas a la gestión de canales de denuncias y, en etapas posteriores, otros servicios digitales de cumplimiento normativo. En la etapa inicial, el Servicio consiste en la puesta a disposición de un canal de denuncias que el Cliente puede implementar en sus instalaciones adaptada a sus necesidades.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black mb-2">Conocimiento del Cliente.</h3>
                <p className="text-gray-700 leading-relaxed">
                  El Cliente declara conocer la naturaleza, alcances y limitaciones del Servicio, así como las funcionalidades contratadas, y afirma contar con la capacidad y facultades necesarias para contratar y utilizar la Plataforma.
                </p>
              </div>
            </div>

            {/* 3. De los Servicios */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                3. De los Servicios
              </h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-black mb-3">Modalidades generales.</h3>
                <p className="text-gray-700 leading-relaxed mb-3">Los servicios se ofrecen en dos modalidades principales:</p>
                <div className="p-6">
                  <p className="text-gray-700 mb-2">
                    <strong>Servicios sin asesoría:</strong> acceso al uso de la Plataforma y sus herramientas configurables por el Cliente. Planes: Starter, Avanzado y Premium.
                  </p>
                  <p className="text-gray-700">
                    <strong>Servicios con asesoría:</strong> además del acceso a la Plataforma, incluyen servicios profesionales de Talma Tech relativos al cumplimiento normativo, análisis y asesoría. Planes: Starter, Pro, Avanzado y Premium.
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Diferencias entre modalidades.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Las diferencias entre planes incluyen el número de usuarios administradores permitidos; funciones avanzadas de integración y alcance de la asesoría profesional. Las características concretas de cada plan se describen en la ficha técnica asociada al plan contratado.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Alcance funcional de los servicios sin asesoría.</h3>
                <p className="text-gray-700 leading-relaxed">
                  El Cliente puede utilizar la Plataforma para configurar cuestionarios, canales de denuncia, formularios y reglas internas conforme a sus necesidades. Talma Tech pone a disposición las herramientas; la configuración operativa y el contenido son responsabilidad del Cliente salvo pacto en contrario.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black mb-2">Alcance funcional de los servicios con asesoría.</h3>
                <p className="text-gray-700 leading-relaxed">
                  En los planes con asesoría, Talma Tech presta apoyo profesional que puede incluir: emisión de opiniones de cumplimiento, análisis y propuestas técnicas para el diseño de canales de denuncias, recomendaciones sobre investigación de incidentes y apoyo en la formulación de protocolos internos. Salvo que expresamente se acuerde por escrito, las opiniones y recomendaciones no constituyen representación legal ni sustituyen asesoría jurídica externa especializada del Cliente.
                </p>
              </div>
            </div>

            {/* 4. Precios, facturación y planes */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                4. Precios, facturación y planes.
              </h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Estructura de precios.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Los precios varían según la modalida, el plan seleccionado y el periodo de facturación. Los precios y las condiciones comerciales aplicables a cada plan se muestran en la oferta comercial vigente al momento de la contratación.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Opciones de facturación.</h3>
                <p className="text-gray-700 leading-relaxed">
                  El Cliente puede optar por facturación mensual o anual según lo disponible en la oferta. Las suscripciones anuales pueden incluir descuentos o beneficios específicos conforme a la promoción vigente.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Usuarios administradores.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Cada plan incluye un número máximo de usuarios con rol de administrador, es decir, con capacidad para configurar y gestionar el canal. Si el Cliente requiere más usuarios administradores que los contemplados en su plan.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Actualización de plan.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Si el Cliente solicita una actualiazción a un plan superior durante un periodo de facturación ya iniciado, Talma Tech habilitará inmediatamente las funcionalidades del plan superior en la Plataforma. El cobro correspondiente al nuevo plan comenzará a aplicarse a partir del siguiente periodo de facturación, es decir, no se prorratea ni se factura de forma retroactiva en el mismo ciclo; el Cliente disfrutará del servicio del plan superior desde el momento del cambio hasta el fin del periodo pagado, y el nuevo cobro se realizará en el siguiente ciclo.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Reducciones de plan.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Si el Cliente solicita una actualización un plan inferior, el cambio de cobro se hará efectivo a partir del siguiente periodo de facturación. Para garantizar la operatividad del Cliente en el nuevo plan, éste deberá designar y confirmar los usuarios administradores que permanecerán activos dentro del límite del plan inferior. Talma Tech podrá suspender o limitar funcionalidades que excedan las capacidades del plan hasta que el Cliente realice la correcta designación de administradores y ajuste de usuarios conforme al nuevo plan.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black mb-2">Política de modificaciones.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Cualquier cambio solicitado por el Cliente que implique configuración técnica de Talma Tech podrá estar sujeto a condiciones técnicas y plazos de implementación. Los cambios no liberan al Cliente de las obligaciones de pago correspondientes al periodo en curso.
                </p>
              </div>
            </div>

            {/* 5. Forma de pago */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                5. Forma de pago
              </h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Proveedor de Red de Medios de Pagos.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Las transacciones y cobros se procesan a través de Stripe LLC, proveedor externo de servicios de pago. Stripe LLC captura la información de pago y procesa cargos en nombre de Talma Tech, de conformidad con los términos que el Cliente acepte al ingresar sus datos de pago.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Responsabilidades en el pago a través de terceros.</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Talma Tech utilizará los servicios de Stripe LLC para gestionar cobros; no obstante:
                </p>
                <div className="ml-4 space-y-2 text-gray-700">
                  <p>a) Talma Tech no se responsabiliza por errores operativos o incidentes técnicos originados por el proveedor de pagos.</p>
                  <p>b) En caso de cobros indebidos o controversias derivadas de la ejecución de pagos por parte de Stripe LLC, el Cliente deberá notificar a Talma Tech para que se investigue y procese la corrección o reembolso conforme a las políticas internas y a la normativa aplicable. Talma Tech se compromete a colaborar y, en su caso, gestionar ajustes o reembolsos razonables cuando correspondan y se compruebe el error.</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Activación a través de pagos manuales.</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Talma Tech ofrece soluciones adaptables a las necesidades de sus clientes. Por ello, facilita la opción de realizar los pagos correspondientes a los planes contratados de servicio de manera directa a la cuenta bancaria que se designen.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">
                  El servicio de la Plataforma será proporcionado de la misma manera en la que se proporciona a los clientes que opten por la opción de pagos a través de terceros. No obstante:
                </p>
                <div className="ml-4 space-y-2 text-gray-700">
                  <p>a) Talma Tech no se responsabiliza por errores originados por el cliente.</p>
                  <p>b) En caso de cobros indebidos o controversias derivadas de la ejecución de pagos por parte de Talma Tech, el Cliente deberá notificar a Talma Tech para que se investigue y procese la corrección o reembolso conforme a las políticas internas y a la normativa aplicable. Talma Tech se compromete a colaborar y, en su caso, gestionar ajustes o reembolsos razonables cuando correspondan y se compruebe el error.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black mb-2">Facturación y comprobantes.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Talma Tech expedirá el comprobante correspondiente cuando el Cliente adquiera cualquier plan en la modalidad deseada. Para la emisión de su Comprobante Comprobante Fiscal Digital por Internet, el Cliente debe notificar por correo electrónico a <a href="mailto:contacto@talmatech.com" className="text-brand-red font-medium hover:underline">contacto@talmatech.com</a>, que desea la emisión del mismo, por lo que deberá adjuntar en dicho correo electrónico su constancia de sitaución fiscal.
                </p>
              </div>
            </div>

            {/* 6. Cancelación y suspensión del servicio */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                6. Cancelación y suspensión del servicio
              </h2>
              
              <div>
                <h3 className="text-lg font-bold text-black mb-2">Cancelación por parte del Cliente.</h3>
                <p className="text-gray-700 leading-relaxed">
                  El Cliente puede solicitar la cancelación del servicio en cualquier momento. La cancelación producirá efectos al terminar el periodo de facturación vigente, por ejemplo, si se cancela a la mitad del mes, el servicio continuará activo hasta el fin del mes contratado y no habrá reembolso por la porción no utilizada..
                </p>
              </div>
            </div>

            {/* 7. Aviso de privacidad y tratamiento de datos personales */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                7. Aviso de privacidad y tratamiento de datos personales
              </h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Tratamiento de datos personales.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Talma Tech tratará los datos personales recabados durante la prestación del Servicio conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su normativa secundaria. El uso y tratamiento de datos se rige por el Aviso de Privacidad publicado por Talma Tech, al que el Cliente y los titulares deberán remitirse para conocer finalidades, categorías de datos, derechos ARCO y mecanismos de ejercicio. Puedes consultar el Aviso de Privacidad <Link to="/privacidad" className="text-brand-red font-medium hover:underline">aquí</Link>.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Acceso a datos por parte del Cliente.</h3>
                <p className="text-gray-700 leading-relaxed">
                  El Cliente, como responsable de la información de su propio entorno, podrá integrar y administrar datos de denunciantes, contratantes y cualquier información que reciba a través del canal. Talma Tech únicamente actúa como proveedor tecnológico y, salvo en los servicios con asesoría donde se prevea expresamente lo contrario, no asume responsabilidad por el contenido o veracidad de las denuncias ni por las decisiones que adopte el Cliente.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black mb-2">Enlace al aviso de privacidad.</h3>
                <p className="text-gray-700 leading-relaxed">
                  El Aviso de Privacidad de Talma Tech estará disponible en la Plataforma y deberá ser consultado por los usuarios para efectos de información y ejercicio de derechos.
                </p>
              </div>
            </div>

            {/* 8. Uso permitido y restricciones */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                8. Uso permitido y restricciones
              </h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Uso permitido.</h3>
                <p className="text-gray-700 leading-relaxed">
                  El Cliente y los usuarios autorizados podrán utilizar la Plataforma de conformidad con su propósito legítimo: recepción y gestión de denuncias, seguimiento de casos, generación de reportes y uso de las herramientas ofrecidas por el plan contratado.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Usos prohibidos.</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Queda prohibido, sin limitación, que el Cliente o usuarios:
                </p>
                <div className="ml-4 space-y-2 text-gray-700">
                  <p>a) Utilicen la Plataforma para actividades ilícitas, fraudulentas o que violen derechos de terceros;</p>
                  <p>b) Remitan, almacenen o difundan material que constituya acoso, extorsión, amenazas, pornografía infantil, discriminación o que infrinja la ley;</p>
                  <p>c) Intenten vulnerar, descompilar, desensamblar o realizar ingeniería inversa sobre la Plataforma;</p>
                  <p>d) Introduzcan virus, malware, o cualquier código que dañe o impida el funcionamiento de la Plataforma;</p>
                  <p>e) Accedan o traten datos que excedan las finalidades contratadas o que formen parte de información sensible sin autorización y sin las condiciones legales aplicables.</p>
                </div>
                <p className="text-gray-700 leading-relaxed mt-2">
                  El incumplimiento de estas prohibiciones dará lugar a la suspensión inmediata del servicio y podrá implicar la terminación del contrato y la adopción de acciones legales.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black mb-2">Advertencia sobre denuncias anónimas.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Las denuncias anónimas pueden limitar la capacidad de investigación y verificación de hechos. Talma Tech no garantiza resultados o la materialización de acciones derivadas de denuncias anónimas; la gestión de la investigación y la toma de decisiones corresponde al Cliente cuando sea el caso.
                </p>
              </div>
            </div>

            {/* 9. Propiedad intelectual y contenidos */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                9. Propiedad intelectual y contenidos
              </h2>
              
              <div>
                <h3 className="text-lg font-bold text-black mb-2">Propiedad de la Plataforma.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Los derechos de propiedad intelectual relacionados con la Plataforma, su software, diseño, logos, interfaces y documentación pertenecen a Talma Tech. El Cliente opera en la Plataforma bajo un usuario determinado con un rol específico, de conformidad estos Términos y Condiciones y al plan contratado.
                </p>
              </div>
            </div>

            {/* 10. Limitación de responsabilidad */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                10. Limitación de responsabilidad
              </h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Exclusiones.</h3>
                <p className="text-gray-700 leading-relaxed">
                  En la máxima medida permitida por la ley, Talma Tech no será responsable por daños indirectos, lucro cesante, pérdida de datos o cualquier daño emergente derivado del uso o la imposibilidad de uso de la Plataforma, salvo en caso de dolo.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Responsabilidad por denuncias.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Talma Tech no asume responsabilidad por la veracidad de la información proporcionada por denunciantes ni por las decisiones que adopte el Cliente con base en la información recabada a través de la Plataforma.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black mb-2">Límites de garantía.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Talma Tech no garantiza que la Plataforma cumplirá ininterrumpidamente sin errores; sin embargo, implementará esfuerzos razonables para mantener la disponibilidad y corregir fallos conforme a las condiciones técnicas y operativas acordadas.
                </p>
              </div>
            </div>

            {/* 11. Notificaciones y comunicaciones */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                11. Notificaciones y comunicaciones
              </h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Dirección de notificaciones.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Las notificaciones relacionadas con la contratación, facturación y cuestiones técnicas se realizarán a las direcciones electrónicas y/o domicilios que el Cliente haya registrado en la Plataforma. El correo de contacto y el domicilio de Talma Tech se publicarán en la Plataforma y en el Aviso de Privacidad.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black mb-2">Consentimiento para comunicaciones.</h3>
                <p className="text-gray-700 leading-relaxed">
                  El Cliente acepta recibir comunicaciones relativas a la prestación del servicio, novedades, incidencias y facturación a las direcciones registradas.
                </p>
              </div>
            </div>

            {/* 12. Legislación aplicable y jurisdicción */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                12. Legislación aplicable y jurisdicción
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Estos Términos y Condiciones se regirán e interpretarán de conformidad con las leyes aplicables en los Estados Unidos Mexicanos. Para la solución de cualquier controversia derivada de la interpretación o ejecución de estos Términos y Condiciones y prestación del Servicio, las partes se someten a los Tribunales competentes de la Ciudad de México, renunciando expresamente a cualquier otra jurisdicción que pudiera corresponderles por razón de sus domicilios presentes o futuros.
              </p>
            </div>

            {/* 13. Vigencia y modificaciones */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                13. Vigencia y modificaciones
              </h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Vigencia.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Estos Términos y Condiciones entran en vigor desde la fecha de su publicación.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black mb-2">Modificaciones.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Talma Tech podrá modificar estos Términos y Condiciones en cualquier momento por razones operativas, legales o de producto. Las modificaciones se publicarán en la Plataforma y, cuando afecten condiciones, Talma Tech notificará a los Clientes con la antelación razonable que corresponda.
                </p>
              </div>
            </div>

            {/* 14. Disposiciones finales */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                14. Disposiciones finales.
              </h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2">Separabilidad.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Si alguna disposición de estos Términos y Condiciones fuera afectada de nulidad absoluta, las demás disposiciones permanecerán vigentes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-black mb-2">Acuerdo completo.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Estos Términos y la documentación vinculada constituyen el acuerdo íntegro entre las partes en relación con el Servicio.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 bg-brand-bone border-t border-brand-red/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div>
                <span className="font-bold text-brand-red">TALMA</span>
                <span className="font-bold text-black">TECH</span>
              </div>
            </Link>
            <p className="text-sm text-gray-600">
              © 2026 TALMA TECH. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}