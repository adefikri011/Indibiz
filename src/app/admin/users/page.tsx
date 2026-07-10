import { prisma } from "@/lib/prisma";
import UserTable from "@/components/admin/UserTable";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const serializableUsers = users.map((u) => ({
    id: u.id,
    name: u.name ?? null,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt.toISOString(),
  }));

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#10182e]">Manajemen User</h1>
        <p className="mt-1 text-sm text-slate-500">Daftar semua user yang terdaftar di sistem</p>
      </div>

      {/* User table + CRUD */}
      <UserTable initialUsers={serializableUsers} />
    </div>
  );
}