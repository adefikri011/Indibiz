"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Users,
  Menu,
  X,
  FilePenLine,
  LayoutDashboard,
  LogOut,
  PanelsTopLeft,
} from "lucide-react";
import { useState, useEffect } from "react";

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Pricing", href: "/admin/landing", icon: FilePenLine },
  { label: "User", href: "/admin/users", icon: Users },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Brand */}
      <div className="border-b border-slate-100 px-6 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f62d6]">
              <PanelsTopLeft className="h-5 w-5 text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#10182e]">
                indibiz
              </h1>
              <p className="text-xs text-slate-500">
                Landing Page Admin
              </p>
            </div>
          </Link>

          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-5 w-5 text-slate-500" />
            </button>
          )}
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
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
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-[#edf3ff] text-[#2f62d6]"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    active ? "text-[#2f62d6]" : "text-slate-400"
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="border-t border-slate-100 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Tutup saat pindah halaman
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ✅ BURGER BUTTON (PASTI MUNCUL DI MOBILE) */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-[100] rounded-lg bg-white p-2 shadow-lg ring-1 ring-slate-200 lg:hidden"
      >
        <Menu className="h-6 w-6 text-slate-700" />
      </button>

      {/* ✅ DESKTOP SIDEBAR */}
      <aside className="hidden h-screen w-[280px] shrink-0 border-r border-slate-200 bg-white lg:flex">
        <SidebarContent />
      </aside>

      {/* ✅ OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[90] bg-black/40 lg:hidden"
        />
      )}

      {/* ✅ MOBILE DRAWER */}
      <aside
        className={`fixed inset-y-0 left-0 z-[100] w-[280px] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent onClose={() => setOpen(false)} />
      </aside>
    </>
  );
}