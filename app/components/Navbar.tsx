import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full px-10 py-6 flex items-center justify-between">

      {/* LOGO */}
      <div className="flex items-center gap-3">

        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0D3B2E] via-[#1E7A5A] to-[#7ED957] shadow-md"></div>

        <div>
          <h1 className="text-2xl font-bold text-[#0D3B2E]">
            Tu<span className="text-[#7ED957]">Arki</span>
          </h1>

          <p className="text-xs text-[#1E7A5A]">
            siempre acompañándote
          </p>
        </div>

      </div>

      {/* MENU */}
      <nav className="flex items-center gap-8 text-sm font-medium text-[#0D3B2E]">

        <a href="#">Cómo funciona</a>

        <a href="#">Servicios</a>

        <a href="#">Especialistas</a>

        <a href="#">Blog</a>

        <Link href="/login">

  <button className="border border-[#0D3B2E] px-6 py-3 rounded-full font-semibold hover:bg-[#0D3B2E] hover:text-white transition-all duration-300">
    Iniciar sesión
  </button>

</Link>

      </nav>

    </header>
  );
}