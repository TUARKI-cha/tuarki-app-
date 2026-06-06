"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Search,
  Eye,
  UserPlus,
  XCircle,
  MessageCircle,
  Video,
  ClipboardList,
  Clock,
  CheckCircle2,
  Wallet,
} from "lucide-react";

type Consultation = {
  id: number;
  created_at: string | null;
  title: string | null;
  description: string | null;
  service: string | null;
  status: string | null;
  phone: string | null;
  name: string | null;
  city: string | null;
  assigned_professional: string | null;
  category: string | null;
  payment_status: string | null;
};

export default function AdminConsultasPage() {
  const [consultas, setConsultas] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarConsultas();
  }, []);

  async function cargarConsultas() {
    const { data, error } = await supabase
      .from("consultations")
      .select(
        "id, created_at, title, description, service, status, phone, name, city, assigned_professional, category, payment_status"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error cargando consultas:", error);
      setLoading(false);
      return;
    }

    setConsultas(data || []);
    setLoading(false);
  }

  const activas = consultas.filter(
    (c) => c.status === "assigned"
  ).length;
  
  const esperando = consultas.filter(
    (c) => c.status === "Nueva"
  ).length;
  
  const finalizadas = consultas.filter(
    (c) => c.status === "completed"
  ).length;
  const pagadas = consultas.filter((c) => c.payment_status === "paid").length;

  const resumen = [
    { title: "Consultas activas", value: activas, icon: ClipboardList },
    { title: "Esperando asignación", value: esperando, icon: Clock },
    { title: "Finalizadas", value: finalizadas, icon: CheckCircle2 },
    { title: "Consultas pagadas", value: pagadas, icon: Wallet },
  ];

  const estadoLabel = (status: string | null) => {
    if (status === "Nueva") return "Nueva";
    if (status === "assigned") return "Asignada";
    if (status === "completed") return "Finalizada";
    if (status === "cancelled") return "Cancelada";
  
    return status || "Sin estado";
  };

  const estadoClass = (status: string | null) => {
    if (status === "Nueva")
      return "bg-yellow-100 text-yellow-700";
  
    if (status === "assigned")
      return "bg-blue-100 text-blue-700";
  
    if (status === "completed")
      return "bg-[#7ED957]/20 text-[#1E7A5A]";
  
    if (status === "cancelled")
      return "bg-red-100 text-red-600";
  
    return "bg-gray-100 text-gray-600";
  };

  const formatearFecha = (fecha: string | null) => {
    if (!fecha) return "Sin fecha";

    return new Date(fecha).toLocaleString("es-MX", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-[#0D3B2E]">
          Gestión de Consultas
        </h1>

        <p className="text-gray-500 mt-1">
          Supervisa, reasigna y administra todas las consultas de TuArki.
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
              placeholder="Buscar por cliente, profesional o ID..."
              className="w-full rounded-2xl border border-black/10 bg-[#F5F5F3] py-3 pl-12 pr-4 outline-none focus:border-[#7ED957]"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {["Todas", "Activas", "Esperando", "En proceso", "Finalizadas"].map(
              (filtro) => (
                <button
                  key={filtro}
                  className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                    filtro === "Todas"
                      ? "bg-[#0D3B2E] text-white"
                      : "bg-[#F5F5F3] text-[#0D3B2E] hover:bg-[#7ED957]/20"
                  }`}
                >
                  {filtro}
                </button>
              )
            )}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-black/5">
          <table className="w-full text-left">
            <thead className="bg-[#F5F5F3] text-[#0D3B2E]">
              <tr>
                <th className="p-4 text-sm">ID</th>
                <th className="p-4 text-sm">Cliente</th>
                <th className="p-4 text-sm">Servicio</th>
                <th className="p-4 text-sm">Categoría</th>
                <th className="p-4 text-sm">Profesional</th>
                <th className="p-4 text-sm">Estado</th>
                <th className="p-4 text-sm">Pago</th>
                <th className="p-4 text-sm">Fecha</th>
                <th className="p-4 text-sm text-right">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-gray-500">
                    Cargando consultas...
                  </td>
                </tr>
              )}

              {!loading && consultas.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-gray-500">
                    No hay consultas registradas.
                  </td>
                </tr>
              )}

              {!loading &&
                consultas.map((consulta) => (
                  <tr
                    key={consulta.id}
                    className="border-t border-black/5 hover:bg-[#F5F5F3] transition"
                  >
                    <td className="p-4 font-black text-[#0D3B2E]">
                      #{consulta.id}
                    </td>

                    <td className="p-4">
                      <p className="font-bold text-[#0D3B2E]">
                        {consulta.name || "Sin nombre"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {consulta.phone || "Sin teléfono"}
                      </p>
                    </td>

                    <td className="p-4 text-gray-600">
                      {consulta.service || "Sin servicio"}
                    </td>

                    <td className="p-4 text-gray-600">
                      {consulta.category || "Sin categoría"}
                    </td>

                    <td className="p-4 text-gray-600">
                      {consulta.assigned_professional || "Sin asignar"}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${estadoClass(
                          consulta.status
                        )}`}
                      >
                        {estadoLabel(consulta.status)}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          consulta.payment_status === "paid"
                            ? "bg-[#7ED957]/20 text-[#1E7A5A]"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {consulta.payment_status || "Pendiente"}
                      </span>
                    </td>

                    <td className="p-4 text-gray-600">
                      {formatearFecha(consulta.created_at)}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button className="w-9 h-9 rounded-xl bg-[#F5F5F3] text-[#0D3B2E] flex items-center justify-center hover:bg-[#7ED957]/20">
                          <Eye size={17} />
                        </button>

                        <button className="w-9 h-9 rounded-xl bg-[#F5F5F3] text-[#0D3B2E] flex items-center justify-center hover:bg-[#7ED957]/20">
                          <MessageCircle size={17} />
                        </button>

                        <button className="w-9 h-9 rounded-xl bg-[#F5F5F3] text-[#0D3B2E] flex items-center justify-center hover:bg-[#7ED957]/20">
                          <Video size={17} />
                        </button>

                        <button className="w-9 h-9 rounded-xl bg-[#F5F5F3] text-[#0D3B2E] flex items-center justify-center hover:bg-[#7ED957]/20">
                          <UserPlus size={17} />
                        </button>

                        <button className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100">
                          <XCircle size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}