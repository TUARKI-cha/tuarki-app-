"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Specialists() {
  const [professionals, setProfessionals] = useState<any[]>([]);

  useEffect(() => {
    loadProfessionals();
  }, []);

  const loadProfessionals = async () => {
    const { data, error } = await supabase
      .from("professionals")
      .select("*")
      .order("rating", { ascending: false })
      .limit(3);

    if (error) {
      console.log(error);
      return;
    }

    setProfessionals(data || []);
  };

  return (
    <section className="px-10 py-28 bg-white">
      <div className="flex items-end justify-between mb-20">
        <div>
          <p className="text-[#1E7A5A] font-medium mb-4">
            Especialistas TuArki
          </p>

          <h2 className="text-5xl font-bold text-[#0D3B2E] max-w-3xl leading-tight">
            Profesionales reales listos para ayudarte.
          </h2>
        </div>

        <button className="border border-[#0D3B2E] px-6 py-3 rounded-full font-semibold hover:bg-[#0D3B2E] hover:text-white transition-all duration-300">
          Ver todos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {professionals.map((pro, index) => (
          <div
            key={pro.id}
            className={`rounded-[35px] p-8 hover:shadow-xl transition-all duration-300 ${
              index === 1
                ? "bg-[#0D3B2E] text-white"
                : "bg-[#F5F5F3]"
            }`}
          >
            {pro.avatar_url ? (
              <img
                src={pro.avatar_url}
                alt={pro.name}
                className="w-24 h-24 rounded-full object-cover mb-6"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#D9D9D9] mb-6" />
            )}

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3
                  className={`text-2xl font-bold ${
                    index === 1 ? "text-white" : "text-[#0D3B2E]"
                  }`}
                >
                  {pro.name}
                </h3>

                <p
                  className={
                    index === 1 ? "text-[#7ED957]" : "text-[#1E7A5A]"
                  }
                >
                  {pro.specialty || "Especialista"}
                </p>
              </div>

              <div
                className={`w-4 h-4 rounded-full ${
                  pro.is_online ? "bg-[#7ED957]" : "bg-[#EF4444]"
                }`}
              />
            </div>

            <p
              className={`leading-relaxed mb-6 ${
                index === 1 ? "opacity-90" : "text-[#4B6358]"
              }`}
            >
              {pro.bio ||
                "Profesional verificado listo para ayudarte con tu consulta."}
            </p>

            <div className="flex items-center justify-between">
              <p className="font-semibold">
                {pro.rating || 5} ⭐
              </p>

              <p
                className={`text-sm ${
                  index === 1 ? "opacity-80" : "text-[#4B6358]"
                }`}
              >
                {pro.is_online ? "Disponible ahora" : "No disponible"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}