"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function ServiciosPage() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const consultationId =
    searchParams.get("id");

  const services = [
    {
      title: "Chat profesional",
      slug: "chat",
      price: "$200 MXN",
      description:
        "Consulta rápida vía chat con un especialista certificado.",
      icon: "💬",
      time: "Respuesta en minutos",
      highlight: false,
    },

    {
      title: "Videollamada",
      slug: "videollamada",
      price: "$250 MXN",
      description:
        "Habla directamente con un arquitecto o ingeniero en tiempo real.",
      icon: "🎥",
      time: "Atención inmediata",
      highlight: true,
    },

    {
      title: "Revisión de planos",
      slug: "revision-planos",
      price: "$499 MXN",
      description:
        "Análisis técnico profesional con observaciones y recomendaciones.",
      icon: "📐",
      time: "Entrega rápida",
      highlight: false,
    },

    {
      title: "Revisión de presupuesto",
      slug: "revision-presupuesto",
      price: "$350 MXN",
      description:
        "Validamos costos y partidas para evitar sobreprecios.",
      icon: "📊",
      time: "Especialistas verificados",
      highlight: false,
    },
  ];

  return (

    <main className="min-h-screen bg-[#F6F7F3]">

      {/* HEADER */}
      <section className="pt-24 pb-16 px-10">

        <div className="max-w-[1400px] mx-auto text-center">

          <p className="text-[#57B33E] font-semibold text-lg mb-5">
            Selecciona un servicio
          </p>

          <h1 className="text-7xl font-bold text-[#0D3B2E] leading-tight mb-8">
            ¿Cómo quieres
            <br />
            recibir ayuda?
          </h1>

          <p className="text-[#5B6B63] text-2xl max-w-4xl mx-auto leading-relaxed">
            Elige la opción ideal para resolver tu problema.
            Nuestros especialistas te ayudarán de forma rápida,
            profesional y segura.
          </p>

        </div>

      </section>

      {/* SERVICES */}
      <section className="px-10 pb-20">

        <div className="max-w-[1600px] mx-auto">

          <div className="grid grid-cols-4 gap-8">

            {services.map((service, index) => (

              <div
                key={index}
                className={`rounded-[40px] p-10 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] relative min-h-[620px]
                  
                  ${
                    service.highlight
                      ? "bg-[#0D3B2E] text-white shadow-2xl"
                      : "bg-white border border-[#ECECEC] shadow-sm"
                  }
                `}
              >

                {/* POPULAR */}
                {service.highlight && (

                  <div className="absolute top-6 right-6 bg-[#7ED957] text-[#0D3B2E] px-4 py-2 rounded-full text-sm font-bold">
                    Más popular
                  </div>

                )}

                {/* CONTENT */}
                <div>

                  {/* ICON */}
                  <div
                    className={`w-20 h-20 rounded-[28px] flex items-center justify-center text-4xl mb-8
                      
                      ${
                        service.highlight
                          ? "bg-white/10"
                          : "bg-[#F1FAEC]"
                      }
                    `}
                  >
                    {service.icon}
                  </div>

                  {/* TITLE */}
                  <h2 className="text-4xl font-bold mb-5 leading-tight">
                    {service.title}
                  </h2>

                  {/* DESC */}
                  <p
                    className={`text-lg leading-relaxed mb-8
                      
                      ${
                        service.highlight
                          ? "text-gray-300"
                          : "text-[#5B6B63]"
                      }
                    `}
                  >
                    {service.description}
                  </p>

                  {/* TIME */}
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold mb-10
                      
                      ${
                        service.highlight
                          ? "bg-white/10 text-white"
                          : "bg-[#F5F5F3] text-[#0D3B2E]"
                      }
                    `}
                  >
                    ⚡ {service.time}
                  </div>

                </div>

                {/* PRICE + BUTTON */}
                <div>

                  <div className="mb-8">

                    <p
                      className={`text-sm mb-2
                        
                        ${
                          service.highlight
                            ? "text-gray-400"
                            : "text-[#7A7A7A]"
                        }
                      `}
                    >
                      Precio único
                    </p>

                    <h3 className="text-6xl font-bold">
                      {service.price}
                    </h3>

                  </div>

                  <button
                    onClick={() => {

                      localStorage.setItem(
                        "selectedService",
                        JSON.stringify(service)
                      );

                      router.push(
                        `/pago?id=${consultationId}`
                      );

                    }}
                    className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300
                      
                      ${
                        service.highlight
                          ? "bg-[#7ED957] text-[#0D3B2E] hover:scale-[1.02]"
                          : "bg-[#0D3B2E] text-white hover:bg-[#145C44]"
                      }
                    `}
                  >
                    Seleccionar servicio
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* BOTTOM INFO */}
      <section className="px-10 pb-24">

        <div className="max-w-[1500px] mx-auto">

          <div className="bg-white border border-[#ECECEC] rounded-[40px] p-12 grid grid-cols-4 gap-10">

            <div className="flex gap-5">

              <div className="w-16 h-16 rounded-2xl bg-[#F1FAEC] flex items-center justify-center text-3xl">
                🛡️
              </div>

              <div>

                <h3 className="font-bold text-[#0D3B2E] text-lg mb-2">
                  Especialistas verificados
                </h3>

                <p className="text-[#5B6B63]">
                  Arquitectos e ingenieros profesionales.
                </p>

              </div>

            </div>

            <div className="flex gap-5">

              <div className="w-16 h-16 rounded-2xl bg-[#F1FAEC] flex items-center justify-center text-3xl">
                ⚡
              </div>

              <div>

                <h3 className="font-bold text-[#0D3B2E] text-lg mb-2">
                  Respuesta rápida
                </h3>

                <p className="text-[#5B6B63]">
                  Te contactamos en minutos.
                </p>

              </div>

            </div>

            <div className="flex gap-5">

              <div className="w-16 h-16 rounded-2xl bg-[#F1FAEC] flex items-center justify-center text-3xl">
                🔒
              </div>

              <div>

                <h3 className="font-bold text-[#0D3B2E] text-lg mb-2">
                  Pago seguro
                </h3>

                <p className="text-[#5B6B63]">
                  Tus pagos están 100% protegidos.
                </p>

              </div>

            </div>

            <div className="flex gap-5">

              <div className="w-16 h-16 rounded-2xl bg-[#F1FAEC] flex items-center justify-center text-3xl">
                🎧
              </div>

              <div>

                <h3 className="font-bold text-[#0D3B2E] text-lg mb-2">
                  Atención humana
                </h3>

                <p className="text-[#5B6B63]">
                  Estamos para ayudarte en todo momento.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}