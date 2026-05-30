import Link from "next/link";
import {
  MessageCircle,
  Video,
  FileText,
  ClipboardList,
  ShieldCheck,
  Clock3,
  Users,
  ArrowRight,
  Play,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F5F5F3]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(126,217,87,0.14),transparent_35%)]" />
      <div className="absolute right-0 top-20 w-[900px] h-[900px] bg-[#7ED957]/10 blur-[140px] rounded-full" />

      <div className="relative max-w-[1600px] mx-auto px-8 lg:px-14 pt-28 pb-32">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_680px] gap-16 items-center">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-[#DCE8E1] bg-white shadow-sm mb-9">
              <span className="w-2.5 h-2.5 bg-[#57B33E] rounded-full" />
              <p className="text-sm font-semibold text-[#0D3B2E]">
                Expertos en construcción, siempre contigo
              </p>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black leading-[0.92] tracking-[-0.06em] text-[#062B22]">
              Tu arki
              <br />
              siempre{" "}
              <span className="text-[#57B33E]">
                contigo.
              </span>
            </h1>

            <p className="mt-8 text-xl text-[#5E6E67] leading-relaxed max-w-2xl">
              Conectamos personas como tú con arquitectos e ingenieros
              verificados para resolver problemas de construcción de forma
              rápida, clara y confiable.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mt-10">
              <Link href="/nueva-consulta">
                <button className="group h-[64px] px-9 rounded-full bg-[#57B33E] hover:bg-[#4DA63A] text-white font-black text-lg shadow-[0_18px_40px_rgba(87,179,62,0.35)] flex items-center justify-center gap-3 transition-all">
                  <MessageCircle size={22} />
                  Cuéntanos tu problema
                  <ArrowRight
                    size={22}
                    className="group-hover:translate-x-1 transition-all"
                  />
                </button>
              </Link>

              <button className="h-[64px] px-9 rounded-full border border-[#D8E2DC] bg-white hover:bg-[#062B22] hover:text-white transition-all font-bold text-lg text-[#062B22] flex items-center justify-center gap-3">
                <Play size={20} />
                Cómo funciona
              </button>
            </div>

            <div className="flex flex-wrap gap-8 mt-14 text-sm text-[#4D5B56]">
              {[
                {
                  icon: Clock3,
                  text: "Respuesta en minutos",
                },
                {
                  icon: ShieldCheck,
                  text: "Especialistas verificados",
                },
                {
                  icon: FileText,
                  text: "Pago seguro",
                },
                {
                  icon: Users,
                  text: "Atención humana",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-3"
                  >
                    <Icon
                      size={20}
                      className="text-[#57B33E]"
                    />
                    {item.text}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative min-h-[760px] hidden xl:block">
            {/* FLOATING CARDS */}
            <div className="absolute left-0 top-32 bg-white rounded-[28px] border border-[#E5E7EB] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 w-56 z-20">
              <div className="w-14 h-14 rounded-2xl bg-[#F4FAF1] flex items-center justify-center mb-5">
                <MessageCircle className="text-[#57B33E]" />
              </div>
              <h3 className="font-black text-xl text-[#062B22]">
                Chat en tiempo real
              </h3>
              <p className="text-[#66756F] mt-3">
                Resuelve tus dudas al instante.
              </p>
            </div>

            <div className="absolute right-0 top-48 bg-white rounded-[28px] border border-[#E5E7EB] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 w-56 z-20">
              <div className="w-14 h-14 rounded-2xl bg-[#F4FAF1] flex items-center justify-center mb-5">
                <Video className="text-[#57B33E]" />
              </div>
              <h3 className="font-black text-xl text-[#062B22]">
                Videollamadas seguras
              </h3>
              <p className="text-[#66756F] mt-3">
                Conéctate cara a cara cuando lo necesites.
              </p>
            </div>

            <div className="absolute left-16 bottom-28 bg-white rounded-[28px] border border-[#E5E7EB] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 w-56 z-20">
              <div className="w-14 h-14 rounded-2xl bg-[#F4FAF1] flex items-center justify-center mb-5">
                <ShieldCheck className="text-[#57B33E]" />
              </div>
              <h3 className="font-black text-xl text-[#062B22]">
                Especialistas verificados
              </h3>
              <p className="text-[#66756F] mt-3">
                Arquitectos e ingenieros profesionales.
              </p>
            </div>

            <div className="absolute right-12 bottom-20 bg-white rounded-[28px] border border-[#E5E7EB] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 w-56 z-20">
              <div className="w-14 h-14 rounded-2xl bg-[#F4FAF1] flex items-center justify-center mb-5">
                <ClipboardList className="text-[#57B33E]" />
              </div>
              <h3 className="font-black text-xl text-[#062B22]">
                Planos y presupuestos
              </h3>
              <p className="text-[#66756F] mt-3">
                Recibe soluciones claras y detalladas.
              </p>
            </div>

            {/* PHONE */}
            <div className="absolute left-1/2 -translate-x-1/2 top-16 z-10">
              <div className="relative bg-[#101010] rounded-[58px] p-3 shadow-[0_45px_100px_rgba(0,0,0,0.28)]">
                <div className="bg-white w-[360px] h-[700px] rounded-[48px] overflow-hidden relative border border-[#E5E7EB]">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-full" />

                  <div className="pt-16 px-7">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0D3B2E] to-[#7ED957]" />
                      <h2 className="text-2xl font-black text-[#062B22]">
                        TuArki
                      </h2>
                    </div>

                    <h3 className="text-3xl font-black text-[#062B22]">
                      Hola, Juan 👋
                    </h3>

                    <p className="text-[#6D7B75] mt-2">
                      ¿Qué proyecto tienes hoy?
                    </p>

                    <div className="bg-[#FAFAF8] rounded-3xl p-5 mt-8 border border-[#ECECEC] shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-[#062B22]">
                            Remodelación de baño
                          </p>
                          <p className="text-sm text-[#7A8982] mt-1">
                            Arq. Ana Torres
                          </p>
                        </div>

                        <div className="bg-[#FFF2C7] text-[#8B6A00] text-xs font-bold px-3 py-1 rounded-full">
                          En proceso
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <p className="font-black text-[#062B22] mb-5">
                        Acciones rápidas
                      </p>

                      <div className="grid grid-cols-4 gap-3">
                        {[MessageCircle, Video, FileText, ClipboardList].map(
                          (Icon, index) => (
                            <div
                              key={index}
                              className="aspect-square rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] flex items-center justify-center"
                            >
                              <Icon
                                size={22}
                                className="text-[#57B33E]"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="mt-10 bg-gradient-to-br from-[#062B22] to-[#0D3B2E] rounded-3xl p-6 text-white">
                      <p className="text-white/70">
                        ¿Necesitas ayuda inmediata?
                      </p>

                      <h3 className="text-2xl font-black mt-3 leading-snug">
                        Habla con un especialista ahora
                      </h3>

                      <button className="mt-6 bg-[#7ED957] text-[#062B22] px-5 py-3 rounded-full font-black">
                        Iniciar consulta
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 right-0 bg-white rounded-full border border-[#E5E7EB] shadow-lg px-5 py-3 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="w-10 h-10 rounded-full bg-[#D1D5DB] border-2 border-white"
                    />
                  ))}
                </div>

                <div>
                  <p className="text-xl font-black text-[#111]">
                    +120
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    especialistas activos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HOW EASY STRIP */}
        <div className="mt-16 bg-white rounded-[34px] border border-[#E5E7EB] shadow-sm p-8 grid grid-cols-1 lg:grid-cols-[260px_1fr_260px] gap-8 items-center">
          <div>
            <h2 className="text-3xl font-black text-[#111]">
              Así de fácil
              <br />
              funciona{" "}
              <span className="text-[#57B33E]">
                TuArki
              </span>
            </h2>
            <p className="text-[#6B7280] mt-4">
              En solo 3 pasos obtienes la ayuda que necesitas.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[
              {
                number: "1",
                icon: FileText,
                title: "Cuéntanos tu problema",
                text: "Describe lo que necesitas y sube fotos o videos.",
              },
              {
                number: "2",
                icon: Users,
                title: "Conectamos contigo",
                text: "Te asignamos al especialista ideal para tu caso.",
              },
              {
                number: "3",
                icon: Video,
                title: "Resuelve en minutos",
                text: "Habla por chat o videollamada y obtén soluciones claras.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="relative flex items-start gap-4"
                >
                  <div className="absolute -top-8 left-6 w-9 h-9 rounded-full bg-[#57B33E] text-white flex items-center justify-center font-black">
                    {item.number}
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-[#F4FAF1] flex items-center justify-center shrink-0">
                    <Icon className="text-[#57B33E]" />
                  </div>

                  <div>
                    <h3 className="font-black text-[#111]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#6B7280] mt-2">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border border-[#E5E7EB] rounded-[28px] p-6">
            <ShieldCheck
              size={42}
              className="text-[#57B33E] mb-4"
            />
            <h3 className="text-xl font-black text-[#111]">
              Tu proyecto está seguro
            </h3>
            <p className="text-[#6B7280] mt-2">
              Protegemos tu información y cada transacción.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}