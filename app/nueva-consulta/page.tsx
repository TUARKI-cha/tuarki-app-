"use client";

export default function NuevaConsultaPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F3] p-10">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-12">

        <div>

          <p className="text-[#1E7A5A] font-medium mb-2">
            Nueva consulta
          </p>

          <h1 className="text-5xl font-bold text-[#0D3B2E]">
            Cuéntanos tu problema
          </h1>

        </div>

        <button className="border border-[#0D3B2E] px-6 py-4 rounded-2xl font-semibold hover:bg-[#0D3B2E] hover:text-white transition-all duration-300">
          Guardar borrador
        </button>

      </div>

      {/* FORM CONTAINER */}
      <div className="grid grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="col-span-2 bg-white rounded-[35px] p-10">

          <form className="space-y-8">

            {/* TITLE */}
            <div>

              <label className="block mb-3 text-[#0D3B2E] font-semibold">
                Título del problema
              </label>

              <input
                type="text"
                placeholder="Ej. Grieta en muro de carga"
                className="w-full px-5 py-4 rounded-2xl border border-[#DADADA] focus:outline-none focus:border-[#1E7A5A]"
              />

            </div>

            {/* CATEGORY */}
            <div>

              <label className="block mb-3 text-[#0D3B2E] font-semibold">
                Tipo de ayuda
              </label>

              <select className="w-full px-5 py-4 rounded-2xl border border-[#DADADA] focus:outline-none focus:border-[#1E7A5A]">

                <option>Revisión estructural</option>

                <option>Diseño arquitectónico</option>

                <option>Presupuesto</option>

                <option>Instalaciones</option>

                <option>Videollamada</option>

              </select>

            </div>

            {/* DESCRIPTION */}
            <div>

              <label className="block mb-3 text-[#0D3B2E] font-semibold">
                Explica el problema
              </label>

              <textarea
                rows={8}
                placeholder="Describe lo que sucede..."
                className="w-full px-5 py-4 rounded-2xl border border-[#DADADA] focus:outline-none focus:border-[#1E7A5A]"
              ></textarea>

            </div>

            {/* FILES */}
            <div>

              <label className="block mb-3 text-[#0D3B2E] font-semibold">
                Fotos y videos
              </label>

              <div className="border-2 border-dashed border-[#CFCFCF] rounded-[30px] p-12 text-center">

                <div className="w-20 h-20 rounded-full bg-[#E6F4EC] flex items-center justify-center mx-auto mb-6 text-4xl">
                  📁
                </div>

                <h3 className="text-2xl font-bold text-[#0D3B2E] mb-3">
                  Sube evidencia visual
                </h3>

                <p className="text-[#4B6358] mb-6">
                  Arrastra imágenes o videos aquí
                </p>

                <button
                  type="button"
                  className="bg-[#7ED957] px-6 py-4 rounded-2xl font-bold text-[#0D3B2E]"
                >
                  Seleccionar archivos
                </button>

              </div>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#0D3B2E] text-white py-5 rounded-2xl text-lg font-bold hover:scale-[1.01] transition-all duration-300"
            >
              Enviar consulta
            </button>

          </form>

        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">

          {/* HELP */}
          <div className="bg-[#0D3B2E] rounded-[35px] p-8 text-white">

            <p className="text-[#7ED957] font-medium mb-4">
              Consejo TuArki
            </p>

            <h3 className="text-3xl font-bold leading-tight mb-6">
              Entre más detalles compartas,
              mejor será la ayuda.
            </h3>

            <p className="text-gray-300 leading-relaxed">
              Fotos claras, videos y explicaciones
              ayudan a los especialistas a entender
              el problema rápidamente.
            </p>

          </div>

          {/* STATUS */}
          <div className="bg-white rounded-[35px] p-8">

            <h3 className="text-2xl font-bold text-[#0D3B2E] mb-6">
              Tiempo estimado
            </h3>

            <div className="space-y-5">

              <div className="flex items-center justify-between">

                <p className="text-[#4B6358]">
                  Chat
                </p>

                <p className="font-bold text-[#0D3B2E]">
                  2 min
                </p>

              </div>

              <div className="flex items-center justify-between">

                <p className="text-[#4B6358]">
                  Revisión
                </p>

                <p className="font-bold text-[#0D3B2E]">
                  15 min
                </p>

              </div>

              <div className="flex items-center justify-between">

                <p className="text-[#4B6358]">
                  Videollamada
                </p>

                <p className="font-bold text-[#0D3B2E]">
                  5 min
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}