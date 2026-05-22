"use client";

import { useRouter } from "next/navigation";

export default function ConfirmacionPage() {

  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F5F5F3] flex items-center justify-center px-10">

      <div className="w-full max-w-5xl bg-white rounded-[45px] p-14 shadow-sm">

        {/* TOP */}
        <div className="flex items-center justify-between mb-14">

          <div>

            <p className="text-[#1E7A5A] font-medium mb-3">
              Consulta confirmada
            </p>

            <h1 className="text-6xl font-bold text-[#0D3B2E] leading-tight">
              Tu especialista <br />
              ya está listo.
            </h1>

          </div>

          {/* ICON */}
          <div className="w-36 h-36 rounded-full bg-[#E6F4EC] flex items-center justify-center text-7xl">
            ✅
          </div>

        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-2 gap-10">

          {/* LEFT */}
          <div className="bg-[#0D3B2E] rounded-[35px] p-10 text-white">

            <p className="text-[#7ED957] font-medium mb-4">
              Especialista asignado
            </p>

            <h2 className="text-4xl font-bold mb-6">
              Arq. Carlos Méndez
            </h2>

            <p className="text-gray-300 leading-relaxed mb-10">
              Experto en estructuras y remodelaciones residenciales.
            </p>

            {/* STATS */}
            <div className="space-y-5">

              <div className="flex items-center justify-between">

                <p className="text-gray-300">
                  Tiempo estimado
                </p>

                <p className="font-bold text-[#7ED957]">
                  3 minutos
                </p>

              </div>

              <div className="flex items-center justify-between">

                <p className="text-gray-300">
                  Tipo de servicio
                </p>

                <p className="font-bold">
                  Videollamada
                </p>

              </div>

              <div className="flex items-center justify-between">

                <p className="text-gray-300">
                  Estado
                </p>

                <p className="font-bold text-[#7ED957]">
                  Confirmado
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="bg-[#F8F8F6] rounded-[35px] p-10 flex flex-col justify-between">

            <div>

              <p className="text-[#1E7A5A] font-medium mb-4">
                Próximo paso
              </p>

              <h2 className="text-4xl font-bold text-[#0D3B2E] leading-tight mb-8">
                Entra al chat privado
                para comenzar la consulta.
              </h2>

              <p className="text-[#4B6358] leading-relaxed">
                Podrás enviar mensajes, fotos,
                videos y conectarte por videollamada
                con tu especialista.
              </p>

            </div>

            {/* BUTTON */}
            <button
              onClick={() => router.push("/chat")}
              className="mt-10 w-full bg-[#7ED957] text-[#0D3B2E] py-5 rounded-2xl text-xl font-bold hover:scale-[1.02] transition-all duration-300"
            >
              Entrar al chat
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}