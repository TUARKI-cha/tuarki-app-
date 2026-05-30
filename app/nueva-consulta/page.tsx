"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const categories = [
  "Construcción",
  "Remodelación",
  "Instalaciones",
  "Daños o filtraciones",
  "Planos y diseños",
  "Presupuestos",
  "Regularización",
  "Otro",
];

export default function NuevaConsultaPage() {

  const router = useRouter();

  const [selectedCategory, setSelectedCategory] =
    useState("Construcción");

  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [name, setName] =
    useState("");

  const [city, setCity] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const createConsultation = async () => {

    if (
      !description ||
      !name ||
      !city ||
      !phone
    ) {

      alert("Completa todos los campos");

      return;

    }

    setLoading(true);

    try {

      // CREATE CLIENT
      const {
        data: clientData,
        error: clientError,
      } = await supabase
        .from("clients")
        .insert([
          {
            name,
            city,
            phone,
          },
        ])
        .select()
        .single();

      if (clientError) {

        console.log(clientError);

        alert("Error creando cliente");

        setLoading(false);

        return;

      }

      localStorage.setItem(
        "clientData",
        JSON.stringify(clientData)
      );

      // CREATE CONSULTATION
      const {
        data,
        error,
      } = await supabase
        .from("consultations")
        .insert([
          {
            title: selectedCategory,
            description,
            category: selectedCategory,
            service: "Chat",
            status: "pending",
            phone_verified: false,
            assigned_professional_id: null,
          
            client_id: clientData.id,
            name: clientData.name,
            phone: clientData.phone,
            city: clientData.city,
          }
        ])
        .select()
        .single();

      if (error) {

        console.log(error);

        alert("Error creando consulta");

        setLoading(false);

        return;

      }

      localStorage.setItem(
        "pendingConsultationId",
        data.id
      );
      
      router.push(
        `/verificacion?id=${data.id}`
      );

    } catch (err) {

      console.log(err);

      alert("Ocurrió un error");

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-[#F6F7F3]">

      {/* NAVBAR */}
      <header className="w-full px-12 py-6 flex items-center justify-between border-b border-[#E8E8E8] bg-white">

        <Link
          href="/"
          className="flex items-center gap-3"
        >

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0D3B2E] via-[#1E7A5A] to-[#7ED957]" />

          <div>

            <h1 className="text-3xl font-bold text-[#0D3B2E]">
              TuArki
            </h1>

            <p className="text-sm text-[#4B6358]">
              siempre contigo
            </p>

          </div>

        </Link>

        <button className="bg-[#0D3B2E] text-white px-8 py-4 rounded-full font-semibold">
          ¿Eres profesional?
        </button>

      </header>

      {/* CONTENT */}
      <div className="max-w-[1600px] mx-auto px-10 py-10">

        {/* STEPS */}
        <div className="flex items-center justify-center gap-10 mb-14">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-full bg-[#57B33E] text-white flex items-center justify-center font-bold">
              1
            </div>

            <p className="font-semibold text-[#0D3B2E]">
              Cuéntanos tu problema
            </p>

          </div>

          <div className="w-24 h-[2px] bg-[#DADADA]" />

          <div className="flex items-center gap-4 opacity-50">

            <div className="w-12 h-12 rounded-full bg-[#EAEAEA] flex items-center justify-center font-bold">
              2
            </div>

            <p className="font-semibold">
              Detalles y fotos
            </p>

          </div>

          <div className="w-24 h-[2px] bg-[#DADADA]" />

          <div className="flex items-center gap-4 opacity-50">

            <div className="w-12 h-12 rounded-full bg-[#EAEAEA] flex items-center justify-center font-bold">
              3
            </div>

            <p className="font-semibold">
              Revisión
            </p>

          </div>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-12 gap-10">

          {/* LEFT */}
          <div className="col-span-8">

            <div className="bg-white rounded-[40px] p-12 border border-[#ECECEC]">

              {/* TITLE */}
              <div className="mb-12">

                <p className="text-[#57B33E] font-semibold mb-3">
                  Consulta profesional
                </p>

                <h1 className="text-6xl font-bold text-[#0D3B2E] leading-tight mb-5">
                  Cuéntanos tu problema
                </h1>

                <p className="text-xl text-[#5B6B63] max-w-3xl leading-relaxed">
                  Entre más información compartas,
                  más rápido podremos ayudarte
                  y asignarte el especialista ideal.
                </p>

              </div>

              {/* CLIENT DATA */}
              <div className="mb-12">

                <h2 className="text-2xl font-bold text-[#0D3B2E] mb-8">
                  Tus datos
                </h2>

                <div className="grid grid-cols-3 gap-5">

                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    className="rounded-2xl border border-[#E0E0E0] p-5"
                  />

                  <input
                    type="text"
                    placeholder="Ciudad"
                    value={city}
                    onChange={(e) =>
                      setCity(e.target.value)
                    }
                    className="rounded-2xl border border-[#E0E0E0] p-5"
                  />

                  <input
                    type="text"
                    placeholder="Celular / WhatsApp"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    className="rounded-2xl border border-[#E0E0E0] p-5"
                  />

                </div>

              </div>

              {/* CATEGORIES */}
              <div className="mb-12">

                <h2 className="text-2xl font-bold text-[#0D3B2E] mb-8">
                  ¿Qué tipo de problema tienes?
                </h2>

                <div className="grid grid-cols-4 gap-5">

                  {categories.map((item) => (

                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        setSelectedCategory(item)
                      }
                      className={`rounded-3xl border p-6 text-left transition-all duration-300 ${
                        selectedCategory === item
                          ? "border-[#57B33E] bg-[#F3FFEE]"
                          : "border-[#E8E8E8] bg-white hover:border-[#57B33E]"
                      }`}
                    >

                      <div className="w-14 h-14 rounded-2xl bg-[#E8F8E1] flex items-center justify-center text-2xl mb-5">
                        🏗️
                      </div>

                      <p className="font-semibold text-[#0D3B2E]">
                        {item}
                      </p>

                    </button>

                  ))}

                </div>

              </div>

              {/* DESCRIPTION */}
              <div className="mb-12">

                <h2 className="text-2xl font-bold text-[#0D3B2E] mb-5">
                  Describe tu problema
                </h2>

                <textarea
                  rows={8}
                  placeholder="Ej. Tengo humedad en la pared del baño..."
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  className="w-full rounded-[30px] border border-[#E0E0E0] p-8 text-lg focus:outline-none focus:border-[#57B33E]"
                />

              </div>

              {/* FILES */}
              <div className="mb-12">

                <h2 className="text-2xl font-bold text-[#0D3B2E] mb-5">
                  Agrega fotos o videos
                </h2>

                <div className="border-2 border-dashed border-[#DADADA] rounded-[35px] p-16 text-center">

                  <div className="w-24 h-24 rounded-full bg-[#EAF8E4] flex items-center justify-center text-5xl mx-auto mb-8">
                    📂
                  </div>

                  <h3 className="text-3xl font-bold text-[#0D3B2E] mb-4">
                    Sube evidencia visual
                  </h3>

                  <p className="text-[#5B6B63] text-lg mb-8">
                    Arrastra imágenes y videos aquí
                  </p>

                  <button
                    type="button"
                    className="bg-[#57B33E] text-white px-8 py-5 rounded-2xl font-bold text-lg"
                  >
                    Seleccionar archivos
                  </button>

                </div>

              </div>

              {/* BUTTON */}
              <button
                onClick={createConsultation}
                className="w-full bg-gradient-to-r from-[#0D3B2E] to-[#57B33E] text-white py-6 rounded-2xl text-xl font-bold hover:scale-[1.01] transition-all duration-300"
              >

                {loading
                  ? "Creando consulta..."
                  : "Continuar"}

              </button>

            </div>

          </div>

          {/* RIGHT */}
          <div className="col-span-4 space-y-8">

            {/* INFO */}
            <div className="bg-white rounded-[35px] p-10 border border-[#ECECEC]">

              <h3 className="text-3xl font-bold text-[#0D3B2E] mb-10">
                ¿Qué sigue?
              </h3>

              <div className="space-y-10">

                <div className="flex gap-5">

                  <div className="w-14 h-14 rounded-2xl bg-[#EAF8E4] flex items-center justify-center text-2xl">
                    📝
                  </div>

                  <div>

                    <h4 className="font-bold text-[#0D3B2E] mb-2">
                      Nos cuentas tu problema
                    </h4>

                    <p className="text-[#5B6B63]">
                      Describe tu situación
                      y agrega fotos.
                    </p>

                  </div>

                </div>

                <div className="flex gap-5">

                  <div className="w-14 h-14 rounded-2xl bg-[#EAF8E4] flex items-center justify-center text-2xl">
                    👷
                  </div>

                  <div>

                    <h4 className="font-bold text-[#0D3B2E] mb-2">
                      Asignamos especialista
                    </h4>

                    <p className="text-[#5B6B63]">
                      Un experto revisará tu caso.
                    </p>

                  </div>

                </div>

                <div className="flex gap-5">

                  <div className="w-14 h-14 rounded-2xl bg-[#EAF8E4] flex items-center justify-center text-2xl">
                    💬
                  </div>

                  <div>

                    <h4 className="font-bold text-[#0D3B2E] mb-2">
                      Te ayudamos rápido
                    </h4>

                    <p className="text-[#5B6B63]">
                      Chat, videollamada
                      o revisión técnica.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* SECURITY */}
            <div className="bg-gradient-to-br from-[#0D3B2E] to-[#145C44] rounded-[35px] p-10 text-white">

              <p className="text-[#7ED957] font-semibold mb-4">
                Tu información está segura
              </p>

              <h3 className="text-4xl font-bold leading-tight mb-6">
                Especialistas reales,
                atención humana.
              </h3>

              <p className="text-gray-300 leading-relaxed text-lg">
                Solo compartimos tu información
                con el especialista asignado.
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}