"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Search,
  Users,
  UserPlus,
  ClipboardList,
  MapPin,
  Eye,
  History,
} from "lucide-react";

type Client = {
  id: number;
  name: string | null;
  city: string | null;
  phone: string | null;
  created_at: string | null;
};

type Consultation = {
  id: number;
  status: string | null;
  phone: string | null;
};

export default function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState<Client[]>([]);
  const [consultas, setConsultas] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    const { data: clientsData, error: clientsError } = await supabase
      .from("clients")
      .select("id, name, city, phone, created_at")
      .order("created_at", { ascending: false });

    const { data: consultationsData, error: consultationsError } =
      await supabase
        .from("consultations")
        .select("id, status, phone");

    if (clientsError) {
      console.error("Error cargando usuarios:", clientsError);
    }

    if (consultationsError) {
      console.error("Error cargando consultas:", consultationsError);
    }

    setUsuarios(clientsData || []);
    setConsultas(consultationsData || []);
    setLoading(false);
  }

  const inicioMes = new Date();
  inicioMes.setDate(1);
  inicioMes.setHours(0, 0, 0, 0);

  const nuevosEsteMes = usuarios.filter((usuario) => {
    if (!usuario.created_at) return false;
    return new Date(usuario.created_at) >= inicioMes;
  }).length;

  const consultasAbiertas = consultas.filter(
    (consulta) => consulta.status === "Nueva" || consulta.status === "assigned"
  ).length;

  const ciudadesAtendidas = new Set(
    usuarios
      .map((usuario) => usuario.city?.trim().toLowerCase())
      .filter(Boolean)
  ).size;

  function consultasPorTelefono(phone: string | null) {
    if (!phone) return 0;

    return consultas.filter((consulta) => consulta.phone === phone).length;
  }

  function formatearFecha(fecha: string | null) {
    if (!fecha) return "Sin fecha";

    return new Date(fecha).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const resumen = [
    {
      title: "Usuarios atendidos",
      value: usuarios.length,
      icon: Users,
    },
    {
      title: "Nuevos este mes",
      value: nuevosEsteMes,
      icon: UserPlus,
    },
    {
      title: "Consultas abiertas",
      value: consultasAbiertas,
      icon: ClipboardList,
    },
    {
      title: "Ciudades atendidas",
      value: ciudadesAtendidas,
      icon: MapPin,
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-[#0D3B2E]">
          Gestión de Usuarios
        </h1>

        <p className="text-gray-500 mt-1">
          Visualiza clientes atendidos, ciudades y consultas realizadas en TuArki.
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
                  {loading ? "..." : item.value}
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
              placeholder="Buscar usuario..."
              className="w-full rounded-2xl border border-black/10 bg-[#F5F5F3] py-3 pl-12 pr-4 outline-none focus:border-[#7ED957]"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {["Todos", "Este mes", "Con consultas", "Por ciudad"].map(
              (filtro) => (
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
              )
            )}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-black/5">
          <table className="w-full text-left">
            <thead className="bg-[#F5F5F3] text-[#0D3B2E]">
              <tr>
                <th className="p-4 text-sm">ID</th>
                <th className="p-4 text-sm">Nombre</th>
                <th className="p-4 text-sm">Teléfono</th>
                <th className="p-4 text-sm">Ciudad</th>
                <th className="p-4 text-sm">Consultas</th>
                <th className="p-4 text-sm">Fecha</th>
                <th className="p-4 text-sm text-right">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-gray-500">
                    Cargando usuarios...
                  </td>
                </tr>
              )}

              {!loading && usuarios.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-gray-500">
                    No hay usuarios atendidos.
                  </td>
                </tr>
              )}

              {!loading &&
                usuarios.map((usuario) => (
                  <tr
                    key={usuario.id}
                    className="border-t border-black/5 hover:bg-[#F5F5F3] transition"
                  >
                    <td className="p-4 font-black text-[#0D3B2E]">
                      #{usuario.id}
                    </td>

                    <td className="p-4 font-bold text-[#0D3B2E]">
                      {usuario.name || "Sin nombre"}
                    </td>

                    <td className="p-4 text-gray-600">
                      {usuario.phone || "Sin teléfono"}
                    </td>

                    <td className="p-4 text-gray-600">
                      {usuario.city || "Sin ciudad"}
                    </td>

                    <td className="p-4 font-bold text-[#0D3B2E]">
                      {consultasPorTelefono(usuario.phone)}
                    </td>

                    <td className="p-4 text-gray-600">
                      {formatearFecha(usuario.created_at)}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button className="w-9 h-9 rounded-xl bg-[#F5F5F3] flex items-center justify-center hover:bg-[#7ED957]/20">
                          <Eye size={17} />
                        </button>

                        <button className="w-9 h-9 rounded-xl bg-[#F5F5F3] flex items-center justify-center hover:bg-[#7ED957]/20">
                          <History size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-400 mt-5">
          Usuarios atendidos se calcula desde la tabla clients. Las consultas se cruzan por número telefónico.
        </p>
      </div>
    </div>
  );
}