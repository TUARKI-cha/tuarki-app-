"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { supabase } from "@/lib/supabase";

import {
  useEffect,
  useState,
} from "react";

export default function PagoPage() {

  const router = useRouter();

  const searchParams =
    useSearchParams();

  const consultationId =
    searchParams.get("id");

 const [consultation, setConsultation] =
    useState<any>(null);

  const [service, setService] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    const savedService =
      localStorage.getItem(
        "selectedService"
      );

      if (consultationId) {
        loadConsultation();
      }

    if (savedService) {

      setService(
        JSON.parse(savedService)
      );

    }

  }, [consultationId]);

  const loadConsultation = async () => {
    const { data } = await supabase
      .from("consultations")
      .select("*")
      .eq("id", consultationId)
      .single();
  
    if (data) {
      setConsultation(data);
    }
  };

  return (

    <main className="min-h-screen bg-[#F6F7F3] overflow-hidden">

      {/* TOP */}
      <section className="relative px-10 pt-20 pb-14">

        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#7ED957]/10 blur-[140px] rounded-full" />

        <div className="max-w-[1500px] mx-auto relative z-10">

          <div className="mb-16">

            <div className="inline-flex items-center gap-3 bg-[#EAF8E4] px-5 py-3 rounded-full mb-6">

              <div className="w-3 h-3 rounded-full bg-[#57B33E]" />

              <p className="text-[#0D3B2E] font-semibold">
                Checkout seguro TuArki
              </p>

            </div>

            <h1 className="text-7xl font-bold text-[#0D3B2E] leading-tight mb-6">

              Finaliza
              <br />
              tu consulta

            </h1>

            <p className="text-2xl text-[#5B6B63] max-w-3xl leading-relaxed">

              Estás a un paso de recibir ayuda
              profesional de arquitectos e ingenieros certificados.

            </p>

          </div>

          {/* STEPS */}
          <div className="flex items-center gap-6 mb-14">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-full bg-[#57B33E] text-white flex items-center justify-center font-bold text-lg">
                ✓
              </div>

              <p className="font-semibold text-[#0D3B2E]">
                Consulta creada
              </p>

            </div>

            <div className="w-24 h-[2px] bg-[#DADADA]" />

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-full bg-[#0D3B2E] text-white flex items-center justify-center font-bold text-lg">
                2
              </div>

              <p className="font-semibold text-[#0D3B2E]">
                Pago seguro
              </p>

            </div>

            <div className="w-24 h-[2px] bg-[#DADADA]" />

            <div className="flex items-center gap-4 opacity-40">

              <div className="w-14 h-14 rounded-full bg-[#EAEAEA] flex items-center justify-center font-bold text-lg">
                3
              </div>

              <p className="font-semibold">
                Atención profesional
              </p>

            </div>

          </div>

          {/* GRID */}
          <div className="grid grid-cols-12 gap-10">

            {/* LEFT */}
            <div className="col-span-7">

              <div className="bg-white border border-[#ECECEC] rounded-[40px] p-12 shadow-sm">

                <div className="flex items-center justify-between mb-12">

                  <div>

                    <p className="text-[#57B33E] font-semibold mb-3">
                      Método de pago
                    </p>

                    <h2 className="text-4xl font-bold text-[#0D3B2E]">
                      Información bancaria
                    </h2>

                  </div>

                  <div className="flex gap-3">

                    <div className="px-4 py-3 rounded-2xl bg-[#F5F5F3] font-semibold text-sm">
                      VISA
                    </div>

                    <div className="px-4 py-3 rounded-2xl bg-[#F5F5F3] font-semibold text-sm">
                      Mastercard
                    </div>

                  </div>

                </div>

                <div className="space-y-8">

                  {/* CARD */}
                  <div>

                    <label className="block mb-4 font-semibold text-[#0D3B2E] text-lg">
                      Número de tarjeta
                    </label>

                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full h-[72px] px-6 rounded-[24px] border border-[#E2E2E2] text-lg focus:outline-none focus:border-[#57B33E]"
                    />

                  </div>

                  {/* NAME */}
                  <div>

                    <label className="block mb-4 font-semibold text-[#0D3B2E] text-lg">
                      Nombre del titular
                    </label>

                    <input
                      type="text"
                      placeholder="Juan Pérez"
                      className="w-full h-[72px] px-6 rounded-[24px] border border-[#E2E2E2] text-lg focus:outline-none focus:border-[#57B33E]"
                    />

                  </div>

                  {/* ROW */}
                  <div className="grid grid-cols-2 gap-6">

                    <div>

                      <label className="block mb-4 font-semibold text-[#0D3B2E] text-lg">
                        Expiración
                      </label>

                      <input
                        type="text"
                        placeholder="MM / AA"
                        className="w-full h-[72px] px-6 rounded-[24px] border border-[#E2E2E2] text-lg focus:outline-none focus:border-[#57B33E]"
                      />

                    </div>

                    <div>

                      <label className="block mb-4 font-semibold text-[#0D3B2E] text-lg">
                        CVV
                      </label>

                      <input
                        type="text"
                        placeholder="123"
                        className="w-full h-[72px] px-6 rounded-[24px] border border-[#E2E2E2] text-lg focus:outline-none focus:border-[#57B33E]"
                      />

                    </div>

                  </div>

                  {/* SECURITY */}
                  <div className="bg-[#F8FBF6] border border-[#E6F1E0] rounded-[30px] p-8 flex gap-5">

                    <div className="w-16 h-16 rounded-2xl bg-[#EAF8E4] flex items-center justify-center text-3xl">
                      🔒
                    </div>

                    <div>

                      <h3 className="font-bold text-[#0D3B2E] text-xl mb-3">
                        Pago protegido
                      </h3>

                      <p className="text-[#5B6B63] leading-relaxed">
                        Todas las transacciones están cifradas y protegidas.
                        Tu información nunca será compartida.
                      </p>

                    </div>

                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={async () => {

                      if (!consultationId) return;

                      setLoading(true);

                      if (consultationId) {
                        await supabase
                          .from("consultations")
                          .update({
                            payment_status: "paid",
                          })
                          .eq("id", consultationId);
                      }
                      setTimeout(() => {

                        console.log(service);

                          router.push(
                            `/asignando-especialista?id=${consultationId}`
                          );

                      }, 1200);

                    }}
                    className="w-full h-[78px] bg-gradient-to-r from-[#0D3B2E] to-[#57B33E] rounded-[26px] text-white text-xl font-bold hover:scale-[1.01] transition-all duration-300 shadow-xl"
                  >

                    {loading
                      ? "Procesando pago..."
                      : "Pagar y continuar"}

                  </button>

                </div>

              </div>

            </div>

            {/* RIGHT */}
            <div className="col-span-5">

              <div className="sticky top-10">

                {/* CARD */}
                <div className="bg-[#0D3B2E] rounded-[42px] p-10 text-white mb-8 overflow-hidden relative">

                  <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[#7ED957]/10 rounded-full blur-[80px]" />

                  <div className="relative z-10">

                    <div className="flex items-center justify-between mb-10">

                      <div>

                        <p className="text-[#7ED957] font-semibold mb-3">
                          Resumen
                        </p>

                        <h2 className="text-4xl font-bold leading-tight">
                          {service?.title || "Servicio"}
                        </h2>

                      </div>

                      <div className="w-20 h-20 rounded-[28px] bg-white/10 flex items-center justify-center text-4xl">

                        {service?.icon || "💬"}

                      </div>

                    </div>
                    <div className="mb-8">
  <p className="text-gray-400 text-sm mb-2">
    Tu consulta
  </p>

  <p className="text-white leading-relaxed">
    {consultation?.description || "Consulta arquitectónica"}
  </p>
</div>
                    {/* INFO */}
                    <div className="space-y-6 border-b border-white/10 pb-8 mb-8">

                      <div className="flex items-center justify-between">

                        <p className="text-gray-300">
                          Servicio
                        </p>

                        <p className="font-semibold">
                          {service?.title}
                        </p>

                      </div>

                      <div className="flex items-center justify-between">

                        <p className="text-gray-300">
                          Atención
                        </p>

                        <p className="font-semibold">
                          Inmediata
                        </p>

                      </div>

                      <div className="flex items-center justify-between">

                        <p className="text-gray-300">
                          Especialista
                        </p>

                        <p className="font-semibold">
                          Disponible
                        </p>

                      </div>

                    </div>

                    {/* TOTAL */}
                    <div className="flex items-end justify-between">

                      <div>

                        <p className="text-gray-400 mb-3">
                          Total a pagar
                        </p>

                        <h3 className="text-6xl font-bold text-[#7ED957]">
                          {service?.price || "$0"}
                        </h3>

                      </div>

                      <div className="bg-white/10 px-5 py-3 rounded-2xl text-sm font-semibold">
                        MXN
                      </div>

                    </div>

                  </div>

                </div>

                {/* BENEFITS */}
                <div className="bg-white border border-[#ECECEC] rounded-[35px] p-8">

                  <h3 className="text-2xl font-bold text-[#0D3B2E] mb-8">
                    Incluye
                  </h3>

                  <div className="space-y-6">

                    <div className="flex gap-4">

                      <div className="w-12 h-12 rounded-2xl bg-[#EAF8E4] flex items-center justify-center">
                        ✓
                      </div>

                      <div>

                        <h4 className="font-bold text-[#0D3B2E]">
                          Atención profesional
                        </h4>

                        <p className="text-[#5B6B63]">
                          Arquitectos e ingenieros certificados.
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-4">

                      <div className="w-12 h-12 rounded-2xl bg-[#EAF8E4] flex items-center justify-center">
                        ⚡
                      </div>

                      <div>

                        <h4 className="font-bold text-[#0D3B2E]">
                          Respuesta rápida
                        </h4>

                        <p className="text-[#5B6B63]">
                          Atención en pocos minutos.
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-4">

                      <div className="w-12 h-12 rounded-2xl bg-[#EAF8E4] flex items-center justify-center">
                        🔒
                      </div>

                      <div>

                        <h4 className="font-bold text-[#0D3B2E]">
                          Seguridad garantizada
                        </h4>

                        <p className="text-[#5B6B63]">
                          Tu información está protegida.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}