"use client";

import Link from "next/link";

export default function DashboardPage() {
    return (
      <main className="min-h-screen bg-[#F5F5F3] flex">
  
        {/* SIDEBAR */}
        <aside className="w-72 bg-[#0D3B2E] text-white p-8 flex flex-col justify-between">
  
          <div>
  
            {/* LOGO */}
            <div className="mb-16">
  
              <h1 className="text-3xl font-bold">
                Tu<span className="text-[#7ED957]">Arki</span>
              </h1>
  
              <p className="text-sm text-gray-400 mt-1">
                siempre acompañándote
              </p>
  
            </div>
  
            {/* MENU */}
            <nav className="space-y-4">
  
              <div className="bg-[#163E31] px-5 py-4 rounded-2xl">
                Dashboard
              </div>
  
              <div className="px-5 py-4 rounded-2xl hover:bg-[#163E31] transition-all cursor-pointer">
                Mis consultas
              </div>
  
              <div className="px-5 py-4 rounded-2xl hover:bg-[#163E31] transition-all cursor-pointer">
                Especialistas
              </div>
  
              <div className="px-5 py-4 rounded-2xl hover:bg-[#163E31] transition-all cursor-pointer">
                Videollamadas
              </div>
  
              <div className="px-5 py-4 rounded-2xl hover:bg-[#163E31] transition-all cursor-pointer">
                Configuración
              </div>
  
            </nav>
  
          </div>
  
          {/* USER */}
          <div className="bg-[#163E31] p-5 rounded-3xl">
  
            <p className="font-semibold">
              Juan Pérez
            </p>
  
            <p className="text-sm text-gray-400 mt-1">
              Usuario activo
            </p>
  
          </div>
  
        </aside>
  
        {/* CONTENT */}
        <section className="flex-1 p-10">
  
          {/* TOP */}
          <div className="flex items-center justify-between mb-12">
  
            <div>
  
              <p className="text-[#1E7A5A] font-medium mb-2">
                Dashboard
              </p>
  
              <h2 className="text-5xl font-bold text-[#0D3B2E]">
                Hola, Juan 👋
              </h2>
  
            </div>
  
            <Link href="/nueva-consulta">

  <button className="bg-[#7ED957] px-6 py-4 rounded-2xl font-bold text-[#0D3B2E] hover:scale-105 transition-all duration-300">
    Nueva consulta
  </button>

</Link>
  
          </div>
  
          {/* STATS */}
          <div className="grid grid-cols-3 gap-6 mb-10">
  
            {/* CARD */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm">
  
              <p className="text-[#4B6358] mb-4">
                Consultas activas
              </p>
  
              <h3 className="text-5xl font-bold text-[#0D3B2E]">
                04
              </h3>
  
            </div>
  
            <div className="bg-[#0D3B2E] p-8 rounded-[30px] text-white">
  
              <p className="opacity-80 mb-4">
                Especialistas disponibles
              </p>
  
              <h3 className="text-5xl font-bold">
                27
              </h3>
  
            </div>
  
            <div className="bg-white p-8 rounded-[30px] shadow-sm">
  
              <p className="text-[#4B6358] mb-4">
                Videollamadas realizadas
              </p>
  
              <h3 className="text-5xl font-bold text-[#0D3B2E]">
                12
              </h3>
  
            </div>
  
          </div>
  
          {/* ACTIVITY */}
          <div className="bg-white rounded-[35px] p-8">
  
            <div className="flex items-center justify-between mb-8">
  
              <h3 className="text-2xl font-bold text-[#0D3B2E]">
                Actividad reciente
              </h3>
  
              <button className="text-[#1E7A5A] font-semibold">
                Ver todo
              </button>
  
            </div>
  
            <div className="space-y-5">
  
              <div className="border border-[#ECECEC] rounded-2xl p-5 flex items-center justify-between">
  
                <div>
  
                  <p className="font-semibold text-[#0D3B2E]">
                    Revisión de planos
                  </p>
  
                  <p className="text-sm text-[#4B6358] mt-1">
                    Hace 2 horas
                  </p>
  
                </div>
  
                <div className="bg-[#E6F4EC] text-[#1E7A5A] px-4 py-2 rounded-full text-sm font-semibold">
                  En proceso
                </div>
  
              </div>
  
              <div className="border border-[#ECECEC] rounded-2xl p-5 flex items-center justify-between">
  
                <div>
  
                  <p className="font-semibold text-[#0D3B2E]">
                    Consulta estructural
                  </p>
  
                  <p className="text-sm text-[#4B6358] mt-1">
                    Ayer
                  </p>
  
                </div>
  
                <div className="bg-[#DFF7D6] text-[#2D7A20] px-4 py-2 rounded-full text-sm font-semibold">
                  Completado
                </div>
  
              </div>
  
            </div>
  
          </div>
  
        </section>
  
      </main>
    );
  }