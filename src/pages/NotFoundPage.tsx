// src/pages/NotFoundPage.tsx
import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-red flex items-center justify-center">
              <img src="/talma-logo.webp" alt="Talma Tech Logo"  className="object-center object-contain"/>
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

      {/* 404 Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">

          {/* Error Code */}
          <div className="mb-6">
            <h1 className="text-8xl font-black text-black mb-2">404</h1>
            <div className="h-1 w-24 bg-brand-red mx-auto"></div>
          </div>

          {/* Error Message */}
          <h2 className="text-3xl font-bold text-black mb-4">
            Página no encontrada
          </h2>
          
          <p className="text-lg text-gray-600 mb-12 leading-relaxed max-w-lg mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida. 
            Verifica la URL o regresa al inicio para encontrar lo que necesitas.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-red text-white font-bold hover:bg-brand-red/90 transition-all shadow-lg shadow-brand-red/20 group"
            >
              <Home className="w-5 h-5 mr-2" />
              Ir al inicio
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-black font-bold hover:border-brand-red hover:text-brand-red transition-all"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Página anterior
            </button>
          </div>


        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100 bg-brand-bone/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-red flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-brand-red">TALMA</span>
                <span className="font-bold text-black">TECH</span>
              </div>
            </Link>
            <p className="text-sm text-gray-600">
              © 2025 TALMA TECH. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}