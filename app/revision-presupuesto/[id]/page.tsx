"use client";

import Link from "next/link";
import {
    useParams,
    useRouter,
  } from "next/navigation";
import { supabase } from "@/lib/supabase";

import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  DollarSign,
  Download,
  FileSpreadsheet,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function RevisionPresupuestoPage() {

  const rows = [
    {
      concept: "Cimentación",
      amount: "$48,000",
      status: "correcto",
    },

    {
      concept: "Instalación hidráulica",
      amount: "$72,000",
      status: "revisar",
    },

    {
      concept: "Acabados interiores",
      amount: "$110,000",
      status: "elevado",
    },

    {
      concept: "Cancelería",
      amount: "$39,000",
      status: "correcto",
    },

    {
      concept: "Pintura",
      amount: "$18,000",
      status: "correcto",
    },
  ];

  const router = useRouter();
  const params = useParams();

  return (

    <main className="min-h-screen bg-[#F6F7F8] px-8 pb-10">

      {/* HEADER */}

      <header className="max-w-[1600px] mx-auto py-6 flex items-center justify-between">

        <Link
          href="/"
          className="flex items-center gap-4"
        >

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B3B2E] to-[#57B33E]" />

          <div>

            <h1 className="text-4xl font-black text-[#0B3B2E] leading-none">
              TuArki
            </h1>

            <p className="text-sm text-[#6B7280]">
              siempre contigo
            </p>

          </div>

        </Link>

        <div className="flex items-center gap-4">

          <button className="px-6 py-3 rounded-full border border-[#E5E7EB] bg-white font-semibold">
            Análisis financiero activo
          </button>

          <button className="px-7 py-3 rounded-full bg-[#0B3B2E] text-white font-semibold">
            Presupuesto protegido
          </button>

        </div>

      </header>

      {/* CONTENT */}

      <section className="max-w-[1600px] mx-auto">

        {/* BACK */}

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#374151] mb-8 hover:text-[#57B33E]"
        >

          <ArrowLeft size={18} />

          Volver

        </Link>

        {/* GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8">

          {/* LEFT */}

          <div className="space-y-8">

            {/* HERO */}

            <div className="bg-white rounded-[36px] border border-[#E5E7EB] shadow-sm overflow-hidden">

              <div className="p-8 border-b border-[#F1F1F1] flex items-center justify-between">

                <div className="flex items-center gap-5">

                  <div className="w-16 h-16 rounded-2xl bg-[#F4FAF1] flex items-center justify-center">

                    <FileSpreadsheet
                      size={34}
                      className="text-[#57B33E]"
                    />

                  </div>

                  <div>

                    <h1 className="text-4xl font-black text-[#111]">
                      Revisión de presupuesto
                    </h1>

                    <p className="text-[#6B7280] mt-1">
                      Validación profesional de costos y conceptos.
                    </p>

                  </div>

                </div>

                <button className="px-5 py-3 rounded-2xl bg-[#57B33E] text-white font-semibold flex items-center gap-2 shadow-lg">

                  <Download size={18} />

                  Descargar PDF

                </button>

                <button
  onClick={async () => {

    await supabase
      .from("consultations")
      .update({
        status: "completed",
      })
      .eq("id", params.id);

    router.push(
      `/finalizar-consulta/${params.id}`
    );

  }}
  className="px-5 py-3 rounded-2xl bg-[#EF4444] text-white font-semibold hover:opacity-90 transition-all"
>
  Finalizar revisión
</button>

              </div>

              {/* TABLE */}

              <div className="p-8 overflow-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b border-[#E5E7EB]">

                      <th className="text-left pb-5 text-[#6B7280]">
                        Concepto
                      </th>

                      <th className="text-left pb-5 text-[#6B7280]">
                        Monto
                      </th>

                      <th className="text-left pb-5 text-[#6B7280]">
                        Estado
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {rows.map((row) => (

                      <tr
                        key={row.concept}
                        className="border-b border-[#F3F4F6]"
                      >

                        <td className="py-6 font-semibold text-[#111]">
                          {row.concept}
                        </td>

                        <td className="py-6 text-[#374151]">
                          {row.amount}
                        </td>

                        <td className="py-6">

                          <div
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                              row.status === "correcto"
                                ? "bg-[#F0FDF4] text-[#15803D]"
                                : row.status === "revisar"
                                ? "bg-[#FEF3C7] text-[#B45309]"
                                : "bg-[#FEE2E2] text-[#B91C1C]"
                            }`}
                          >

                            <div
                              className={`w-2 h-2 rounded-full ${
                                row.status === "correcto"
                                  ? "bg-[#15803D]"
                                  : row.status === "revisar"
                                  ? "bg-[#B45309]"
                                  : "bg-[#B91C1C]"
                              }`}
                            />

                            {row.status}

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

            {/* OBSERVATIONS */}

            <div className="bg-white rounded-[36px] border border-[#E5E7EB] p-8">

              <div className="flex items-center gap-3 mb-8">

                <AlertTriangle
                  size={28}
                  className="text-[#57B33E]"
                />

                <h2 className="text-3xl font-black text-[#111]">
                  Observaciones del especialista
                </h2>

              </div>

              <div className="space-y-5">

                {[
                  {
                    title: "Acabados por encima del promedio",
                    text: "El costo de acabados interiores supera el promedio de mercado.",
                  },

                  {
                    title: "Instalación hidráulica requiere validación",
                    text: "Se recomienda solicitar desglose adicional.",
                  },

                  {
                    title: "Estructura general correcta",
                    text: "El resto del presupuesto se encuentra equilibrado.",
                  },

                ].map((item) => (

                  <div
                    key={item.title}
                    className="border border-[#E5E7EB] rounded-[24px] p-6"
                  >

                    <div className="flex items-start gap-4">

                      <div className="w-12 h-12 rounded-2xl bg-[#F4FAF1] flex items-center justify-center shrink-0">

                        <CheckCircle2
                          size={24}
                          className="text-[#57B33E]"
                        />

                      </div>

                      <div>

                        <h3 className="text-xl font-black text-[#111]">
                          {item.title}
                        </h3>

                        <p className="text-[#6B7280] mt-2 leading-relaxed">
                          {item.text}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <aside className="space-y-6">

            {/* SUMMARY */}

            <div className="bg-[#0B3B2E] rounded-[32px] p-7 text-white">

              <p className="text-sm opacity-70">
                Estimación analizada
              </p>

              <h2 className="text-5xl font-black mt-3">
                $287,000
              </h2>

              <div className="mt-8 space-y-4">

                <div className="flex items-center justify-between">

                  <span className="opacity-70">
                    Nivel de confianza
                  </span>

                  <span className="font-bold">
                    92%
                  </span>

                </div>

                <div className="h-3 rounded-full bg-white/10 overflow-hidden">

                  <div className="w-[92%] h-full bg-[#57B33E]" />

                </div>

              </div>

            </div>

            {/* STATUS */}

            <div className="bg-white rounded-[32px] border border-[#E5E7EB] p-7">

              <h3 className="text-2xl font-black text-[#111] mb-6">
                Estado del análisis
              </h3>

              <div className="space-y-5">

                {[
                  "Presupuesto validado",
                  "Conceptos revisados",
                  "Costos comparados",
                  "Recomendaciones generadas",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >

                    <BadgeCheck
                      size={20}
                      className="text-[#57B33E]"
                    />

                    <p className="text-[#374151]">
                      {item}
                    </p>

                  </div>

                ))}

              </div>

            </div>

            {/* SAVINGS */}

            <div className="bg-[#F4FAF1] rounded-[32px] border border-[#DCEFD2] p-7">

              <div className="flex items-center gap-4 mb-5">

                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">

                  <TrendingUp
                    size={28}
                    className="text-[#57B33E]"
                  />

                </div>

                <div>

                  <p className="text-sm text-[#6B7280]">
                    Posible ahorro detectado
                  </p>

                  <h3 className="text-4xl font-black text-[#111]">
                    $32,000
                  </h3>

                </div>

              </div>

              <p className="text-[#374151] leading-relaxed">
                El especialista detectó posibles optimizaciones en materiales y acabados.
              </p>

            </div>

            {/* ACTIONS */}

            <div className="bg-white rounded-[32px] border border-[#E5E7EB] p-7">

              <h3 className="text-2xl font-black text-[#111] mb-6">
                Acciones disponibles
              </h3>

              <div className="space-y-4">

                {[
                  {
                    icon: DollarSign,
                    title: "Solicitar desglose detallado",
                  },

                  {
                    icon: ShieldCheck,
                    title: "Guardar revisión financiera",
                  },

                  {
                    icon: Download,
                    title: "Exportar análisis",
                  },

                ].map((item) => {

                  const Icon = item.icon;

                  return (

                    <button
                      key={item.title}
                      className="w-full bg-[#FAFAF8] hover:bg-[#F4FAF1] transition-all border border-[#E5E7EB] rounded-[22px] p-5 flex items-center gap-4 text-left"
                    >

                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center">

                        <Icon
                          size={24}
                          className="text-[#57B33E]"
                        />

                      </div>

                      <span className="font-semibold text-[#111]">
                        {item.title}
                      </span>

                    </button>

                  );

                })}

              </div>

            </div>

          </aside>

        </div>

      </section>

    </main>

  );

}