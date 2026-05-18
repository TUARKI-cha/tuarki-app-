"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerificacionPage() {

  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);

  const handleSendCode = () => {

    if (!phone.trim()) return;

    setStep(2);
  };

  const handleVerify = () => {

    if (!code.trim()) return;

    router.push("/nueva-consulta");
  };

  return (
    <main className="min-h-screen bg-[#F5F5F3] flex items-center justify-center px-6">

      <div className="w-full max-w-6xl bg-white rounded-[40px] overflow-hidden shadow-2xl grid grid-cols-2">

        {/* LEFT */}
        <div className="p-16 flex flex-col justify-center">

          <p className="text-[#1E7A5A] font-medium mb-4">
            Acceso rápido
          </p>

          <h1 className="text-5xl font-bold text-[#0D3B2E] leading-tight mb-8">
            Verifica tu número
            y comienza tu consulta.
          </h1>

          <p className="text-[#4B6358] text-lg leading-relaxed mb-10">
            Sin registros complicados.
            Recibe ayuda profesional en minutos.
          </p>

          {step === 1 && (

            <div className="space-y-6">

              <div>

                <label className="block mb-3 text-[#0D3B2E] font-semibold">
                  Número telefónico
                </label>

                <input
                  type="tel"
                  placeholder="+52 000 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border border-[#DADADA] focus:outline-none focus:border-[#1E7A5A]"
                />

              </div>

              <button
                onClick={handleSendCode}
                className="w-full bg-[#7ED957] py-5 rounded-2xl font-bold text-[#0D3B2E] hover:scale-[1.01] transition-all duration-300"
              >
                Enviar código
              </button>

            </div>

          )}

          {step === 2 && (

            <div className="space-y-6">

              <div>

                <label className="block mb-3 text-[#0D3B2E] font-semibold">
                  Código de verificación
                </label>

                <input
                  type="text"
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border border-[#DADADA] focus:outline-none focus:border-[#1E7A5A] tracking-[10px] text-center text-2xl"
                />

              </div>

              <button
                onClick={handleVerify}
                className="w-full bg-[#0D3B2E] text-white py-5 rounded-2xl font-bold hover:scale-[1.01] transition-all duration-300"
              >
                Verificar y continuar
              </button>

            </div>

          )}

        </div>

        {/* RIGHT */}
        <div className="bg-[#0D3B2E] p-16 relative overflow-hidden flex flex-col justify-between">

          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7ED957] opacity-10 rounded-full blur-3xl"></div>

          <div className="relative z-10">

            <p className="text-[#7ED957] font-medium mb-5">
              TuArki Secure Access
            </p>

            <h2 className="text-5xl font-bold text-white leading-tight">
              Ayuda profesional
              cuando la necesites.
            </h2>

          </div>

          <div className="relative z-10 grid grid-cols-2 gap-5">

            <div className="bg-[#163E31] rounded-3xl p-6">

              <h3 className="text-4xl font-bold text-[#7ED957]">
                +500
              </h3>

              <p className="text-gray-300 mt-2">
                Consultas atendidas
              </p>

            </div>

            <div className="bg-[#163E31] rounded-3xl p-6">

              <h3 className="text-4xl font-bold text-[#7ED957]">
                24/7
              </h3>

              <p className="text-gray-300 mt-2">
                Especialistas disponibles
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}