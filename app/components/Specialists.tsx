export default function Specialists() {
    return (
      <section className="px-10 py-28 bg-white">
  
        {/* HEADER */}
        <div className="flex items-end justify-between mb-20">
  
          <div>
  
            <p className="text-[#1E7A5A] font-medium mb-4">
              Especialistas TuArki
            </p>
  
            <h2 className="text-5xl font-bold text-[#0D3B2E] max-w-3xl leading-tight">
              Profesionales listos para ayudarte
              en cada etapa de tu proyecto.
            </h2>
  
          </div>
  
          <button className="border border-[#0D3B2E] px-6 py-3 rounded-full font-semibold hover:bg-[#0D3B2E] hover:text-white transition-all duration-300">
            Ver todos
          </button>
  
        </div>
  
        {/* CARDS */}
        <div className="grid grid-cols-3 gap-8">
  
          {/* CARD 1 */}
          <div className="bg-[#F5F5F3] rounded-[35px] p-8 hover:shadow-xl transition-all duration-300">
  
            <div className="w-24 h-24 rounded-full bg-[#D9D9D9] mb-6"></div>
  
            <div className="flex items-center justify-between mb-4">
  
              <div>
                <h3 className="text-2xl font-bold text-[#0D3B2E]">
                  Arq. María López
                </h3>
  
                <p className="text-[#1E7A5A]">
                  Arquitecta especialista
                </p>
              </div>
  
              <div className="w-4 h-4 rounded-full bg-[#7ED957]"></div>
  
            </div>
  
            <p className="text-[#4B6358] leading-relaxed mb-6">
              Especialista en remodelaciones, diseño residencial
              y soluciones rápidas de obra.
            </p>
  
            <div className="flex items-center justify-between">
  
              <p className="font-semibold text-[#0D3B2E]">
                4.9 ⭐
              </p>
  
              <p className="text-sm text-[#4B6358]">
                Disponible ahora
              </p>
  
            </div>
  
          </div>
  
          {/* CARD 2 */}
          <div className="bg-[#0D3B2E] rounded-[35px] p-8 text-white hover:shadow-xl transition-all duration-300">
  
            <div className="w-24 h-24 rounded-full bg-[#1E7A5A] mb-6"></div>
  
            <div className="flex items-center justify-between mb-4">
  
              <div>
                <h3 className="text-2xl font-bold">
                  Ing. Carlos Méndez
                </h3>
  
                <p className="text-[#7ED957]">
                  Ingeniero estructural
                </p>
              </div>
  
              <div className="w-4 h-4 rounded-full bg-[#7ED957]"></div>
  
            </div>
  
            <p className="leading-relaxed opacity-90 mb-6">
              Experto en estructuras, supervisión de obra
              y evaluación de riesgos.
            </p>
  
            <div className="flex items-center justify-between">
  
              <p className="font-semibold">
                5.0 ⭐
              </p>
  
              <p className="text-sm opacity-80">
                Disponible ahora
              </p>
  
            </div>
  
          </div>
  
          {/* CARD 3 */}
          <div className="bg-[#F5F5F3] rounded-[35px] p-8 hover:shadow-xl transition-all duration-300">
  
            <div className="w-24 h-24 rounded-full bg-[#D9D9D9] mb-6"></div>
  
            <div className="flex items-center justify-between mb-4">
  
              <div>
                <h3 className="text-2xl font-bold text-[#0D3B2E]">
                  Arq. Sofía Ramírez
                </h3>
  
                <p className="text-[#1E7A5A]">
                  Diseño interior y acabados
                </p>
              </div>
  
              <div className="w-4 h-4 rounded-full bg-[#7ED957]"></div>
  
            </div>
  
            <p className="text-[#4B6358] leading-relaxed mb-6">
              Ayuda profesional en distribución de espacios,
              acabados y optimización visual.
            </p>
  
            <div className="flex items-center justify-between">
  
              <p className="font-semibold text-[#0D3B2E]">
                4.8 ⭐
              </p>
  
              <p className="text-sm text-[#4B6358]">
                Disponible ahora
              </p>
  
            </div>
  
          </div>
  
        </div>
  
      </section>
    );
  }