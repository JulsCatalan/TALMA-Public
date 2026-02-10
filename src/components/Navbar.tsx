import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
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

          <div className="hidden md:flex items-center gap-8">
            <a href="#soluciones" className="text-sm font-medium text-gray-700 hover:text-brand-red transition-colors">
              Soluciones
            </a>
            <a href="#como-funciona" className="text-sm font-medium text-gray-700 hover:text-brand-red transition-colors">
              Cómo funciona
            </a>
            <a href="#precios" className="text-sm font-medium text-gray-700 hover:text-brand-red transition-colors">
              Precios
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://cliente.talmatech.com/iniciar-sesion" 
              className="text-sm font-medium text-gray-700 hover:text-brand-red transition-colors"
            >
              Iniciar sesión
            </a>
            <a 
              href="https://cliente.talmatech.com/registro" 
              className="px-6 py-2.5 bg-brand-red text-white text-sm font-semibold hover:bg-brand-red/90 transition-all shadow-sm"
            >
              Comenzar ahora
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}