export default function HowItWorks() {
    return (
      <section className="px-10 py-28">
  
        {/* TITLE */}
        <div className="text-center mb-20">
  
          <p className="text-[#1E7A5A] font-medium mb-4">
            Así de fácil funciona TuArki
          </p>
  
          <h2 className="text-5xl font-bold text-[#0D3B2E]">
            Resuelve tus dudas de construcción
            <span className="text-[#7ED957]"> sin complicaciones.</span>
          </h2>
  
        </div>
  
        {/* STEPS */}
        <div className="grid grid-cols-3 gap-8">
  
          {/* STEP 1 */}
          <div className="bg-white rounded-[35px] p-10 shadow-sm border border-[#E8E8E8]">
  
            <div className="w-16 h-16 rounded-2xl bg-[#E6F4EC] flex items-center justify-center text-3xl mb-8">
              📝
            </div>
  
            <p className="text-sm text-[#1E7A5A] font-semibold mb-3">
              Paso 1
            </p>
  
            <h3 className="text-2xl font-bold text-[#0D3B2E] mb-5">
              Cuéntanos tu problema
            </h3>
  
            <p className="text-[#4B6358] leading-relaxed">
              Describe lo que necesitas y sube fotos o videos
              para entender mejor tu situación.
            </p>
  
          </div>
  
          {/* STEP 2 */}
          <div className="bg-white rounded-[35px] p-10 shadow-sm border border-[#E8E8E8]">
  
            <div className="w-16 h-16 rounded-2xl bg-[#E6F4EC] flex items-center justify-center text-3xl mb-8">
              👷
            </div>
  
            <p className="text-sm text-[#1E7A5A] font-semibold mb-3">
              Paso 2
            </p>
  
            <h3 className="text-2xl font-bold text-[#0D3B2E] mb-5">
              Te conectamos
            </h3>
  
            <p className="text-[#4B6358] leading-relaxed">
              Un arquitecto o ingeniero especializado
              revisará tu caso y te apoyará personalmente.
            </p>
  
          </div>
  
          {/* STEP 3 */}
          <div className="bg-white rounded-[35px] p-10 shadow-sm border border-[#E8E8E8]">
  
            <div className="w-16 h-16 rounded-2xl bg-[#E6F4EC] flex items-center justify-center text-3xl mb-8">
              ✅
            </div>
  
            <p className="text-sm text-[#1E7A5A] font-semibold mb-3">
              Paso 3
            </p>
  
            <h3 className="text-2xl font-bold text-[#0D3B2E] mb-5">
              Resuelve en minutos
            </h3>
  
            <p className="text-[#4B6358] leading-relaxed">
              Obtén orientación clara mediante chat,
              videollamada, planos o presupuesto.
            </p>
  
          </div>
  
        </div>
  
      </section>
    );
  }