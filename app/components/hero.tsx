import Link from "next/link";

export default function Hero() {
    return (
      <section className="px-10 pt-20">
  
        <div className="grid grid-cols-2 items-center gap-10">
  
          {/* LEFT */}
          <div>
  
            <p className="text-[#1E7A5A] font-medium mb-4">
              Expertos en construcción, siempre contigo
            </p>
  
            <h1 className="text-7xl font-bold leading-tight text-[#0D3B2E]">
              Tuarki <br />
              siempre <span className="text-[#7ED957]">contigo.</span>
            </h1>
  
            <p className="mt-8 text-lg text-[#4B6358] max-w-xl leading-relaxed">
              Conectamos personas con arquitectos e ingenieros
              para resolver problemas de construcción de manera
              rápida, clara y profesional.
            </p>
  
            <div className="flex gap-5 mt-10">
  
            <Link href="/login">

<button className="bg-[#7ED957] px-8 py-4 rounded-full font-bold text-[#0D3B2E] hover:scale-105 transition-all duration-300">
  Comenzar consulta
</button>

</Link>
  
              <button className="border border-[#0D3B2E] px-8 py-4 rounded-full font-semibold hover:bg-[#0D3B2E] hover:text-white transition-all duration-300">
                Cómo funciona
              </button>
  
            </div>
  
          </div>
  
          {/* RIGHT */}
          <div className="flex justify-center">
  
            <div className="w-[380px] h-[760px] bg-white rounded-[45px] shadow-2xl border border-gray-200 p-5">
  
              {/* PHONE TOP */}
              <div className="w-32 h-7 bg-black rounded-full mx-auto mb-8"></div>
  
              {/* APP CONTENT */}
              <div className="space-y-5">
  
                <div>
                  <h2 className="text-2xl font-bold text-[#0D3B2E]">
                    Hola, Juan 👋
                  </h2>
  
                  <p className="text-sm text-gray-500">
                    ¿Qué proyecto tienes hoy?
                  </p>
                </div>
  
                {/* CARD */}
                <div className="bg-[#0D3B2E] rounded-3xl p-6 text-white">
  
                  <p className="text-sm opacity-80">
                    ¿Necesitas ayuda inmediata?
                  </p>
  
                  <h3 className="text-2xl font-bold mt-2">
                    Habla con un especialista ahora
                  </h3>
  
                  <button className="mt-5 bg-[#7ED957] text-[#0D3B2E] px-5 py-3 rounded-full font-bold">
                    Iniciar consulta
                  </button>
  
                </div>
  
                {/* QUICK ACTIONS */}
                <div>
  
                  <p className="font-semibold text-[#0D3B2E] mb-4">
                    Acciones rápidas
                  </p>
  
                  <div className="grid grid-cols-2 gap-4">
  
                    <div className="bg-[#E6F4EC] rounded-2xl p-5">
                      <p className="font-semibold text-[#0D3B2E]">
                        Videollamada
                      </p>
                    </div>
  
                    <div className="bg-[#E6F4EC] rounded-2xl p-5">
                      <p className="font-semibold text-[#0D3B2E]">
                        Subir video
                      </p>
                    </div>
  
                    <div className="bg-[#E6F4EC] rounded-2xl p-5">
                      <p className="font-semibold text-[#0D3B2E]">
                        Planos
                      </p>
                    </div>
  
                    <div className="bg-[#E6F4EC] rounded-2xl p-5">
                      <p className="font-semibold text-[#0D3B2E]">
                        Presupuesto
                      </p>
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