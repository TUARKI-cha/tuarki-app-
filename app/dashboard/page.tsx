"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase";

import {
  Bell,
  CalendarDays,
  ChartNoAxesColumn,
  CheckCircle2,
  Clock3,
  DollarSign,
  FileText,
  LayoutDashboard,
  MessageCircle,
  MoreVertical,
  Settings,
  Star,
  User,
  Users,
  Video,
} from "lucide-react";

type Consultation = {
  id: string;
  name?: string;
  description?: string;
  category?: string;
  service?: string;
  status?: string;
  priority?: string;
  created_at?: string;
  assigned_professional_id?: string;
};

type Professional = {
  id: string;
  name: string;
  specialty?: string;
  rating?: number;
  avatar_url?: string;
  is_online: boolean;
};

type Rating = {
  id: string;
  consultation_id: string;
  rating_general: number;
  rating_clarity?: number;
  rating_attention?: number;
  comment?: string;
  created_at?: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [latestConsultationId, setLatestConsultationId] =
    useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();

    const channel = supabase
      .channel("consultations-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "consultations",
        },
        (payload) => {
          loadConsultations();

          if (payload.eventType === "INSERT") {
            setNotificationCount((prev) => prev + 1);
            setLatestConsultationId(payload.new.id);

            toast.success("Nueva consulta recibida");

            const audio = new Audio("/notification.mp3");
            audio.play().catch(() => {});

            setTimeout(() => {
              setLatestConsultationId(null);
            }, 5000);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadDashboardData = async () => {
    await Promise.all([
      loadConsultations(),
      loadRatings(),
      loadProfessional(),
    ]);
  };

  const loadConsultations = async () => {
    const { data, error } = await supabase
      .from("consultations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setConsultations(data || []);
  };

  const loadRatings = async () => {
    const { data, error } = await supabase
      .from("consultation_ratings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setRatings(data || []);
  };

  const loadProfessional = async () => {
    const { data, error } = await supabase
      .from("professionals")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) {
      console.log(error);
      return;
    }

    setProfessional(data);
  };

  const toggleAvailability = async () => {
    if (!professional) return;

    const newStatus = !professional.is_online;

    const { error } = await supabase
      .from("professionals")
      .update({
        is_online: newStatus,
      })
      .eq("id", professional.id);

    if (error) {
      console.log(error);
      alert("No se pudo actualizar disponibilidad");
      return;
    }

    setProfessional({
      ...professional,
      is_online: newStatus,
    });
  };

  const assignConsultation = async (id: string) => {
    if (!professional?.is_online) {
      alert("Debes estar disponible para tomar consultas");
      return false;
    }

    const { data, error } = await supabase
      .from("consultations")
      .update({
        status: "assigned",
        assigned_professional: professional?.name || "Profesional",
        assigned_professional_id: professional?.id,
      })
      .eq("id", id)
      .eq("status", "pending")
      .select()
      .maybeSingle();

    if (error) {
      console.log(error);
      alert("No se pudo asignar la consulta");
      return false;
    }

    if (!data) {
      alert("Esta consulta ya fue tomada por otro profesional");
      await loadConsultations();
      return false;
    }

    return true;
  };

  const openConsultation = (item: Consultation) => {
    const service = item.service?.toLowerCase() || "";

    if (service.includes("video")) {
      router.push(`/videollamada/${item.id}`);
      return;
    }

    if (service.includes("planos")) {
      router.push(`/revision-planos/${item.id}`);
      return;
    }

    if (service.includes("presupuesto")) {
      router.push(`/revision-presupuesto/${item.id}`);
      return;
    }

    router.push(`/chat/${item.id}`);
  };

  const pendingConsultations = useMemo(
    () => consultations.filter((item) => item.status === "pending"),
    [consultations]
  );

  const assignedConsultations = useMemo(
    () =>
      consultations.filter(
        (item) =>
          item.status === "assigned" &&
          item.assigned_professional_id === professional?.id
      ),
    [consultations, professional]
  );
  
  const completedConsultations = useMemo(
    () =>
      consultations.filter(
        (item) =>
          item.status === "completed" &&
          item.assigned_professional_id === professional?.id
      ),
    [consultations, professional]
  );

  const averageRating =
    ratings.length > 0
      ? (
          ratings.reduce(
            (sum, item) => sum + Number(item.rating_general || 0),
            0
          ) / ratings.length
        ).toFixed(1)
      : "0.0";

  const getConsultationById = (id: string) => {
    return consultations.find((item) => item.id === id);
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8] flex text-[#111]">
      <aside className="w-[290px] bg-white border-r border-[#ECECEC] p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B3B2E] to-[#57B33E]" />

            <div>
              <h1 className="text-4xl font-black text-[#0B3B2E] leading-none">
                TuArki
              </h1>
              <p className="text-sm text-[#6B7280] mt-1">
                siempre contigo
              </p>
            </div>
          </div>

          <nav className="space-y-3">
            {[
              { icon: LayoutDashboard, label: "Dashboard", count: null },
              { icon: FileText, label: "Consultas", count: pendingConsultations.length },
              { icon: CalendarDays, label: "Agenda", count: null },
              { icon: MessageCircle, label: "Mensajes", count: 2 },
              { icon: Users, label: "Mis clientes", count: null },
              { icon: Clock3, label: "Historial", count: null },
              { icon: DollarSign, label: "Ganancias", count: null },
              { icon: ChartNoAxesColumn, label: "Estadísticas", count: null },
              { icon: FileText, label: "Recursos", count: null },
              { icon: User, label: "Mi perfil", count: null },
              { icon: Settings, label: "Configuración", count: null },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all font-semibold ${
                    index === 0
                      ? "bg-[#0B3B2E] text-white shadow-lg"
                      : "hover:bg-[#F4F4F2] text-[#374151]"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <Icon size={20} />
                    {item.label}
                  </span>

                  {!!item.count && (
                    <span className="w-7 h-7 rounded-full bg-[#57B33E] text-white text-sm flex items-center justify-center font-bold">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <Link
          href="/"
          className="w-full bg-[#0B3B2E] text-white py-4 rounded-2xl font-bold text-center block hover:opacity-90 transition-all"
        >
          Cerrar sesión
        </Link>
      </aside>

      <section className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-black">
              ¡Hola, {professional?.name || "Profesional"}! 👋
            </h2>
            <p className="text-[#6B7280] mt-2 text-lg">
              Aquí tienes un resumen de tu actividad hoy.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleAvailability}
              className="px-7 py-4 bg-white border border-[#E5E7EB] rounded-2xl flex items-center gap-3 font-bold"
            >
              <span
                className={`w-3 h-3 rounded-full ${
                  professional?.is_online ? "bg-[#57B33E]" : "bg-[#EF4444]"
                }`}
              />
              {professional?.is_online ? "Disponible" : "No disponible"}
            </button>

            <div className="relative">
              <Bell size={28} />
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                {notificationCount}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {professional?.avatar_url ? (
                <img
                  src={professional.avatar_url}
                  alt={professional.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#D1D5DB]" />
              )}

              <div>
                <p className="font-black">
                  {professional?.name || "Profesional"}
                </p>
                <p className="text-sm text-[#6B7280]">
                  {professional?.specialty || "Especialista"}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 2xl:grid-cols-[1fr_430px] gap-8">
          <div className="space-y-8">
            <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-7 grid grid-cols-4 gap-6 shadow-sm">
              {[
                {
                  title: "Estado actual",
                  value: professional?.is_online ? "Disponible" : "No disponible",
                  sub: professional?.is_online
                    ? "Lista para recibir consultas."
                    : "No recibirás consultas nuevas.",
                  icon: CheckCircle2,
                },
                {
                  title: "Tiempo de respuesta",
                  value: "1.8 min",
                  sub: "Promedio hoy",
                  icon: Clock3,
                },
                {
                  title: "Calificación promedio",
                  value: `${averageRating} ⭐`,
                  sub: `Basado en ${ratings.length} reseñas`,
                  icon: Star,
                },
                {
                  title: "Consultas finalizadas",
                  value: completedConsultations.length.toString(),
                  sub: "Total registradas",
                  icon: CalendarDays,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#F4FAF1] flex items-center justify-center">
                      <Icon className="text-[#57B33E]" />
                    </div>

                    <div>
                      <p className="text-sm text-[#6B7280]">{item.title}</p>
                      <h3 className="text-2xl font-black mt-2">{item.value}</h3>
                      <p className="text-sm text-[#6B7280] mt-2">{item.sub}</p>
                    </div>
                  </div>
                );
              })}
            </section>

            <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-7 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black">
                  Consultas activas
                  <span className="ml-3 bg-[#57B33E] text-white text-sm px-3 py-1 rounded-full">
                    {pendingConsultations.length}
                  </span>
                </h3>

                <button className="text-[#15803D] font-bold">
                  Ver todas
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#F1F1F1]">
                <table className="w-full">
                  <thead className="bg-[#FAFAF8]">
                    <tr className="text-left text-sm text-[#6B7280]">
                      <th className="p-4">Cliente</th>
                      <th className="p-4">Categoría</th>
                      <th className="p-4">Tipo</th>
                      <th className="p-4">Prioridad</th>
                      <th className="p-4">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {pendingConsultations.map((item) => (
                      <tr
                        key={item.id}
                        className={`border-t border-[#F1F1F1] transition-all duration-700 ${
                          latestConsultationId === item.id ? "bg-[#F4FAF1]" : ""
                        }`}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-[#D1D5DB]" />
                            <div>
                              <p className="font-bold">
                                {item.name || "Cliente temporal"}
                              </p>
                              <p className="text-xs text-[#6B7280]">
                                ID: {item.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <p className="font-semibold">
                            {item.category || item.service || "Consulta"}
                          </p>
                          <p className="text-xs text-[#6B7280]">
                            {item.description || "Sin descripción"}
                          </p>
                        </td>

                        <td className="p-4">
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F4FAF1] text-[#15803D] text-sm font-bold">
                            {item.service === "Videollamada" ? (
                              <Video size={15} />
                            ) : (
                              <MessageCircle size={15} />
                            )}
                            {item.service || "Chat"}
                          </span>
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-2 rounded-full text-xs font-bold ${
                              item.priority === "Alta"
                                ? "bg-red-50 text-red-600"
                                : item.priority === "Media"
                                ? "bg-orange-50 text-orange-600"
                                : "bg-green-50 text-green-600"
                            }`}
                          >
                            {item.priority || "Normal"}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={async () => {
                                const assigned =
                                  await assignConsultation(item.id);

                                if (!assigned) return;

                                openConsultation(item);
                              }}
                              className="bg-[#0B3B2E] text-white px-6 py-3 rounded-2xl font-bold"
                            >
                              Abrir
                            </button>

                            <MoreVertical size={20} />
                          </div>
                        </td>
                      </tr>
                    ))}

                    {pendingConsultations.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="p-8 text-center text-[#6B7280]"
                        >
                          No hay consultas pendientes por ahora.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-7 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black">
                  En proceso
                  <span className="ml-3 bg-[#F59E0B] text-white text-sm px-3 py-1 rounded-full">
                    {assignedConsultations.length}
                  </span>
                </h3>
              </div>

              <div className="space-y-4">
                {assignedConsultations.map((item) => (
                  <div
                    key={item.id}
                    className="border border-[#F1F1F1] rounded-2xl p-5 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-black text-lg">
                        {item.name || "Cliente"}
                      </p>

                      <p className="text-[#6B7280] mt-1">
                        {item.description || "Consulta"}
                      </p>

                      <div className="flex items-center gap-3 mt-3">
                        <span className="px-3 py-1 rounded-full bg-[#F4FAF1] text-[#15803D] text-xs font-bold">
                          {item.service || "Chat"}
                        </span>

                        <span className="px-3 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] text-xs font-bold">
                          En proceso
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => openConsultation(item)}
                      className="bg-[#0B3B2E] text-white px-6 py-3 rounded-2xl font-bold"
                    >
                      Continuar
                    </button>
                  </div>
                ))}

                {assignedConsultations.length === 0 && (
                  <p className="text-[#6B7280]">
                    No tienes consultas en proceso.
                  </p>
                )}
              </div>
            </section>

            <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-7 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black">
                  Historial finalizado
                  <span className="ml-3 bg-[#0B3B2E] text-white text-sm px-3 py-1 rounded-full">
                    {completedConsultations.length}
                  </span>
                </h3>
              </div>

              <div className="space-y-4">
                {completedConsultations.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="border border-[#F1F1F1] rounded-2xl p-5 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-black text-lg">
                        {item.name || "Cliente temporal"}
                      </p>
                      <p className="text-[#6B7280] mt-1">
                        {item.description || "Consulta finalizada"}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        router.push(`/finalizar-consulta/${item.id}`)
                      }
                      className="border border-[#E5E7EB] px-6 py-3 rounded-2xl font-bold hover:bg-[#F4FAF1] transition-all"
                    >
                      Ver resumen
                    </button>
                  </div>
                ))}

                {completedConsultations.length === 0 && (
                  <p className="text-[#6B7280]">
                    Todavía no hay consultas finalizadas.
                  </p>
                )}
              </div>
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="bg-white rounded-[32px] border border-[#E5E7EB] p-7">
                <h3 className="text-xl font-black mb-6">
                  Consultas agendadas
                </h3>

                {[
                  ["Ana González", "21 may. 2024", "11:00 AM"],
                  ["Diego Morales", "21 may. 2024", "03:30 PM"],
                  ["Laura Sánchez", "22 may. 2024", "10:00 AM"],
                ].map((item) => (
                  <div
                    key={item[0]}
                    className="flex items-center justify-between py-4 border-b border-[#F1F1F1]"
                  >
                    <p className="font-semibold">{item[0]}</p>
                    <p className="text-sm text-[#6B7280]">{item[1]}</p>
                    <p className="text-sm font-bold">{item[2]}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-[32px] border border-[#E5E7EB] p-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black">Ganancias</h3>
                  <span className="text-sm text-[#15803D] font-bold">
                    Mes
                  </span>
                </div>

                <h2 className="text-5xl font-black mt-8">
                  $8,450
                  <span className="text-lg text-[#6B7280] ml-2">
                    MXN
                  </span>
                </h2>

                <div className="h-32 mt-8 rounded-2xl bg-gradient-to-t from-[#F4FAF1] to-white border border-[#E5E7EB]" />

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <p className="text-sm text-[#6B7280]">
                      Consultas pagadas
                    </p>
                    <p className="text-2xl font-black">56</p>
                  </div>

                  <div>
                    <p className="text-sm text-[#6B7280]">
                      Ticket promedio
                    </p>
                    <p className="text-2xl font-black">$151 MXN</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-7 grid grid-cols-4 gap-6">
              {[
                ["Tiempo promedio", "1.8 min"],
                ["Consultas completadas", completedConsultations.length.toString()],
                ["Satisfacción clientes", ratings.length ? "98%" : "0%"],
                ["Clientes recurrentes", "32%"],
              ].map((item) => (
                <div key={item[0]}>
                  <p className="text-sm text-[#6B7280]">{item[0]}</p>
                  <p className="text-2xl font-black mt-2">{item[1]}</p>
                  <p className="text-xs text-[#15803D] mt-1">
                    ● Excelente
                  </p>
                </div>
              ))}
            </section>
          </div>

          <aside className="space-y-8">
            <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-7">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black">Notificaciones</h3>
                <button className="text-[#15803D] font-bold text-sm">
                  Ver todas
                </button>
              </div>

              {pendingConsultations.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#FAFAF8] mb-4"
                >
                  <p className="font-black">
                    Nueva consulta
                  </p>
                  <p className="text-sm text-[#6B7280] mt-1">
                    {item.name || "Cliente temporal"} solicita una asesoría.
                  </p>
                </div>
              ))}

              {pendingConsultations.length === 0 && (
                <p className="text-sm text-[#6B7280]">
                  No hay notificaciones nuevas.
                </p>
              )}
            </section>

            <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-7">
              <h3 className="text-xl font-black mb-6">
                Acciones rápidas
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {["Bloquear horario", "Mensaje de saludo", "Plantillas", "Precios"].map(
                  (item) => (
                    <button
                      key={item}
                      className="border border-[#E5E7EB] rounded-2xl p-5 text-sm font-bold hover:bg-[#F4FAF1]"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </section>

            <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-7">
              <h3 className="text-xl font-black mb-6">
                Historial reciente
              </h3>

              {ratings.slice(0, 3).map((item) => {
                const consultation = getConsultationById(item.consultation_id);

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-4 border-b border-[#F1F1F1]"
                  >
                    <div>
                      <p className="font-bold">
                        {consultation?.name || "Cliente TuArki"}
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        {item.comment || "Sin comentario"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[#F5B301]">
                        {"★".repeat(Number(item.rating_general || 5))}
                      </p>
                      <p className="text-sm font-bold">
                        {item.rating_general || 5}.0
                      </p>
                    </div>
                  </div>
                );
              })}

              {ratings.length === 0 && (
                <p className="text-sm text-[#6B7280]">
                  Todavía no hay reseñas.
                </p>
              )}
            </section>

            <section className="bg-[#F4FAF1] rounded-[32px] border border-[#DCEFD2] p-7 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-[#15803D]">
                  Tu perfil está verificado
                </h3>
                <p className="text-[#6B7280] mt-2">
                  Los clientes confían en ti.
                </p>
              </div>

              <button
  onClick={() =>
    router.push("/dashboard/perfil")
  }
  className="border border-[#57B33E] text-[#15803D] px-5 py-3 rounded-2xl font-bold"
>
  Ver perfil
</button>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}