import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd] text-[#10182e]">
      <div className="flex min-h-screen">
        <AdminSidebar />

        {/*
          pt-16     → beri ruang untuk mobile topbar (h-16)
          lg:pt-0   → di desktop tidak perlu karena topbar tidak tampil
        */}
        <main className="min-w-0 flex-1 p-6 pt-20 lg:p-10 lg:pt-10">
          {children}
        </main>
      </div>
    </div>
  );
}