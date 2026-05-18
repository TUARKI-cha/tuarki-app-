export default function Footer() {
    return (
      <footer className="bg-[#071E17] text-white px-10 pt-20 pb-10">
  
        {/* TOP */}
        <div className="grid grid-cols-4 gap-12 border-b border-[#1E3A32] pb-16">
  
          {/* BRAND */}
          <div>
  
            <h2 className="text-4xl font-bold mb-6">
              Tu<span className="text-[#7ED957]">Arki</span>
            </h2>
  
            <p className="text-gray-400 leading-relaxed">
              Plataforma digital que conecta personas
              con arquitectos e ingenieros para resolver
              problemas de construcción de forma rápida y confiable.
            </p>
  
          </div>
  
          {/* LINKS */}
          <div>
  
            <h3 className="font-bold text-lg mb-6">
              Plataforma
            </h3>
  
            <ul className="space-y-4 text-gray-400">
  
              <li className="hover:text-white cursor-pointer transition-all">
                Cómo funciona
              </li>
  
              <li className="hover:text-white cursor-pointer transition-all">
                Servicios
              </li>
  
              <li className="hover:text-white cursor-pointer transition-all">
                Especialistas
              </li>
  
              <li className="hover:text-white cursor-pointer transition-all">
                Blog
              </li>
  
            </ul>
  
          </div>
  
          {/* COMPANY */}
          <div>
  
            <h3 className="font-bold text-lg mb-6">
              Empresa
            </h3>
  
            <ul className="space-y-4 text-gray-400">
  
              <li className="hover:text-white cursor-pointer transition-all">
                Sobre nosotros
              </li>
  
              <li className="hover:text-white cursor-pointer transition-all">
                Términos
              </li>
  
              <li className="hover:text-white cursor-pointer transition-all">
                Privacidad
              </li>
  
              <li className="hover:text-white cursor-pointer transition-all">
                Contacto
              </li>
  
            </ul>
  
          </div>
  
          {/* CONTACT */}
          <div>
  
            <h3 className="font-bold text-lg mb-6">
              Contacto
            </h3>
  
            <ul className="space-y-4 text-gray-400">
  
              <li>
                contacto@tuarki.com
              </li>
  
              <li>
                soporte@tuarki.com
              </li>
  
              <li>
                +52 55 0000 0000
              </li>
  
            </ul>
  
          </div>
  
        </div>
  
        {/* BOTTOM */}
        <div className="flex items-center justify-between pt-8 text-gray-500 text-sm">
  
          <p>
            © 2025 TuArki. Todos los derechos reservados.
          </p>
  
          <p>
            siempre acompañándote ⚔️
          </p>
  
        </div>
  
      </footer>
    );
  }