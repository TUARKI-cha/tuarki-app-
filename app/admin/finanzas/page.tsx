"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Search,
  Wallet,
  TrendingUp,
  Landmark,
  BadgeDollarSign,
  Eye,
  RotateCcw,
} from "lucide-react";

type Consultation = {
  id: number;
  created_at: string | null;
  name: string | null;
  service: string | null;
  assigned_professional: string | null;
  payment_status: string | null;
};

export default function AdminFinanzasPage() {
  const [movimientos, setMovimientos] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarMovimientos();
  }, []);

  async function cargarMovimientos() {
    const { data, error } = await supabase
      .from("consultations")
      .select("id, created_at, name, service, assigned_professional, payment_status")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error cargando finanzas:", error);
      setLoading(false);
      return;
    }

    setMovimientos(data || []);
    setLoading(false);
  }

  function montoServicio(service: string | null) {
    const servicio = service?.toLowerCase() || "";

    if (servicio.includes("videollamada")) return 250;
    if (servicio.includes("revisión")) return 500;
    if (servicio.includes("presupuesto")) return 500;
    if (servicio.includes("chat")) return 200;

    return 0;
  }

  function comisionTuArki(service: string | null) {
    const servicio = service?.toLowerCase() || "";

    if (servicio.includes("revisión")) return 100;
    if (servicio.includes("presupuesto")) return 100;

    return 50;
  }

  function formatoMoneda(valor: number) {
    return valor.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    });
  }

  function formatearFecha(fecha: string | null) {
    if (!fecha) return "Sin fecha";

    return new Date(fecha).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const pagados = movimientos.filter((m) => m.payment_status === "paid");

  const ingresosTotales = pagados.reduce(
    (acc, item) => acc + montoServicio(item.service),
    0
  );

  const comisionTotal = pagados.reduce(
    (acc, item) => acc + comisionTuArki(item.service),
    0
  );

  const pagosProfesionales = ingresosTotales - comisionTotal;

  const hoy = new Date();
  const ingresosHoy = pagados
    .filter((item) => {
      if (!item.created_at) return false;
      const fecha = new Date(item.created_at);
      return fecha.toDateString() === hoy.toDateString();
    })
    .reduce((acc, item) => acc + montoServicio(item.service), 0);

  const inicioMes = new Date();
  inicioMes.setDate(1);
  inicioMes.setHours(0, 0, 0, 0);

  const ingresosMes = pagados
    .filter((item) => {
      if (!item.created_at) return false;
      return new Date(item.created_at) >= inicioMes;
    })
    .reduce((acc, item) => acc + montoServicio(item.service), 0);

  const resumen = [
    {
      title: "Ingresos del día",
      value: formatoMoneda(ingresosHoy),
      icon: Wallet,
    },
    {
      title: "Ingresos del mes",
      value: formatoMoneda(ingresosMes),
      icon: TrendingUp,
    },
    {
      title: "Comisión TuArki",
      value: formatoMoneda(comisionTotal),
      icon: BadgeDollarSign,
    },
    {
      title: "Pagos a profesionales",
      value: formatoMoneda(pagosProfesionales),
      icon: Landmark,
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-[#0D3B2E]">Finanzas</h1>

        <p className="text-gray-500 mt-1">
          Monitorea ingresos, pagos y comisiones reales de la plataforma.
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

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
          <div className="flex flex-col gap-5">
            <div className="relative max-w-md">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Buscar movimiento..."
                className="w-full rounded-2xl border border-black/10 bg-[#F5F5F3] py-3 pl-12 pr-4 outline-none focus:border-[#7ED957]"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {["Todos", "Pagados", "Pendientes", "Reembolsos", "Comisiones"].map(
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
                  <th className="p-4 text-sm">Usuario</th>
                  <th className="p-4 text-sm">Profesional</th>
                  <th className="p-4 text-sm">Servicio</th>
                  <th className="p-4 text-sm">Monto</th>
                  <th className="p-4 text-sm">Comisión</th>
                  <th className="p-4 text-sm">Estado</th>
                  <th className="p-4 text-sm">Fecha</th>
                  <th className="p-4 text-sm text-right">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={9} className="p-6 text-center text-gray-500">
                      Cargando movimientos...
                    </td>
                  </tr>
                )}

                {!loading &&
                  movimientos.map((item) => {
                    const monto = montoServicio(item.service);
                    const comision = comisionTuArki(item.service);

                    return (
                      <tr
                        key={item.id}
                        className="border-t border-black/5 hover:bg-[#F5F5F3]"
                      >
                        <td className="p-4 font-black">#{item.id}</td>
                        <td className="p-4">{item.name || "Sin usuario"}</td>
                        <td className="p-4">
                          {item.assigned_professional || "Sin asignar"}
                        </td>
                        <td className="p-4">{item.service || "Sin servicio"}</td>
                        <td className="p-4 font-bold">
                          {formatoMoneda(monto)}
                        </td>
                        <td className="p-4 text-[#1E7A5A] font-bold">
                          {formatoMoneda(comision)}
                        </td>
                        <td className="p-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-black ${
                              item.payment_status === "paid"
                                ? "bg-[#7ED957]/20 text-[#1E7A5A]"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {item.payment_status === "paid"
                              ? "Pagado"
                              : "Pendiente"}
                          </span>
                        </td>
                        <td className="p-4">{formatearFecha(item.created_at)}</td>
                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                            <button className="w-9 h-9 rounded-xl bg-[#F5F5F3] flex items-center justify-center hover:bg-[#7ED957]/20">
                              <Eye size={17} />
                            </button>

                            <button className="w-9 h-9 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center hover:bg-yellow-100">
                              <RotateCcw size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0D3B2E] rounded-3xl p-8 text-white">
          <h2 className="text-xl font-black">Resumen financiero</h2>

          <div className="mt-8 space-y-6">
            <div>
              <p className="text-white/60 text-sm">Ingresos hoy</p>
              <p className="text-3xl font-black">
                {formatoMoneda(ingresosHoy)}
              </p>
            </div>

            <div>
              <p className="text-white/60 text-sm">Ingresos mes</p>
              <p className="text-3xl font-black">
                {formatoMoneda(ingresosMes)}
              </p>
            </div>

            <div>
              <p className="text-white/60 text-sm">Ingresos acumulados</p>
              <p className="text-3xl font-black">
                {formatoMoneda(ingresosTotales)}
              </p>
            </div>

            <div>
              <p className="text-white/60 text-sm">Comisión acumulada</p>
              <p className="text-3xl font-black text-[#7ED957]">
                {formatoMoneda(comisionTotal)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}