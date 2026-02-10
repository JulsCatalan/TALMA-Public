// src/components/SolutionsSection.tsx
import { CheckCircle2, FileText, GraduationCap, ClipboardCheck } from 'lucide-react';

export default function SolutionsSection() {
  return (
    <section id="soluciones" className="py-24 px-6 lg:px-8 bg-brand-bone/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-black">
            Cumplimiento integral para tu empresa
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Herramientas profesionales diseñadas para simplificar el cumplimiento normativo
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Solution 1 - Active */}
          <div className="border-2 border-brand-red bg-gradient-to-b from-brand-red/5 to-white p-10 hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1 bg-brand-red text-white text-xs font-bold">
              DISPONIBLE
            </div>
            <div className="mb-8 mt-4">
              <div className="w-12 h-12 bg-brand-red flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-black">Canal de Denuncias</h3>
              <p className="text-gray-600 leading-relaxed">
                Sistema completo de gestión de denuncias con investigación profesional y reportes legales elaborados por abogados especialistas.
              </p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-sm text-gray-700">
                <div className="w-5 h-5 bg-brand-red flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-white"></div>
                </div>
                <span>URL personalizada para tu empresa</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700">
                <div className="w-5 h-5 bg-brand-red flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-white"></div>
                </div>
                <span>Denuncias anónimas con código de seguimiento</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700">
                <div className="w-5 h-5 bg-brand-red flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-white"></div>
                </div>
                <span>Investigación legal profesional incluida</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700">
                <div className="w-5 h-5 bg-brand-red flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-white"></div>
                </div>
                <span>Reportes y dictámenes legales</span>
              </li>
            </ul>

            <a 
              href="https://cliente.talmatech.com/registro" 
              className="block w-full text-center py-4 bg-brand-red text-white font-bold hover:bg-brand-red/90 transition-all"
            >
              Comenzar ahora
            </a>
          </div>

          {/* Solution 2 - Coming Soon */}
          <div className="border-2 border-gray-200 bg-gray-50 p-10 relative opacity-75">
            <div className="absolute top-0 right-0 px-4 py-1 bg-black text-white text-xs font-bold">
              PRÓXIMAMENTE
            </div>
            <div className="mb-8 mt-4">
              <div className="w-12 h-12 bg-gray-300 flex items-center justify-center mb-6">
                <GraduationCap className="w-7 h-7 text-gray-600" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-black">Capacitaciones</h3>
              <p className="text-gray-600 leading-relaxed">
                Cursos online para tu personal sobre prevención de riesgos, ética empresarial y cumplimiento normativo.
              </p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <span>Biblioteca de cursos especializados</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <span>Certificados de completación</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <span>Seguimiento de progreso</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <span>Contenido actualizado constantemente</span>
              </li>
            </ul>

            <button 
              disabled
              className="block w-full text-center py-4 bg-gray-300 text-gray-600 font-bold cursor-not-allowed"
            >
              Próximamente
            </button>
          </div>

          {/* Solution 3 - Coming Soon */}
          <div className="border-2 border-gray-200 bg-gray-50 p-10 relative opacity-75">
            <div className="absolute top-0 right-0 px-4 py-1 bg-black text-white text-xs font-bold">
              PRÓXIMAMENTE
            </div>
            <div className="mb-8 mt-4">
              <div className="w-12 h-12 bg-gray-300 flex items-center justify-center mb-6">
                <ClipboardCheck className="w-7 h-7 text-gray-600" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-black">Auditorías</h3>
              <p className="text-gray-600 leading-relaxed">
                Sistema avanzado de gestión documental y auditorías automatizadas para cumplimiento normativo continuo.
              </p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <span>Gestión de políticas internas</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <span>Control de contratos y documentos</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <span>Auditorías automatizadas</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <span>Alertas de vencimientos</span>
              </li>
            </ul>

            <button 
              disabled
              className="block w-full text-center py-4 bg-gray-300 text-gray-600 font-bold cursor-not-allowed"
            >
              Próximamente
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}