"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  User,
} from "lucide-react";

type Professional = {
  id: string;
  name: string;
  email: string;
  rating: number | null;
};

type FollowUp = {
  id: string;
  consultation_id: number;
  professional_id: string;
  professional_name: string | null;
  client_name: string;
  client_phone: string | null;
  service: string | null;
  scheduled_date: string;
  scheduled_time: string;
  notes: string | null;
  status: string;
  created_at: string;
};

export default function AgendaPage() {
  const router = useRouter();

  const [professional, setProfessional] =
    useState<Professional | null>(null);

  const [followUps, setFollowUps] =
    useState<FollowUp[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAgenda();
  }, []);

  async function loadAgenda() {
    setLoading(true);

    const { data: professionalData } = await supabase
      .from("professionals")
      .select("id, name, email, rating")
      .limit(1)
      .single();

    if (!professionalData) {
      setLoading(false);
      return;
    }

    setProfessional(professionalData);

    const { data } = await supabase
      .from("follow_ups")
      .select("*")
      .eq("professional_id", professionalData.id)
      .order("scheduled_date", {
        ascending: true,
      });

    setFollowUps(data || []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#F5F5F3] px-6 py-8">
  <div className="max-w-7xl mx-auto space-y-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center gap-2 text-[#0B3B2E] font-bold"
        >
          <ArrowLeft size={18} />
          Volver al dashboard
        </button>

        <section className="bg-[#0B3B2E] text-white rounded-[32px] p-8">
          <p className="text-[#7ED957] font-bold">
            Agenda profesional
          </p>

          <h1 className="text-5xl font-black mt-2">
            Seguimientos
          </h1>

          <p className="mt-3 text-white/80">
            Administra las consultas
            programadas con tus clientes.
          </p>

          {professional && (
            <p className="mt-4 text-white/70">
              Profesional: {professional.name}
            </p>
          )}
        </section>

        <section className="grid md:grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB]">
            <p className="text-sm text-[#6B7280]">
              Seguimientos activos
            </p>

            <h2 className="text-4xl font-black text-[#0B3B2E] mt-2">
              {followUps.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB]">
            <p className="text-sm text-[#6B7280]">
              Próximos
            </p>

            <h2 className="text-4xl font-black text-[#0B3B2E] mt-2">
              {
                followUps.filter(
                  (item) => item.status === "scheduled"
                ).length
              }
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB]">
            <p className="text-sm text-[#6B7280]">
              Completados
            </p>

            <h2 className="text-4xl font-black text-[#0B3B2E] mt-2">
              {
                followUps.filter(
                  (item) => item.status === "completed"
                ).length
              }
            </h2>
          </div>
        </section>

        <section className="bg-white rounded-[32px] border border-[#E5E7EB] overflow-hidden">
          <div className="p-6 border-b border-[#E5E7EB]">
            <h2 className="text-2xl font-black text-[#0B3B2E]">
              Agenda de seguimientos
            </h2>
          </div>

          {loading ? (
            <div className="p-10 text-center">
              Cargando agenda...
            </div>
          ) : followUps.length === 0 ? (
            <div className="p-10 text-center">
              <h3 className="text-xl font-black text-[#0B3B2E]">
                No tienes seguimientos programados
              </h3>

              <p className="text-[#6B7280] mt-2">
                Los seguimientos aparecerán aquí.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#E5E7EB]">
              {followUps.map((item) => (
                <div
                  key={item.id}
                  className="p-6 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-xl font-black text-[#0B3B2E]">
                      {item.client_name}
                    </h3>

                    <div className="flex flex-wrap gap-3 mt-3 text-sm">
                      <span className="flex items-center gap-1">
                        <CalendarDays size={14} />
                        {item.scheduled_date}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock3 size={14} />
                        {item.scheduled_time}
                      </span>

                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {item.service}
                      </span>
                    </div>
                  </div>

                  <span className="px-4 py-2 rounded-full bg-[#EAF7E5] text-[#0B3B2E] font-bold">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}