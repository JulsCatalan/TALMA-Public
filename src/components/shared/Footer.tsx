import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (id: string) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <footer className="bg-black text-gray-500 border-t border-gray-900">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-brand-red flex items-center justify-center">
                <img
                  src="/talma-logo.webp"
                  alt="Talma Tech"
                  className="object-contain"
                />
              </div>
              <div className="leading-none">
                <span className="text-sm font-semibold text-brand-red">TALMA </span>
                <span className="text-sm font-semibold text-white">TECH</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed font-light">
              Plataforma de cumplimiento normativo para organizaciones que
              buscan gestionar riesgos de forma proactiva.
            </p>
          </div>

          {/* Producto */}
          <div>
            <div className="text-xs font-medium text-gray-300 uppercase tracking-wider mb-4">
              Producto
            </div>
            <ul className="space-y-2.5">
              {[
                { label: "Canal de Denuncias", id: "soluciones" },
                { label: "Capacitaciones", id: "soluciones" },
                { label: "Auditorías", id: "soluciones" },
                { label: "Precios", id: "precios" },
              ].map((l) => (
                <li key={l.label}>
                  <button
                    type="button"
                    onClick={() => handleSectionClick(l.id)}
                    className="text-xs hover:text-white transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Nosotros */}
          <div>
            <div className="text-xs font-medium text-gray-300 uppercase tracking-wider mb-4">
              Nosotros
            </div>
            <ul className="space-y-2.5">
              <li>
                <Link to="/nosotros" className="text-xs hover:text-white transition-colors">
                  Quiénes somos
                </Link>
              </li>
              <li>
                <a
                  href="https://cliente.talmatech.com/iniciar-sesion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs hover:text-white transition-colors"
                >
                  Iniciar sesión
                </a>
              </li>
              <li>
                <a
                  href="https://cliente.talmatech.com/registro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs hover:text-white transition-colors"
                >
                  Crear cuenta
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <div className="text-xs font-medium text-gray-300 uppercase tracking-wider mb-4">
              Contacto
            </div>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:contacto@talmatech.com"
                  className="text-xs hover:text-white transition-colors"
                >
                  contacto@talmatech.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:soporte@talmatech.com"
                  className="text-xs hover:text-white transition-colors"
                >
                  soporte@talmatech.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs">
            © {new Date().getFullYear()} TALMA TECH. Todos los derechos reservados.
          </p>
          <div className="flex gap-5 text-xs">
            <Link to="/privacidad" className="hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link to="/terminos" className="hover:text-white transition-colors">
              Términos
            </Link>
            <Link to="/cookies" className="hover:text-white transition-colors">
              Política de cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;