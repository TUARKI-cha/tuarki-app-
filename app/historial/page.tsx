"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HistorialPage() {
  const [consultations, setConsultations] =
    useState<any[]>([]);

  useEffect(() => {
    loadConsultations();
  }, []);

  const loadConsultations = async () => {
    const { data, error } = await supabase
      .from("consultations")
      .select("*")
      .eq("status", "completed")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setConsultations(data || []);
  };

  return (
    <main className="min-h-screen bg-[#F8FAF7] px-8 py-8 text-[#0D3B2E]">
      <header className="max-w-[1400px] mx-auto flex items-center justify-between mb-10">
        <Link href="/" className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0D3B2E] to-[#57B33E]" />

          <div>
            <h1 className="text-4xl font-black leading-none">
              TuArki
            </h1>
            <p className="text-sm text-[#6B7280]">
              siempre contigo
            </p>
          </div>
        </Link>

        <Link
          href="/nueva-consulta"
          className="bg-[#0D3B2E] text-white px-7 py-4 rounded-full font-bold"
        >
          Nueva consulta
        </Link>
      </header>

      <section className="max-w-[1400px] mx-auto">
        <Link
          href="/"
          className="inline-flex mb-8 text-sm text-[#6B7280] hover:text-[#57B33E]"
        >
          ← Volver al inicio
        </Link>

        <div className="mb-10">
          <p className="text-[#57B33E] font-bold mb-3">
            Historial TuArki
          </p>

          <h1 className="text-5xl font-black text-[#111] mb-4">
            Tus consultas finalizadas
          </h1>

          <p className="text-[#6B7280] text-lg max-w-3xl">
            Consulta tus servicios anteriores, revisa recomendaciones,
            archivos enviados y detalles del especialista que te atendió.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {consultations.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5E7EB] rounded-[30px] p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#F3FFEE] text-[#15803D] px-4 py-2 rounded-full text-sm font-bold">
                    Finalizada
                  </span>

                  <span className="text-sm text-[#6B7280]">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleString("es-MX")
                      : "Fecha no disponible"}
                  </span>
                </div>

                <h2 className="text-2xl font-black text-[#111] mb-2">
                  {item.description || item.title || "Consulta TuArki"}
                </h2>

                <div className="flex flex-wrap gap-3 text-sm text-[#6B7280]">
                  <span>
                    Servicio:{" "}
                    <strong className="text-[#0D3B2E]">
                      {item.service || "Consulta"}
                    </strong>
                  </span>

                  <span>
                    Categoría:{" "}
                    <strong className="text-[#0D3B2E]">
                      {item.category || "General"}
                    </strong>
                  </span>

                  <span>
                    Especialista:{" "}
                    <strong className="text-[#0D3B2E]">
                      {item.assigned_professional || "Asignado"}
                    </strong>
                  </span>
                </div>
              </div>

              <Link
                href={`/finalizar-consulta/${item.id}`}
                className="bg-[#57B33E] text-white px-7 py-4 rounded-2xl font-bold text-center whitespace-nowrap"
              >
                Ver resumen
              </Link>
            </div>
          ))}

          {consultations.length === 0 && (
            <div className="bg-white border border-[#E5E7EB] rounded-[30px] p-12 text-center">
              <h2 className="text-2xl font-black text-[#111] mb-3">
                Aún no tienes consultas finalizadas
              </h2>

              <p className="text-[#6B7280] mb-8">
                Cuando finalices una consulta, aparecerá aquí.
              </p>

              <Link
                href="/nueva-consulta"
                className="inline-block bg-[#0D3B2E] text-white px-8 py-4 rounded-2xl font-bold"
              >
                Crear nueva consulta
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}