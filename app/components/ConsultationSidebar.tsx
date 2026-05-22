interface Props {
    consultationId: number;
    service?: string;
    specialist?: string;
    status?: string;
  }
  
  export default function ConsultationSidebar({
    consultationId,
    service = "Consulta profesional",
    specialist = "Arq. Carlos Mendoza",
    status = "En proceso",
  }: Props) {
  
    return (
  
      <aside className="w-[380px] bg-white border-r border-[#ECECEC] flex flex-col justify-between">
  
        {/* TOP */}
        <div>
  
          {/* HEADER */}
          <div className="p-8 border-b border-[#ECECEC]">
  
            <p className="text-[#57B33E] font-semibold mb-3">
              Consulta activa
            </p>
  
            <h2 className="text-4xl font-bold text-[#0D3B2E] mb-3">
              #{consultationId}
            </h2>
  
            <div className="inline-flex items-center gap-2 bg-[#F3FFEE] text-[#57B33E] px-4 py-2 rounded-full text-sm font-semibold">
              ● {status}
            </div>
  
          </div>
  
          {/* SPECIALIST */}
          <div className="p-8 border-b border-[#ECECEC]">
  
            <p className="text-sm text-[#7A7A7A] mb-4">
              Especialista asignado
            </p>
  
            <div className="flex items-center gap-5">
  
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0D3B2E] to-[#57B33E]" />
  
              <div>
  
                <h3 className="text-xl font-bold text-[#0D3B2E]">
                  {specialist}
                </h3>
  
                <p className="text-[#57B33E] font-medium">
                  En línea
                </p>
  
              </div>
  
            </div>
  
          </div>
  
          {/* SERVICE */}
          <div className="p-8 border-b border-[#ECECEC]">
  
            <p className="text-sm text-[#7A7A7A] mb-4">
              Servicio contratado
            </p>
  
            <div className="bg-[#F8F8F8] rounded-3xl p-6">
  
              <h3 className="text-2xl font-bold text-[#0D3B2E] mb-3">
                {service}
              </h3>
  
              <p className="text-[#5B6B63] leading-relaxed">
                Atención profesional personalizada
                para resolver tu problema.
              </p>
  
            </div>
  
          </div>
  
          {/* TIMELINE */}
          <div className="p-8">
  
            <h3 className="text-2xl font-bold text-[#0D3B2E] mb-8">
              Progreso
            </h3>
  
            <div className="space-y-8">
  
              {/* STEP */}
              <div className="flex gap-5">
  
                <div className="flex flex-col items-center">
  
                  <div className="w-6 h-6 rounded-full bg-[#57B33E]" />
  
                  <div className="w-[2px] h-16 bg-[#DADADA]" />
  
                </div>
  
                <div>
  
                  <h4 className="font-bold text-[#0D3B2E] mb-2">
                    Consulta creada
                  </h4>
  
                  <p className="text-[#5B6B63]">
                    Tu solicitud fue recibida.
                  </p>
  
                </div>
  
              </div>
  
              {/* STEP */}
              <div className="flex gap-5">
  
                <div className="flex flex-col items-center">
  
                  <div className="w-6 h-6 rounded-full bg-[#57B33E]" />
  
                  <div className="w-[2px] h-16 bg-[#DADADA]" />
  
                </div>
  
                <div>
  
                  <h4 className="font-bold text-[#0D3B2E] mb-2">
                    Pago confirmado
                  </h4>
  
                  <p className="text-[#5B6B63]">
                    El servicio está activo.
                  </p>
  
                </div>
  
              </div>
  
              {/* STEP */}
              <div className="flex gap-5">
  
                <div className="flex flex-col items-center">
  
                  <div className="w-6 h-6 rounded-full bg-[#57B33E]" />
  
                </div>
  
                <div>
  
                  <h4 className="font-bold text-[#0D3B2E] mb-2">
                    Atención en proceso
                  </h4>
  
                  <p className="text-[#5B6B63]">
                    El especialista está trabajando.
                  </p>
  
                </div>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
  
        {/* BOTTOM */}
        <div className="p-8 border-t border-[#ECECEC]">
  
          <div className="bg-gradient-to-br from-[#0D3B2E] to-[#145C44] rounded-[30px] p-6 text-white">
  
            <p className="text-[#7ED957] font-semibold mb-3">
              TuArki Support
            </p>
  
            <p className="text-gray-300 leading-relaxed">
              Si necesitas ayuda adicional,
              nuestro equipo puede apoyarte.
            </p>
  
          </div>
  
        </div>
  
      </aside>
  
    );
  
  }