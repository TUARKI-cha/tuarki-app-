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
  email: string;
  specialty: string | null;
  rating: number | null;
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

type FollowUp = {
  id: string;
  client_name: string;
  scheduled_date: string;
  scheduled_time: string;
  status: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
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
    loadFollowUps(data.id);
    loadUnreadNotifications(data.id);
  };

  const loadFollowUps = async (professionalId: string) => {
    const { data, error } = await supabase
      .from("follow_ups")
      .select("*")
      .eq("professional_id", professionalId)
      .eq("status", "scheduled")
      .order("scheduled_date", { ascending: true })
      .order("scheduled_time", { ascending: true });
  
    if (error) {
      console.log(error);
      return;
    }
  
    setFollowUps(data || []);
  };

  const loadUnreadNotifications = async (professionalId: string) => {
    const { count, error } = await supabase
      .from("professional_notifications")
      .select("*", { count: "exact", head: true })
      .eq("professional_id", professionalId)
      .eq("is_read", false);
  
    if (error) {
      console.log(error);
      return;
    }
  
    setUnreadMessagesCount(count || 0);
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
      router.push(`/videollamada/${item.id}?role=professional`);
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

    router.push(`/chat-profesional/${item.id}`);
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

  const completedChat = completedConsultations.filter((item) =>
    item.service?.toLowerCase().includes("chat")
  ).length;
  
  const completedVideo = completedConsultations.filter((item) =>
    item.service?.toLowerCase().includes("video")
  ).length;
  
  const completedPlans = completedConsultations.filter((item) =>
    item.service?.toLowerCase().includes("plano")
  ).length;
  
  const completedBudget = completedConsultations.filter((item) =>
    item.service?.toLowerCase().includes("presupuesto")
  ).length;
  
  const estimatedEarnings =
    completedChat * 150 +
    completedVideo * 200 +
    completedPlans * 200 +
    completedBudget * 200;

    const today = new Date().toISOString().split("T")[0];

    const todayFollowUps = followUps.filter(
      (item) => item.scheduled_date === today
    );
    
    const nextFollowUps = followUps.filter(
      (item) => item.scheduled_date >= today
    );
    
    const dashboardNotifications = [
      ...todayFollowUps.slice(0, 2).map((item) => ({
        title: "Seguimiento para hoy",
        text: `${item.client_name} tiene seguimiento a las ${item.scheduled_time}.`,
        path: "/dashboard/agenda",
      })),
    
      ...nextFollowUps
        .filter((item) => item.scheduled_date !== today)
        .slice(0, 2)
        .map((item) => ({
          title: "Seguimiento próximo",
          text: `${item.client_name} está agendado para el ${item.scheduled_date} a las ${item.scheduled_time}.`,
          path: "/dashboard/agenda",
        })),
    
        ...assignedConsultations.slice(0, 2).map((item) => ({
          title: "Consulta en proceso",
          text: `${item.name || "Cliente"} tiene una consulta activa.`,
          path: item.service?.toLowerCase().includes("video")
            ? `/videollamada/${item.id}?role=professional`
            : `/chat-profesional/${item.id}`,
        })),
    
      ...pendingConsultations.slice(0, 2).map((item) => ({
        title: "Nueva consulta",
        text: `${item.name || "Cliente temporal"} solicita una asesoría.`,
        path: "/dashboard",
      })),
    ].slice(0, 4);
  
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
     { icon: LayoutDashboard, label: "YO-ARKI", count: null, path: "/dashboard" },
  { icon: CalendarDays, label: "Agenda", count: null, path: "/dashboard/agenda" },
  { icon: MessageCircle, label: "Mensajes", count: unreadMessagesCount, path: "/dashboard/mensajes" },
  { icon: Clock3, label: "Historial", count: null, path: "/dashboard/historial" },
  { icon: DollarSign, label: "Ganancias", count: null, path: "/dashboard/ganancias" },
  { icon: ChartNoAxesColumn, label: "Estadísticas", count: null, path: "/dashboard/estadisticas" },
  { icon: FileText, label: "Recursos", count: null, path: "/dashboard/recursos" },
  { icon: User, label: "Mi perfil", count: null, path: "/dashboard/perfil" },
  { icon: Settings, label: "Configuración", count: null, path: "/dashboard/configuracion" },
].map((item) => {
  const Icon = item.icon;



  return (
    <button
      key={item.label}
      onClick={() => router.push(item.path)}
      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all font-semibold ${
        item.path === "/dashboard"
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
                  value: "--",
                  sub: "Sin datos suficientes",
                  icon: Clock3,
                },
                {
                  title: "Calificación promedio",
                  value: `${professional?.rating?.toFixed(1) || "0.0"} ⭐`,
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
            <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB]">
  <h3 className="text-xl font-black text-[#0B3B2E]">
    Consultas agendadas
  </h3>

  {followUps.length === 0 ? (
  <>
    <p className="text-[#6B7280] mt-3">
      No tienes seguimientos programados por ahora.
    </p>

    <div className="mt-6 rounded-2xl bg-[#F4F4F2] p-5 text-sm font-semibold text-[#6B7280]">
      Sin seguimientos activos
    </div>
  </>
) : (
  <div className="mt-5 rounded-2xl bg-[#F4FAF1] border border-[#DCEFD5] p-5">
    <p className="text-sm font-bold text-[#57B33E]">
      Próximo seguimiento
    </p>

    <h4 className="text-xl font-black text-[#0B3B2E] mt-1">
      {followUps[0].client_name}
    </h4>

    <p className="text-sm text-[#6B7280] mt-2">
      {followUps[0].scheduled_date} · {followUps[0].scheduled_time}
    </p>

    <button
      onClick={() => router.push("/dashboard/agenda")}
      className="mt-4 text-sm font-black text-[#0B3B2E]"
    >
      Ver agenda →
    </button>
  </div>
)}
</div>

<div className="bg-white rounded-3xl p-6 border border-[#E5E7EB]">
<h3 className="text-xl font-black text-[#0B3B2E]">
  Ganancias estimadas
</h3>

<p className="text-[#6B7280] mt-3">
  Cálculo provisional basado en consultas finalizadas.
</p>

<div className="mt-6 rounded-2xl bg-[#F4FAF1] border border-[#DCEFD5] p-5">
  <p className="text-sm font-bold text-[#57B33E]">
    Total estimado
  </p>

  <h4 className="text-4xl font-black text-[#0B3B2E] mt-1">
    ${estimatedEarnings.toLocaleString("es-MX")} MXN
  </h4>

  <div className="mt-5 space-y-2 text-sm text-[#374151]">
    <div className="flex justify-between">
      <span>Chat</span>
      <strong>{completedChat} × $150</strong>
    </div>

    <div className="flex justify-between">
      <span>Videollamada</span>
      <strong>{completedVideo} × $200</strong>
    </div>

    <div className="flex justify-between">
      <span>Revisión de planos</span>
      <strong>{completedPlans} × $200</strong>
    </div>

    <div className="flex justify-between">
      <span>Presupuesto</span>
      <strong>{completedBudget} × $200</strong>
    </div>
  </div>
</div>
</div>
            </section>

            <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-7 grid grid-cols-4 gap-6">
              {[
                ["Tiempo promedio", "Próximamente"],
                ["Consultas completadas", completedConsultations.length.toString()],
                ["Satisfacción clientes", ratings.length ? "98%" : "0%"],
                ["Clientes recurrentes", "Próximamente"],
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

    <button
      onClick={() => router.push("/dashboard/agenda")}
      className="text-[#15803D] font-bold text-sm"
    >
      Ver todas
    </button>
  </div>

  {dashboardNotifications.map((item, index) => (
    <button
      key={`${item.title}-${index}`}
      onClick={() => router.push(item.path)}
      className="w-full text-left p-5 rounded-2xl bg-[#FAFAF8] mb-4 hover:bg-[#F4FAF1] transition"
    >
      <p className="font-black">{item.title}</p>
      <p className="text-sm text-[#6B7280] mt-1">
        {item.text}
      </p>
    </button>
  ))}

  {dashboardNotifications.length === 0 && (
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
              {[
  {
    label: "Bloquear horario",
    action: () => router.push("/dashboard/agenda"),
  },
  {
    label: "Ver historial",
    action: () => router.push("/dashboard/historial"),
  },
  {
    label: "Ver perfil",
    action: () => router.push("/dashboard/perfil"),
  },
  {
    label: "Ir a soporte",
    action: () =>
      window.open(
        "https://wa.me/5214621309850?text=Hola%20TuArki%2C%20necesito%20soporte%20como%20profesional.",
        "_blank"
      ),
  },
].map((item) => (
  <button
    key={item.label}
    onClick={item.action}
    className="border border-[#E5E7EB] rounded-2xl p-5 text-sm font-bold hover:bg-[#F4FAF1] transition"
  >
    {item.label}
  </button>
))}
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

            <section className="bg-[#F4FAF1] rounded-[24px] p-5 border border-[#DCEFD5]">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-[#57B33E] flex items-center justify-center text-white font-black">
      ✓
    </div>

    <div>
      <h3 className="font-black text-[#0B3B2E]">
        Profesional verificado
      </h3>

      <p className="text-sm text-[#6B7280]">
        Perfil validado por TuArki
      </p>
    </div>
  </div>

  <div className="mt-4 space-y-1 text-sm">
    <p>✓ Identidad verificada</p>
    <p>✓ Experiencia comprobada</p>
    <p>✓ Perfil activo</p>
  </div>
</section>
          </aside>
        </div>
      </section>
    </main>
  );
}