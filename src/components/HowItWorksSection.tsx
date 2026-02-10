// src/components/home/HowItWorksSection.tsx
export default function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-black">
            Cómo funciona
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Proceso simple y transparente en tres pasos
          </p>
          <p className="text-sm text-gray-500 italic">
            Disponible en dos modalidades: Sin Asesoría y Con Asesoría
          </p>
        </div>

        {/* Sin Asesoría */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-black mb-8">Sin Asesoría</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="border-2 border-brand-red/10 p-8 bg-white h-full">
                <div className="w-12 h-12 bg-brand-red text-white flex items-center justify-center text-2xl font-bold mb-6">
                  1
                </div>
                <h4 className="text-xl font-bold mb-3 text-black">Recepción</h4>
                <p className="text-gray-600 leading-relaxed">
                  La denuncia llega de forma anónima o identificada a través de tu canal personalizado disponible 24/7.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-brand-red/20"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="border-2 border-brand-red/10 p-8 bg-white h-full">
                <div className="w-12 h-12 bg-gray-400 text-white flex items-center justify-center text-2xl font-bold mb-6">
                  2
                </div>
                <h4 className="text-xl font-bold mb-3 text-black">Investigación interna</h4>
                <p className="text-gray-600 leading-relaxed">
                  El cliente decide el método de investigación interna y llega a sus propias resoluciones y recomendaciones.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-brand-red/20"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="border-2 border-brand-red/10 p-8 bg-white h-full">
                <div className="w-12 h-12 bg-gray-400 text-white flex items-center justify-center text-2xl font-bold mb-6">
                  3
                </div>
                <h4 className="text-xl font-bold mb-3 text-black">Implementación</h4>
                <p className="text-gray-600 leading-relaxed">
                  El cliente implementa sus resoluciones y recomendaciones de forma autónoma.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Con Asesoría */}
        <div>
          <h3 className="text-2xl font-bold text-black mb-8">Con Asesoría</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="border-2 border-brand-red/10 p-8 bg-white h-full">
                <div className="w-12 h-12 bg-brand-red text-white flex items-center justify-center text-2xl font-bold mb-6">
                  1
                </div>
                <h4 className="text-xl font-bold mb-3 text-black">Recepción</h4>
                <p className="text-gray-600 leading-relaxed">
                  La denuncia llega de forma anónima o identificada a través de tu canal personalizado disponible 24/7.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-brand-red/20"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="border-2 border-brand-red/10 p-8 bg-white h-full">
                <div className="w-12 h-12 bg-brand-red text-white flex items-center justify-center text-2xl font-bold mb-6">
                  2
                </div>
                <h4 className="text-xl font-bold mb-3 text-black">Investigación profesional</h4>
                <p className="text-gray-600 leading-relaxed">
                  Nuestro equipo legal realiza una investigación profesional, recopilando evidencias y entrevistando testigos.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-brand-red/20"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="border-2 border-brand-red/10 p-8 bg-white h-full">
                <div className="w-12 h-12 bg-brand-red text-white flex items-center justify-center text-2xl font-bold mb-6">
                  3
                </div>
                <h4 className="text-xl font-bold mb-3 text-black">Reporte y decisión</h4>
                <p className="text-gray-600 leading-relaxed">
                  Recibes un reporte legal completo con recomendaciones y plan de acción. El cliente decide si implementa las recomendaciones sugeridas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}