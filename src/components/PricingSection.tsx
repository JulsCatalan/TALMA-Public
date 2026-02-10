// src/components/home/PricingSection.tsx
export default function PricingSection() {
  return (
    <section id="precios" className="py-24 px-6 lg:px-8 bg-brand-bone/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-black">
            Planes simples y transparentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Elige la modalidad que mejor se adapte a tu organización
          </p>
        </div>

        {/* Pricing Tables */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Sin Asesoría */}
          <div className="bg-white border-2 border-gray-200 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black mb-2 text-black">Sin Asesoría</h3>
              <p className="text-sm text-gray-600">Gestiona denuncias de forma autónoma</p>
            </div>

            <div className="space-y-3">
              {/* Starter */}
              <div className="border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-black">Starter</span>
                  <span className="text-sm text-gray-500">3 administradores</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-brand-red">Desde $1,199</span>
                  <span className="text-sm text-gray-500">MXN/mes</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  o desde $12,230 MXN/año
                </div>
              </div>

              {/* Avanzado */}
              <div className="border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-black">Avanzado</span>
                  <span className="text-sm text-gray-500">8 administradores</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-brand-red">Desde $2,749</span>
                  <span className="text-sm text-gray-500">MXN/mes</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  o desde $28,040 MXN/año
                </div>
              </div>

              {/* Premium */}
              <div className="border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-black">Premium</span>
                  <span className="text-sm text-gray-500">25+ administradores</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-brand-red">Desde $4,199</span>
                  <span className="text-sm text-gray-500">MXN/mes</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  o desde $42,830 MXN/año
                </div>
              </div>
            </div>

            <a 
              href="https://cliente.talmatech.com/registro"
              className="block w-full text-center mt-8 px-8 py-4 bg-gray-100 text-black font-bold hover:bg-gray-200 transition-all"
            >
              Ver detalles
            </a>
          </div>

          {/* Con Servicios de Cumplimiento */}
          <div className="bg-white border-2 border-brand-red p-8 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-brand-red text-white text-xs font-bold">
              RECOMENDADO
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black mb-2 text-black">Con Servicios de Cumplimiento</h3>
              <p className="text-sm text-gray-600">Investigación legal profesional incluida</p>
            </div>

            <div className="space-y-3">
              {/* Starter */}
              <div className="border border-brand-red/30 p-4 bg-brand-red/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-black">Starter</span>
                  <span className="text-sm text-gray-500">3 administradores</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-brand-red">Desde $2,749</span>
                  <span className="text-sm text-gray-500">MXN/mes</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  o desde $28,040 MXN/año
                </div>
              </div>

              {/* Pro */}
              <div className="border border-brand-red/30 p-4 bg-brand-red/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-black">Pro</span>
                  <span className="text-sm text-gray-500">8 administradores</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-brand-red">Desde $4,749</span>
                  <span className="text-sm text-gray-500">MXN/mes</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  o desde $48,440 MXN/año
                </div>
              </div>

              {/* Avanzado */}
              <div className="border border-brand-red/30 p-4 bg-brand-red/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-black">Avanzado</span>
                  <span className="text-sm text-gray-500">15 administradores</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-brand-red">Desde $6,749</span>
                  <span className="text-sm text-gray-500">MXN/mes</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  o desde $68,840 MXN/año
                </div>
              </div>

              {/* Premium */}
              <div className="border border-brand-red/30 p-4 bg-brand-red/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-black">Premium</span>
                  <span className="text-sm text-gray-500">25+ administradores</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-brand-red">Desde $8,749</span>
                  <span className="text-sm text-gray-500">MXN/mes</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  o desde $89,240 MXN/año
                </div>
              </div>
            </div>

            <a 
              href="https://cliente.talmatech.com/registro"
              className="block w-full text-center mt-8 px-8 py-4 bg-brand-red text-white font-bold hover:bg-brand-red/90 transition-all shadow-lg shadow-brand-red/20"
            >
              Comenzar ahora
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          14 días de prueba gratuita • Sin tarjeta de crédito • Cancela cuando quieras
        </p>
      </div>
    </section>
  );
}