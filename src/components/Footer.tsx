// src/components/Footer.tsx
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-6 lg:px-8 bg-brand-bone border-t border-brand-red/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-red flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-brand-red">TALMA</span>
                <span className="font-bold text-black">TECH</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Plataforma profesional de gestión de denuncias y cumplimiento empresarial.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-black">Producto</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#soluciones" className="hover:text-brand-red transition-colors">Características</a></li>
              <li><a href="#precios" className="hover:text-brand-red transition-colors">Precios</a></li>
              <li><a href="#como-funciona" className="hover:text-brand-red transition-colors">Cómo funciona</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-black">Empresa</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-brand-red transition-colors">Nosotros</a></li>
              <li><a href="mailto:contacto@talmatech.com" className="hover:text-brand-red transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-black">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/privacidad" className="hover:text-brand-red transition-colors">Privacidad</a></li>
              <li><a href="/terminos-y-condiciones" className="hover:text-brand-red transition-colors">Términos</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-red/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © 2025 TALMA TECH. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="mailto:contacto@talmatech.com" className="hover:text-brand-red transition-colors">
              contacto@talmatech.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}