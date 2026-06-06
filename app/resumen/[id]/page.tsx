"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResumenPage() {
  const params = useParams();
  const consultationId = Number(params.id);

  const [consultation, setConsultation] = useState<any>(null);
  const [professional, setProfessional] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!consultationId) return;
    loadData();
  }, [consultationId]);

  const loadData = async () => {
    const { data: consultationData, error } = await supabase
      .from("consultations")
      .select("*")
      .eq("id", consultationId)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setConsultation(consultationData);

    if (consultationData?.assigned_professional_id) {
      const { data: professionalData } = await supabase
        .from("professionals")
        .select("*")
        .eq("id", consultationData.assigned_professional_id)
        .maybeSingle();

      setProfessional(professionalData);
    }

    const { data: messagesData } = await supabase
      .from("messages")
      .select("*")
      .eq("consultation_id", consultationId)
      .order("created_at", { ascending: true });

    setMessages(messagesData || []);
  };

  const uploadedFiles = messages.filter((msg) =>
    msg.text?.includes("https://")
  );

  const getFileUrl = (text: string) =>
    text
      .split(" ")
      .find((part: string) => part.includes("https://")) || "";
     
      const pageStyle =
  "w-[794px] min-h-[1123px] mx-auto bg-white shadow-2xl print:shadow-none print:mx-0 print:w-full print:min-h-screen";

  return (
    <main className="min-h-screen bg-[#EAF0EA] py-12 px-6 text-[#0D3B2E] print:bg-white print:p-0">
      <button
  onClick={() => window.print()}
  className="fixed top-6 right-6 z-50 bg-[#0D3B2E] text-white px-6 py-3 rounded-full font-bold shadow-lg print:hidden"
>
  Descargar PDF
</button>

      <div className="space-y-10">
      
      {/* PÁGINA 1 */}
<section className="w-[794px] min-h-[1123px] mx-auto bg-white shadow-2xl overflow-hidden print:shadow-none print:break-after-always">
  <div className="h-[480px] bg-gradient-to-br from-[#0D3B2E] to-[#57B33E] text-white p-14 flex flex-col justify-between">
    <div>
      <div className="flex items-center gap-4 mb-10">
        <img
          src="/logo-tuarki.png"
          alt="TuArki"
          className="w-20 h-20 object-contain"
        />

        <div>
          <h2 className="text-3xl font-black">
            TuArki
          </h2>

          <p className="text-[#DDF5D3] font-medium">
            siempre acompañándote
          </p>
        </div>
      </div>

      <p className="tracking-[0.35em] text-sm uppercase opacity-80">
        Resumen de consulta
      </p>

      <h1 className="text-6xl font-black mt-6 leading-tight">
        Consulta #{consultationId}
      </h1>

      <p className="text-2xl mt-4 font-semibold">
        Documento ejecutivo de atención profesional
      </p>
    </div>

    <div className="grid grid-cols-2 gap-6 bg-white/10 rounded-[36px] p-7 border border-white/10">
      <div>
        <p className="text-[#DDF5D3] text-sm uppercase tracking-wider">
          Servicio
        </p>

        <p className="text-2xl font-black mt-2">
          {consultation?.service || "Consulta"}
        </p>
      </div>

      <div>
        <p className="text-[#DDF5D3] text-sm uppercase tracking-wider">
          Estado
        </p>

        <p className="text-2xl font-black mt-2">
          Finalizada
        </p>
      </div>
    </div>
  </div>

  <div className="p-14 flex flex-col items-center text-center">
    <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[#57B33E]">
      <img
        src={
          professional?.avatar_url ||
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400"
        }
        alt="Especialista"
        className="w-full h-full object-cover"
      />
    </div>

    <p className="text-[#57B33E] font-bold uppercase tracking-[0.2em] mt-8">
      Profesional que atendió tu consulta
    </p>

    <h2 className="text-5xl font-black text-[#111] mt-4">
      {professional?.name || "Especialista TuArki"}
    </h2>

    <p className="text-xl text-[#6B7280] mt-2">
      {professional?.specialty || "Especialista en construcción"}
    </p>

    <p className="text-[#F5B301] font-bold mt-3">
      ⭐ {professional?.rating || 5}
    </p>

    <div className="w-24 h-[2px] bg-[#57B33E] my-10" />

    <div className="grid grid-cols-2 gap-10 w-full">
      <div>
        <p className="text-[#6B7280] uppercase text-sm tracking-wider">
          Fecha de consulta
        </p>

        <p className="text-xl font-bold text-[#111] mt-2">
          {consultation?.created_at
            ? new Date(consultation.created_at).toLocaleDateString("es-MX")
            : "Fecha no disponible"}
        </p>
      </div>

      <div>
        <p className="text-[#6B7280] uppercase text-sm tracking-wider">
          Generado
        </p>

        <p className="text-xl font-bold text-[#111] mt-2">
          {new Date().toLocaleDateString("es-MX")}
        </p>
      </div>
    </div>

    <div className="mt-16">
      <h3 className="text-5xl font-black text-[#0D3B2E]">
        TuArki
      </h3>

      <p className="text-xl text-[#57B33E] font-bold mt-2">
        siempre acompañándote
      </p>

      <p className="text-[#6B7280] mt-6 max-w-xl leading-relaxed">
        Documento ejecutivo generado por TuArki como respaldo de la atención profesional brindada durante la consulta.
      </p>
    </div>
  </div>
</section>
     
       {/* PÁGINA 2 */}
<section className="w-[794px] min-h-[1123px] mx-auto bg-white shadow-2xl p-14 flex flex-col print:shadow-none print:break-after-always">
  <div className="border-b border-[#E5E7EB] pb-8">
    <p className="tracking-[0.3em] text-sm uppercase text-[#57B33E] font-bold">
      Análisis inicial
    </p>

    <h2 className="text-5xl font-black text-[#111] mt-6 leading-tight">
      Problema reportado
    </h2>

    <p className="text-[#6B7280] text-lg mt-4 leading-relaxed">
      Información principal compartida por el cliente al iniciar su consulta.
    </p>
  </div>

  <div className="mt-12 bg-[#0D3B2E] text-white rounded-[40px] p-10">
    <p className="text-[#7ED957] font-bold uppercase tracking-wider mb-5">
      Descripción del problema
    </p>

    <h3 className="text-4xl font-black leading-tight">
      {consultation?.description || "Consulta arquitectónica"}
    </h3>
  </div>

  <div className="grid grid-cols-2 gap-6 mt-8">
    <div className="bg-[#F8FAF7] rounded-[32px] p-7 border border-[#E5E7EB]">
      <p className="text-[#57B33E] text-sm font-bold uppercase tracking-wider">
        Categoría
      </p>

      <p className="text-2xl font-black text-[#111] mt-3">
        {consultation?.category || "General"}
      </p>
    </div>

    <div className="bg-[#F8FAF7] rounded-[32px] p-7 border border-[#E5E7EB]">
      <p className="text-[#57B33E] text-sm font-bold uppercase tracking-wider">
        Servicio
      </p>

      <p className="text-2xl font-black text-[#111] mt-3">
        {consultation?.service || "Consulta"}
      </p>
    </div>

    <div className="bg-[#F8FAF7] rounded-[32px] p-7 border border-[#E5E7EB]">
      <p className="text-[#57B33E] text-sm font-bold uppercase tracking-wider">
        Estado
      </p>

      <p className="text-2xl font-black text-[#111] mt-3">
        Finalizada
      </p>
    </div>

    <div className="bg-[#F8FAF7] rounded-[32px] p-7 border border-[#E5E7EB]">
      <p className="text-[#57B33E] text-sm font-bold uppercase tracking-wider">
        Fecha de atención
      </p>

      <p className="text-xl font-black text-[#111] mt-3">
        {consultation?.created_at
          ? new Date(consultation.created_at).toLocaleString("es-MX")
          : "Fecha no disponible"}
      </p>
    </div>
  </div>

  <div className="mt-10 bg-[#F3FFEE] rounded-[36px] p-9 border border-[#DDF5D3]">
    <h3 className="text-3xl font-black text-[#111]">
      Lectura general
    </h3>

    <p className="text-[#374151] text-lg leading-relaxed mt-5">
      La consulta fue atendida por un profesional verificado de TuArki. Este documento conserva los datos principales para que puedas dar seguimiento con claridad y tomar mejores decisiones.
    </p>
  </div>

  <div className="mt-auto border-t border-[#E5E7EB] pt-8">
    <p className="text-[#6B7280] text-sm leading-relaxed">
      Nota: La información contenida en este resumen corresponde a una asesoría remota y debe utilizarse como guía inicial. En caso de riesgo estructural, eléctrico, hidráulico o de seguridad, se recomienda una revisión presencial.
    </p>
  </div>
</section>

       {/* PÁGINA 3 */}
{/* PÁGINA 3 */}
<section className="w-[794px] min-h-[1123px] mx-auto bg-white shadow-2xl p-14 flex flex-col print:shadow-none print:break-after-always">
  <div className="border-b border-[#E5E7EB] pb-8">
    <p className="tracking-[0.3em] text-sm uppercase text-[#57B33E] font-bold">
      Recomendaciones
    </p>

    <h2 className="text-5xl font-black text-[#111] mt-6 leading-tight">
      Guía de seguimiento
    </h2>

    <p className="text-[#6B7280] text-lg mt-4 leading-relaxed">
      Estas acciones ayudan a dar continuidad a la consulta y reducir riesgos durante la ejecución.
    </p>
  </div>

  <div className="mt-12 grid grid-cols-1 gap-5">
    {[
      "Revisar las observaciones compartidas por el especialista.",
      "Guardar evidencia fotográfica del avance o problema.",
      "Evitar trabajos ejecutados de riesgo sin supervisión profesional.",
      "Solicitar seguimiento si el problema continúa o cambia.",
      "Conservar este resumen como referencia de la consulta.",
    ].map((item, index) => (
      <div
        key={item}
        className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-[28px] p-6 flex items-start gap-5"
      >
        <div className="w-12 h-12 rounded-full bg-[#57B33E] text-white flex items-center justify-center font-black text-xl shrink-0">
          {index + 1}
        </div>

        <div>
          <p className="text-[#0D3B2E] font-black text-lg">
            Recomendación {index + 1}
          </p>

          <p className="text-[#374151] text-base leading-relaxed mt-1">
            {item}
          </p>
        </div>
      </div>
    ))}
  </div>

  <div className="mt-auto bg-[#0D3B2E] text-white rounded-[36px] p-9">
    <p className="text-[#7ED957] font-bold uppercase tracking-wider mb-4">
      Nota importante
    </p>

    <h3 className="text-2xl font-black leading-tight">
      La asesoría remota no sustituye una revisión presencial cuando exista riesgo estructural, eléctrico, hidráulico o de seguridad.
    </h3>

    <p className="text-white/80 mt-5 leading-relaxed">
      Si el problema aumenta, cambia o representa peligro para personas o inmueble, solicita una inspección presencial con un profesional certificado.
    </p>
  </div>
</section>

        {/* PÁGINA 4 */}
<section className="w-[794px] min-h-[1123px] mx-auto bg-white shadow-2xl p-14 flex flex-col print:shadow-none print:break-after-always">
  <div className="border-b border-[#E5E7EB] pb-8">
    <p className="tracking-[0.3em] text-sm uppercase text-[#57B33E] font-bold">
      Evidencia compartida
    </p>

    <h2 className="text-5xl font-black text-[#111] mt-6 leading-tight">
      Archivos de la consulta
    </h2>

    <p className="text-[#6B7280] text-lg mt-4 leading-relaxed">
      Fotografías, documentos o archivos compartidos durante la atención.
    </p>
  </div>

  {uploadedFiles.length === 0 && (
    <div className="mt-12 bg-[#F8FAF7] rounded-[36px] border border-[#E5E7EB] p-10 text-center">
      <p className="text-5xl mb-5">📎</p>

      <h3 className="text-3xl font-black text-[#111]">
        Sin archivos compartidos
      </h3>

      <p className="text-[#6B7280] mt-4">
        No se enviaron archivos durante esta consulta.
      </p>
    </div>
  )}

  <div className="grid grid-cols-2 gap-5 mt-12">
    {uploadedFiles.slice(0, 6).map((file, index) => {
      const fileUrl = getFileUrl(file.text);
      const cleanUrl = fileUrl.split("?")[0].toLowerCase();

      const isImage =
        cleanUrl.endsWith(".jpg") ||
        cleanUrl.endsWith(".jpeg") ||
        cleanUrl.endsWith(".png") ||
        cleanUrl.endsWith(".webp");

      const isPdf =
        cleanUrl.endsWith(".pdf");

      if (isImage) {
        return (
          <a
            key={file.id || index}
            href={fileUrl}
            target="_blank"
            className="group block bg-[#F8FAF7] rounded-[30px] border border-[#E5E7EB] overflow-hidden hover:shadow-lg transition-all"
          >
            <img
              src={fileUrl}
              alt={`Evidencia ${index + 1}`}
              className="h-44 w-full object-cover group-hover:scale-105 transition-all duration-300"
            />

            <div className="p-5">
              <p className="text-sm text-[#57B33E] font-bold">
                Imagen {index + 1}
              </p>

              <p className="text-[#374151] font-semibold mt-1">
                Evidencia visual compartida
              </p>
            </div>
          </a>
        );
      }

      if (isPdf) {
        return (
          <a
            key={file.id || index}
            href={fileUrl}
            target="_blank"
            className="h-52 bg-[#F8FAF7] rounded-[30px] border border-[#E5E7EB] flex flex-col items-center justify-center text-center p-6 hover:bg-[#F3FFEE] transition-all"
          >
            <p className="text-5xl mb-4">📄</p>

            <p className="text-sm text-[#57B33E] font-bold">
              PDF {index + 1}
            </p>

            <p className="text-[#374151] font-semibold mt-1">
              Ver documento
            </p>
          </a>
        );
      }

      return (
        <a
          key={file.id || index}
          href={fileUrl}
          target="_blank"
          className="h-52 bg-[#F8FAF7] rounded-[30px] border border-[#E5E7EB] flex flex-col items-center justify-center text-center p-6 hover:bg-[#F3FFEE] transition-all"
        >
          <p className="text-5xl mb-4">📎</p>

          <p className="text-sm text-[#57B33E] font-bold">
            Archivo {index + 1}
          </p>

          <p className="text-[#374151] font-semibold mt-1">
            Descargar archivo
          </p>
        </a>
      );
    })}
  </div>

  {uploadedFiles.length > 6 && (
    <div className="mt-8 bg-[#0D3B2E] text-white rounded-[30px] p-7 text-center">
      <p className="text-3xl font-black">
        +{uploadedFiles.length - 6}
      </p>

      <p className="text-white/80 mt-2">
        archivos adicionales compartidos durante la consulta
      </p>
    </div>
  )}
</section>

       {/* PÁGINA 5 */}
<section className="w-[794px] min-h-[1123px] mx-auto bg-[#0D3B2E] text-white shadow-2xl p-14 flex flex-col justify-between overflow-hidden relative print:shadow-none print:break-after-always">
  <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#7ED957]/10 rounded-full blur-3xl" />
  <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#7ED957]/10 rounded-full blur-3xl" />

  <div className="relative z-10">
    <p className="tracking-[0.3em] text-sm uppercase text-[#7ED957] font-bold">
      Cierre de consulta
    </p>

    <h2 className="text-6xl font-black mt-8 leading-tight">
      Gracias por confiar en TuArki.
    </h2>

    <p className="text-xl leading-relaxed mt-8 opacity-90">
      Este documento forma parte del acompañamiento posterior a tu consulta.
      Consérvalo como referencia para tomar mejores decisiones sobre tu
      proyecto o problema de construcción.
    </p>

    <div className="grid grid-cols-2 gap-5 mt-14">
      <div className="bg-white/10 rounded-3xl p-6 border border-white/10">
        <p className="text-[#7ED957] font-bold mb-2">
          Consulta
        </p>

        <p className="text-3xl font-black">
          #{consultationId}
        </p>
      </div>

      <div className="bg-white/10 rounded-3xl p-6 border border-white/10">
        <p className="text-[#7ED957] font-bold mb-2">
          Estado
        </p>

        <p className="text-3xl font-black">
          Finalizada
        </p>
      </div>
    </div>

    <div className="mt-12 bg-white text-[#0D3B2E] rounded-[36px] p-8">
      <p className="text-[#57B33E] font-bold uppercase tracking-wider mb-4">
        Documento generado por
      </p>

      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0D3B2E] to-[#57B33E]" />

        <div>
          <h3 className="text-4xl font-black">
            TuArki
          </h3>

          <p className="text-[#57B33E] font-bold">
            siempre acompañándote
          </p>
        </div>
      </div>
    </div>
  </div>

  <div className="relative z-10 border-t border-white/10 pt-10">
    <div className="flex items-end justify-between gap-8">
      <div>
        <p className="text-[#7ED957] font-bold mb-2">
          Profesional asignado
        </p>

        <h3 className="text-3xl font-black">
          {professional?.name || "Especialista TuArki"}
        </h3>

        <p className="text-white/70 mt-1">
          {professional?.specialty || "Especialista en construcción"}
        </p>
      </div>

      <div className="text-right">
        <p className="text-white/60 text-sm">
          Fecha de generación
        </p>

        <p className="font-bold">
          {new Date().toLocaleDateString("es-MX")}
        </p>
      </div>
    </div>

    <p className="text-white/50 text-sm mt-10 leading-relaxed">
      La asesoría proporcionada por TuArki es de carácter orientativo y no sustituye una inspección presencial cuando existan riesgos estructurales, eléctricos, hidráulicos o de seguridad.
    </p>
  </div>
</section>
      </div>
    </main>
  );
}