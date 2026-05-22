import Link from "next/link";

export default function HowItWorks() {
  return (
    <section className="px-10 py-36 bg-white">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto text-center mb-24">

        <p className="text-[#1E7A5A] font-semibold tracking-[0.2em] uppercase mb-6">
          Cómo funciona
        </p>

        <h2 className="text-6xl leading-[1.1] font-bold text-[#0D3B2E]">

          Obtén ayuda profesional
          <span className="text-[#7ED957]"> en minutos.</span>

        </h2>

        <p className="mt-8 text-xl text-[#4B6358] leading-relaxed max-w-3xl mx-auto">
          Arquitectos e ingenieros listos para ayudarte
          mediante chat, videollamada, revisión de planos
          y análisis de problemas reales de construcción.
        </p>

      </div>

      {/* STEPS */}
      <div className="grid grid-cols-3 gap-8 max-w-7xl mx-auto">

        {/* STEP 1 */}
        <div className="bg-[#F8F8F6] rounded-[40px] p-10 border border-[#ECECEC] hover:shadow-2xl transition-all duration-500">

          <div className="w-20 h-20 rounded-[28px] bg-[#E6F4EC] flex items-center justify-center text-4xl mb-10">
            📝
          </div>

          <p className="text-[#1E7A5A] font-semibold mb-4">
            Paso 01
          </p>

          <h3 className="text-3xl font-bold text-[#0D3B2E] mb-6 leading-tight">
            Cuéntanos tu problema
          </h3>

          <p className="text-[#4B6358] text-lg leading-relaxed mb-10">
            Describe tu situación, agrega fotografías,
            videos o planos y recibe orientación profesional.
          </p>

          <Link href="/nueva-consulta">

            <button className="bg-[#0D3B2E] text-white px-7 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300">
              Comenzar consulta
            </button>

          </Link>

        </div>

        {/* STEP 2 */}
        <div className="bg-[#0D3B2E] rounded-[40px] p-10 text-white relative overflow-hidden hover:shadow-2xl transition-all duration-500">

          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E7A5A]/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">

            <div className="w-20 h-20 rounded-[28px] bg-[#163E31] flex items-center justify-center text-4xl mb-10">
              👷
            </div>

            <p className="text-[#7ED957] font-semibold mb-4">
              Paso 02
            </p>

            <h3 className="text-3xl font-bold mb-6 leading-tight">
              Conectamos tu caso
            </h3>

            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              Un arquitecto o ingeniero revisará tu consulta
              y te ayudará en tiempo real.
            </p>

            <div className="bg-[#163E31] rounded-3xl p-6">

              <p className="text-sm text-[#7ED957] mb-2">
                Tiempo promedio
              </p>

              <h4 className="text-4xl font-bold">
                5 min
              </h4>

            </div>

          </div>

        </div>

        {/* STEP 3 */}
        <div className="bg-[#F8F8F6] rounded-[40px] p-10 border border-[#ECECEC] hover:shadow-2xl transition-all duration-500">

          <div className="w-20 h-20 rounded-[28px] bg-[#E6F4EC] flex items-center justify-center text-4xl mb-10">
            ✅
          </div>

          <p className="text-[#1E7A5A] font-semibold mb-4">
            Paso 03
          </p>

          <h3 className="text-3xl font-bold text-[#0D3B2E] mb-6 leading-tight">
            Resuelve rápidamente
          </h3>

          <p className="text-[#4B6358] text-lg leading-relaxed mb-10">
            Obtén soluciones claras mediante chat,
            videollamada o revisión técnica profesional.
          </p>

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-[#0D3B2E]"></div>

            <div>
              <p className="font-bold text-[#0D3B2E]">
                +120 especialistas
              </p>

              <p className="text-[#4B6358]">
                disponibles ahora
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}