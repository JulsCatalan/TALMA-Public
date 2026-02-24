import React from "react";

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const Footer: React.FC = () => {
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
                <span className="text-sm font-semibold text-brand-red">
                  TALMA{" "}
                </span>
                <span className="text-sm font-semibold text-white">
                  TECH
                </span>
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
                { label: "Canal de Denuncias", href: "soluciones" },
                { label: "Capacitaciones", href: "soluciones" },
                { label: "Auditorías", href: "soluciones" },
                { label: "Precios", href: "precios" },
              ].map((l) => (
                <li key={l.label}>
                  <button
                    type="button"
                    onClick={() => smoothScrollTo(l.href)}
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
              {[
                { label: "Quiénes somos", href: "/nosotros", ext: false },
                {
                  label: "Iniciar sesión",
                  href: "https://cliente.talmatech.com/iniciar-sesion",
                  ext: true,
                },
                {
                  label: "Crear cuenta",
                  href: "https://cliente.talmatech.com/registro",
                  ext: true,
                },
              ].map((l) => (
                <li key={l.label}>
                  {l.ext ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <a
                      href={l.href}
                      className="text-xs hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
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
            <a href="/privacidad" className="hover:text-white transition-colors">
              Privacidad
            </a>
            <a href="/terminos" className="hover:text-white transition-colors">
              Términos
            </a>
            <a href="/cookies" className="hover:text-white transition-colors">
              Política de cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;