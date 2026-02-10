// src/pages/PrivacyPage.tsx
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
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
          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Aviso de Privacidad de Talma Tech
          </h1>
          <p className="text-lg text-brand-red italic">
            "Los datos personales son privados en el trabajo y en cualquier lugar"
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            
            {/* Responsable */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                Responsable y ámbito de aplicación
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Julián Catalán Alcalá y Marco José Arellano Sánchez (los "Responsables"), con domicilio en Anillo Periférico Boulevard Adolfo López Mateos 4829, Parques del Pedregal, Tlalpan, 14010, Ciudad de México, son responsable del tratamiento de los datos personales recabados a través de la plataforma digital Talma Tech ("Plataforma" o "Talma Tech"), así como de los medios, módulos y servicios conectados a la Plataforma.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Este aviso de privacidad se aplica a los datos personales que los Responsables recaben, utilicen, conserven y traten directa o indirectamente a través de Talma Tech y mediante cualquier medio electrónico, óptico, sonoro o visual, conforme a lo previsto en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares ("LFPDPPP").
              </p>
              <p className="text-gray-700 leading-relaxed">
                Asimismo, la LFPDPPPP dispone que los Responsables debe poner a disposición de las personas titulares el aviso de privacidad y regula la forma en que debe entregarse cuando los datos se obtengan por medios electrónicos o digitales. Por ello, este aviso será accesible públicamente y se encontrará visible en la página de inicio de Talma Tech para consulta previa y permanente.
              </p>
            </div>

            {/* Objetivo */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                Objetivo de Talma Tech y finalidades del tratamiento
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Talma Tech es una plataforma digital de Compliance diseñada para que personas morales gestionen y supervisen su cumplimiento normativo en tiempo real. En su etapa inicial, la Plataforma ofrece una solución tecnológica que permite a clientes disponer de un canal de denuncias para recibir reportes, quejas u observaciones por parte de personas trabajadoras, clientes, proveedores o externos.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-3">
                Los datos personales se recaban y tratan para las siguientes finalidades primarias (necesarias para la prestación del servicio):
              </p>
              <div className="p-6 my-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-brand-red shrink-0 mt-2"></div>
                    <span>Registrar y administrar cuentas de usuario y perfiles institucionales;</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-brand-red shrink-0 mt-2"></div>
                    <span>Gestionar y documentar procesos de cumplimiento normativo limitándose a lo relacionado con la gestión de canales de denuncia;</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-brand-red shrink-0 mt-2"></div>
                    <span>Verificación de identidad y autenticación de usuarios;</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-brand-red shrink-0 mt-2"></div>
                    <span>Cumplimiento de obligaciones legales y regulatorias aplicables a los clientes de Talma Tech.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-brand-red shrink-0 mt-2"></div>
                    <span>Recepción, registro, atención e investigación de denuncias.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-brand-red shrink-0 mt-2"></div>
                    <span>Comunicación con la persona denunciante o con el contratante cuando sea necesario para el seguimiento del reporte.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-brand-red shrink-0 mt-2"></div>
                    <span>Integración y conservación de expedientes relacionados con la denuncia para efectos de cumplimiento interno o para atender requerimientos legales o regulatorios del cliente.</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-3">
                Finalidades secundarias (no esenciales para la prestación directa del servicio y sujetas a opciones del titular):
              </p>
              <div className="p-6 my-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 shrink-0 mt-2"></div>
                    <span>Análisis estadístico y mejora de la Plataforma;</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 shrink-0 mt-2"></div>
                    <span>Envío de comunicaciones institucionales o informativas acerca de actualizaciones del servicio;</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed text-sm">
                Las finalidades que requieran un consentimiento específico se identificarán de forma clara en el momento de la recolección y en el aviso simplificado conforme a la ley.
              </p>
            </div>

            {/* Datos recabados */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                Categorías y ejemplos de datos personales recabados
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                De acuerdo con la relación jurídica y la funcionalidad utilizada, Talma Tech podrá recabar de manera enunciativa más no limitativa las siguientes categorías de datos:
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-black mb-3">a) Personas contratantes del servicios:</h3>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black shrink-0 mt-2"></div>
                      <span>Datos de identificación y contacto: Nombre, domicilio, correo electrónico, teléfono.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black shrink-0 mt-2"></div>
                      <span>Datos de identidad oficiales: Registro Federal de Contribuyentes.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black shrink-0 mt-2"></div>
                      <span>Datos laborales y administrativos: Puesto, área.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black shrink-0 mt-2"></div>
                      <span>Documentación bancaria: Número de cuenta, número de CLABE, nombre del beneficiario, entidad bancaria.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-black mb-3">b) Personas denunciantes:</h3>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black shrink-0 mt-2"></div>
                      <span>Datos de identificación y contacto (si los proporcionan): Nombre, domicilio, correo electrónico, teléfono, edad, lugar de trabajo.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black shrink-0 mt-2"></div>
                      <span>Datos de identidad oficiales (si los proporcionan): Registro Federal de Contribuyentes, INE.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-black mb-3">c) Otros datos:</h3>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-black shrink-0 mt-2"></div>
                      <span>Datos técnicos: Correo electrónico, tipo de usuario, e identificadores de sesión (JWT en cookies)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-sm text-gray-700">
                    Talma Tech no recaba datos personales sensibles de forma rutinaria. En el supuesto excepcional de que se requiera tratamiento de datos sensibles, tales como salud, afiliación sindical, origen étnico u otros, esto se hará únicamente cuando sea estrictamente necesario, con fundamento legal y consentimiento reforzado, aplicando medidas de protección adicionales conforme a la LFPDPPP.
                  </p>
                </div>
              </div>
            </div>

            {/* Fundamento jurídico */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                Fundamento jurídico del tratamiento
              </h2>
              <p className="text-gray-700 leading-relaxed">
                El tratamiento de datos personales se realizará con base en: (i) el consentimiento del titular cuando la finalidad lo exija; (ii) la ejecución de un contrato o relación jurídica entre la persona contratante y los Responsables; (iii) el cumplimiento de obligaciones legales y regulatorias aplicables al cliente usuario; y (iv) los demás fundamentos previstos por la LFPDPPP y su Reglamento.
              </p>
            </div>

            {/* Derechos ARCO */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                Derechos Acceso, Rectificación, Cancelación u Oposición.
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Los titulares podrán ejercer los derechos de Acceso, Rectificación, Cancelación u Oposición ("ARCO"), así como revocar el consentimiento cuando proceda, en los términos de la LFPDPPP. Por disposición legal, la solicitud de ejercicio de derechos deberá contener los requisitos mínimos que permiten identificar al solicitante y localizar los datos.
              </p>
              
              <div className="p-6">
                <p className="text-gray-700 mb-2">
                  Medio para ejercer derechos ARCO: correo electrónico <a 
                    href="mailto:contacto@talmatech.com" 
                    className="text-brand-red font-bold hover:text-brand-red/80 transition-colors"
                  >
                    contacto@talmatech.com
                  </a>.
                </p>
                <p className="text-gray-700 mb-4">
                  Los Responsables notificarán al titular la procedencia o no de la solicitud en un plazo máximo de 20 días hábiles, y en caso de ser procedente, dará cumplimiento en los 15 días hábiles siguientes, de conformidad con lo establecido en la LFPDPPP. Si se requiere ampliación, podrá hacerse una sola vez y por un periodo igual cuando las circunstancias lo justifiquen.
                </p>
                <p className="text-gray-700 text-sm">
                  Las solicitudes ARCO serán atendidas con trato sensible y confidencial; al presentarlas, el área de protección de datos podrá requerir documentación que acredite la identidad o representación del solicitante, conforme al procedimiento establecido en el aviso.
                </p>
              </div>
            </div>

            {/* Transferencias */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                Transferencias y tratamiento con terceros.
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Con el objeto de almacenar la información de la Plataforma, los Responsables podrán transferir o alojar datos personales en proveedores de servicios tecnológicos, entre ellos, servicios de cómputo en la nube. En particular, se resguardará el contenido e infraestructura de la Plataforma en servidores de Hostinger, AWS y Supabase para almacenamiento, procesamiento y continuidad operativa.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Un servidor es el sistema físico o virtual que almacena, procesa y transmite datos para la operación de servicios digitales. Cuando se contrata un proveedor de Hostinger AWS y Supabase, estos actúan como encargados del tratamiento de conformidad con los términos contractuales aplicables, y los Responsables continúan siéndolo en términos de la LFPDPPP, debiendo asegurarse de que el encargado observe las medidas de seguridad y obligaciones previstas por la ley.
              </p>
              <p className="text-gray-700 leading-relaxed text-sm">
                Este aviso informa expresamente que se podrán realizar transferencias a proveedores de Hostinger. La identificación de terceros concretos y las finalidades específicas de la transferencia serán detalladas en la versión integral del aviso y en los anexos contractuales correspondientes.
              </p>
            </div>

            {/* Medidas de seguridad */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                Medidas de seguridad
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Los Responsables implementan medidas de seguridad administrativas, técnicas y físicas razonables y proporcionales para proteger los datos personales contra daño, pérdida, alteración, destrucción, acceso o tratamiento no autorizado. Estas medidas incluyen controles de acceso, cifrado en tránsito y en reposo cuando proceda, registros de auditoría y procedimientos de respuesta a incidentes.
              </p>
            </div>

            {/* Conservación de datos */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                Conservación de datos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Los datos personales se conservarán durante el tiempo necesario para cumplir las finalidades para las que fueron recabados, así como para cumplir obligaciones legales y/o contractuales aplicables. Cuando el dato deje de ser necesario, se dispondrá su supresión conforme a criterio jurídico y administrativo y a las políticas internas de retención que se establezcan y publiquen en la versión integral del aviso.
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                Cookies y tecnologías de rastreo
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Talma Tech utiliza cookies y tecnologías similares para fines funcionales, analíticos y, en su caso, de personalización. Las cookies de autenticación esenciales son necesarias para la operación de la Plataforma; otras cookies requerirán información clara y, cuando aplique, consentimiento previo y granular por parte del usuario.
              </p>
            </div>

            {/* Términos y condiciones */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                Términos y condiciones
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Además del aviso de privacidad, Talma Tech contará con Términos y Condiciones que regirán el acceso y uso de la Plataforma, tales como la contratación, obligaciones del usuario, limitación de responsabilidad, propiedad intelectual, jurisdicción, entre otros. Los Términos estarán disponibles en el sitio y deberán ser aceptados por los usuarios cuando así proceda.
              </p>
            </div>

            {/* Cambios al aviso */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                Cambios al aviso y versión pública
              </h2>
              <p className="text-gray-700 leading-relaxed">
                La versión integral de este aviso se publicará en la página de inicio de Talma Tech y en un enlace de fácil acceso para todos los usuarios. Cualquier modificación se comunicará mediante la publicación de la nueva versión en el sitio y, cuando legalmente proceda, mediante notificación directa a los titulares.
              </p>
            </div>

            {/* Contacto */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-gray-100">
                Contacto
              </h2>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Para cualquier duda, aclaración o ejercicio de derechos ARCO: <a href="mailto:contacto@talmatech.com" className="text-brand-red font-medium hover:underline">contacto@talmatech.com</a>. Responsable: Julián Catalán Alcalá y Marco José Arellano Sánchez. Domicilio: Anillo Periférico Boulevard Adolfo López Mateos 4829, Parques del Pedregal, Tlalpan, 14010, Ciudad de México.
                </p>
                <p className="text-gray-700 text-sm">
                  Correos contacto de Talma Tech: <a href="mailto:contacto@talmatech.com" className="text-brand-red font-medium hover:underline">contacto@talmatech.com</a>, <a href="mailto:soporte@talmatech.com" className="text-brand-red font-medium hover:underline">soporte@talmatech.com</a>.
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