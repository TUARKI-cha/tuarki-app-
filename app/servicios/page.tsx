"use client";

import { useRouter } from "next/navigation";

export default function ServiciosPage() {

  const router = useRouter();

  const services = [
    {
      title: "Chat profesional",
      price: "$149 MXN",
      description: "Consulta rápida vía chat con especialista.",
      highlight: false,
    },

    {
      title: "Videollamada",
      price: "$399 MXN",
      description: "Habla directamente con un arquitecto o ingeniero.",
      highlight: true,
    },

    {
      title: "Revisión de planos",
      price: "$699 MXN",
      description: "Análisis técnico y recomendaciones profesionales.",
      highlight: false,
    },

    {
      title: "Presupuesto",
      price: "$499 MXN",
      description: "Estimación profesional de costos de obra.",
      highlight: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#F5F5F3] px-10 py-16">

      {/* HEADER */}
      <div className="text-center mb-16">

        <p className="text-[#1E7A5A] font-medium mb-4">
          Selecciona un servicio
        </p>

        <h1 className="text-6xl font-bold text-[#0D3B2E] mb-6">
          ¿Cómo quieres recibir ayuda?
        </h1>

        <p className="text-[#4B6358] text-xl max-w-3xl mx-auto leading-relaxed">
          Elige la opción que mejor se adapte a tu problema.
          Nuestros especialistas te ayudarán rápidamente.
        </p>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-4 gap-8">

        {services.map((service, index) => (

          <div
            key={index}
            className={`rounded-[35px] p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02]
              
              ${service.highlight
                ? "bg-[#0D3B2E] text-white shadow-2xl"
                : "bg-white shadow-sm"
              }
            `}
          >

            <div>

              {service.highlight && (

                <div className="inline-block bg-[#7ED957] text-[#0D3B2E] px-4 py-2 rounded-full text-sm font-bold mb-6">
                  Más popular
                </div>

              )}

              <h2 className="text-3xl font-bold mb-5">
                {service.title}
              </h2>

              <p className={`text-lg leading-relaxed mb-8
              
                ${service.highlight
                  ? "text-gray-300"
                  : "text-[#4B6358]"
                }
              `}>
                {service.description}
              </p>

              <h3 className="text-5xl font-bold mb-10">
                {service.price}
              </h3>

            </div>

            <button
              onClick={() => router.push("/pago")}
              className={`w-full py-5 rounded-2xl font-bold transition-all duration-300
                
                ${service.highlight
                  ? "bg-[#7ED957] text-[#0D3B2E]"
                  : "bg-[#0D3B2E] text-white"
                }
              `}
            >
              Seleccionar
            </button>

          </div>

        ))}

      </div>

    </main>
  );
}