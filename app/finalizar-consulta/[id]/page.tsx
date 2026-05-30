"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

import {
  CheckCircle2,
  Star,
  Clock3,
  ShieldCheck,
  CalendarDays,
  FileText,
  Download,
  CalendarPlus,
  UserPlus,
  Share2,
  MessageCircle,
  Lightbulb,
  Bell,
  Copy,
  ArrowRight,
} from "lucide-react";

export default function FinalizarConsultaPage() {

    const params = useParams();

    const consultationId =
  Number(params.id);

const [consultation, setConsultation] =
  useState<any>(null);

  const [ratingGeneral, setRatingGeneral] =
  useState(5);

const [ratingClarity, setRatingClarity] =
  useState(5);

const [ratingAttention, setRatingAttention] =
  useState(5);

const [comment, setComment] =
  useState("");

const [savingRating, setSavingRating] =
  useState(false);
useEffect(() => {

  if (!consultationId) return;

  async function loadConsultation() {

    const { data, error } = await supabase
      .from("consultations")
      .select("*")
      .eq("id", consultationId)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setConsultation(data);

  }

  loadConsultation();

}, [consultationId]);

async function saveRating() {
  try {
    setSavingRating(true);

    const { data: existingRating } = await supabase
  .from("consultation_ratings")
  .select("id")
  .eq("consultation_id", consultationId)
  .maybeSingle();

if (existingRating) {
  alert("Esta consulta ya fue evaluada");
  return;
}

    const { error } = await supabase
      .from("consultation_ratings")
      .insert({
        consultation_id: consultationId,
        rating_general: ratingGeneral,
        rating_clarity: ratingClarity,
        rating_attention: ratingAttention,
        comment,
      });

    if (error) {
      console.log(error);
      alert("Error guardando calificación");
      return;
    }

    const { data: ratingsData } = await supabase
  .from("consultation_ratings")
  .select(`
    rating_general,
    consultations!inner(
      assigned_professional_id
    )
  `)
  .eq(
    "consultations.assigned_professional_id",
    consultation?.assigned_professional_id
  );

    const average =
      ratingsData && ratingsData.length > 0
        ? ratingsData.reduce(
            (sum, item) => sum + Number(item.rating_general || 0),
            0
          ) / ratingsData.length
        : ratingGeneral;

        const { data: professionalData } = await supabase
        .from("professionals")
        .select("id, total_consultations")
        .eq("id", consultation?.assigned_professional_id)
        .maybeSingle();

    if (professionalData) {
      await supabase
        .from("professionals")
        .update({
          rating: Number(average.toFixed(1)),
          total_consultations:
            Number(professionalData.total_consultations || 0) + 1,
        })
        .eq("id", professionalData.id);
    }

    alert("¡Gracias por tu opinión!");
  } catch (error) {
    console.log(error);
  } finally {
    setSavingRating(false);
  }
}
    return (
    <main className="min-h-screen bg-[#F8FAF7] px-8 py-8 text-[#0D3B2E]">
      {/* HEADER */}
      <header className="max-w-[1500px] mx-auto flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0D3B2E] to-[#57B33E] shadow-lg" />

          <div>
            <h1 className="text-4xl font-black leading-none">
              TuArki
            </h1>
            <p className="text-sm text-[#6B7280]">
              siempre contigo
            </p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold text-[#111]">
          <span>Cómo funciona</span>
          <span>Servicios</span>
          <span>Especialistas</span>
          <span>Sobre nosotros</span>
          <span>Blog</span>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden md:block bg-white border border-[#E5E7EB] px-6 py-3 rounded-full font-semibold shadow-sm">
            ¿Eres profesional?
          </button>

          <Link
            href="/login"
            className="bg-[#0D3B2E] text-white px-7 py-3 rounded-full font-semibold shadow-lg"
          >
            Inicia sesión
          </Link>
        </div>
      </header>

      <div className="max-w-[1500px] mx-auto">
        {/* BACK */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-[#374151] mb-8 hover:text-[#57B33E]"
        >
          ← Volver al inicio
        </Link>

        {/* PROGRESS */}
        <section className="mb-12">
          <div className="max-w-[900px] mx-auto">
            <div className="relative flex items-center justify-between">
              <div className="absolute left-10 right-10 top-5 h-[3px] bg-[#57B33E]" />

              {[
                "Cuéntanos tu problema",
                "Asignando especialista",
                "Revisión y envío",
                "Consulta finalizada",
              ].map((item, index) => (
                <div
                  key={item}
                  className="relative z-10 flex flex-col items-center gap-3"
                >
                  <div className="w-11 h-11 rounded-full bg-[#57B33E] text-white flex items-center justify-center font-bold shadow-md">
                    {index === 3 ? "4" : <CheckCircle2 size={22} />}
                  </div>

                  <p
                    className={`text-sm font-semibold ${
                      index === 3
                        ? "text-[#57B33E]"
                        : "text-[#6B7280]"
                    }`}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="grid grid-cols-1 xl:grid-cols-[1.7fr_0.9fr] gap-8">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* SUCCESS CARD */}
            <div className="bg-white rounded-[34px] border border-[#E5E7EB] shadow-[0_20px_80px_rgba(0,0,0,0.06)] p-10 text-center">
              <div className="w-24 h-24 rounded-full bg-[#57B33E]/10 flex items-center justify-center mx-auto mb-7">
                <CheckCircle2
                  size={54}
                  className="text-[#57B33E]"
                  strokeWidth={2.4}
                />
              </div>

              <h2 className="text-3xl font-black text-[#111] mb-3">
                ¡Consulta finalizada!
              </h2>

              <p className="text-[#6B7280] text-lg">
                Gracias por confiar en TuArki. Esperamos haberte ayudado a resolver tu problema.
              </p>

              {/* INFO STRIP */}
              <div className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F3FFEE] rounded-3xl p-5">
                <div className="flex items-center gap-4 text-left">
                  <Clock3 className="text-[#57B33E]" />
                  <div>
                    <p className="text-xs text-[#6B7280]">
                      Duración de la consulta
                    </p>
                    <p className="font-bold text-[#6B7280]">
                    {consultation?.duration
  ? `${Math.floor(consultation.duration / 60)}:${String(
      consultation.duration % 60
    ).padStart(2, "0")} min`
  : "15:00 min"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-left">
                  <ShieldCheck className="text-[#57B33E]" />
                  <div>
                    <p className="text-xs text-[#6B7280]">
                      Consulta protegida
                    </p>
                    <p className="font-bold text-[#6B7280]">
                      100% segura
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-left">
                  <CalendarDays className="text-[#57B33E]" />
                  <div>
                    <p className="text-xs text-[#6B7280]">
                      Fecha
                    </p>
                    <p className="font-bold text-[#6B7280]">
                      20 may. 2024 · 10:28 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="bg-white rounded-[34px] border border-[#E5E7EB] shadow-sm p-9">
              <h3 className="text-2xl font-black text-[#6B7280] mb-1 mt-8 gap-6 espace-y-6">
                Califica tu experiencia
              </h3>

              <p className="text-[#6B7280] mb-8">
                Tu opinión nos ayuda a mejorar cada día.
              </p>

              {[
  {
    label: "Experiencia general",
    value: ratingGeneral,
    setValue: setRatingGeneral,
  },
  {
    label: "Claridad de las soluciones",
    value: ratingClarity,
    setValue: setRatingClarity,
  },
  {
    label: "Atención del especialista",
    value: ratingAttention,
    setValue: setRatingAttention,
  },
].map((ratingItem) => (
                <div
                  key={ratingItem.label}
                  className="flex items-center justify-between py-4 border-b border-[#F1F1F1]"
                >
                  <p className="font-semibold text-[#374151]">
                  {ratingItem.label}
                  </p>

                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
  <button
    key={star}
    type="button"
    onClick={() =>
      ratingItem.setValue(star)
    }
    className="hover:scale-110 transition-all"
  >
    <Star
      size={28}
      fill={
        star <= ratingItem.value
          ? "#2F8F1F"
          : "transparent"
      }
      color="#2F8F1F"
      strokeWidth={1.8}
    />
  </button>
))}
                  </div>
                </div>
              ))}

              <div className="mt-8">
                <p className="font-bold text-[#6B7280] mb-1">
                  Cuéntanos más{" "}
                  <span className="text-[#6B7280] font-normal">
                    (opcional)
                  </span>
                </p>

                <p className="text-sm text-[#6B7280] mb-3">
                  Comparte detalles de tu experiencia con el especialista.
                </p>

                <textarea
                  placeholder="Escribe tu comentario..."
                  value={comment}
                  onChange={(e) =>
                  setComment(e.target.value)
                  }
                  maxLength={500}
                  className="w-full h-32 rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-5 outline-none focus:border-[#57B33E] resize-none"
               />

                <p className="text-right text-xs text-[#6B7280] mt-2">
                {comment.length}/500 caracteres
                </p>
                <button
                 onClick={saveRating}
                 disabled={savingRating}
                 className="mt-6 bg-[#57B33E] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50"
                   >

                 {savingRating
                   ? "Guardando..."
                   : "Enviar evaluación"}

                 </button>
              </div>
            </div>

            {/* RECOMMENDATION SUMMARY */}
            <div className="bg-white rounded-[34px] border border-[#E5E7EB] shadow-sm p-9">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#F3FFEE] flex items-center justify-center">
                  <Lightbulb className="text-[#57B33E]" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-[#374151] mt-8 gap-6 space-y-6">
                    Resumen de recomendaciones
                  </h3>

                  <p className="text-[#6B7280]">
                    Estos son los puntos clave que el especialista te recomendó.
                  </p>
                </div>
              </div>

              <div className="bg-[#F8FFF4] rounded-3xl p-6 space-y-4">
                {[
                  "Sellar la junta exterior de la ventana con sellador antihumedad.",
                  "Impermeabilizar el marco y revisar pendientes para escurrimiento.",
                  "Revisar y limpiar filtración en la parte inferior de la ventana.",
                  "Aplicar sellador en muro interior si la humedad persiste.",
                  "Monitorear por 2 semanas y tomar fotos de seguimiento.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#57B33E] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {index + 1}
                    </div>

                    <p className="text-[#374151]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTINUE SPECIALIST */}
              <div className="mt-6 bg-[#F3FFEE] rounded-[34px] border border-[#DDF5D3] p-9 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400"
                  className="w-16 h-16 rounded-full object-cover border-4 border-white"
                  alt="Especialista"
                />

                <div>
                  <h3 className="text-xl font-black text-[#374151]">
                    ¿Quieres continuar con Arq. Elizabeth Longoria?
                  </h3>

                  <p className="text-[#6B7280]">
                    Puedes agendar una nueva consulta o hacer seguimiento con el mismo especialista.
                  </p>
                </div>
              </div>

              <Link
                href="/nueva-consulta"
                className="bg-[#57B33E] text-white px-9 py-5 rounded-2xl font-bold flex items-center gap-3 shadow-lg whitespace-nowrap"
              >
                Continuar con este especialista
                <ArrowRight size={20} />
              </Link>
            </div>
            </div>
           
                    {/* RIGHT SIDEBAR */}
                    <aside className="space-y-6">
            {/* SPECIALIST CARD */}
            <div className="bg-white rounded-[32px] border border-[#E5E7EB] shadow-sm p-9">
              <h3 className="text-xl font-black text-[#111] mb-6">
                Especialista que te atendió
              </h3>

              <div className="flex items-center gap-5">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400"
                  className="w-24 h-24 rounded-full object-cover"
                  alt="Especialista"
                />

                <div>
                  <h4 className="text-xl font-black text-[#111]">
                    Arq. Elizabeth Longoria
                  </h4>

                  <p className="text-sm text-[#6B7280] mt-1">
                    Arquitecta especializada en construcción
                  </p>

                  <p className="text-sm text-[#F5B301] mt-3 font-semibold">
                    ⭐ 4.9 (128 valoraciones)
                  </p>

                  <p className="text-sm text-[#57B33E] mt-2 font-semibold">
                    ● En línea
                  </p>
                </div>
              </div>

              <button className="mt-7 w-full border border-[#E5E7EB] py-4 rounded-2xl font-bold hover:bg-[#FAFAFA] transition-all">
                Ver perfil del especialista
              </button>
            </div>

            {/* CONSULT INFO */}
            <div className="mt-6 bg-white rounded-[32px] border border-[#E5E7EB] shadow-sm p-7">
              <h3 className="text-xl font-black text-[#6B7280] mb-5">
                Sobre tu consulta
              </h3>

              <div className="space-y-5">
                <div>
                  <p className="text-sm text-[#6B7280]">
                    Problema:
                  </p>

                  <p className="font-semibold text-[#6B7280]">
                    {consultation?.description || "Consulta arquitectónica"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#6B7280]">
                      Categoría:
                    </p>

                    <p className="font-semibold text-[#6B7280]">
                      {consultation?.service || consultation?.category || "Construcción"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[#6B7280]">
                      Fecha:
                    </p>

                    <p className="font-semibold text-[#6B7280]">
                      20 may. 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FILES */}
            <div className="bg-white rounded-[32px] border border-[#E5E7EB] shadow-sm p-7">
              <h3 className="text-xl font-black text-[#374151] mb-5">
                Archivos enviados
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <div className="h-24 rounded-2xl bg-[#E5E7EB]" />
                <div className="h-24 rounded-2xl bg-[#E5E7EB]" />
                <div className="h-24 rounded-2xl bg-[#374151]/70 text-white flex items-center justify-center text-xl font-bold">
                  +2
                </div>
              </div>
            </div>

            {/* NEXT STEPS */}
            <div className="bg-white rounded-[32px] border border-[#E5E7EB] shadow-sm p-7">
              <h3 className="text-xl font-black text-[#374151] mb-5">
                Próximos pasos sugeridos
              </h3>

              <div className="space-y-4">
                {[
                  "Aplicar las recomendaciones anteriores.",
                  "Monitorear la zona afectada.",
                  "Agendar seguimiento si la humedad persiste.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={20}
                      className="text-[#57B33E] shrink-0 mt-0.5"
                    />

                    <p className="text-[#374151]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 bg-[#F3FFEE] rounded-2xl p-5 flex items-start gap-3">
                <Bell className="text-[#57B33E] shrink-0" />

                <p className="text-sm text-[#406B45]">
                  Recibirás un recordatorio en 7 días para dar seguimiento.
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="bg-white rounded-[32px] border border-[#E5E7EB] shadow-sm p-7">
              <h3 className="text-xl font-black text-[#374151] mb-5">
                ¿Qué te gustaría hacer ahora?
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    icon: Download,
                    title: "Descargar resumen",
                    text: "Obtén un PDF con los puntos clave.",
                  },
                  {
                    icon: CalendarPlus,
                    title: "Agendar seguimiento",
                    text: "Programa una nueva consulta.",
                  },
                  {
                    icon: UserPlus,
                    title: "Guardar especialista",
                    text: "Agrégala a favoritos.",
                  },
                  {
                    icon: Share2,
                    title: "Compartir consulta",
                    text: "Comparte el resumen.",
                  },
                  {
                    icon: MessageCircle,
                    title: "Chat de soporte",
                    text: "¿Tienes dudas? Estamos aquí.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.title}
                      className="bg-[#F8FAF7] rounded-2xl border border-[#E5E7EB] p-4 text-left hover:shadow-md transition-all flex items-start gap-4"
                    >
                      <Icon
                        className="text-[#57B33E] shrink-0"
                        size={26}
                      />

                      <div>
                        <p className="font-bold text-[#111] text-sm">
                          {item.title}
                        </p>

                        <p className="text-xs text-[#6B7280] mt-1">
                          {item.text}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </section>

        {/* FOOTER BENEFITS */}
        <section className="mt-12 bg-white rounded-[32px] border border-[#E5E7EB] p-7 grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 space-y-6">
          {[
            {
              title: "Respuesta rápida",
              text: "Te respondemos en menos de 3 minutos.",
            },
            {
              title: "Especialistas verificados",
              text: "Profesionales calificados y con experiencia comprobada.",
            },
            {
              title: "Pago seguro",
              text: "Tu pago está 100% protegido y liberado hasta tu satisfacción.",
            },
            {
              title: "Satisfacción garantizada",
              text: "Si no quedas satisfecho, seguimos hasta resolver.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4"
            >
              <ShieldCheck
                className="text-[#57B33E] shrink-0"
                size={34}
              />

              <div>
                <h4 className="font-black text-[#374151]">
                  {item.title}
                </h4>

                <p className="text-sm text-[#6B7280] mt-1">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}