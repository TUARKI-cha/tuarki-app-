export default function Services() {
    return (
      <section className="px-10 py-28">
  
        {/* HEADER */}
        <div className="mb-20">
  
          <p className="text-[#1E7A5A] font-medium mb-4">
            Servicios disponibles
          </p>
  
          <h2 className="text-5xl font-bold text-[#0D3B2E] max-w-3xl leading-tight">
            Todo lo que necesitas para resolver
            tus problemas de construcción.
          </h2>
  
        </div>
  
        {/* SERVICES GRID */}
        <div className="grid grid-cols-3 gap-8">
  
          {/* CARD 1 */}
          <div className="bg-white rounded-[35px] p-8 border border-[#EAEAEA] hover:shadow-xl transition-all duration-300">
  
            <div className="w-16 h-16 rounded-2xl bg-[#E6F4EC] flex items-center justify-center text-3xl mb-6">
              💬
            </div>
  
            <h3 className="text-2xl font-bold text-[#0D3B2E] mb-4">
              Chat inmediato
            </h3>
  
            <p className="text-[#4B6358] leading-relaxed">
              Resuelve dudas rápidas mediante conversación directa con especialistas.
            </p>
  
          </div>
  
          {/* CARD 2 */}
          <div className="bg-[#0D3B2E] rounded-[35px] p-8 text-white hover:shadow-xl transition-all duration-300">
  
            <div className="w-16 h-16 rounded-2xl bg-[#1E7A5A] flex items-center justify-center text-3xl mb-6">
              📹
            </div>
  
            <h3 className="text-2xl font-bold mb-4">
              Videollamada
            </h3>
  
            <p className="leading-relaxed opacity-90">
              Habla cara a cara con arquitectos e ingenieros para recibir orientación profesional.
            </p>
  
          </div>
  
          {/* CARD 3 */}
          <div className="bg-white rounded-[35px] p-8 border border-[#EAEAEA] hover:shadow-xl transition-all duration-300">
  
            <div className="w-16 h-16 rounded-2xl bg-[#E6F4EC] flex items-center justify-center text-3xl mb-6">
              📐
            </div>
  
            <h3 className="text-2xl font-bold text-[#0D3B2E] mb-4">
              Revisión de planos
            </h3>
  
            <p className="text-[#4B6358] leading-relaxed">
              Obtén observaciones y recomendaciones sobre tus proyectos o diseños.
            </p>
  
          </div>
  
          {/* CARD 4 */}
          <div className="bg-white rounded-[35px] p-8 border border-[#EAEAEA] hover:shadow-xl transition-all duration-300">
  
            <div className="w-16 h-16 rounded-2xl bg-[#E6F4EC] flex items-center justify-center text-3xl mb-6">
              💰
            </div>
  
            <h3 className="text-2xl font-bold text-[#0D3B2E] mb-4">
              Presupuestos
            </h3>
  
            <p className="text-[#4B6358] leading-relaxed">
              Analizamos costos y te ayudamos a evitar errores o gastos innecesarios.
            </p>
  
          </div>
  
          {/* CARD 5 */}
          <div className="bg-white rounded-[35px] p-8 border border-[#EAEAEA] hover:shadow-xl transition-all duration-300">
  
            <div className="w-16 h-16 rounded-2xl bg-[#E6F4EC] flex items-center justify-center text-3xl mb-6">
              🎥
            </div>
  
            <h3 className="text-2xl font-bold text-[#0D3B2E] mb-4">
              Fotos y video
            </h3>
  
            <p className="text-[#4B6358] leading-relaxed">
              Comparte evidencia visual para recibir ayuda mucho más precisa.
            </p>
  
          </div>
  
          {/* CARD 6 */}
          <div className="bg-[#7ED957] rounded-[35px] p-8 hover:shadow-xl transition-all duration-300">
  
            <p className="text-sm font-semibold text-[#0D3B2E] mb-4">
              Tiempo promedio de respuesta
            </p>
  
            <h3 className="text-6xl font-bold text-[#0D3B2E]">
              &lt; 3 min
            </h3>
  
            <p className="mt-6 text-[#0D3B2E] leading-relaxed">
              Nuestro objetivo es conectar usuarios con especialistas rápidamente.
            </p>
  
          </div>
  
        </div>
  
      </section>
    );
  }