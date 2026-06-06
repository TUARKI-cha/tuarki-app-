"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  FileText,
  Star,
  CalendarDays,
  MessageCircle,
  Video,
} from "lucide-react";

type Professional = {
  id: string;
  name: string;
  email: string;
  specialty: string | null;
  rating: number | null;
};

type Consultation = {
  id: number;
  created_at: string;
  title: string | null;
  description: string | null;
  service: string | null;
  status: string | null;
  name: string | null;
  city: string | null;
  assigned_professional_id: string | null;
};

type Rating = {
  id: string;
  consultation_id: number;
  rating_general: number | null;
  rating_clarity: number | null;
  rating_attention: number | null;
  comment: string | null;
};

export default function HistorialProfesionalPage() {
  const router = useRouter();

  const [professional, setProfessional] = useState<Professional | null>(null);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);

    const { data: professionalData } = await supabase
      .from("professionals")
      .select("id, name, email, specialty, rating")
      .limit(1)
      .single();

    if (!professionalData) {
      setLoading(false);
      return;
    }

    setProfessional(professionalData);

    const { data: consultationsData } = await supabase
      .from("consultations")
      .select("*")
      .eq("assigned_professional_id", professionalData.id)
      .in("status", ["completed", "finalizada", "finished"])
      .order("created_at", { ascending: false });

    const consultationIds = (consultationsData || []).map((item) => item.id);

    let ratingsData: Rating[] = [];

    if (consultationIds.length > 0) {
      const { data } = await supabase
        .from("consultation_ratings")
        .select("*")
        .in("consultation_id", consultationIds);

      ratingsData = data || [];
    }

    setConsultations(consultationsData || []);
    setRatings(ratingsData);
    setLoading(false);
  };

  const getRating = (consultationId: number) => {
    return ratings.find((item) => item.consultation_id === consultationId);
  };

    const validRatings = ratings
  .map((item) => Number(item.rating_general))
  .filter((value) => !Number.isNaN(value));

const averageRating =
  validRatings.length > 0
    ? (
        validRatings.reduce((acc, value) => acc + value, 0) /
        validRatings.length
      ).toFixed(1)
    : "0.0";
    
  const openConsultation = (item: Consultation) => {
    const service = item.service?.toLowerCase() || "";

    if (service.includes("video")) {
      router.push(`/videollamada/${item.id}?role=professional`);
      return;
    }

    if (service.includes("planos")) {
      router.push(`/revision-planos/${item.id}`);
      return;
    }

    if (service.includes("presupuesto")) {
      router.push(`/revision-presupuesto/${item.id}`);
      return;
    }

    router.push(`/chat-profesional/${item.id}`);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[#F5F5F3] p-6">
  <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center gap-2 text-[#0B3B2E] font-bold hover:underline"
        >
          <ArrowLeft size={20} />
          Volver al dashboard
        </button>

        <section className="bg-[#0B3B2E] text-white rounded-[32px] p-8 shadow-xl">
          <p className="text-[#7ED957] font-bold">Historial profesional</p>

          <h1 className="text-4xl font-black mt-2">
            Consultas atendidas
          </h1>

          <p className="mt-3 text-white/80">
            Aquí puedes revisar las consultas finalizadas asignadas a tu perfil profesional.
          </p>

          {professional && (
            <p className="mt-5 text-sm text-white/70">
              Profesional: {professional.name}
            </p>
          )}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB]">
            <p className="text-sm text-[#6B7280]">Consultas finalizadas</p>
            <h2 className="text-4xl font-black text-[#0B3B2E] mt-2">
              {consultations.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB]">
            <p className="text-sm text-[#6B7280]">Calificaciones recibidas</p>
            <h2 className="text-4xl font-black text-[#0B3B2E] mt-2">
              {ratings.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB]">
            <p className="text-sm text-[#6B7280]">Promedio</p>
            <h2 className="text-4xl font-black text-[#0B3B2E] mt-2">
              {professional?.rating?.toFixed(1) || "0.0"}
              <span className="text-xl ml-1">★</span>
            </h2>
          </div>
        </section>

        <section className="bg-white rounded-[32px] border border-[#E5E7EB] mt-6 overflow-hidden">
          <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-[#0B3B2E]">
                Historial de consultas
              </h2>
              <p className="text-[#6B7280] mt-1">
                Lista de servicios ya finalizados.
              </p>
            </div>

            <FileText className="text-[#0B3B2E]" />
          </div>

          {loading ? (
            <div className="p-10 text-center text-[#6B7280] font-semibold">
              Cargando historial...
            </div>
          ) : consultations.length === 0 ? (
            <div className="p-10 text-center">
              <h3 className="text-xl font-black text-[#0B3B2E]">
                Aún no hay consultas finalizadas
              </h3>
              <p className="text-[#6B7280] mt-2">
                Cuando termines una consulta, aparecerá aquí.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#E5E7EB]">
              {consultations.map((item) => {
                const rating = getRating(item.id);
                const isVideo = item.service?.toLowerCase().includes("video");

                return (
                  <div
                    key={item.id}
                    className="p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 hover:bg-[#F9FAF7] transition"
                  >
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#EAF7E5] flex items-center justify-center text-[#0B3B2E]">
                        {isVideo ? <Video /> : <MessageCircle />}
                      </div>

                      <div>
                        <p className="text-sm text-[#6B7280] font-semibold">
                          Consulta #{item.id}
                        </p>

                        <h3 className="text-xl font-black text-[#0B3B2E]">
                          {item.title || "Consulta sin título"}
                        </h3>

                        <p className="text-[#6B7280] mt-1">
                          Cliente: {item.name || "Sin nombre"} ·{" "}
                          {item.city || "Sin ciudad"}
                        </p>

                        <div className="flex flex-wrap gap-3 mt-3 text-sm">
                          <span className="px-3 py-1 rounded-full bg-[#F4F4F2] text-[#374151] font-semibold">
                            {item.service || "Servicio no definido"}
                          </span>

                          <span className="px-3 py-1 rounded-full bg-[#F4F4F2] text-[#374151] font-semibold flex items-center gap-1">
                            <CalendarDays size={14} />
                            {formatDate(item.created_at)}
                          </span>

                          <span className="px-3 py-1 rounded-full bg-[#EAF7E5] text-[#0B3B2E] font-bold">
                            Finalizada
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="text-left sm:text-right">
                        <p className="text-sm text-[#6B7280]">Calificación</p>

                        {rating ? (
                          <p className="font-black text-[#0B3B2E] flex items-center gap-1 sm:justify-end">
                            <Star size={18} className="fill-current" />
                            {rating.rating_general}/5
                          </p>
                        ) : (
                          <p className="font-bold text-[#6B7280]">
                            Sin calificar
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => openConsultation(item)}
                        className="px-5 py-3 rounded-2xl bg-[#0B3B2E] text-white font-bold hover:bg-[#14513F] transition"
                      >
                        Ver detalle
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}