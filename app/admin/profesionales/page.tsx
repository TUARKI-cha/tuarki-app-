"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Search,
  Eye,
  Pencil,
  PauseCircle,
  UserCheck,
  Users,
  Star,
  BadgeCheck,
} from "lucide-react";

type Professional = {
  id: string;
  name: string | null;
  email: string | null;
  specialty: string | null;
  rating: number | null;
  is_online: boolean | null;
  experience_years: number | null;
  city: string | null;
  phone: string | null;
  profile_completed: boolean | null;
  total_consultations: number | null;
};

export default function AdminProfesionalesPage() {
  const [profesionales, setProfesionales] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarProfesionales();
  }, []);

  async function cargarProfesionales() {
    const { data, error } = await supabase
      .from("professionals")
      .select(
        "id, name, email, specialty, rating, is_online, experience_years, city, phone, profile_completed, total_consultations"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error cargando profesionales:", error);
      setLoading(false);
      return;
    }

    setProfesionales(data || []);
    setLoading(false);
  }

  const activos = profesionales.filter((p) => p.profile_completed).length;
  const online = profesionales.filter((p) => p.is_online).length;
  const pendientes = profesionales.filter((p) => !p.profile_completed).length;

  const promedio =
    profesionales.length > 0
      ? (
          profesionales.reduce((acc, p) => acc + Number(p.rating || 0), 0) /
          profesionales.length
        ).toFixed(1)
      : "0.0";

  const resumen = [
    { title: "Profesionales activos", value: activos, icon: Users },
    { title: "Profesionales online", value: online, icon: UserCheck },
    { title: "Pendientes validación", value: pendientes, icon: BadgeCheck },
    { title: "Calificación promedio", value: promedio, icon: Star },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-[#0D3B2E]">
          Gestión de Profesionales
        </h1>
        <p className="text-gray-500 mt-1">
          Administra disponibilidad, desempeño y actividad de los especialistas.
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
              placeholder="Buscar profesional..."
              className="w-full rounded-2xl border border-black/10 bg-[#F5F5F3] py-3 pl-12 pr-4 outline-none focus:border-[#7ED957]"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {["Todos", "Online", "Offline", "Pendientes"].map((filtro) => (
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
                <th className="p-4 text-sm">Nombre</th>
                <th className="p-4 text-sm">Especialidad</th>
                <th className="p-4 text-sm">Ciudad</th>
                <th className="p-4 text-sm">Calificación</th>
                <th className="p-4 text-sm">Consultas</th>
                <th className="p-4 text-sm">Estado</th>
                <th className="p-4 text-sm">Perfil</th>
                <th className="p-4 text-sm text-right">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-500">
                    Cargando profesionales...
                  </td>
                </tr>
              )}

              {!loading && profesionales.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-500">
                    No hay profesionales registrados.
                  </td>
                </tr>
              )}

              {!loading &&
                profesionales.map((profesional) => (
                  <tr
                    key={profesional.id}
                    className="border-t border-black/5 hover:bg-[#F5F5F3] transition"
                  >
                    <td className="p-4 font-black text-[#0D3B2E]">
                      {profesional.name || "Sin nombre"}
                    </td>

                    <td className="p-4 text-gray-600">
                      {profesional.specialty || "Sin especialidad"}
                    </td>

                    <td className="p-4 text-gray-600">
                      {profesional.city || "Sin ciudad"}
                    </td>

                    <td className="p-4">⭐ {profesional.rating || "0.0"}</td>

                    <td className="p-4">
                      {profesional.total_consultations || 0}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          profesional.is_online
                            ? "bg-[#7ED957]/20 text-[#1E7A5A]"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {profesional.is_online ? "Online" : "Offline"}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          profesional.profile_completed
                            ? "bg-[#7ED957]/20 text-[#1E7A5A]"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {profesional.profile_completed
                          ? "Completo"
                          : "Pendiente"}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button className="w-9 h-9 rounded-xl bg-[#F5F5F3] flex items-center justify-center hover:bg-[#7ED957]/20">
                          <Eye size={17} />
                        </button>

                        <button className="w-9 h-9 rounded-xl bg-[#F5F5F3] flex items-center justify-center hover:bg-[#7ED957]/20">
                          <Pencil size={17} />
                        </button>

                        <button className="w-9 h-9 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center hover:bg-yellow-100">
                          <PauseCircle size={17} />
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