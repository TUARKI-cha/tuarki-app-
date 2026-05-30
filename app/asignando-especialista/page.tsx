"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  ShieldCheck,
  Clock3,
  Camera,
  Video,
  FileText,
  BadgeCheck,
  Star,
  Users,
} from "lucide-react";

export default function AssigningSpecialistPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const consultationId =
    searchParams.get("id");

  const [assigned, setAssigned] = useState(false);
  const [noProfessional, setNoProfessional] = useState(false);

  const [assignedProfessional, setAssignedProfessional] =
  useState<any>(null);

  const [consultation, setConsultation] =
    useState<any>(null);

  useEffect(() => {
    if (!consultationId) return;

    const savedService =
      localStorage.getItem("selectedService");

    let serviceTitle = "";

    if (savedService) {
      try {
        const parsedService =
          JSON.parse(savedService);

        serviceTitle =
          parsedService?.title || "";
      } catch {
        serviceTitle = savedService;
      }
    }

    const assignProfessional = async () => {
      const { data: professional } = await supabase
        .from("professionals")
        .select("*")
        .eq("is_online", true)
        .limit(1)
        .maybeSingle();

        if (!professional) {
          setNoProfessional(true);
          setAssignedProfessional(professional);
          return false;
        }

      if (professional && consultationId) {
        await supabase
          .from("consultations")
          .update({
            status: "assigned",
            assigned_professional: professional.name,
            assigned_professional_id: professional.id,
          })
          .eq("id", consultationId);
      }
      setAssigned(true);
      setAssignedProfessional(professional);
      return true;

    };

    const timer = setTimeout(async () => {
      const wasAssigned = await assignProfessional();
    
      if (!wasAssigned) return;
    
      const normalizedTitle =
        serviceTitle.toLowerCase();
    
      if (normalizedTitle.includes("video")) {
        router.push(`/videollamada/${consultationId}`);
        return;
      }
    
      if (normalizedTitle.includes("planos")) {
        router.push(`/revision-planos/${consultationId}`);
        return;
      }
    
      if (normalizedTitle.includes("presupuesto")) {
        router.push(`/revision-presupuesto/${consultationId}`);
        return;
      }
    
      router.push(`/chat/${consultationId}`);
    }, 5000);

    return () => clearTimeout(timer);
  }, [consultationId, router]);

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-8 pb-10">
      {/* HEADER */}
      <header className="max-w-[1500px] mx-auto py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B3B2E] to-[#57B33E] shadow-lg" />

          <div>
            <h1 className="text-4xl font-black text-[#0B3B2E] leading-none">
              TuArki
            </h1>
            <p className="text-sm text-[#6B7280]">
              siempre contigo
            </p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold text-[#111]">
          <span>Cómo funciona</span>
          <span>Servicios</span>
          <span>Especialistas</span>
          <span>Sobre nosotros</span>
          <span>Blog</span>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden md:block px-6 py-3 rounded-full border border-[#E5E7EB] font-semibold bg-white hover:bg-[#F9FAFB] transition-all">
            ¿Eres profesional?
          </button>

          <button className="px-7 py-3 rounded-full bg-[#0B3B2E] text-white font-semibold hover:opacity-90 transition-all shadow-lg">
            Inicia sesión
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <section className="max-w-[1500px] mx-auto pt-6">
        {/* BACK */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#374151] mb-8 hover:text-[#57B33E]"
        >
          ← Volver al inicio
        </Link>

        {/* STEPS */}
        <section className="mb-10">
          <div className="max-w-[900px] mx-auto">
            <div className="relative flex items-center justify-between">
              <div className="absolute left-10 right-10 top-5 h-[3px] bg-[#E5E7EB]" />
              <div className="absolute left-10 w-[34%] top-5 h-[3px] bg-[#57B33E]" />

              {[
                {
                  step: "✓",
                  title: "Cuéntanos tu problema",
                  active: true,
                },
                {
                  step: "2",
                  title: "Asignando especialista",
                  active: true,
                },
                {
                  step: "3",
                  title: "Revisión y envío",
                  active: false,
                },
                {
                  step: "4",
                  title: "Asignación",
                  active: false,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="relative z-10 flex flex-col items-center gap-3"
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-bold shadow-sm ${
                      item.active
                        ? "bg-[#57B33E] text-white"
                        : "bg-[#E5E7EB] text-[#6B7280]"
                    }`}
                  >
                    {item.step}
                  </div>

                  <p
                    className={`text-sm font-semibold ${
                      item.active
                        ? "text-[#57B33E]"
                        : "text-[#6B7280]"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8">
          {/* LEFT */}
          <div className="space-y-8">
            {/* HERO */}
            <div className="bg-white rounded-[36px] border border-[#E5E7EB] shadow-[0_20px_80px_rgba(0,0,0,0.05)] p-10 overflow-hidden">
              <div className="text-center">
                <h1 className="text-5xl lg:text-6xl font-black text-[#111] leading-tight">
                  Estamos encontrando
                  <br />
                  tu{" "}
                  <span className="text-[#57B33E]">
                    especialista ideal
                  </span>
                </h1>

                <p className="mt-6 text-xl text-[#6B7280] max-w-3xl mx-auto leading-relaxed">
                  Estamos revisando tu caso y buscando al profesional
                  más adecuado para ayudarte.
                </p>
              </div>

              {/* RADAR */}
              <div className="relative h-[520px] mt-10 flex items-center justify-center">
                <div className="absolute w-[500px] h-[500px] rounded-full border border-[#E5E7EB]" />
                <div className="absolute w-[380px] h-[380px] rounded-full border border-[#E5E7EB]" />
                <div className="absolute w-[260px] h-[260px] rounded-full border border-[#E5E7EB]" />

                <div className="absolute w-[360px] h-[360px] rounded-full bg-[#57B33E]/5" />

                <div className="relative z-10 w-36 h-36 rounded-full bg-[#F4FAF1] border border-[#DCEFD2] flex items-center justify-center shadow-sm">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0B3B2E] to-[#57B33E]" />
                </div>

                {[
                  "top-14 left-[12%]",
                  "top-20 right-[14%]",
                  "bottom-20 left-[10%]",
                  "bottom-16 right-[14%]",
                ].map((position, index) => (
                  <div
                    key={index}
                    className={`absolute ${position}`}
                  >
                    <div className="w-20 h-20 rounded-full bg-[#E5E7EB] border-4 border-white shadow-lg" />
                    <div className="w-4 h-4 rounded-full bg-[#57B33E] border-2 border-white absolute bottom-1 right-1" />
                  </div>
                ))}

                <div className="absolute bottom-16 text-center">
                  <p className="text-3xl font-black text-[#111]">
                    Buscando al mejor
                  </p>

                  <p className="text-[#57B33E] font-black text-2xl mt-1">
                    arki para ti...
                  </p>
                </div>
              </div>

              {/* TIME */}
              <div className="bg-[#F4FAF1] border border-[#DCEFD2] rounded-[24px] p-6 flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Clock3
                    size={34}
                    className="text-[#57B33E]"
                  />
                </div>

                <div>
                  <p className="text-2xl font-black text-[#111]">
                    Tiempo estimado: menos de 3 minutos
                  </p>

                  <p className="text-[#6B7280] mt-1">
                    El 90% de las consultas son respondidas en menos de 2 minutos.
                  </p>
                </div>
              </div>
            </div>

            {assignedProfessional && (
  <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 mt-6">
    <p className="text-[#57B33E] font-bold mb-2">
      Especialista asignado
    </p>

    <h3 className="text-2xl font-black text-[#111]">
      {assignedProfessional.name}
    </h3>

    <p className="text-[#6B7280]">
      {assignedProfessional.specialty}
    </p>

    <div className="mt-3 flex items-center gap-2">
      <span>⭐</span>
      <span>{assignedProfessional.rating}</span>
    </div>
  </div>
)}

            {assignedProfessional && (
  <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 mt-6">
    <p className="text-[#57B33E] font-bold mb-2">
      Especialista asignado
    </p>

    <h3 className="text-2xl font-black text-[#111]">
      {assignedProfessional.name}
    </h3>

    <p className="text-[#6B7280]">
      {assignedProfessional.specialty}
    </p>

    <div className="mt-3 flex items-center gap-2">
      <span>⭐</span>
      <span>{assignedProfessional.rating}</span>
    </div>
  </div>
)}

            {/* SECURITY */}
            <div className="bg-white rounded-[32px] border border-[#E5E7EB] p-8 flex items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-[#F4FAF1] flex items-center justify-center shrink-0">
                <ShieldCheck
                  size={34}
                  className="text-[#57B33E]"
                />
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#111]">
                  Tu consulta es segura
                </h3>

                <p className="text-[#6B7280] mt-2 leading-relaxed">
                  Solo especialistas verificados y calificados tendrán acceso
                  a la información que compartiste.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="space-y-6">
            {/* TIPS */}
            <div className="bg-white rounded-[32px] border border-[#E5E7EB] p-7">
              <h3 className="text-2xl font-black text-[#111] mb-7">
                Consejos mientras esperas
              </h3>

              <div className="space-y-7">
                {[
                  {
                    icon: Camera,
                    title: "Toma fotos claras",
                    text: "Asegúrate de que se vean bien los detalles del problema.",
                  },
                  {
                    icon: Video,
                    title: "Un video corto ayuda mucho",
                    text: "Explica brevemente qué sucede y cuándo ocurre.",
                  },
                  {
                    icon: FileText,
                    title: "Entre más detalles, mejor ayuda",
                    text: "Así el especialista podrá entender tu caso más rápido.",
                  },
                  {
                    icon: Clock3,
                    title: "Estamos trabajando en ello",
                    text: "En menos de 3 minutos tendrás respuesta.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-4"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-[#F4FAF1] flex items-center justify-center shrink-0">
                        <Icon
                          size={28}
                          className="text-[#57B33E]"
                        />
                      </div>

                      <div>
                        <p className="font-black text-[#111] text-base">
                          {item.title}
                        </p>

                        <p className="text-[#6B7280] mt-1 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* VERIFIED */}
            <div className="bg-[#F4FAF1] rounded-[32px] border border-[#DCEFD2] p-7">
              <h3 className="text-2xl font-black text-[#111] mb-5">
                Especialistas verificados
              </h3>

              <div className="space-y-4">
                {[
                  "Profesionales calificados",
                  "Identidad verificada",
                  "Experiencia comprobada",
                  "Calificaciones reales",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <BadgeCheck
                      size={20}
                      className="text-[#57B33E]"
                    />

                    <p className="text-[#374151] font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center mt-7">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="w-14 h-14 rounded-full bg-[#D1D5DB] border-4 border-[#F4FAF1]"
                    />
                  ))}
                </div>

                <div className="ml-5">
                  <p className="text-3xl font-black text-[#111]">
                    +120
                  </p>

                  <p className="text-sm text-[#6B7280]">
                    especialistas activos
                  </p>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="bg-white rounded-[32px] border border-[#E5E7EB] p-7">
              <div className="text-[#F5B301] flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star
                    key={item}
                    size={24}
                    fill="#F5B301"
                  />
                ))}
              </div>

              <p className="text-2xl font-black text-[#111] leading-relaxed">
                En promedio, resolvemos más del 90% de las consultas en la primera conversación.
              </p>

              <div className="flex items-center gap-4 mt-6">
                <Users className="text-[#57B33E]" />

                <p className="text-[#6B7280]">
                  Calificación promedio 4.9/5
                </p>
              </div>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}