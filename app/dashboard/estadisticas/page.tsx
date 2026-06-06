"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Star,
  CalendarDays,
  DollarSign,
  BarChart3,
} from "lucide-react";

type Professional = {
    id: string;
    name: string;
    rating: number | null;
  };

type Consultation = {
  id: number;
  service: string | null;
  status: string | null;
  assigned_professional_id: string | null;
};

type Rating = {
  rating_general: number;
};

type FollowUp = {
  id: string;
  status: string;
};

export default function EstadisticasPage() {
  const router = useRouter();

  const [professional, setProfessional] =
    useState<Professional | null>(null);

  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: professionalData } = await supabase
      .from("professionals")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (!professionalData) {
      setLoading(false);
      return;
    }

    setProfessional(professionalData);

    const [{ data: consultationsData }, { data: ratingsData }, { data: followUpsData }] =
      await Promise.all([
        supabase
          .from("consultations")
          .select("*")
          .eq(
            "assigned_professional_id",
            professionalData.id
          ),

        supabase
          .from("consultation_ratings")
          .select("*"),

        supabase
          .from("follow_ups")
          .select("*")
          .eq(
            "professional_id",
            professionalData.id
          ),
      ]);

    setConsultations(consultationsData || []);
    setRatings(ratingsData || []);
    setFollowUps(followUpsData || []);

    setLoading(false);
  };

  const completedConsultations = useMemo(
    () =>
      consultations.filter(
        (item) => item.status === "completed"
      ),
    [consultations]
  );

  const activeConsultations = useMemo(
    () =>
      consultations.filter(
        (item) =>
          item.status === "assigned" ||
          item.status === "in_progress"
      ),
    [consultations]
  );

  const completedChat = completedConsultations.filter(
    (item) =>
      item.service?.toLowerCase().includes("chat")
  ).length;

  const completedVideo = completedConsultations.filter(
    (item) =>
      item.service?.toLowerCase().includes("video")
  ).length;

  const completedPlans = completedConsultations.filter(
    (item) =>
      item.service?.toLowerCase().includes("plano")
  ).length;

  const completedBudget = completedConsultations.filter(
    (item) =>
      item.service?.toLowerCase().includes("presupuesto")
  ).length;

  const averageRating =
  professional?.rating !== null && professional?.rating !== undefined
    ? Number(professional.rating).toFixed(1)
    : "0.0";

  const estimatedEarnings =
    completedChat * 150 +
    completedVideo * 200 +
    completedPlans * 200 +
    completedBudget * 200;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F5F3] p-8">
        Cargando estadísticas...
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

        <section className="bg-[#0B3B2E] text-white rounded-[32px] p-8">
          <p className="text-[#7ED957] font-bold">
            Estadísticas profesionales
          </p>

          <h1 className="text-5xl font-black mt-2">
            Tu rendimiento
          </h1>

          <p className="mt-3 text-white/80">
            Resumen de actividad y desempeño.
          </p>

          <p className="mt-4 text-sm text-white/70">
            Profesional: {professional?.name}
          </p>
        </section>

        <section className="grid md:grid-cols-4 gap-5">

          <div className="bg-white rounded-3xl p-6 border">
            <CalendarDays className="text-[#57B33E]" />
            <p className="mt-4 text-sm text-[#6B7280]">
              Consultas finalizadas
            </p>
            <h2 className="text-3xl font-black">
              {completedConsultations.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 border">
            <Star className="text-[#57B33E]" />
            <p className="mt-4 text-sm text-[#6B7280]">
              Calificación
            </p>
            <h2 className="text-3xl font-black">
              {averageRating}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 border">
            <BarChart3 className="text-[#57B33E]" />
            <p className="mt-4 text-sm text-[#6B7280]">
              Seguimientos
            </p>
            <h2 className="text-3xl font-black">
              {followUps.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 border">
            <DollarSign className="text-[#57B33E]" />
            <p className="mt-4 text-sm text-[#6B7280]">
              Ganancia estimada
            </p>
            <h2 className="text-3xl font-black">
              ${estimatedEarnings}
            </h2>
          </div>

        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

  <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB]">
    <h2 className="text-2xl font-black text-[#0B3B2E] mb-5">
      Distribución de servicios
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
      Satisfacción del cliente
    </h2>

    <div className="bg-[#F4FAF1] rounded-2xl p-5">

      <p className="text-4xl font-black text-[#0B3B2E]">
        {averageRating} ⭐
      </p>

      <p className="text-sm text-[#6B7280] mt-2">
        Basado en {ratings.length} reseñas recibidas.
      </p>

      <p className="mt-4 text-[#15803D] font-bold">
        Excelente desempeño profesional
      </p>

    </div>
  </div>

</section>

<section className="bg-white rounded-3xl p-6 border border-[#E5E7EB]">

  <h2 className="text-2xl font-black text-[#0B3B2E] mb-5">
    Actividad general
  </h2>

  <div className="grid md:grid-cols-3 gap-5">

    <div className="bg-[#F8FAF7] rounded-2xl p-5">
      <p className="text-sm text-[#6B7280]">
        Consultas finalizadas
      </p>

      <p className="text-3xl font-black text-[#0B3B2E] mt-2">
        {completedConsultations.length}
      </p>
    </div>

    <div className="bg-[#F8FAF7] rounded-2xl p-5">
      <p className="text-sm text-[#6B7280]">
        Consultas activas
      </p>

      <p className="text-3xl font-black text-[#0B3B2E] mt-2">
        {activeConsultations.length}
      </p>
    </div>

    <div className="bg-[#F8FAF7] rounded-2xl p-5">
      <p className="text-sm text-[#6B7280]">
        Seguimientos programados
      </p>

      <p className="text-3xl font-black text-[#0B3B2E] mt-2">
        {followUps.length}
      </p>
    </div>

  </div>

</section>

      </div>
    </main>
  );
}