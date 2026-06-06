"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  UserCheck,
  Wallet,
  Headphones,
  BarChart3,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Consultas", href: "/admin/consultas", icon: ClipboardList },
    { name: "Profesionales", href: "/admin/profesionales", icon: UserCheck },
    { name: "Usuarios", href: "/admin/usuarios", icon: Users },
    { name: "Finanzas", href: "/admin/finanzas", icon: Wallet },
    { name: "Soporte", href: "/admin/soporte", icon: Headphones },
    { name: "Estadísticas", href: "/admin/estadisticas", icon: BarChart3 },
    { name: "Configuración", href: "/admin/configuracion", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex">
      <aside className="w-[280px] shrink-0 bg-[#0D3B2E] text-white flex flex-col px-6 py-7">
        <div className="mb-10">
          <h1 className="text-3xl font-black leading-none">
            Tu<span className="text-[#7ED957]">Arki</span>
          </h1>
          <p className="text-sm text-white/60 mt-2">Panel administrativo</p>
        </div>

        <nav className="flex-1 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#7ED957] text-[#0D3B2E] shadow-sm"
                    : "text-white/85 hover:bg-[#1E7A5A] hover:text-white"
                }`}
              >
                <Icon size={19} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <button className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/10 transition">
          <LogOut size={19} />
          Cerrar sesión
        </button>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="h-24 bg-white border-b border-black/5 flex items-center justify-between px-10">
          <div>
            <h2 className="text-2xl font-black text-[#0D3B2E]">
              Panel Administrativo
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Control central de operaciones TuArki
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative rounded-full bg-[#F5F5F3] p-3">
              <Bell size={20} className="text-[#0D3B2E]" />
              <span className="absolute -top-1 -right-1 bg-[#7ED957] text-[#0D3B2E] text-xs font-black rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#0D3B2E] text-[#7ED957] flex items-center justify-center font-black">
                AT
              </div>

              <div>
                <p className="text-sm font-black text-[#0D3B2E]">
                  Admin TuArki
                </p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
            </div>
          </div>
        </header>

        <section className="p-10">{children}</section>
      </main>
    </div>
  );
}