import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F5F5F3]">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#7ED957]/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 lg:pt-20 pb-24">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div className="relative z-10">

            {/* BADGE */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#DCE8E1] bg-white shadow-sm mb-8">

              <div className="w-2 h-2 bg-[#7ED957] rounded-full"></div>

              <p className="text-sm font-medium text-[#0D3B2E]">
                Expertos en construcción, siempre contigo
              </p>

            </div>

            {/* TITLE */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.95] tracking-[-3px] text-[#062B22]">

              Tu arki
              <br />

              siempre{" "}

              <span className="text-[#6FD14B]">
                contigo.
              </span>

            </h1>

            {/* DESCRIPTION */}
            <p className="mt-8 text-lg lg:text-xl text-[#5E6E67] leading-relaxed max-w-2xl">

              Conectamos personas como tú con arquitectos e ingenieros
              verificados para resolver problemas de construcción
              de forma rápida, clara y confiable.

            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-5 mt-10">

              <Link href="/nueva-consulta">

                <button className="group bg-[#7ED957] hover:bg-[#71C94B] transition-all duration-300 px-8 py-5 rounded-full font-bold text-[#062B22] text-lg shadow-lg shadow-[#7ED957]/30 flex items-center justify-center gap-3">

                  💬 Cuéntanos tu problema

                  <span className="group-hover:translate-x-1 transition-all">
                    →
                  </span>

                </button>

              </Link>

              <button className="border border-[#D8E2DC] bg-white hover:bg-[#062B22] hover:text-white transition-all duration-300 px-8 py-5 rounded-full font-semibold text-lg text-[#062B22]">

                ▶ Cómo funciona

              </button>

            </div>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-8 mt-14 text-sm text-[#4D5B56]">

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-[#7ED957] flex items-center justify-center text-[#7ED957] text-xs">
                  ✓
                </div>
                Respuesta en minutos
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-[#7ED957] flex items-center justify-center text-[#7ED957] text-xs">
                  ✓
                </div>
                Especialistas verificados
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-[#7ED957] flex items-center justify-center text-[#7ED957] text-xs">
                  ✓
                </div>
                Pago seguro
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-[#7ED957] flex items-center justify-center text-[#7ED957] text-xs">
                  ✓
                </div>
                Atención humana
              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center lg:justify-end">

            {/* FLOATING CARD 1 */}
            <div className="hidden lg:block absolute left-0 top-28 bg-white rounded-3xl shadow-xl border border-[#E8ECE9] p-6 w-56 z-20">

              <div className="text-4xl mb-4">
                💬
              </div>

              <h3 className="font-bold text-xl text-[#062B22]">
                Chat en tiempo real
              </h3>

              <p className="text-[#66756F] mt-3">
                Resuelve tus dudas al instante.
              </p>

            </div>

            {/* FLOATING CARD 2 */}
            <div className="hidden lg:block absolute right-0 top-52 bg-white rounded-3xl shadow-xl border border-[#E8ECE9] p-6 w-56 z-20">

              <div className="text-4xl mb-4">
                📹
              </div>

              <h3 className="font-bold text-xl text-[#062B22]">
                Videollamadas
              </h3>

              <p className="text-[#66756F] mt-3">
                Conéctate cara a cara cuando lo necesites.
              </p>

            </div>

            {/* PHONE */}
            <div className="relative z-10 bg-black rounded-[55px] p-3 shadow-[0_40px_100px_rgba(0,0,0,0.25)]">

              <div className="bg-white w-[320px] h-[650px] rounded-[45px] overflow-hidden relative">

                {/* TOP */}
                <div className="pt-6 px-6">

                  <div className="w-32 h-7 bg-black rounded-full mx-auto mb-6"></div>

                  <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0D3B2E] to-[#7ED957]"></div>

                    <div>

                      <h2 className="font-bold text-3xl text-[#062B22]">
                        TuArki
                      </h2>

                      <p className="text-sm text-[#7B8B84]">
                        siempre acompañándote
                      </p>

                    </div>

                  </div>

                </div>

                {/* CONTENT */}
                <div className="px-6 mt-8">

                  <h3 className="text-3xl font-bold text-[#062B22]">
                    Hola, Juan 👋
                  </h3>

                  <p className="text-[#6D7B75] mt-2">
                    ¿Qué proyecto tienes hoy?
                  </p>

                  {/* PROJECT CARD */}
                  <div className="bg-[#F8F8F8] rounded-3xl p-5 mt-8 border border-[#ECECEC]">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="font-semibold text-[#062B22]">
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

                  {/* QUICK ACTIONS */}
                  <div className="mt-8">

                    <p className="font-bold text-[#062B22] mb-5">
                      Acciones rápidas
                    </p>

                    <div className="grid grid-cols-4 gap-3">

                      {[
                        "💬",
                        "📹",
                        "📄",
                        "📋",
                      ].map((icon, index) => (

                        <div
                          key={index}
                          className="aspect-square rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] flex items-center justify-center text-2xl"
                        >
                          {icon}
                        </div>

                      ))}

                    </div>

                  </div>

                  {/* CTA */}
                  <div className="mt-10 bg-gradient-to-br from-[#062B22] to-[#0D3B2E] rounded-3xl p-6 text-white">

                    <p className="text-white/70">
                      ¿Necesitas ayuda inmediata?
                    </p>

                    <h3 className="text-2xl font-bold mt-3 leading-snug">
                      Habla con un especialista ahora
                    </h3>

                    <button className="mt-6 bg-[#7ED957] text-[#062B22] px-5 py-3 rounded-full font-bold">
                      Iniciar consulta
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}