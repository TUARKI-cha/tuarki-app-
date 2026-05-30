"use client";

import Link from "next/link";
import {
    useParams,
    useRouter,
  } from "next/navigation";
import { supabase } from "@/lib/supabase";

import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  MessageSquare,
  Ruler,
  ShieldCheck,
  Video,
} from "lucide-react";

export default function RevisionPlanosPage() {

    const router = useRouter();
    const params = useParams();

  return (

    <main className="min-h-screen bg-[#FAFAF8] px-8 pb-10">

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

          <button className="px-6 py-3 rounded-full border border-[#E5E7EB] font-semibold bg-white">
            Consulta protegida
          </button>

          <button className="px-7 py-3 rounded-full bg-[#0B3B2E] text-white font-semibold">
            Especialista conectado
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

        {/* TOP */}

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">

          {/* LEFT */}

          <div className="space-y-8">

            {/* HERO */}

            <div className="bg-white rounded-[36px] border border-[#E5E7EB] shadow-sm overflow-hidden">

              {/* HEADER */}

              <div className="p-8 border-b border-[#F1F1F1] flex items-center justify-between">

                <div>

                  <div className="flex items-center gap-3">

                    <div className="w-14 h-14 rounded-2xl bg-[#F4FAF1] flex items-center justify-center">

                      <Ruler
                        size={30}
                        className="text-[#57B33E]"
                      />

                    </div>

                    <div>

                      <h1 className="text-4xl font-black text-[#111]">
                        Revisión de planos
                      </h1>

                      <p className="text-[#6B7280] mt-1">
                        Evaluación profesional de distribución,
                        medidas y observaciones técnicas.
                      </p>

                    </div>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <button className="px-5 py-3 rounded-2xl border border-[#E5E7EB] bg-white font-semibold flex items-center gap-2">

                    <Eye size={18} />

                    Vista previa

                  </button>

                  <button className="px-5 py-3 rounded-2xl bg-[#57B33E] text-white font-semibold flex items-center gap-2 shadow-lg">

                    <Download size={18} />

                    Descargar revisión

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

              </div>

              {/* PLAN PREVIEW */}

              <div className="p-8">

                <div className="bg-[#F7F7F5] border border-[#E5E7EB] rounded-[32px] h-[700px] flex items-center justify-center relative overflow-hidden">

                  {/* MOCK PLAN */}

                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,#D1D5DB_1px,transparent_1px)] [background-size:22px_22px]" />

                  <div className="relative w-[75%] h-[75%] border-[10px] border-[#111] rounded-md">

                    <div className="absolute left-0 top-[35%] w-full h-[8px] bg-[#111]" />

                    <div className="absolute left-[45%] top-0 h-full w-[8px] bg-[#111]" />

                    <div className="absolute right-[15%] top-[35%] h-[65%] w-[8px] bg-[#111]" />

                    <div className="absolute left-[20%] top-[35%] h-[65%] w-[8px] bg-[#111]" />

                    {/* COMMENT POINTS */}

                    {[
                      "top-[22%] left-[30%]",
                      "top-[55%] left-[60%]",
                      "top-[70%] left-[28%]",
                    ].map((item, index) => (

                      <div
                        key={index}
                        className={`absolute ${item}`}
                      >

                        <div className="w-6 h-6 rounded-full bg-[#57B33E] border-4 border-white shadow-lg" />

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </div>

            {/* COMMENTS */}

            <div className="bg-white rounded-[36px] border border-[#E5E7EB] p-8">

              <div className="flex items-center gap-3 mb-8">

                <MessageSquare
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
                    title: "Distribución funcional correcta",
                    text: "La distribución general aprovecha bien la iluminación natural y circulación.",
                  },

                  {
                    title: "Área de cocina reducida",
                    text: "Se recomienda ampliar el espacio de trabajo para mejorar funcionalidad.",
                  },

                  {
                    title: "Ventilación adecuada",
                    text: "Los puntos de ventilación cumplen correctamente.",
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

            {/* SPECIALIST */}

            <div className="bg-white rounded-[32px] border border-[#E5E7EB] p-7">

              <div className="flex items-center gap-4">

                <div className="w-20 h-20 rounded-full bg-[#D1D5DB]" />

                <div>

                  <h3 className="text-2xl font-black text-[#111]">
                    Arq. Elizabeth Longoria
                  </h3>

                  <p className="text-[#6B7280]">
                    Especialista en diseño arquitectónico
                  </p>

                  <div className="flex items-center gap-2 mt-2">

                    <div className="w-3 h-3 rounded-full bg-[#57B33E]" />

                    <span className="text-[#57B33E] font-semibold">
                      En línea
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* SUMMARY */}

            <div className="bg-[#F4FAF1] rounded-[32px] border border-[#DCEFD2] p-7">

              <h3 className="text-2xl font-black text-[#111] mb-5">
                Resumen técnico
              </h3>

              <div className="space-y-4">

                {[
                  "Distribución funcional",
                  "Ventilación correcta",
                  "Áreas bien proporcionadas",
                  "Posible mejora en cocina",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >

                    <CheckCircle2
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

            {/* ACTIONS */}

            <div className="bg-white rounded-[32px] border border-[#E5E7EB] p-7">

              <h3 className="text-2xl font-black text-[#111] mb-6">
                Acciones disponibles
              </h3>

              <div className="space-y-4">

                {[
                  {
                    icon: Video,
                    title: "Continuar por videollamada",
                  },

                  {
                    icon: FileText,
                    title: "Solicitar PDF completo",
                  },

                  {
                    icon: ShieldCheck,
                    title: "Guardar revisión",
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