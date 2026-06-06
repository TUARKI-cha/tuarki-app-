"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  BarChart3,
  Wallet,
  Star,
  Smile,
  TrendingUp,
  ClipboardList,
} from "lucide-react";

type Consultation = {
  id: number;
  created_at: string | null;
  service: string | null;
  status: string | null;
  payment_status: string | null;
  assigned_professional: string | null;
};

type Professional = {
  id: string;
  name: string | null;
  rating: number | null;
  total_consultations: number | null;
  is_online: boolean | null;
};

export default function AdminEstadisticasPage() {
  const [consultas, setConsultas] = useState<Consultation[]>([]);
  const [profesionales, setProfesionales] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    const { data: consultasData, error: consultasError } = await supabase
      .from("consultations")
      .select(
        "id, created_at, service, status, payment_status, assigned_professional"
      )
      .order("created_at", { ascending: false });

    const { data: profesionalesData, error: profesionalesError } =
      await supabase
        .from("professionals")
        .select("id, name, rating, total_consultations, is_online")
        .order("rating", { ascending: false });

    if (consultasError) {
      console.error("Error cargando consultas:", consultasError);
    }

    if (profesionalesError) {
      console.error("Error cargando profesionales:", profesionalesError);
    }

    setConsultas(consultasData || []);
    setProfesionales(profesionalesData || []);
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

  function formatoMoneda(valor: number) {
    return valor.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    });
  }

  const inicioMes = new Date();
  inicioMes.setDate(1);
  inicioMes.setHours(0, 0, 0, 0);

  const consultasEsteMes = consultas.filter((consulta) => {
    if (!consulta.created_at) return false;
    return new Date(consulta.created_at) >= inicioMes;
  });

  const consultasPagadas = consultas.filter(
    (consulta) => consulta.payment_status === "paid"
  );

  const ingresosTotales = consultasPagadas.reduce(
    (acc, consulta) => acc + montoServicio(consulta.service),
    0
  );

  const ingresosEsteMes = consultasEsteMes
    .filter((consulta) => consulta.payment_status === "paid")
    .reduce((acc, consulta) => acc + montoServicio(consulta.service), 0);

  const promedioRating =
    profesionales.length > 0
      ? (
          profesionales.reduce(
            (acc, profesional) => acc + Number(profesional.rating || 0),
            0
          ) / profesionales.length
        ).toFixed(1)
      : "0.0";

  const resumen = [
    {
      title: "Consultas este mes",
      value: consultasEsteMes.length,
      icon: ClipboardList,
    },
    {
      title: "Ingresos este mes",
      value: formatoMoneda(ingresosEsteMes),
      icon: Wallet,
    },
    {
      title: "Calificación promedio",
      value: promedioRating,
      icon: Star,
    },
    {
      title: "Satisfacción TuArki",
      value: "Pendiente",
      icon: Smile,
    },
  ];

  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const consultasPorMes = meses.map((mes, index) => {
    const cantidad = consultas.filter((consulta) => {
      if (!consulta.created_at) return false;
      return new Date(consulta.created_at).getMonth() === index;
    }).length;

    return {
      mes,
      cantidad,
    };
  });

  const maxConsultas = Math.max(
    ...consultasPorMes.map((item) => item.cantidad),
    1
  );

  const conteoServicios = consultas.reduce<Record<string, number>>(
    (acc, consulta) => {
      const servicio = consulta.service || "Sin servicio";
      acc[servicio] = (acc[servicio] || 0) + 1;
      return acc;
    },
    {}
  );

  const servicios = Object.entries(conteoServicios)
    .map(([nombre, cantidad]) => ({
      nombre,
      cantidad,
      porcentaje:
        consultas.length > 0
          ? Math.round((cantidad / consultas.length) * 100)
          : 0,
    }))
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 5);

  function ingresosPorProfesional(nombre: string | null) {
    if (!nombre) return 0;

    return consultasPagadas
      .filter((consulta) => consulta.assigned_professional === nombre)
      .reduce((acc, consulta) => acc + montoServicio(consulta.service), 0);
  }

  const topProfesionales = profesionales.slice(0, 5);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-[#0D3B2E]">Estadísticas</h1>
        <p className="text-gray-500 mt-1">
          Analiza crecimiento, ingresos, servicios y satisfacción general.
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="text-[#1E7A5A]" />

            <div>
              <h2 className="text-xl font-black text-[#0D3B2E]">
                Consultas por mes
              </h2>
              <p className="text-sm text-gray-500">
                Crecimiento mensual de la plataforma
              </p>
            </div>
          </div>

          <div className="h-72 flex items-end gap-3">
            {consultasPorMes.map((item) => (
              <div
                key={item.mes}
                className="flex-1 flex flex-col items-center gap-3"
              >
                <div
                  className="w-full rounded-t-2xl bg-[#7ED957]"
                  style={{
                    height: `${Math.max(
                      (item.cantidad / maxConsultas) * 100,
                      item.cantidad > 0 ? 8 : 0
                    )}%`,
                  }}
                />

                <span className="text-xs font-bold text-[#0D3B2E]">
                  {item.mes}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0D3B2E] rounded-3xl p-8 text-white">
          <h2 className="text-xl font-black">Servicios más usados</h2>
          <p className="text-sm text-white/60 mt-1">
            Distribución real por tipo de servicio
          </p>

          <div className="mt-8 space-y-6">
            {servicios.length === 0 && (
              <p className="text-sm text-white/60">Sin datos todavía.</p>
            )}

            {servicios.map((item) => (
              <div key={item.nombre}>
                <div className="flex justify-between text-sm mb-2">
                  <span>{item.nombre}</span>
                  <span className="font-black text-[#7ED957]">
                    {item.porcentaje}%
                  </span>
                </div>

                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#7ED957] rounded-full"
                    style={{ width: `${item.porcentaje}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-white/10 p-5">
            <p className="text-sm text-white/60">Ingresos acumulados</p>
            <p className="text-4xl font-black text-[#7ED957] mt-1">
              {formatoMoneda(ingresosTotales)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="text-[#1E7A5A]" />

          <div>
            <h2 className="text-xl font-black text-[#0D3B2E]">
              Top profesionales
            </h2>
            <p className="text-sm text-gray-500">
              Especialistas con mejor desempeño registrado
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/5">
          <table className="w-full text-left">
            <thead className="bg-[#F5F5F3] text-[#0D3B2E]">
              <tr>
                <th className="p-4 text-sm">Nombre</th>
                <th className="p-4 text-sm">Consultas</th>
                <th className="p-4 text-sm">Calificación</th>
                <th className="p-4 text-sm">Ingresos generados</th>
              </tr>
            </thead>

            <tbody>
              {topProfesionales.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-black/5 hover:bg-[#F5F5F3]"
                >
                  <td className="p-4 font-black text-[#0D3B2E]">
                    {item.name || "Sin nombre"}
                  </td>

                  <td className="p-4">
                    {item.total_consultations || 0}
                  </td>

                  <td className="p-4">⭐ {item.rating || "0.0"}</td>

                  <td className="p-4 font-black text-[#1E7A5A]">
                    {formatoMoneda(ingresosPorProfesional(item.name))}
                  </td>
                </tr>
              ))}

              {!loading && topProfesionales.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-500">
                    No hay profesionales registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-400 mt-5">
          Satisfacción TuArki queda pendiente hasta crear la medición general del servicio.
        </p>
      </div>
    </div>
  );
}