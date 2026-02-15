// src/components/HeroSection.tsx
import { ArrowRight, CheckCircle2, FileText } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="pt-32 pb-24 px-6 lg:px-8 bg-gradient-to-b from-brand-bone/20 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight my-12">
            <span className="text-black">Gestión automatizada de</span>
            <br />
            <span className="text-brand-red">canales de denuncias</span>
            <br />
            <span className="text-black">internas, quejas y sugerencias</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            Plataforma integral adaptada a detectar problemas dentro de las organizaciones. 
            Diseñada en cumplimiento con estándares internacionales y nacionales, así como la NOM-035.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a 
              href="https://cliente.talmatech.com/registro" 
              className="inline-flex items-center justify-center px-10 py-5 bg-brand-red text-white text-lg font-semibold hover:bg-brand-red/90 transition-all shadow-lg shadow-brand-red/20 group"
            >
              Comenzar prueba gratuita
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="#como-funciona" 
              className="inline-flex items-center justify-center px-10 py-5 border-2 border-gray-200 text-black text-lg font-semibold hover:border-brand-red hover:text-brand-red transition-all"
            >
              Ver cómo funciona
            </a>
          </div>

          <div className="flex items-center justify-center gap-12 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-red" />
              <span>Adaptable</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-red" />
              <span>Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-red" />
              <span>Preventivo</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-brand-red/10 to-brand-red/5 transform -rotate-1"></div>
            <div className="relative bg-white border-2 border-gray-100 shadow-2xl p-8">
              <p className="text-center text-sm text-gray-500 mb-6 font-medium">
                Dashboard actualizado en tiempo real, con seguimiento continuo y control trazable
              </p>
              {/* Dashboard Preview */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="col-span-2 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-brand-red text-white">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6" />
                      <div>
                        <div className="text-xs opacity-80">DENUNCIA</div>
                        <div className="font-bold text-lg">DEN-2025-00124</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-white/20 text-xs font-bold">
                      EN INVESTIGACIÓN
                    </div>
                  </div>
                  
                  <div className="space-y-3 p-4 border border-gray-100">
                    <div className="h-3 bg-black w-2/3"></div>
                    <div className="h-2 bg-gray-200 w-full"></div>
                    <div className="h-2 bg-gray-200 w-5/6"></div>
                    <div className="h-2 bg-gray-200 w-4/5"></div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-brand-red text-white">
                    <div className="text-4xl font-black mb-1">48</div>
                    <div className="text-xs opacity-90">Total denuncias</div>
                  </div>
                  <div className="p-6 border-2 border-gray-100">
                    <div className="text-4xl font-black text-black mb-1">96%</div>
                    <div className="text-xs text-gray-500">Tasa resolución</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 border border-gray-100">
                  <div className="text-2xl font-bold text-black">12</div>
                  <div className="text-xs text-gray-500 mt-1">Nuevas</div>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-100">
                  <div className="text-2xl font-bold text-black">24</div>
                  <div className="text-xs text-gray-500 mt-1">En proceso</div>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-100">
                  <div className="text-2xl font-bold text-black">10</div>
                  <div className="text-xs text-gray-500 mt-1">Completadas</div>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-100">
                  <div className="text-2xl font-bold text-black">2</div>
                  <div className="text-xs text-gray-500 mt-1">Archivadas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}