"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
};

type Professional = {
  id: string;
  name: string;
};

export default function MensajesPage() {
  const router = useRouter();

  const [professional, setProfessional] =
    useState<Professional | null>(null);

  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: professionalData } = await supabase
      .from("professionals")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (!professionalData) {
      setLoading(false);
      return;
    }

    setProfessional(professionalData);

    const { data } = await supabase
      .from("professional_notifications")
      .select("*")
      .eq("professional_id", professionalData.id)
      .order("created_at", {
        ascending: false,
      });

    setNotifications(data || []);
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    await supabase
      .from("professional_notifications")
      .update({
        is_read: true,
      })
      .eq("id", id);

    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, is_read: true }
          : item
      )
    );
  };

  const unreadCount = notifications.filter(
    (item) => !item.is_read
  ).length;

  if (loading) {
    return (
      <div className="p-8">
        Cargando mensajes...
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-8">
      <button
        onClick={() => router.push("/dashboard")}
        className="font-bold mb-6"
      >
        ← Volver al dashboard
      </button>

      <h1 className="text-5xl font-black text-[#0B3B2E]">
        Centro de mensajes
      </h1>

      <p className="text-[#6B7280] mt-2">
        Profesional: {professional?.name}
      </p>

      <div className="mt-8 bg-white rounded-3xl border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black">
            Notificaciones
          </h2>

          <span className="bg-[#57B33E] text-white px-4 py-2 rounded-full text-sm font-bold">
            {unreadCount} sin leer
          </span>
        </div>

        {notifications.length === 0 && (
          <p className="text-[#6B7280]">
            No tienes mensajes.
          </p>
        )}

        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border mb-4 ${
              item.is_read
                ? "bg-white"
                : "bg-[#F4FAF1]"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-black">
                {item.title}
              </h3>

              {!item.is_read && (
                <button
                  onClick={() =>
                    markAsRead(item.id)
                  }
                  className="text-[#15803D] font-bold text-sm"
                >
                  Marcar leído
                </button>
              )}
            </div>

            <p className="mt-2 text-[#6B7280]">
              {item.message}
            </p>

            <p className="mt-3 text-xs text-[#9CA3AF]">
              {new Date(
                item.created_at
              ).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}