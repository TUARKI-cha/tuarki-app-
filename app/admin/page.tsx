"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ClipboardList,
  UserCheck,
  Wallet,
  Clock,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Eye,
  UserPlus,
  CircleDollarSign,
} from "lucide-react";

type Consultation = {
  id: number;
  created_at: string | null;
  service: string | null;
  status: string | null;
  name: string | null;
  assigned_professional: string | null;
  payment_status: string | null;
};

type Professional = {
  id: string;
  name: string | null;
  specialty: string | null;
  is_online: boolean | null;
};

export default function AdminDashboardPage() {
  const [consultas, setConsultas] = useState<Consultation[]>([]);
  const [profesionales, setProfesionales] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    const { data: consultationsData, error: consultationsError } =
      await supabase
        .from("consultations")
        .select(
          "id, created_at, service, status, name, assigned_professional, payment_status"
        )
        .order("created_at", { ascending: false });

    const { data: professionalsData, error: professionalsError } =
      await supabase
        .from("professionals")
        .select("id, name, specialty, is_online")
        .order("created_at", { ascending: false });

    if (consultationsError) {
      console.error("Error cargando consultas:", consultationsError);
    }

    if (professionalsError) {
      console.error("Error cargando profesionales:", professionalsError);
    }

    setConsultas(consultationsData || []);
    setProfesionales(professionalsData || []);
    setLoading(false);
  }

  const consultasActivas = consultas.filter((c) => c.status === "assigned");
  const consultasNuevas = consultas.filter((c) => c.status === "Nueva");
  const consultasFinalizadas = consultas.filter((c) => c.status === "completed");
  const consultasPagadas = consultas.filter((c) => c.payment_status === "paid");

  const profesionalesOnline = profesionales.filter((p) => p.is_online);

  const stats = [
    {
      title: "Consultas activas",
      value: consultasActivas.length,
      change: `${consultasNuevas.length} esperando`,
      icon: ClipboardList,
    },
    {
      title: "Profesionales online",
      value: profesionalesOnline.length,
      change: `${profesionales.length} registrados`,
      icon: UserCheck,
    },
    {
      title: "Consultas pagadas",
      value: consultasPagadas.length,
      change: "Pagos confirmados",
      icon: Wallet,
    },
    {
      title: "Finalizadas",
      value: consultasFinalizadas.length,
      change: "Consultas completadas",
      icon: Clock,
    },
  ];

  const ultimasConsultas = consultas.slice(0, 3);
  const ultimosPagos = consultas
    .filter((c) => c.payment_status === "paid")
    .slice(0, 3);

  const estadoLabel = (status: string | null) => {
    if (status === "Nueva") return "Nueva";
    if (status === "assigned") return "Asignada";
    if (status === "completed") return "Finalizada";
    if (status === "cancelled") return "Cancelada";
    return status || "Sin estado";
  };

  const estadoClass = (status: string | null) => {
    if (status === "Nueva") return "bg-yellow-100 text-yellow-700";
    if (status === "assigned") return "bg-blue-100 text-blue-700";
    if (status === "completed") return "bg-[#7ED957]/20 text-[#1E7A5A]";
    if (status === "cancelled") return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-600";
  };

  const montoServicio = (service: string | null) => {
    if (service === "Chat") return "$200";
    if (service === "Videollamada") return "$250";
    if (service?.toLowerCase().includes("revisión")) return "$500";
    return "$0";
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-[#0D3B2E]">
          Dashboard Administrativo
        </h1>
        <p className="text-gray-500 mt-1">
          Control operativo, financiero y de profesionales en tiempo real.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#7ED957]/20 flex items-center justify-center">
                  <Icon className="text-[#1E7A5A]" size={24} />
                </div>

                <ArrowUpRight className="text-[#7ED957]" size={22} />
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500">{item.title}</p>
                <h2 className="text-3xl font-black text-[#0D3B2E] mt-1">
                  {loading ? "..." : item.value}
                </h2>
                <p className="text-sm text-[#1E7A5A] font-semibold mt-2">
                  {item.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-black text-[#0D3B2E]">
                Últimas consultas
              </h2>
              <p className="text-sm text-gray-500">
                Monitoreo operativo de servicios recientes
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {ultimasConsultas.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-black/5 p-5 flex items-center justify-between hover:bg-[#F5F5F3] transition"
              >
                <div>
                  <p className="font-black text-[#0D3B2E]">#{item.id}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.service || "Sin servicio"} ·{" "}
                    {item.name || "Sin nombre"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Profesional:{" "}
                    <span className="font-semibold text-[#1E7A5A]">
                      {item.assigned_professional || "Sin asignar"}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${estadoClass(
                      item.status
                    )}`}
                  >
                    {estadoLabel(item.status)}
                  </span>

                  <button className="rounded-xl bg-[#0D3B2E] text-white px-4 py-2 text-sm font-bold hover:bg-[#1E7A5A] transition flex items-center gap-2">
                    {item.status === "Nueva" ? (
                      <>
                        <UserPlus size={16} />
                        Asignar
                      </>
                    ) : (
                      <>
                        <Eye size={16} />
                        Ver
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0D3B2E] rounded-3xl p-8 text-white shadow-sm">
          <h2 className="text-xl font-black">Alertas operativas</h2>
          <p className="text-sm text-white/60 mt-1">
            Eventos que requieren atención
          </p>

          <div className="mt-6 space-y-4">
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="flex gap-3">
                <AlertTriangle className="text-[#7ED957]" size={22} />
                <div>
                  <p className="font-bold">Consultas nuevas</p>
                  <p className="text-sm text-white/60">
                    {consultasNuevas.length} consultas esperando asignación.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4">
              <div className="flex gap-3">
                <CircleDollarSign className="text-[#7ED957]" size={22} />
                <div>
                  <p className="font-bold">Pagos pendientes</p>
                  <p className="text-sm text-white/60">
                    {
                      consultas.filter((c) => c.payment_status !== "paid")
                        .length
                    } consultas sin pago confirmado.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4">
              <div className="flex gap-3">
                <CheckCircle2 className="text-[#7ED957]" size={22} />
                <div>
                  <p className="font-bold">Profesionales online</p>
                  <p className="text-sm text-white/60">
                    {profesionalesOnline.length} disponibles actualmente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
          <h2 className="text-xl font-black text-[#0D3B2E]">Últimos pagos</h2>
          <p className="text-sm text-gray-500 mt-1">
            Consultas con pago confirmado
          </p>

          <div className="mt-6 space-y-4">
            {ultimosPagos.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl border border-black/5 p-4"
              >
                <div>
                  <p className="font-bold text-[#0D3B2E]">
                    {item.name || "Sin nombre"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.service || "Sin servicio"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-black text-[#0D3B2E]">
                    {montoServicio(item.service)}
                  </p>
                  <p className="text-xs font-bold text-[#1E7A5A]">Pagado</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
          <h2 className="text-xl font-black text-[#0D3B2E]">
            Profesionales conectados
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Disponibilidad actual del equipo
          </p>

          <div className="mt-6 space-y-4">
            {profesionales.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl border border-black/5 p-4"
              >
                <div>
                  <p className="font-bold text-[#0D3B2E]">
                    {item.name || "Sin nombre"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.specialty || "Sin especialidad"}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-black ${
                    item.is_online
                      ? "bg-[#7ED957]/20 text-[#1E7A5A]"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {item.is_online ? "Online" : "Offline"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}