// src/components/home/CTASection.tsx
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-brand-red text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-8">
          Comienza hoy con tu plataforma de cumplimiento
        </h2>
        <p className="text-2xl text-white/90 mb-10 font-light">
          14 días de prueba gratuita. Sin tarjeta de crédito.
        </p>
        <a 
          href="https://cliente.talmatech.com/registro" 
          className="inline-flex items-center px-10 py-5 bg-white text-brand-red text-lg font-bold hover:bg-gray-50 transition-all group shadow-xl"
        >
          Crear cuenta ahora
          <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}