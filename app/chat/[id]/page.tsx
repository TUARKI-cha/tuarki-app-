"use client";

import ConsultationSidebar from "@/app/components/ConsultationSidebar";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  RealtimePostgresInsertPayload,
} from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";

export default function ChatPage() {

  const params = useParams();

  const consultationId =
    Number(params.id);

  const [message, setMessage] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

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

  useEffect(() => {

    if (consultationId) {
      loadMessages();
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

    return () => {

      supabase.removeChannel(channel);

    };

  }, [consultationId]);

  const loadMessages = async () => {

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq(
        "consultation_id",
        consultationId
      )
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      console.log(error);
      return;
    }

    setMessages(data || []);

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

      fileUrl =
        publicUrlData.publicUrl;

      finalMessage +=
        ` 📎 ${fileUrl}`;

    }

    const currentMessage = message;

    const hadFile = selectedFile;

    setMessage("");
    setSelectedFile(null);

    const { error } = await supabase
      .from("messages")
      .insert([
        {
          consultation_id:
            consultationId,
          sender: "user",
          text: finalMessage,
        },
      ]);

    if (error) {
      console.log(error);
      return;
    }

    setTimeout(async () => {

      let specialistReply = "";

      if (hadFile) {

        specialistReply =
          "Perfecto 👍 Ya recibí el archivo.";

      } else if (
        currentMessage
          .toLowerCase()
          .includes("grieta")
      ) {

        specialistReply =
          "Entiendo. ¿La grieta creció recientemente?";

      } else {

        specialistReply =
          "Perfecto 👍 Ya recibí tu mensaje.";

      }

      await supabase
        .from("messages")
        .insert([
          {
            consultation_id:
              consultationId,
            sender: "specialist",
            text: specialistReply,
          },
        ]);

    }, 1200);

  };

  return (

    <main className="h-screen bg-[#F6F7F3] flex overflow-hidden">

      <ConsultationSidebar
        consultationId={consultationId}
        service="Chat profesional"
        specialist="Arq. Carlos Mendoza"
        status="En proceso"
      />

        <section className="flex-1 bg-[#F6F7F3] p-8 overflow-hidden">

        <div className="h-full min-h-0 max-w-[1400px] mx-auto flex gap-6">

         {/* CHAT */}
         <div className="flex-1 min-h-0 h-full flex flex-col bg-white rounded-[38px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden border border-[#ECECEC]">

            {/* HEADER */}
            <div className="bg-white rounded-t-[32px] border border-[#ECECEC] px-8 py-6 flex items-center justify-between shadow-sm">

              <div>

                <h1 className="text-3xl font-bold text-[#0D3B2E]">
                  Chat profesional
                </h1>

                <p className="text-[#6B7280] mt-1">
                  Consulta activa con especialista
                </p>

              </div>

              <div className="flex items-center gap-4">

                <div className="bg-[#F3FFEE] text-[#57B33E] px-4 py-2 rounded-full text-sm font-semibold">
                  ● Especialista en línea
                </div>

                <button className="bg-gradient-to-r from-[#57B33E] to-[#3A9125] text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-[1.02] transition-all">

                  Iniciar videollamada

                </button>

              </div>

            </div>

            {/* MENSAJES */}
            <div className="flex-1 min-h-0 overflow-y-auto px-10 py-8 bg-[#FCFCFA]">

              {messages.map((msg, index) => (

                <div
                  key={msg.id || index}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-2xl px-7 py-5 rounded-[28px] text-[16px] leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-[#0D3B2E] to-[#145C44] text-white rounded-br-md"
                        : "bg-white text-[#0D3B2E] border border-[#ECECEC] rounded-bl-md"
                    }`}
                  >

                    {msg.text.includes("https://") ? (

                      (() => {

                        const parts = msg.text.split(" ");

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
                              {parts.filter(
                                (part) =>
                                  !part.includes("https://")
                              ).join(" ")}
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
                                className="block bg-white/10 px-5 py-4 rounded-2xl"
                              >
                                📄 Ver PDF
                              </a>

                            )}

                            {isDoc && (

                              <a
                                href={fileUrl}
                                target="_blank"
                                className="block bg-white/10 px-5 py-4 rounded-2xl"
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

                  </div>

                </div>

              ))}

              <div ref={messagesEndRef}></div>

            </div>

            {/* INPUT */}
            <div className="bg-white border border-[#ECECEC] border-t-0 rounded-b-[32px] p-5 shadow-sm">

              <div className="flex gap-4 items-center">

                <label className="bg-[#F3F4F6] hover:bg-[#E6F4EC] transition-all px-5 py-4 rounded-2xl cursor-pointer">

                  📎

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

                <input
                  type="text"
                  placeholder="Escribe tu mensaje..."
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  className="flex-1 bg-[#F8F8F6] px-6 py-5 rounded-2xl border border-transparent focus:outline-none focus:border-[#57B33E]"
                />

                <button
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-[#0D3B2E] to-[#145C44] text-white px-8 py-5 rounded-2xl font-bold shadow-lg hover:scale-[1.03] transition-all"
                >

                  Enviar

                </button>

              </div>

              {selectedFile && (

                <p className="mt-4 text-sm text-[#1E7A5A] font-medium">

                  Archivo seleccionado:
                  {" "}
                  {selectedFile.name}

                </p>

              )}

            </div>

          </div>

          {/* PANEL DERECHO */}
          <div className="w-[320px] hidden xl:flex flex-col gap-5">

            <div className="bg-white rounded-[28px] p-6 border border-[#ECECEC] shadow-sm">

              <h3 className="font-bold text-[#0D3B2E] text-xl mb-5">
                Sobre tu consulta
              </h3>

              <div className="space-y-4 text-sm">

                <div>
                  <p className="text-gray-400">
                    Problema
                  </p>

                  <p className="font-semibold text-[#0D3B2E]">
                    Consulta arquitectónica
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">
                    Estado
                  </p>

                  <p className="font-semibold text-[#57B33E]">
                    En proceso
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">
                    Especialista
                  </p>

                  <p className="font-semibold text-[#0D3B2E]">
                    Arq. Carlos Mendoza
                  </p>
                </div>

              </div>

            </div>

            <div className="bg-[#F3FFEE] rounded-[28px] p-6 border border-[#DDF5D3]">

              <h3 className="font-bold text-[#0D3B2E] mb-3">
                Consejo profesional
              </h3>

              <p className="text-sm leading-relaxed text-[#406B45]">
                Mientras más información compartas, más precisa será la solución.
              </p>

            </div>

          </div>

        </div>

      </section>


    </main>

  );

}