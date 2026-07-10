"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  FilePenLine,
  LayoutDashboard,
  LogOut,
  PanelsTopLeft,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Pricing",
    href: "/admin/landing",
    icon: FilePenLine,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
      {/* Brand */}
      <div className="border-b border-slate-100 px-6 py-6">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-[#2f62d6] shadow-[0_8px_20px_rgba(47,98,214,0.25)]">
            <PanelsTopLeft className="size-5 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#10182e]">
              indibiz
            </h1>
            <p className="mt-0.5 text-xs text-slate-500">
              Landing Page Admin
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Menu utama
        </p>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-[#edf3ff] text-[#2f62d6] shadow-[inset_3px_0_0_#2f62d6]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#10182e]"
                }`}
              >
                <Icon
                  className={`size-5 transition-colors ${
                    active
                      ? "text-[#2f62d6]"
                      : "text-slate-400 group-hover:text-[#2f62d6]"
                  }`}
                />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Admin & logout */}
      <div className="border-t border-slate-100 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-[#f7f9fd] p-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-[#2f62d6] text-sm font-bold text-white">
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#10182e]">
              Administrator
            </p>
            <p className="truncate text-xs text-slate-500">
              admin@gmail.com
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="size-4" />
          Keluar
        </button>
      </div>
    </aside>
  );
}