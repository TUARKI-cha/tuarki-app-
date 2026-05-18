import Link from "next/link";

export default function RegistroPage() {
    return (
      <main className="min-h-screen bg-[#F5F5F3] flex items-center justify-center px-6 py-10">
  
        <div className="grid grid-cols-2 w-full max-w-7xl bg-white rounded-[40px] overflow-hidden shadow-2xl">
  
          {/* LEFT SIDE */}
          <div className="p-16 flex flex-col justify-center">
  
            <div className="mb-10">
  
              <p className="text-[#1E7A5A] font-medium mb-3">
                Crear cuenta
              </p>
  
              <h2 className="text-5xl font-bold text-[#0D3B2E] leading-tight">
                Únete a la comunidad TuArki
              </h2>
  
            </div>
  
            {/* FORM */}
            <form className="space-y-5">
  
              <div>
  
                <label className="block mb-2 text-[#0D3B2E] font-medium">
                  Nombre completo
                </label>
  
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full px-5 py-4 rounded-2xl border border-[#DADADA] focus:outline-none focus:border-[#1E7A5A]"
                />
  
              </div>
  
              <div>
  
                <label className="block mb-2 text-[#0D3B2E] font-medium">
                  Correo electrónico
                </label>
  
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="w-full px-5 py-4 rounded-2xl border border-[#DADADA] focus:outline-none focus:border-[#1E7A5A]"
                />
  
              </div>
  
              <div>
  
                <label className="block mb-2 text-[#0D3B2E] font-medium">
                  Teléfono
                </label>
  
                <input
                  type="tel"
                  placeholder="+52 000 000 0000"
                  className="w-full px-5 py-4 rounded-2xl border border-[#DADADA] focus:outline-none focus:border-[#1E7A5A]"
                />
  
              </div>
  
              <div>
  
                <label className="block mb-2 text-[#0D3B2E] font-medium">
                  Contraseña
                </label>
  
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-5 py-4 rounded-2xl border border-[#DADADA] focus:outline-none focus:border-[#1E7A5A]"
                />
  
              </div>
  
              <button
                type="submit"
                className="w-full bg-[#7ED957] text-[#0D3B2E] py-4 rounded-2xl font-bold hover:scale-[1.02] transition-all duration-300"
              >
                Crear cuenta
              </button>
  
            </form>
  
            <div className="mt-8 text-center">
  
              <p className="text-[#4B6358]">
                ¿Ya tienes cuenta?
                <span className="text-[#1E7A5A] font-semibold ml-2 cursor-pointer">
                  Iniciar sesión
                </span>
              </p>
  
            </div>
  
          </div>
  
          {/* RIGHT SIDE */}
          <div className="bg-[#0D3B2E] p-16 relative overflow-hidden flex flex-col justify-between">
  
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7ED957] opacity-10 rounded-full blur-3xl"></div>
  
            <div className="relative z-10">
  
              <h2 className="text-5xl font-bold text-white leading-tight">
                Construyamos juntos
                el futuro de TuArki.
              </h2>
  
              <p className="mt-8 text-gray-300 text-lg leading-relaxed max-w-md">
                Accede a especialistas, resuelve problemas
                y recibe apoyo profesional desde cualquier lugar.
              </p>
  
            </div>
  
            {/* STATS */}
            <div className="relative z-10 grid grid-cols-2 gap-5">
  
              <div className="bg-[#163E31] rounded-3xl p-6">
  
                <h3 className="text-4xl font-bold text-[#7ED957]">
                  +120
                </h3>
  
                <p className="text-gray-300 mt-2">
                  Especialistas
                </p>
  
              </div>
  
              <div className="bg-[#163E31] rounded-3xl p-6">
  
                <h3 className="text-4xl font-bold text-[#7ED957]">
                  24/7
                </h3>
  
                <p className="text-gray-300 mt-2">
                  Soporte
                </p>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
  
      </main>
    );
  }