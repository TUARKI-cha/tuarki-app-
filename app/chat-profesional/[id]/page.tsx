"use client";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  RealtimePostgresInsertPayload,
} from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();

  const consultationId =
  params.id as string;

  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

    const [consultation, setConsultation] =
    useState<any>(null);

    const [professional, setProfessional] =
  useState<any>(null);

  const [messages, setMessages] = useState<
    {
      id?: number;
      sender: string;
      text: string;
      consultation_id?: number;
    }[]
  >([]);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

    const uploadedFiles = messages.filter((msg) =>
      msg.text?.includes("https://")
    );

    useEffect(() => {
      if (consultationId) {
        loadMessages();
        loadConsultation();
      }
    }, [consultationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (!consultationId) return;

    const channel = supabase
      .channel(`chat-${consultationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (
          payload:
            RealtimePostgresInsertPayload<any>
        ) => {
          if (
            payload.new.consultation_id ===
            consultationId
          ) {
            setMessages((prev) => [
              ...prev,
              payload.new,
            ]);
          }
        }
      )
      .subscribe();

      const finishConsultation = async () => {
        const { error } = await supabase
          .from("consultations")
          .update({
            status: "completed",
          })
          .eq("id", consultationId);
      
        if (error) {
          console.log(error);
          alert("No se pudo finalizar la consulta");
          return;
        }
      
        router.push(`/finalizar-consulta/${consultationId}`);
      };

    return () => {
      supabase.removeChannel(channel);
    };
  }, [consultationId]);

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("consultation_id", consultationId)
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      console.log(error);
      return;
    }

    setMessages(data || []);
  };

  const loadConsultation = async () => {
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
  
    if (data?.assigned_professional_id) {
      const { data: professionalData, error: professionalError } =
        await supabase
          .from("professionals")
          .select("*")
          .eq("id", data.assigned_professional_id)
          .maybeSingle();
  
      if (professionalError) {
        console.log(professionalError);
        return;
      }
  
      setProfessional(professionalData);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() && !selectedFile)
      return;

    let finalMessage = message;
    let fileUrl = "";

    if (selectedFile) {
      const fileName =
        `${Date.now()}-${selectedFile.name}`;

      const { error } =
        await supabase.storage
          .from("chat-files")
          .upload(fileName, selectedFile);

      if (error) {
        console.log(error);
        return;
      }

      const { data: publicUrlData } =
        supabase.storage
          .from("chat-files")
          .getPublicUrl(fileName);

      fileUrl = publicUrlData.publicUrl;

      finalMessage += ` 📎 ${fileUrl}`;
    }

    const currentMessage = message;
    const hadFile = selectedFile;

    setMessage("");
    setSelectedFile(null);

    const { error } = await supabase
      .from("messages")
      .insert([
        {
          consultation_id: consultationId,
          sender: "specialist",
          text: finalMessage,
        },
      ]);

    if (error) {
      console.log(error);
      return;
    }

  };
  const finishConsultation = async () => {
    const { error } = await supabase
      .from("consultations")
      .update({
        status: "completed",
      })
      .eq("id", consultationId);
  
    if (error) {
      console.log(error);
      alert("No se pudo finalizar la consulta");
      return;
    }
  
    router.push(`/finalizar-consulta/${consultationId}`);
  };
  
  return (
    <main className="min-h-screen bg-[#F8FAF7] text-[#0D3B2E] overflow-hidden">
      {/* NAVBAR */}
      <header className="h-[86px] bg-white/90 backdrop-blur-xl border-b border-[#E8ECE8] px-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0D3B2E] via-[#1E7A5A] to-[#7ED957]" />

          <div>
            <h1 className="text-3xl font-black leading-none">
              TuArki
            </h1>
            <p className="text-xs text-[#6B7280]">
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

      </header>

      {/* PAGE */}
      <section className="h-[calc(100vh-86px)] p-8">
        <div className="h-full max-w-[1800px] mx-auto grid grid-cols-[300px_1fr_340px] gap-7">
          {/* LEFT SIDEBAR */}
          <aside className="bg-white rounded-[34px] border border-[#E5E7EB] shadow-sm p-7 flex flex-col justify-between overflow-hidden">
            <div>
              <button className="text-sm text-[#6B7280] mb-8">
                ← Volver al inicio
              </button>

              <div className="bg-white rounded-3xl border border-[#ECECEC] p-6 shadow-sm mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-[#111]">
                    Tu consulta
                  </h3>

                  <button className="text-[#57B33E] text-sm font-bold">
                    Ver detalles
                  </button>
                </div>

                <p className="text-sm text-[#374151] leading-relaxed">
                  <strong>Problema:</strong> {consultation?.description || "Consulta arquitectónica"}
                </p>

                <div className="flex items-center gap-6 mt-5 text-[#6B7280] text-sm">
                  <span>📷 5</span>
                  <span>🎥 1</span>
                  <span>📄 0</span>
                </div>
              </div>

              <h3 className="font-black mb-5">
              Conversación con cliente
              </h3>

              <div className="bg-[#F3FFEE] border-l-4 border-[#57B33E] rounded-3xl p-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#0D3B2E] text-white flex items-center justify-center">
                  👷
                </div>

                <div className="flex-1">
                  <p className="font-black text-[#111]">
                  {consultation?.name || "Cliente TuArki"}
                  </p>

                  <p className="text-sm text-[#57B33E] font-semibold">
                    En línea
                  </p>
                </div>

                <span className="text-xs text-[#6B7280]">
                  10:24 AM
                </span>
              </div>
            </div>

            <div className="bg-[#F3FFEE] rounded-[28px] p-6 border border-[#DDF5D3]">
              <h3 className="font-black mb-3">
                ¿Necesitas ayuda?
              </h3>

              <p className="text-sm text-[#406B45] leading-relaxed mb-5">
                Nuestro equipo está para apoyarte si tienes alguna duda.
              </p>

              <button className="bg-white text-[#1E7A5A] border border-[#CFECC8] px-5 py-3 rounded-full text-sm font-bold">
                💬 Chat de soporte
              </button>
            </div>
          </aside>

          {/* CHAT CENTER */}
          <section className="bg-white rounded-[34px] border border-[#E5E7EB] shadow-[0_20px_80px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
            {/* CHAT HEADER */}
            <div className="px-8 py-6 border-b border-[#E8ECE8] flex items-center justify-between bg-white">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-[#F3F4F6] flex items-center justify-center text-4xl shadow-sm">
                  👷
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-black text-[#111]">
                    {consultation?.name || "Cliente TuArki"}
                    </h1>

                    <span className="text-[#57B33E]">
                      ✔
                    </span>
                  </div>

                  <p className="text-[#6B7280] mt-1">
                  {professional?.specialty || "Especialista en construcción"}
                  </p>

                  <div className="flex items-center gap-5 mt-2 text-sm">
                    <span className="text-[#F5B301] font-semibold">
                    ⭐ {professional?.rating || 5} valoración
                    </span>

                    <span className="text-[#57B33E] font-semibold">
                    {professional?.is_online ? "● En línea" : "● No disponible"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="hidden xl:block text-right">
                  <p className="text-sm text-[#6B7280]">
                    Tiempo estimado
                  </p>
                  <p className="font-black text-[#111]">
                    3 min
                  </p>
                </div>

                <button
                  onClick={() => {
                    router.push(
                      `/videollamada/${consultationId}`
                    );
                  }}
                  className="bg-gradient-to-r from-[#57B33E] to-[#2F8F1F] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:scale-[1.02] transition-all"
                >
                  🎥 Iniciar videollamada
                </button>
                
                <button
                 onClick={finishConsultation}
                 className="px-5 py-3 rounded-2xl bg-[#EF4444] text-white font-semibold hover:opacity-90 transition-all"
               >
                    Finalizar consulta
               </button>

                <button className="text-2xl">
                  ⋮
                </button>
              </div>
            </div>

            {/* SECURITY BAR */}
            <div className="mx-8 mt-5 bg-[#F3FFEE] border border-[#DDF5D3] rounded-2xl px-5 py-3 text-sm text-[#406B45]">
              🛡️{" "}
              <strong>Tu información está protegida.</strong>{" "}
              Esta conversación es privada y segura.
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto px-10 py-8 bg-gradient-to-b from-white to-[#FAFBF8] space-y-6">
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    <div className="w-20 h-20 rounded-full bg-[#F3FFEE] mx-auto mb-5 flex items-center justify-center text-4xl">
                      💬
                    </div>

                    <h2 className="text-2xl font-black text-[#111]">
                      Tu consulta está lista
                    </h2>

                    <p className="text-[#6B7280] mt-2">
                      Escribe tu primer mensaje o inicia videollamada.
                    </p>
                  </div>
                </div>
              )}

              {messages.map((msg, index) => (
                <div
                  key={msg.id || index}
                  className={`flex items-end gap-4 ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {msg.sender !== "user" && (
                    <div className="w-11 h-11 rounded-full bg-[#0D3B2E] text-white flex items-center justify-center shrink-0">
                      👷
                    </div>
                  )}

                  <div
                    className={`max-w-[680px] px-7 py-5 rounded-[28px] text-[15px] leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-[#F3FFEE] text-[#111] rounded-br-md border border-[#DDF5D3]"
                        : "bg-white text-[#111] border border-[#E5E7EB] rounded-bl-md"
                    }`}
                  >
                    {msg.text.includes("https://") ? (
                      (() => {
                        const parts =
                          msg.text.split(" ");

                        const fileUrl =
                          parts.find((part) =>
                            part.includes("https://")
                          ) || "";

                        const isImage =
                          fileUrl.includes(".png") ||
                          fileUrl.includes(".jpg") ||
                          fileUrl.includes(".jpeg") ||
                          fileUrl.includes(".webp");

                        const isPdf =
                          fileUrl.includes(".pdf");

                        const isDoc =
                          fileUrl.includes(".doc") ||
                          fileUrl.includes(".docx");

                        return (
                          <div className="space-y-4">
                            <p>
                              {parts
                                .filter(
                                  (part) =>
                                    !part.includes(
                                      "https://"
                                    )
                                )
                                .join(" ")}
                            </p>

                            {isImage && (
                              <img
                                src={fileUrl}
                                alt="archivo"
                                className="rounded-2xl max-w-md border border-black/5 shadow-md"
                              />
                            )}

                            {isPdf && (
                              <a
                                href={fileUrl}
                                target="_blank"
                                className="block bg-black/5 px-5 py-4 rounded-2xl"
                              >
                                📄 Ver PDF
                              </a>
                            )}

                            {isDoc && (
                              <a
                                href={fileUrl}
                                target="_blank"
                                className="block bg-black/5 px-5 py-4 rounded-2xl"
                              >
                                📄 Descargar documento
                              </a>
                            )}
                          </div>
                        );
                      })()
                    ) : (
                      msg.text
                    )}

                    <p className="text-[11px] text-[#9CA3AF] mt-3 text-right">
                      10:24 AM ✓✓
                    </p>
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef}></div>
            </div>

            {/* INPUT */}
            <div className="bg-white border-t border-[#E8ECE8] px-8 py-5">
              {selectedFile && (
                <div className="mb-4 inline-flex items-center gap-3 bg-[#F3FFEE] border border-[#DDF5D3] text-[#1E7A5A] px-5 py-3 rounded-2xl text-sm font-semibold">
                  📎 Archivo seleccionado: {selectedFile.name}
                </div>
              )}

              <div className="flex items-center gap-3">
                <label className="w-12 h-12 rounded-full bg-[#F3FFEE] hover:bg-[#E6F4EC] transition-all cursor-pointer flex items-center justify-center text-2xl">
                  +

                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setSelectedFile(
                          e.target.files[0]
                        );
                      }
                    }}
                  />
                </label>

                <div className="flex-1 bg-white border border-[#E5E7EB] rounded-full px-5 py-3 flex items-center gap-3 shadow-sm">
                  <input
                    type="text"
                    placeholder="Responder al cliente..."
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                    className="flex-1 outline-none text-[#111] bg-transparent"
                  />

                  <span className="text-xl">😊</span>
                  <span className="text-xl">📷</span>
                  <span className="text-xl">🎥</span>
                  <span className="text-xl">📎</span>
                </div>

                <button
                  onClick={sendMessage}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-[#57B33E] to-[#2F8F1F] text-white text-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-all"
                >
                  ➤
                </button>
              </div>
            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6 overflow-y-auto pr-1">
            <div className="bg-white rounded-[30px] p-7 border border-[#E5E7EB] shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-black text-[#111]">
                  Sobre tu consulta
                </h3>

                <button className="text-[#57B33E] text-sm font-bold">
                  Ver detalles
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-[#6B7280]">
                    Problema:
                  </p>
                  <p className="font-semibold text-[#111] leading-relaxed">
                  {consultation?.description || "Consulta arquitectónica"}
                  </p>
                </div>

                <div>
                  <p className="text-[#6B7280]">
                    Categoría:
                  </p>
                  <p className="font-semibold text-[#111]">
                  {consultation?.service || consultation?.category || "Construcción"}
                  </p>
                </div>

                <div>
                  <p className="text-[#6B7280]">
                    Consultado el:
                  </p>
                  <p className="font-semibold text-[#111]">
                  {consultation?.created_at
                    ? new Date(consultation.created_at).toLocaleString("es-MX")
                    : "Fecha no disponible"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[30px] p-7 border border-[#E5E7EB] shadow-sm">
              <h3 className="font-black text-[#111] mb-5">
                Archivos enviados
              </h3>

              <div className="space-y-3">
  {uploadedFiles.length === 0 && (
    <p className="text-sm text-[#6B7280]">
      Todavía no se han enviado archivos.
    </p>
  )}

  {uploadedFiles.slice(0, 4).map((file, index) => {
    const fileUrl =
      file.text
        .split(" ")
        .find((part) =>
          part.includes("https://")
        ) || "";

    return (
      <a
        key={file.id || index}
        href={fileUrl}
        target="_blank"
        className="block bg-[#F8FAF7] border border-[#E5E7EB] rounded-2xl p-4 text-sm font-semibold text-[#374151] hover:bg-[#F3FFEE] transition-all"
      >
        📎 Archivo enviado {index + 1}
      </a>
    );
  })}
</div>
            </div>

            <div className="bg-white rounded-[30px] p-7 border border-[#E5E7EB] shadow-sm">
              <h3 className="font-black text-[#111] mb-5">
                Acciones rápidas
              </h3>

              <div className="space-y-4 text-sm text-[#374151]">

  <button
    onClick={() =>
      setMessage(
        "¿Podrías compartir más fotografías o videos para analizar mejor el problema?"
      )
    }
    className="flex items-center gap-3 hover:text-[#57B33E]"
  >
    ❔ Solicitar más información
  </button>

  <button
    onClick={() =>
      setMessage(
        "Te compartiré un documento con recomendaciones y observaciones."
      )
    }
    className="flex items-center gap-3 hover:text-[#57B33E]"
  >
    📄 Compartir documento
  </button>

  <button
    onClick={() =>
      setMessage(
        "Considero que la consulta ha sido resuelta satisfactoriamente."
      )
    }
    className="flex items-center gap-3 hover:text-[#57B33E]"
  >
    ✅ Marcar como resuelto
  </button>

</div>
            </div>

            <div className="bg-[#F3FFEE] rounded-[30px] p-7 border border-[#DDF5D3]">
              <h3 className="font-black text-[#0D3B2E] mb-4">
                💡 Consejo profesional
              </h3>

              <p className="text-sm leading-relaxed text-[#406B45]">
                Mientras más información compartas, más rápida y precisa será la solución.
              </p>
            </div>

            <div className="bg-white rounded-[30px] p-7 border border-[#E5E7EB] shadow-sm">
              <div className="text-5xl mb-4">
                🛡️
              </div>

              <h3 className="font-black text-[#111] mb-3">
                Especialista verificado
              </h3>

              <p className="text-sm text-[#6B7280] leading-relaxed">
                Arq. Carlos Mendoza ha verificado su identidad y cuenta con experiencia comprobada.
              </p>

              <button className="mt-5 text-[#57B33E] font-bold text-sm">
                Ver perfil completo
              </button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}