"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    return (
      <main className="min-h-screen bg-[#F5F5F3] flex items-center justify-center px-6">
  
        <div className="grid grid-cols-2 w-full max-w-6xl bg-white rounded-[40px] overflow-hidden shadow-2xl">
  
          {/* LEFT SIDE */}
          <div className="bg-[#0D3B2E] p-16 flex flex-col justify-between relative overflow-hidden">
  
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#7ED957] opacity-10 rounded-full blur-3xl"></div>
  
            <div className="relative z-10">
  
              <h1 className="text-5xl font-bold text-white leading-tight">
                Bienvenido
                de nuevo a
                TuArki.
              </h1>
  
              <p className="mt-8 text-gray-300 text-lg leading-relaxed max-w-md">
                Accede a tu cuenta y continúa
                resolviendo tus proyectos con ayuda
                profesional.
              </p>
  
            </div>
  
            <div className="relative z-10">
  
              <div className="flex items-center gap-4 mb-4">
  
                <div className="w-12 h-12 rounded-full bg-[#7ED957]"></div>
  
                <div>
                  <p className="text-white font-semibold">
                    +120 especialistas
                  </p>
  
                  <p className="text-gray-400 text-sm">
                    Arquitectos e ingenieros disponibles
                  </p>
                </div>
  
              </div>
  
            </div>
  
          </div>
  
          {/* RIGHT SIDE */}
          <div className="p-16 flex flex-col justify-center">
  
            <div className="mb-10">
  
              <p className="text-[#1E7A5A] font-medium mb-3">
                Iniciar sesión
              </p>
  
              <h2 className="text-4xl font-bold text-[#0D3B2E]">
                Accede a tu cuenta
              </h2>
  
            </div>
  
            {/* FORM */}
            <form
  className="space-y-6"
  onSubmit={(e) => {
    e.preventDefault();
    router.push("/dashboard");
  }}
>
  
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
                Entrar
              </button>
  
            </form>
  
            {/* EXTRA */}
            <div className="mt-8 text-center">
  
            <p className="text-[#4B6358]">
  ¿No tienes cuenta?

  <Link
    href="/registro"
    className="text-[#1E7A5A] font-semibold ml-2"
  >
    Crear cuenta
  </Link>

</p>
  
            </div>
  
          </div>
  
        </div>
  
      </main>
    );
  }