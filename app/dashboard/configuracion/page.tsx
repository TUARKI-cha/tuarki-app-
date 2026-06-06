"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Bell,
  Briefcase,
  Camera,
  ChevronRight,
  Lock,
  LogOut,
  Mail,
  Save,
  Settings,
  ShieldCheck,
  User,
  WalletCards,
} from "lucide-react";

export default function ConfiguracionPage() {
  const router = useRouter();

  const [professionalId, setProfessionalId] = useState("");
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    city: "",
    bio: "",
    license_number: "",
    experience_years: "",
    specialties: "",
    experience_history: "",
    education: "",
    avatar_url: "",
    is_online: true,
    notification_whatsapp: true,
    notification_email: true,
  });

  useEffect(() => {
    loadProfessional();
  }, []);

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

    if (!data) return;

    setProfessionalId(data.id);

    setForm({
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      specialty: data.specialty || "",
      city: data.city || "",
      bio: data.bio || "",
      license_number: data.license_number || "",
      experience_years: data.experience_years?.toString() || "",
      specialties: data.specialties?.join(", ") || "",
      experience_history: data.experience_history || "",
      education: data.education || "",
      avatar_url: data.avatar_url || "",
      is_online: data.is_online ?? true,
      notification_whatsapp: data.notification_whatsapp ?? true,
      notification_email: data.notification_email ?? true,
    });
  };

  const updateField = (key: string, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveProfile = async () => {
    if (!professionalId) {
      alert("No se encontró el ID del profesional");
      return;
    }

    setSaving(true);

    const { data, error } = await supabase
      .from("professionals")
      .update({
        name: form.name,
        email: form.email,
        phone: form.phone,
        specialty: form.specialty,
        city: form.city,
        bio: form.bio,
        license_number: form.license_number,
        experience_years: Number(form.experience_years || 0),
        specialties: form.specialties
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        experience_history: form.experience_history,
        education: form.education,
        avatar_url: form.avatar_url,
        is_online: form.is_online,
        notification_whatsapp: form.notification_whatsapp,
        notification_email: form.notification_email,
        profile_completed: true,
      })
      .eq("id", professionalId)
      .select()
      .maybeSingle();

    setSaving(false);

    if (error) {
      console.log("ERROR UPDATE:", error);
      alert("No se pudo guardar la configuración");
      return;
    }

    if (!data) {
      alert("No se actualizó ningún registro.");
      return;
    }

    alert("Perfil actualizado correctamente");
    router.push("/dashboard");
  };

  const Toggle = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-14 h-8 rounded-full p-1 transition ${
        checked ? "bg-[#15803D]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`block w-6 h-6 bg-white rounded-full transition ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );

  const inputClass =
    "w-full border border-[#E5E7EB] rounded-2xl px-4 py-3 outline-none focus:border-[#57B33E] bg-white";

  const labelClass =
    "block text-sm font-bold text-[#6B7280] mb-2";

  return (
    <main className="min-h-screen bg-[#F5F5F3] px-8 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <button
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center gap-2 text-[#0B3B2E] font-bold hover:underline"
        >
          <ArrowLeft size={18} />
          Volver a YO-ARKI
        </button>

        <section className="bg-[#0B3B2E] text-white rounded-[32px] p-10 shadow-xl flex items-center justify-between">
          <div>
            <p className="text-[#7ED957] font-bold">Configuración</p>

            <h1 className="text-5xl font-black mt-2">
              Configuración
            </h1>

            <p className="mt-3 text-white/80 max-w-xl">
              Administra tu información personal, preferencias y ajustes de tu cuenta.
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center">
            <Settings className="text-[#57B33E]" size={32} />
          </div>
        </section>

        <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <User className="text-[#57B33E]" />
            <h2 className="text-2xl font-black text-[#0B3B2E]">
              Información profesional
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-10">
            <div className="flex flex-col items-center">
              <div className="relative">
                {form.avatar_url ? (
                  <img
                    src={form.avatar_url}
                    alt="Foto profesional"
                    className="w-36 h-36 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-36 h-36 rounded-full bg-[#E5E7EB] flex items-center justify-center">
                    <User size={52} className="text-[#9CA3AF]" />
                  </div>
                )}

                <div className="absolute bottom-1 right-1 w-11 h-11 rounded-full bg-[#57B33E] border-4 border-white flex items-center justify-center text-white">
                  <Camera size={18} />
                </div>
              </div>

              <p className="text-sm text-[#6B7280] mt-4 text-center">
                Pega aquí la URL de tu imagen de perfil.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>URL de imagen de perfil</label>
                <input
                  value={form.avatar_url}
                  onChange={(e) => updateField("avatar_url", e.target.value)}
                  placeholder="https://..."
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Nombre completo</label>
                  <input
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Cédula profesional</label>
                  <input
                    value={form.license_number}
                    onChange={(e) =>
                      updateField("license_number", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Especialidad</label>
                  <input
                    value={form.specialty}
                    onChange={(e) => updateField("specialty", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Años de experiencia</label>
                  <input
                    value={form.experience_years}
                    onChange={(e) =>
                      updateField("experience_years", e.target.value)
                    }
                    type="number"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Ciudad</label>
                  <input
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Teléfono</label>
                  <input
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Correo electrónico</label>
                  <input
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Biografía</label>
                  <textarea
                    value={form.bio}
                    onChange={(e) => updateField("bio", e.target.value)}
                    rows={5}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="text-[#57B33E]" />
            <h2 className="text-2xl font-black text-[#0B3B2E]">
              Preferencias profesionales
            </h2>
          </div>

          <label className={labelClass}>Servicios que ofreces</label>

          <div className="flex flex-wrap gap-3 mb-8">
            {[
              "Chat profesional",
              "Videollamada",
              "Revisión de planos",
              "Revisión de presupuesto",
            ].map((item) => (
              <span
                key={item}
                className="px-5 py-3 rounded-full bg-[#F4FAF1] text-[#0B3B2E] font-bold"
              >
                ✓ {item}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className={labelClass}>Disponibilidad</label>
              <select className={inputClass} defaultValue="Lun - Vie: 9:00 - 18:00">
                <option>Lun - Vie: 9:00 - 18:00</option>
                <option>Lun - Sáb: 9:00 - 18:00</option>
                <option>Todos los días</option>
                <option>Personalizado</option>
              </select>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <label className={labelClass}>Estado en plataforma</label>
                <p className="font-bold text-[#0B3B2E]">
                  {form.is_online
                    ? "Disponible para consultas"
                    : "No disponible"}
                </p>
              </div>

              <Toggle
                checked={form.is_online}
                onChange={(value) => updateField("is_online", value)}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Especialidades</label>
            <input
              value={form.specialties}
              onChange={(e) => updateField("specialties", e.target.value)}
              placeholder="Diseño arquitectónico, Supervisión de obra, Presupuestos"
              className={inputClass}
            />

            <div className="flex flex-wrap gap-3 mt-4">
              {form.specialties
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
                .map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-full bg-[#F4FAF1] text-[#0B3B2E] font-bold text-sm"
                  >
                    ✓ {item}
                  </span>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            <div>
              <label className={labelClass}>Experiencia profesional</label>
              <textarea
                value={form.experience_history}
                onChange={(e) =>
                  updateField("experience_history", e.target.value)
                }
                rows={9}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Educación</label>
              <textarea
                value={form.education}
                onChange={(e) => updateField("education", e.target.value)}
                rows={9}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <Bell className="text-[#57B33E]" />
            <h2 className="text-2xl font-black text-[#0B3B2E]">
              Notificaciones
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F4FAF1] flex items-center justify-center">
                  <WalletCards className="text-[#57B33E]" />
                </div>

                <div>
                  <p className="font-black">Notificaciones por WhatsApp</p>
                  <p className="text-sm text-[#6B7280]">
                    Recibe mensajes importantes por WhatsApp.
                  </p>
                </div>
              </div>

              <Toggle
                checked={form.notification_whatsapp}
                onChange={(value) =>
                  updateField("notification_whatsapp", value)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F4FAF1] flex items-center justify-center">
                  <Mail className="text-[#57B33E]" />
                </div>

                <div>
                  <p className="font-black">Notificaciones por correo</p>
                  <p className="text-sm text-[#6B7280]">
                    Recibe alertas y actualizaciones en tu correo.
                  </p>
                </div>
              </div>

              <Toggle
                checked={form.notification_email}
                onChange={(value) => updateField("notification_email", value)}
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-[32px] border border-[#E5E7EB] p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <Lock className="text-[#57B33E]" />
            <h2 className="text-2xl font-black text-[#0B3B2E]">
              Seguridad
            </h2>
          </div>

          <button
            onClick={() => alert("Cambio de contraseña pendiente de conectar.")}
            className="w-full flex items-center justify-between py-5 border-b border-[#E5E7EB]"
          >
            <div className="text-left">
              <p className="font-black">Cambiar contraseña</p>
              <p className="text-sm text-[#6B7280]">
                Actualiza tu contraseña de acceso.
              </p>
            </div>

            <ChevronRight />
          </button>

          <button
            onClick={() => alert("Sesiones activas pendiente de conectar.")}
            className="w-full flex items-center justify-between py-5 border-b border-[#E5E7EB]"
          >
            <div className="text-left">
              <p className="font-black">Sesiones activas</p>
              <p className="text-sm text-[#6B7280]">
                Administra los dispositivos donde has iniciado sesión.
              </p>
            </div>

            <ChevronRight />
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center justify-between py-5 text-red-600"
          >
            <div className="text-left">
              <p className="font-black">Cerrar sesión</p>
              <p className="text-sm text-red-400">
                Finaliza tu sesión actual en TuArki.
              </p>
            </div>

            <ChevronRight />
          </button>
        </section>

        <button
          onClick={saveProfile}
          disabled={saving}
          className="w-full bg-[#0B3B2E] text-white py-5 rounded-2xl font-black hover:bg-[#14513F] transition"
        >
          <Save className="inline mr-2" size={18} />
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </main>
  );
}