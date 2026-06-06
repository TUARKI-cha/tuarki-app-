import {
    Settings,
    MessageCircle,
    Video,
    FileText,
    Clock,
    Percent,
    Mail,
    Phone,
    Bell,
    Save,
  } from "lucide-react";
  
  export default function AdminConfiguracionPage() {
    return (
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-black text-[#0D3B2E]">
            Configuración
          </h1>
  
          <p className="text-gray-500 mt-1">
            Configura parámetros generales de operación de TuArki.
          </p>
        </div>
  
        {/* Servicios */}
  
        <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <Settings className="text-[#1E7A5A]" />
            <h2 className="text-xl font-black text-[#0D3B2E]">
              Servicios
            </h2>
          </div>
  
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-bold text-[#0D3B2E] flex items-center gap-2">
                <MessageCircle size={16} />
                Precio Chat
              </label>
  
              <input
                defaultValue="200"
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#F5F5F3] p-3"
              />
            </div>
  
            <div>
              <label className="text-sm font-bold text-[#0D3B2E] flex items-center gap-2">
                <Video size={16} />
                Precio Videollamada
              </label>
  
              <input
                defaultValue="250"
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#F5F5F3] p-3"
              />
            </div>
  
            <div>
              <label className="text-sm font-bold text-[#0D3B2E] flex items-center gap-2">
                <FileText size={16} />
                Precio Revisión
              </label>
  
              <input
                defaultValue="500"
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#F5F5F3] p-3"
              />
            </div>
          </div>
        </div>
  
        {/* Operación */}
  
        <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
          <h2 className="text-xl font-black text-[#0D3B2E] mb-8">
            Operación
          </h2>
  
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-bold text-[#0D3B2E] flex items-center gap-2">
                <Clock size={16} />
                Tiempo máximo asignación (min)
              </label>
  
              <input
                defaultValue="3"
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#F5F5F3] p-3"
              />
            </div>
  
            <div>
              <label className="text-sm font-bold text-[#0D3B2E] flex items-center gap-2">
                <Clock size={16} />
                Duración videollamada (min)
              </label>
  
              <input
                defaultValue="15"
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#F5F5F3] p-3"
              />
            </div>
  
            <div>
              <label className="text-sm font-bold text-[#0D3B2E] flex items-center gap-2">
                <Percent size={16} />
                Comisión TuArki
              </label>
  
              <input
                defaultValue="50"
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#F5F5F3] p-3"
              />
            </div>
          </div>
        </div>
  
        {/* Soporte */}
  
        <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
          <h2 className="text-xl font-black text-[#0D3B2E] mb-8">
            Soporte
          </h2>
  
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-[#0D3B2E] flex items-center gap-2">
                <Mail size={16} />
                Correo de soporte
              </label>
  
              <input
                defaultValue="soporte@tuarki.com"
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#F5F5F3] p-3"
              />
            </div>
  
            <div>
              <label className="text-sm font-bold text-[#0D3B2E] flex items-center gap-2">
                <Phone size={16} />
                WhatsApp soporte
              </label>
  
              <input
                defaultValue="+52 442 000 0000"
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#F5F5F3] p-3"
              />
            </div>
          </div>
        </div>
  
        {/* Plataforma */}
  
        <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
          <h2 className="text-xl font-black text-[#0D3B2E] mb-8">
            Plataforma
          </h2>
  
          <div className="space-y-5">
            <div className="flex items-center justify-between border border-black/5 rounded-2xl p-4">
              <div>
                <p className="font-bold text-[#0D3B2E]">
                  Notificaciones activas
                </p>
  
                <p className="text-sm text-gray-500">
                  Permite alertas administrativas.
                </p>
              </div>
  
              <Bell className="text-[#1E7A5A]" />
            </div>
  
            <div className="flex items-center justify-between border border-black/5 rounded-2xl p-4">
              <div>
                <p className="font-bold text-[#0D3B2E]">
                  Modo mantenimiento
                </p>
  
                <p className="text-sm text-gray-500">
                  Desactiva temporalmente la plataforma.
                </p>
              </div>
  
              <div className="w-12 h-6 rounded-full bg-gray-300" />
            </div>
          </div>
        </div>
  
        <div className="flex justify-end">
          <button className="bg-[#0D3B2E] hover:bg-[#1E7A5A] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition">
            <Save size={18} />
            Guardar configuración
          </button>
        </div>
      </div>
    );
  }