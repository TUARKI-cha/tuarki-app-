"use client";

import { useState } from "react";

export default function ChatPage() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "specialist",
      text: "Hola 👋 Soy el arquitecto Carlos. ¿Podrías explicarme el problema?",
    },

    {
      sender: "user",
      text: "Claro, tengo una grieta en el muro de mi sala.",
    },

    {
      sender: "specialist",
      text: "Perfecto. ¿Podrías enviarme una foto más cercana?",
    },
  ]);

  const sendMessage = () => {

    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        sender: "user",
        text: message,
      },
    ]);

    setMessage("");
  };

  return (
    <main className="min-h-screen bg-[#F5F5F3] flex">

      {/* SIDEBAR */}
      <aside className="w-96 bg-white border-r border-[#EAEAEA] flex flex-col">

        {/* TOP */}
        <div className="p-8 border-b border-[#ECECEC]">

          <p className="text-[#1E7A5A] font-medium mb-2">
            Consulta activa
          </p>

          <h2 className="text-3xl font-bold text-[#0D3B2E]">
            Grieta estructural
          </h2>

        </div>

        {/* SPECIALIST */}
        <div className="p-8 flex items-center gap-5 border-b border-[#ECECEC]">

          <div className="w-16 h-16 rounded-full bg-[#0D3B2E]"></div>

          <div>

            <h3 className="text-xl font-bold text-[#0D3B2E]">
              Arq. Carlos Mendoza
            </h3>

            <p className="text-[#1E7A5A]">
              En línea
            </p>

          </div>

        </div>

        {/* INFO */}
        <div className="p-8 space-y-6">

          <div>

            <p className="text-sm text-[#4B6358] mb-2">
              Servicio
            </p>

            <p className="font-semibold text-[#0D3B2E]">
              Videollamada + Chat
            </p>

          </div>

          <div>

            <p className="text-sm text-[#4B6358] mb-2">
              Tiempo estimado
            </p>

            <p className="font-semibold text-[#0D3B2E]">
              45 minutos
            </p>

          </div>

          <div>

            <p className="text-sm text-[#4B6358] mb-2">
              Estado
            </p>

            <div className="inline-block bg-[#E6F4EC] text-[#1E7A5A] px-4 py-2 rounded-full text-sm font-bold">
              Activa
            </div>

          </div>

        </div>

      </aside>

      {/* CHAT */}
      <section className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="bg-white px-10 py-6 border-b border-[#ECECEC] flex items-center justify-between">

          <div>

            <p className="text-[#1E7A5A] font-medium">
              Especialista conectado
            </p>

            <h1 className="text-3xl font-bold text-[#0D3B2E]">
              Chat profesional
            </h1>

          </div>

          <button className="bg-[#7ED957] px-6 py-4 rounded-2xl font-bold text-[#0D3B2E]">
            Iniciar videollamada
          </button>

        </div>

        {/* MESSAGES */}
        <div className="flex-1 p-10 overflow-y-auto space-y-6">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`flex
              
                ${msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
                }
              `}
            >

              <div
                className={`max-w-2xl px-6 py-5 rounded-[30px] text-lg leading-relaxed
                  
                  ${msg.sender === "user"
                    ? "bg-[#0D3B2E] text-white rounded-br-md"
                    : "bg-white text-[#0D3B2E] rounded-bl-md shadow-sm"
                  }
                `}
              >
                {msg.text}
              </div>

            </div>

          ))}

        </div>

        {/* INPUT */}
        <div className="bg-white border-t border-[#ECECEC] p-6">

          <div className="flex gap-4">

            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-6 py-5 rounded-2xl border border-[#DADADA] focus:outline-none focus:border-[#1E7A5A]"
            />

            <button
              onClick={sendMessage}
              className="bg-[#0D3B2E] text-white px-10 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
            >
              Enviar
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}