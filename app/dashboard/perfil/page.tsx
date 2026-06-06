"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  BadgeCheck,
  Briefcase,
  Building2,
  Camera,
  CheckCircle2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Star,
  User,
} from "lucide-react";

type Professional = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  specialty: string | null;
  city: string | null;
  bio: string | null;
  avatar_url: string | null;
  rating: number | null;
  experience_years: number | null;
  license_number: string | null;
  is_online: boolean;
  profile_completed: boolean | null;
  specialties: string[] | null;
  education: string | null;
  experience_history: string | null;
};

export default function PerfilPage() {
  const router = useRouter();
  const [professional, setProfessional] = useState<Professional | null>(null);

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
    <main className="min-h-screen bg-[#F5F5F3] px-8 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-[#0B3B2E] font-bold hover:underline"
        >
          <ArrowLeft size={18} />
          Volver al dashboard
        </Link>

        <section className="bg-[#0B3B2E] text-white rounded-[32px] p-10 shadow-xl flex items-center justify-between">
          <div>
            <p className="text-[#7ED957] font-bold">Mi perfil</p>

            <h1 className="text-5xl font-black mt-2">
              Información profesional
            </h1>

            <p className="mt-3 text-white/80 max-w-xl">
              Gestiona tu información profesional y cómo te ven los clientes en TuArki.
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/configuracion")}
            className="px-6 py-4 rounded-2xl bg-white text-[#0B3B2E] font-black hover:bg-[#F4FAF1] transition"
          >
            Editar perfil
          </button>
        </section>

        <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-10 shadow-sm">
          <div className="flex flex-col md:flex-row gap-10 md:items-center">
            <div className="relative shrink-0">
              {professional?.avatar_url ? (
                <img
                  src={professional.avatar_url}
                  alt={professional.name}
                  className="w-40 h-40 rounded-full object-cover"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-[#E5E7EB] flex items-center justify-center">
                  <User size={58} className="text-[#9CA3AF]" />
                </div>
              )}

              <div className="absolute bottom-2 right-2 w-11 h-11 rounded-full bg-[#57B33E] flex items-center justify-center text-white border-4 border-white">
                <Camera size={18} />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-black text-[#0B3B2E]">
                  {professional?.name || "Profesional"}
                </h2>

                <BadgeCheck className="text-[#57B33E]" size={30} />
              </div>

              <p className="text-xl text-[#15803D] font-bold mt-2">
                {professional?.specialty || "Especialista TuArki"}
              </p>

              <div className="flex flex-wrap gap-6 mt-5 text-[#374151]">
                <span className="flex items-center gap-2">
                  <MapPin size={18} />
                  {professional?.city || "Sin ciudad registrada"}
                </span>

                <span className="flex items-center gap-2">
                  <Star size={18} className="text-yellow-500" />
                  {professional?.rating
                    ? Number(professional.rating).toFixed(1)
                    : "0.0"}{" "}
                  calificación
                </span>

                <span className="flex items-center gap-2">
                  <Briefcase size={18} />
                  {professional?.experience_years || 0} años de experiencia
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-10 shadow-sm">
          <h3 className="text-2xl font-black text-[#0B3B2E] mb-4">
            Sobre mí
          </h3>

          <p className="text-[#4B5563] leading-relaxed max-w-3xl">
            {professional?.bio ||
              "Aún no hay descripción profesional registrada."}
          </p>
        </section>

        <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-10 shadow-sm">
          <h3 className="text-2xl font-black text-[#0B3B2E] mb-6">
            Información profesional
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="rounded-3xl border border-[#E5E7EB] p-6">
              <Building2 className="text-[#57B33E]" />
              <p className="text-sm text-[#6B7280] mt-4">
                Cédula profesional
              </p>
              <h4 className="text-xl font-black text-[#0B3B2E] mt-1">
                {professional?.license_number || "Pendiente"}
              </h4>
            </div>

            <div className="rounded-3xl border border-[#E5E7EB] p-6">
              <Briefcase className="text-[#57B33E]" />
              <p className="text-sm text-[#6B7280] mt-4">
                Experiencia
              </p>
              <h4 className="text-xl font-black text-[#0B3B2E] mt-1">
                {professional?.experience_years || 0} años
              </h4>
            </div>

            <div className="rounded-3xl border border-[#E5E7EB] p-6">
              <Star className="text-[#57B33E]" />
              <p className="text-sm text-[#6B7280] mt-4">
                Calificación
              </p>
              <h4 className="text-xl font-black text-[#0B3B2E] mt-1">
                {professional?.rating
                  ? Number(professional.rating).toFixed(1)
                  : "0.0"}{" "}
                ⭐
              </h4>
            </div>

            <div className="rounded-3xl border border-[#E5E7EB] p-6">
              <CheckCircle2 className="text-[#57B33E]" />
              <p className="text-sm text-[#6B7280] mt-4">
                Estado
              </p>
              <h4 className="text-xl font-black text-[#0B3B2E] mt-1">
                {professional?.is_online ? "Disponible" : "No disponible"}
              </h4>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-10 shadow-sm">
          <h3 className="text-2xl font-black text-[#0B3B2E] mb-6">
            Servicios que ofrezco
          </h3>

          <div className="flex flex-wrap gap-3">
            {[
              "Chat profesional",
              "Videollamada",
              "Revisión de planos",
              "Revisión de presupuesto",
            ].map((item) => (
              <span
                key={item}
                className="px-5 py-3 rounded-full bg-[#F4FAF1] text-[#0B3B2E] font-bold"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-10 shadow-sm">
          <h3 className="text-2xl font-black text-[#0B3B2E] mb-6">
            Especialidades
          </h3>

          <div className="flex flex-wrap gap-3">
            {professional?.specialties?.length ? (
              professional.specialties.map((item) => (
                <span
                  key={item}
                  className="px-5 py-3 rounded-full bg-[#F4FAF1] text-[#0B3B2E] font-bold"
                >
                  {item}
                </span>
              ))
            ) : (
              <p className="text-[#6B7280]">
                Sin especialidades registradas.
              </p>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-[32px] border border-[#E5E7EB] p-10 shadow-sm">
            <h3 className="text-2xl font-black text-[#0B3B2E] mb-4 flex items-center gap-2">
              <Briefcase className="text-[#57B33E]" />
              Experiencia profesional
            </h3>

            <p className="text-[#4B5563] leading-relaxed whitespace-pre-line">
              {professional?.experience_history ||
                "Sin experiencia registrada."}
            </p>
          </div>

          <div className="bg-white rounded-[32px] border border-[#E5E7EB] p-10 shadow-sm">
            <h3 className="text-2xl font-black text-[#0B3B2E] mb-4 flex items-center gap-2">
              <GraduationCap className="text-[#57B33E]" />
              Educación
            </h3>

            <p className="text-[#4B5563] leading-relaxed whitespace-pre-line">
              {professional?.education ||
                "Sin información académica registrada."}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-[32px] border border-[#E5E7EB] p-10 shadow-sm">
            <h3 className="text-2xl font-black text-[#0B3B2E] mb-6">
              Información de contacto
            </h3>

            <div className="space-y-5 text-[#374151]">
              <p className="flex items-center gap-3">
                <Mail className="text-[#57B33E]" />
                {professional?.email || "Sin correo"}
              </p>

              <p className="flex items-center gap-3">
                <Phone className="text-[#57B33E]" />
                {professional?.phone || "Sin teléfono"}
              </p>

              <p className="flex items-center gap-3">
                <MapPin className="text-[#57B33E]" />
                {professional?.city || "Sin ciudad"}
              </p>
            </div>
          </div>

          <div className="bg-[#F4FAF1] rounded-[32px] border border-[#DCEFD5] p-10 shadow-sm">
            <h3 className="text-2xl font-black text-[#0B3B2E] mb-5">
              Profesional verificado
            </h3>

            <div className="space-y-3 text-[#374151]">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="text-[#57B33E]" />
                Identidad validada por TuArki
              </p>

              <p className="flex items-center gap-2">
                <CheckCircle2 className="text-[#57B33E]" />
                Experiencia comprobada
              </p>

              <p className="flex items-center gap-2">
                <CheckCircle2 className="text-[#57B33E]" />
                Perfil activo en plataforma
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}