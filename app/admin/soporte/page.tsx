import {
    Search,
    Headphones,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Eye,
    MessageSquare,
  } from "lucide-react";
  
  export default function AdminSoportePage() {
    const resumen = [
      {
        title: "Tickets abiertos",
        value: "14",
        icon: Headphones,
      },
      {
        title: "En proceso",
        value: "8",
        icon: Clock,
      },
      {
        title: "Resueltos hoy",
        value: "22",
        icon: CheckCircle2,
      },
      {
        title: "Alta prioridad",
        value: "3",
        icon: AlertTriangle,
      },
    ];
  
    const tickets = [
      {
        id: "SUP-001",
        usuario: "María López",
        motivo: "Problema con pago",
        estado: "Abierto",
        prioridad: "Alta",
        fecha: "Hoy 10:35",
      },
      {
        id: "SUP-002",
        usuario: "Carlos Rivera",
        motivo: "No conecta videollamada",
        estado: "En proceso",
        prioridad: "Media",
        fecha: "Hoy 09:50",
      },
      {
        id: "SUP-003",
        usuario: "Ana Torres",
        motivo: "Solicitud de reembolso",
        estado: "Abierto",
        prioridad: "Alta",
        fecha: "Ayer",
      },
      {
        id: "SUP-004",
        usuario: "Luis Fernández",
        motivo: "Duda sobre consulta",
        estado: "Resuelto",
        prioridad: "Baja",
        fecha: "Ayer",
      },
    ];
  
    const estadoClass = (estado: string) => {
      if (estado === "Abierto")
        return "bg-red-100 text-red-600";
  
      if (estado === "En proceso")
        return "bg-yellow-100 text-yellow-700";
  
      return "bg-[#7ED957]/20 text-[#1E7A5A]";
    };
  
    const prioridadClass = (prioridad: string) => {
      if (prioridad === "Alta")
        return "bg-red-100 text-red-600";
  
      if (prioridad === "Media")
        return "bg-yellow-100 text-yellow-700";
  
      return "bg-gray-100 text-gray-600";
    };
  
    return (
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-black text-[#0D3B2E]">
            Soporte
          </h1>
  
          <p className="text-gray-500 mt-1">
            Gestiona incidencias, pagos, reembolsos y solicitudes de usuarios.
          </p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {resumen.map((item) => {
            const Icon = item.icon;
  
            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#7ED957]/20 flex items-center justify-center">
                  <Icon className="text-[#1E7A5A]" size={24} />
                </div>
  
                <div className="mt-6">
                  <p className="text-sm text-gray-500">{item.title}</p>
  
                  <h2 className="text-3xl font-black text-[#0D3B2E] mt-1">
                    {item.value}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
  
        <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
          <div className="flex flex-col gap-5">
            <div className="relative max-w-md">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
  
              <input
                type="text"
                placeholder="Buscar ticket..."
                className="w-full rounded-2xl border border-black/10 bg-[#F5F5F3] py-3 pl-12 pr-4 outline-none focus:border-[#7ED957]"
              />
            </div>
  
            <div className="flex flex-wrap gap-3">
              {[
                "Todos",
                "Abiertos",
                "En proceso",
                "Resueltos",
                "Alta prioridad",
              ].map((filtro) => (
                <button
                  key={filtro}
                  className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                    filtro === "Todos"
                      ? "bg-[#0D3B2E] text-white"
                      : "bg-[#F5F5F3] text-[#0D3B2E] hover:bg-[#7ED957]/20"
                  }`}
                >
                  {filtro}
                </button>
              ))}
            </div>
          </div>
  
          <div className="mt-8 overflow-hidden rounded-2xl border border-black/5">
            <table className="w-full text-left">
              <thead className="bg-[#F5F5F3] text-[#0D3B2E]">
                <tr>
                  <th className="p-4 text-sm">ID</th>
                  <th className="p-4 text-sm">Usuario</th>
                  <th className="p-4 text-sm">Motivo</th>
                  <th className="p-4 text-sm">Estado</th>
                  <th className="p-4 text-sm">Prioridad</th>
                  <th className="p-4 text-sm">Fecha</th>
                  <th className="p-4 text-sm text-right">Acciones</th>
                </tr>
              </thead>
  
              <tbody>
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-t border-black/5 hover:bg-[#F5F5F3]"
                  >
                    <td className="p-4 font-black">
                      {ticket.id}
                    </td>
  
                    <td className="p-4">
                      {ticket.usuario}
                    </td>
  
                    <td className="p-4">
                      {ticket.motivo}
                    </td>
  
                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${estadoClass(
                          ticket.estado
                        )}`}
                      >
                        {ticket.estado}
                      </span>
                    </td>
  
                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${prioridadClass(
                          ticket.prioridad
                        )}`}
                      >
                        {ticket.prioridad}
                      </span>
                    </td>
  
                    <td className="p-4">
                      {ticket.fecha}
                    </td>
  
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button className="w-9 h-9 rounded-xl bg-[#F5F5F3] flex items-center justify-center hover:bg-[#7ED957]/20">
                          <Eye size={17} />
                        </button>
  
                        <button className="w-9 h-9 rounded-xl bg-[#F5F5F3] flex items-center justify-center hover:bg-[#7ED957]/20">
                          <MessageSquare size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          <p className="text-xs text-gray-400 mt-5">
            Preparado para conectarse a tickets reales, reembolsos y solicitudes de soporte.
          </p>
        </div>
      </div>
    );
  }