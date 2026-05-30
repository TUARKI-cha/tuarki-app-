import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-[#F5F5F3]/90 backdrop-blur-xl border-b border-[#ECECEC]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 h-[92px] flex items-center justify-between">
        
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-4 shrink-0"
        >
          {/* ICON */}
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0D3B2E] via-[#1E7A5A] to-[#7ED957]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 rounded-md bg-white rotate-45" />
            </div>
          </div>

          {/* TEXT */}
          <div>
            <h1 className="text-[42px] leading-none font-black tracking-tight text-[#062B22]">
              Tu<span className="text-[#7ED957]">Arki</span>
            </h1>

            <p className="text-sm text-[#6B7280] -mt-1">
              siempre acompañándote
            </p>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden xl:flex items-center gap-12 text-[16px] font-semibold text-[#1F2937]">
          {[
            "Cómo funciona",
            "Servicios",
            "Especialistas",
            "Sobre nosotros",
            "Blog",
          ].map((item) => (
            <button
              key={item}
              className="hover:text-[#57B33E] transition-all duration-300"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          
          {/* LOGIN */}
          <Link href="/login">
            <button className="hidden sm:flex h-[56px] px-8 rounded-full border border-[#D8E2DC] bg-white hover:bg-[#062B22] hover:text-white transition-all duration-300 items-center justify-center font-semibold text-[#062B22]">
              Iniciar sesión
            </button>
          </Link>

          {/* CTA */}
          <Link href="/nueva-consulta">
            <button className="h-[56px] px-9 rounded-full bg-[#7ED957] hover:bg-[#70CC4D] transition-all duration-300 font-bold text-[#062B22] shadow-[0_10px_30px_rgba(126,217,87,0.35)]">
              Nueva consulta
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}