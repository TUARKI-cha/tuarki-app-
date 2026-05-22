import Link from "next/link";

export default function Navbar() {

  return (

    <header className="w-full relative z-50">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">

        <div className="flex items-center justify-between">

          {/* LEFT */}
          <Link href="/" className="flex items-center gap-4">

            {/* LOGO */}
            <div className="relative">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0D3B2E] via-[#1E7A5A] to-[#7ED957] shadow-lg shadow-[#7ED957]/20 rotate-6"></div>

              <div className="absolute inset-0 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm"></div>

            </div>

            {/* TEXT */}
            <div>

              <h1 className="text-3xl font-bold tracking-tight text-[#062B22]">

                Tu<span className="text-[#6FD14B]">Arki</span>

              </h1>

              <p className="text-sm text-[#6C7B75] -mt-1">
                siempre acompañándote
              </p>

            </div>

          </Link>

          {/* CENTER MENU */}
          <nav className="hidden lg:flex items-center gap-10 text-[15px] font-medium text-[#062B22]">

            <a
              href="#"
              className="hover:text-[#6FD14B] transition-colors duration-300"
            >
              Cómo funciona
            </a>

            <a
              href="#"
              className="hover:text-[#6FD14B] transition-colors duration-300"
            >
              Servicios
            </a>

            <a
              href="#"
              className="hover:text-[#6FD14B] transition-colors duration-300"
            >
              Especialistas
            </a>

            <a
              href="#"
              className="hover:text-[#6FD14B] transition-colors duration-300"
            >
              Sobre nosotros
            </a>

            <a
              href="#"
              className="hover:text-[#6FD14B] transition-colors duration-300"
            >
              Blog
            </a>

          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            <Link href="/login">

              <button className="hidden sm:flex border border-[#D7E2DB] bg-white hover:bg-[#062B22] hover:text-white transition-all duration-300 px-8 py-4 rounded-full font-semibold text-[#062B22]">

                Iniciar sesión

              </button>

            </Link>

            <Link href="/nueva-consulta">

              <button className="bg-[#7ED957] hover:bg-[#6FD14B] transition-all duration-300 px-8 py-4 rounded-full font-bold text-[#062B22] shadow-lg shadow-[#7ED957]/30">

                Regístrate

              </button>

            </Link>

          </div>

        </div>

      </div>

    </header>

  );

}