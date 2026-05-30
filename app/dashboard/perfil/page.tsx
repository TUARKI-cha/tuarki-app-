"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  BadgeCheck,
  Briefcase,
  Building2,
  MapPin,
  Star,
} from "lucide-react";

export default function PerfilPage() {
  const [professional, setProfessional] =
    useState<any>(null);

  useEffect(() => {
    loadProfessional();
  }, []);

  const loadProfessional = async () => {
    const { data, error } = await supabase
      .from("professionals")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) {
      console.log(error);
      return;
    }

    setProfessional(data);
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8] p-8">
      <div className="max-w-6xl mx-auto">

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-[#0B3B2E] font-bold mb-8"
        >
          <ArrowLeft size={18} />
          Volver al dashboard
        </Link>

        <section className="bg-white rounded-[36px] border border-[#E5E7EB] p-10 shadow-sm">

          <div className="flex items-center gap-8">

            <div className="w-36 h-36 rounded-full bg-[#D1D5DB]" />

            <div className="flex-1">

              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-black">
                  {professional?.name || "Profesional"}
                </h1>

                <BadgeCheck
                  className="text-[#57B33E]"
                  size={28}
                />
              </div>

              <p className="text-xl text-[#6B7280] mt-2">
                {professional?.specialty ||
                  "Especialista"}
              </p>

              <div className="flex flex-wrap gap-6 mt-6">

                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>
                    {professional?.city ||
                      "Sin ciudad"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Briefcase size={18} />
                  <span>
                    {professional?.experience_years || 0}
                    {" "}
                    años de experiencia
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Building2 size={18} />
                  <span>
                    {professional?.license_number ||
                      "Sin licencia"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Star size={18} />
                  <span>
                    {professional?.rating || 0}
                    {" "}
                    estrellas
                  </span>
                </div>

              </div>

            </div>

          </div>

          <div className="mt-12">

            <h2 className="text-2xl font-black mb-4">
              Acerca de mí
            </h2>

            <p className="text-[#4B5563] leading-relaxed text-lg">
              {professional?.bio ||
                "Sin descripción profesional."}
            </p>

          </div>

          <div className="grid grid-cols-4 gap-6 mt-12">

            <div className="bg-[#F4FAF1] rounded-3xl p-6">
              <p className="text-sm text-[#6B7280]">
                Consultas
              </p>

              <h3 className="text-4xl font-black mt-2">
                {professional?.total_consultations || 0}
              </h3>
            </div>

            <div className="bg-[#F4FAF1] rounded-3xl p-6">
              <p className="text-sm text-[#6B7280]">
                Calificación
              </p>

              <h3 className="text-4xl font-black mt-2">
                {professional?.rating || 0}
              </h3>
            </div>

            <div className="bg-[#F4FAF1] rounded-3xl p-6">
              <p className="text-sm text-[#6B7280]">
                Estado
              </p>

              <h3 className="text-2xl font-black mt-3">
                {professional?.is_online
                  ? "Disponible"
                  : "No disponible"}
              </h3>
            </div>

            <div className="bg-[#F4FAF1] rounded-3xl p-6">
              <p className="text-sm text-[#6B7280]">
                Perfil
              </p>

              <h3 className="text-2xl font-black mt-3">
                {professional?.profile_completed
                  ? "Completo"
                  : "Pendiente"}
              </h3>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}