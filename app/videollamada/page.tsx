"use client";

export default function VideoCallPage() {
  return (
    <main className="h-screen bg-[#0B0B0B] flex flex-col">

      {/* TOP BAR */}
      <div className="px-8 py-5 flex items-center justify-between bg-[#111111] border-b border-[#1E1E1E]">

        <div>

          <p className="text-[#7ED957] font-medium">
            Consulta en vivo
          </p>

          <h1 className="text-2xl font-bold text-white">
            Videollamada profesional
          </h1>

        </div>

        <div className="flex items-center gap-4">

          <div className="bg-[#1B1B1B] px-5 py-3 rounded-2xl text-white">
            00:12:34
          </div>

          <div className="bg-[#163E31] px-5 py-3 rounded-2xl text-[#7ED957] font-semibold">
            En vivo
          </div>

        </div>

      </div>

      {/* VIDEO AREA */}
      <div className="flex-1 relative overflow-hidden">

        {/* MAIN VIDEO */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B1B1B] to-[#0D3B2E] flex items-center justify-center">

          <div className="text-center">

            <div className="w-40 h-40 rounded-full bg-[#7ED957] mx-auto mb-8"></div>

            <h2 className="text-5xl font-bold text-white mb-4">
              Arq. Carlos Mendoza
            </h2>

            <p className="text-gray-300 text-xl">
              Especialista conectado
            </p>

          </div>

        </div>

        {/* USER CAMERA */}
        <div className="absolute bottom-8 right-8 w-80 h-52 bg-[#202020] rounded-[30px] border border-[#333333] overflow-hidden shadow-2xl">

          <div className="w-full h-full flex flex-col items-center justify-center">

            <div className="w-24 h-24 rounded-full bg-[#0D3B2E] mb-5"></div>

            <p className="text-white text-lg font-semibold">
              Tú
            </p>

          </div>

        </div>

        {/* SCREEN SHARE */}
        <div className="absolute top-8 left-8 bg-[#111111] border border-[#2A2A2A] rounded-[30px] p-5 w-96 shadow-2xl">

          <p className="text-[#7ED957] font-medium mb-4">
            Plano compartido
          </p>

          <div className="h-52 rounded-2xl bg-[#1E1E1E] flex items-center justify-center text-gray-500">
            Vista previa del plano
          </div>

        </div>

      </div>

      {/* CONTROLS */}
      <div className="bg-[#111111] border-t border-[#1E1E1E] px-10 py-6">

        <div className="flex items-center justify-center gap-6">

          {/* MIC */}
          <button className="w-16 h-16 rounded-full bg-[#1E1E1E] text-white text-2xl hover:bg-[#2B2B2B] transition-all duration-300">
            🎤
          </button>

          {/* CAMERA */}
          <button className="w-16 h-16 rounded-full bg-[#1E1E1E] text-white text-2xl hover:bg-[#2B2B2B] transition-all duration-300">
            📷
          </button>

          {/* SHARE */}
          <button className="w-16 h-16 rounded-full bg-[#1E1E1E] text-white text-2xl hover:bg-[#2B2B2B] transition-all duration-300">
            🖥️
          </button>

          {/* CHAT */}
          <button className="w-16 h-16 rounded-full bg-[#1E1E1E] text-white text-2xl hover:bg-[#2B2B2B] transition-all duration-300">
            💬
          </button>

          {/* END */}
          <button className="px-8 h-16 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition-all duration-300">
            Finalizar llamada
          </button>

        </div>

      </div>

    </main>
  );
}