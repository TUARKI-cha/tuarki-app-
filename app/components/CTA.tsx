export default function CTA() {
    return (
      <section className="px-10 py-28">
  
        <div className="bg-[#0D3B2E] rounded-[50px] p-20 relative overflow-hidden">
  
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7ED957] opacity-10 rounded-full blur-3xl"></div>
  
          <div className="relative z-10 max-w-4xl">
  
            <p className="text-[#7ED957] font-medium mb-6">
              TuArki • siempre acompañándote
            </p>
  
            <h2 className="text-6xl font-bold text-white leading-tight">
              Resolver problemas de construcción
              nunca había sido tan fácil.
            </h2>
  
            <p className="mt-8 text-xl text-gray-300 leading-relaxed max-w-2xl">
              Habla con arquitectos e ingenieros reales
              mediante chat, videollamada o revisión
              de proyectos en minutos.
            </p>
  
            <div className="flex gap-5 mt-12">
  
              <button className="bg-[#7ED957] text-[#0D3B2E] px-8 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300">
                Comenzar ahora
              </button>
  
              <button className="border border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#0D3B2E] transition-all duration-300">
                Conocer más
              </button>
  
            </div>
  
          </div>
  
        </div>
  
      </section>
    );
  }