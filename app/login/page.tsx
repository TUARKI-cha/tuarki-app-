"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F5F5F3] flex items-center justify-center px-6 py-10 overflow-hidden relative">
      {/* BACKGROUND */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#7ED957]/10 blur-[120px] rounded-full" />

      <div className="relative w-full max-w-[1500px] grid grid-cols-1 xl:grid-cols-2 bg-white rounded-[40px] overflow-hidden border border-[#E5E7EB] shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
        {/* LEFT */}
        <div className="relative bg-gradient-to-br from-[#062B22] via-[#0D3B2E] to-[#114536] p-16 flex flex-col justify-between overflow-hidden">
          {/* DECORATION */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7ED957]/10 rounded-full blur-[120px]" />

          {/* TOP */}
          <div className="relative z-10">
            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center gap-4 mb-16"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1E7A5A] to-[#7ED957]" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-md bg-white rotate-45" />
                </div>
              </div>

              <div>
                <h1 className="text-5xl font-black tracking-tight text-white">
                  TuArki
                </h1>

                <p className="text-sm text-white/60 -mt-1">
                  siempre acompañándote
                </p>
              </div>
            </Link>

            {/* TITLE */}
            <h2 className="text-6xl font-black text-white leading-[0.95] tracking-[-0.05em]">
              Bienvenido
              <br />
              de nuevo a
              <span className="text-[#7ED957]">
                {" "}
                TuArki.
              </span>
            </h2>

            <p className="mt-8 text-white/70 text-xl leading-relaxed max-w-xl">
              Accede a tu cuenta profesional y continúa ayudando
              a personas con soluciones arquitectónicas reales.
            </p>
          </div>

          {/* BOTTOM STATS */}
          <div className="relative z-10 grid grid-cols-3 gap-5 mt-16">
            {[
              {
                icon: Users,
                value: "+120",
                label: "Especialistas activos",
              },
              {
                icon: ShieldCheck,
                value: "98%",
                label: "Clientes satisfechos",
              },
              {
                icon: Star,
                value: "4.9",
                label: "Calificación promedio",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#7ED957]/20 flex items-center justify-center mb-5">
                    <Icon className="text-[#7ED957]" />
                  </div>

                  <h3 className="text-3xl font-black text-white">
                    {item.value}
                  </h3>

                  <p className="text-sm text-white/60 mt-2">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-10 lg:p-16 flex flex-col justify-center bg-[#FCFCFB]">
          {/* HEADER */}
          <div className="mb-12">
            <p className="text-[#1E7A5A] font-bold mb-3">
              Acceso profesional
            </p>

            <h2 className="text-5xl font-black text-[#111] tracking-tight">
              Iniciar sesión
            </h2>

            <p className="text-[#6B7280] mt-4 text-lg">
              Ingresa tus credenciales para acceder a tu dashboard.
            </p>
          </div>

          {/* FORM */}
          <form
            className="space-y-7"
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/dashboard");
            }}
          >
            {/* EMAIL */}
            <div>
              <label className="block mb-3 font-bold text-[#111]">
                Correo electrónico
              </label>

              <input
                type="email"
                placeholder="correo@tuarki.com"
                className="w-full h-[68px] px-6 rounded-2xl border border-[#DADADA] bg-white focus:outline-none focus:border-[#57B33E] text-lg"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-3 font-bold text-[#111]">
                Contraseña
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full h-[68px] px-6 rounded-2xl border border-[#DADADA] bg-white focus:outline-none focus:border-[#57B33E] text-lg"
              />
            </div>

            {/* OPTIONS */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 text-[#6B7280]">
                <input type="checkbox" />
                Recordarme
              </label>

              <button
                type="button"
                className="text-[#1E7A5A] font-bold"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="group w-full h-[68px] rounded-2xl bg-[#57B33E] hover:bg-[#4FA53D] text-white font-black text-lg transition-all shadow-[0_18px_40px_rgba(87,179,62,0.35)] flex items-center justify-center gap-3"
            >
              Entrar al dashboard

              <ArrowRight
                size={22}
                className="group-hover:translate-x-1 transition-all"
              />
            </button>
          </form>

          {/* EXTRA */}
          <div className="mt-10 text-center">
            <p className="text-[#6B7280]">
              ¿Todavía no eres profesional de TuArki?

              <Link
                href="/registro"
                className="text-[#1E7A5A] font-black ml-2"
              >
                Solicitar acceso
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}