"use client";

import { useRouter } from "next/navigation";

export default function PagoPage() {

  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F5F5F3] px-10 py-16">

      {/* HEADER */}
      <div className="mb-14">

        <p className="text-[#1E7A5A] font-medium mb-3">
          Checkout seguro
        </p>

        <h1 className="text-6xl font-bold text-[#0D3B2E]">
          Finaliza tu consulta
        </h1>

      </div>

      <div className="grid grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="col-span-2 bg-white rounded-[40px] p-10 shadow-sm">

          <h2 className="text-3xl font-bold text-[#0D3B2E] mb-10">
            Método de pago
          </h2>

          <div className="space-y-7">

            {/* CARD */}
            <div>

              <label className="block mb-3 font-semibold text-[#0D3B2E]">
                Número de tarjeta
              </label>

              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-5 py-5 rounded-2xl border border-[#DADADA] focus:outline-none focus:border-[#1E7A5A]"
              />

            </div>

            {/* NAME */}
            <div>

              <label className="block mb-3 font-semibold text-[#0D3B2E]">
                Nombre del titular
              </label>

              <input
                type="text"
                placeholder="Juan Pérez"
                className="w-full px-5 py-5 rounded-2xl border border-[#DADADA] focus:outline-none focus:border-[#1E7A5A]"
              />

            </div>

            {/* ROW */}
            <div className="grid grid-cols-2 gap-5">

              <div>

                <label className="block mb-3 font-semibold text-[#0D3B2E]">
                  Expiración
                </label>

                <input
                  type="text"
                  placeholder="MM/AA"
                  className="w-full px-5 py-5 rounded-2xl border border-[#DADADA] focus:outline-none focus:border-[#1E7A5A]"
                />

              </div>

              <div>

                <label className="block mb-3 font-semibold text-[#0D3B2E]">
                  CVV
                </label>

                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-5 py-5 rounded-2xl border border-[#DADADA] focus:outline-none focus:border-[#1E7A5A]"
                />

              </div>

            </div>

            {/* PAY BUTTON */}
            <button
              onClick={() => router.push("/chat")}
              className="w-full mt-8 bg-[#0D3B2E] text-white py-5 rounded-2xl text-lg font-bold hover:scale-[1.01] transition-all duration-300"
            >
              Pagar y continuar
            </button>

          </div>

        </div>

        {/* RIGHT */}
        <div className="bg-[#0D3B2E] rounded-[40px] p-10 text-white h-fit">

          <p className="text-[#7ED957] font-medium mb-4">
            Resumen
          </p>

          <h2 className="text-4xl font-bold mb-10">
            Videollamada profesional
          </h2>

          <div className="space-y-6 border-b border-[#214438] pb-8 mb-8">

            <div className="flex items-center justify-between">

              <p className="text-gray-300">
                Servicio
              </p>

              <p className="font-semibold">
                Videollamada
              </p>

            </div>

            <div className="flex items-center justify-between">

              <p className="text-gray-300">
                Duración estimada
              </p>

              <p className="font-semibold">
                45 min
              </p>

            </div>

            <div className="flex items-center justify-between">

              <p className="text-gray-300">
                Especialista
              </p>

              <p className="font-semibold">
                Disponible inmediato
              </p>

            </div>

          </div>

          <div className="flex items-center justify-between mb-10">

            <p className="text-2xl font-semibold">
              Total
            </p>

            <p className="text-5xl font-bold text-[#7ED957]">
              $399
            </p>

          </div>

          {/* SECURITY */}
          <div className="bg-[#163E31] rounded-3xl p-6">

            <p className="text-[#7ED957] font-semibold mb-3">
              Pago seguro
            </p>

            <p className="text-gray-300 leading-relaxed">
              Todas las transacciones son protegidas y cifradas.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}