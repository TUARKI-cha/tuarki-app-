"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  DollarSign,
  MessageCircle,
  Video,
  FileText,
  Calculator,
} from "lucide-react";

type Professional = {
  id: string;
  name: string;
  specialty: string | null;
};

type Consultation = {
  id: number;
  created_at: string;
  title: string | null;
  service: string | null;
  status: string | null;
  assigned_professional_id: string | null;
};

export default function GananciasPage() {
  const router = useRouter();

  const [professional, setProfessional] =
    useState<Professional | null>(null);

  const [consultations, setConsultations] =
    useState<Consultation[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEarningsData();
  }, []);

  const loadEarningsData = async () => {
    setLoading(true);

    const { data: professionalData } = await supabase
      .from("professionals")
      .select("id, name, specialty")
      .limit(1)
      .maybeSingle();

    if (!professionalData) {
      setLoading(false);
      return;
    }

    setProfessional(professionalData);

    const { data: consultationsData } = await supabase
      .from("consultations")
      .select("*")
      .eq("assigned_professional_id", professionalData.id)
      .eq("status", "completed")
      .order("created_at", { ascending: false });

    setConsultations(consultationsData || []);
    setLoading(false);
  };

  const completedChat = useMemo(
    () =>
      consultations.filter((item) =>
        item.service?.toLowerCase().includes("chat")
      ).length,
    [consultations]
  );

  const completedVideo = useMemo(
    () =>
      consultations.filter((item) =>
        item.service?.toLowerCase().includes("video")
      ).length,
    [consultations]
  );

  const completedPlans = useMemo(
    () =>
      consultations.filter((item) =>
        item.service?.toLowerCase().includes("plano")
      ).length,
    [consultations]
  );

  const completedBudget = useMemo(
    () =>
      consultations.filter((item) =>
        item.service?.toLowerCase().includes("presupuesto")
      ).length,
    [consultations]
  );

  const estimatedEarnings =
    completedChat * 150 +
    completedVideo * 200 +
    completedPlans * 200 +
    completedBudget * 200;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F5F3] p-8">
        Cargando ganancias...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F3] px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center gap-2 text-[#0B3B2E] font-bold hover:underline"
        >
          <ArrowLeft size={20} />
          Volver al dashboard
        </button>

        <section className="bg-[#0B3B2E] text-white rounded-[32px] p-8 shadow-xl">
          <p className="text-[#7ED957] font-bold">
            Ganancias profesionales
          </p>

          <h1 className="text-5xl font-black mt-2">
            ${estimatedEarnings.toLocaleString("es-MX")} MXN
          </h1>

          <p className="mt-3 text-white/80">
            Ganancia estimada acumulada por consultas finalizadas.
          </p>

          {professional && (
            <p className="mt-5 text-sm text-white/70">
              Profesional: {professional.name}
            </p>
          )}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB]">
            <MessageCircle className="text-[#57B33E]" />
            <p className="text-sm text-[#6B7280] mt-4">Chats</p>
            <h2 className="text-3xl font-black text-[#0B3B2E]">
              {completedChat}
            </h2>
            <p className="text-sm text-[#6B7280]">
              ${(completedChat * 150).toLocaleString("es-MX")} MXN
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB]">
            <Video className="text-[#57B33E]" />
            <p className="text-sm text-[#6B7280] mt-4">Videollamadas</p>
            <h2 className="text-3xl font-black text-[#0B3B2E]">
              {completedVideo}
            </h2>
            <p className="text-sm text-[#6B7280]">
              ${(completedVideo * 200).toLocaleString("es-MX")} MXN
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB]">
            <FileText className="text-[#57B33E]" />
            <p className="text-sm text-[#6B7280] mt-4">Planos</p>
            <h2 className="text-3xl font-black text-[#0B3B2E]">
              {completedPlans}
            </h2>
            <p className="text-sm text-[#6B7280]">
              ${(completedPlans * 200).toLocaleString("es-MX")} MXN
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB]">
            <Calculator className="text-[#57B33E]" />
            <p className="text-sm text-[#6B7280] mt-4">Presupuestos</p>
            <h2 className="text-3xl font-black text-[#0B3B2E]">
              {completedBudget}
            </h2>
            <p className="text-sm text-[#6B7280]">
              ${(completedBudget * 200).toLocaleString("es-MX")} MXN
            </p>
          </div>
        </section>

       <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

  <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB]">
    <h2 className="text-2xl font-black text-[#0B3B2E] mb-5">
      Consultas que generan ingresos
    </h2>

    <div className="space-y-4">

      <div className="flex justify-between">
        <span>Chat profesional</span>
        <span className="font-black">{completedChat}</span>
      </div>

      <div className="flex justify-between">
        <span>Videollamada</span>
        <span className="font-black">{completedVideo}</span>
      </div>

      <div className="flex justify-between">
        <span>Revisión de planos</span>
        <span className="font-black">{completedPlans}</span>
      </div>

      <div className="flex justify-between">
        <span>Revisión de presupuesto</span>
        <span className="font-black">{completedBudget}</span>
      </div>

    </div>
  </div>

  <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB]">
    <h2 className="text-2xl font-black text-[#0B3B2E] mb-5">
      Próximos pagos
    </h2>

    <div className="bg-[#F4FAF1] rounded-2xl p-5">
      <p className="font-black text-[#15803D]">
        Próximamente
      </p>

      <p className="text-sm text-[#6B7280] mt-2">
        Los pagos liberados por TuArki aparecerán aquí.
      </p>
    </div>
  </div>

</section>

<section className="bg-white rounded-3xl p-6 border border-[#E5E7EB]">

  <h2 className="text-2xl font-black text-[#0B3B2E] mb-5">
    Historial mensual
  </h2>

  <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAF7]">
    <div>
      <p className="font-black">
        Junio 2026
      </p>

      <p className="text-sm text-[#6B7280]">
        Consultas finalizadas
      </p>
    </div>

    <p className="text-2xl font-black text-[#0B3B2E]">
      ${estimatedEarnings.toLocaleString("es-MX")} MXN
    </p>
  </div>

</section>

      </div>
    </main>
  );
}