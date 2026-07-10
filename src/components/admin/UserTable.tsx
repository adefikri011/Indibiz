"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type User = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
};

export default function UserTable({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string | null>(null);
  const [editPassword, setEditPassword] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    try {
      try {
        const res = await fetch("/api/admin/users");
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users);
        } else {
          const e = await res.json().catch(() => ({}));
          alert(e?.error ?? "Gagal memuat daftar user");
        }
      } catch (err: any) {
        alert("Network error: " + (err?.message ?? err));
      }
    } finally {
      setLoading(false);
    }
  }

  async function createUser() {
    if (!createEmail) {
      alert("Email wajib diisi");
      return;
    }
    setLoading(true);
    try {
      try {
        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: createName || null, email: createEmail, password: createPassword }),
        });
        if (res.ok) {
          const data = await res.json();
          setUsers((u) => [data.user, ...u]);
          setCreateName("");
          setCreateEmail("");
          setCreatePassword("");
          setIsCreateOpen(false);
        } else {
          const e = await res.json().catch(() => ({}));
          alert(e?.error ?? "Gagal membuat user");
        }
      } catch (err: any) {
        alert("Network error: " + (err?.message ?? err));
      }
    } finally {
      setLoading(false);
    }
  }

  function startEdit(user: User) {
    setEditId(user.id);
    setEditName(user.name);
  }

  async function saveEdit(id: string) {
    setLoading(true);
    try {
      try {
        const body: any = { name: editName };
        if (editPassword) body.password = editPassword;

        const res = await fetch(`/api/admin/users/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        if (res.ok) {
          const data = await res.json();
          setUsers((u) => u.map((x) => (x.id === id ? data.user : x)));
          setEditId(null);
          setEditName(null);
          setEditPassword(null);
          setIsEditOpen(false);
        } else {
          const e = await res.json().catch(() => ({}));
          alert(e?.error ?? "Gagal menyimpan perubahan");
        }
      } catch (err: any) {
        alert("Network error: " + (err?.message ?? err));
      }
    } finally {
      setLoading(false);
    }
  }

  async function removeUser(id: string) {
    setLoading(true);
    try {
      try {
        const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
        if (res.ok) {
          setUsers((u) => u.filter((x) => x.id !== id));
          setDeleteId(null);
        } else {
          const e = await res.json().catch(() => ({}));
          alert(e?.error ?? "Gagal menghapus user");
        }
      } catch (err: any) {
        alert("Network error: " + (err?.message ?? err));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <Button variant="secondary" size="sm" onClick={() => setIsCreateOpen(true)}>
            Tambah User
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={refresh} disabled={loading}>
            Refresh
          </Button>
        </div>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-6 py-4">Nama</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Dibuat</th>
            <th className="px-6 py-4">Aksi</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50 transition">
              <td className="px-6 py-4 font-semibold text-[#10182e]">{user.name ?? "-"}</td>
              <td className="px-6 py-4 text-slate-600">{user.email}</td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">ADMIN</span>
              </td>
              <td className="px-6 py-4 text-slate-500">{new Date(user.createdAt).toLocaleDateString("id-ID")}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(user.email)}>
                    Copy Email
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => { setEditId(user.id); setEditName(user.name); setIsEditOpen(true); }}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => setDeleteId(user.id)} disabled={loading}>
                    Hapus
                  </Button>
                </div>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                Belum ada user
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Create Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCreateOpen(false)} />

          <div className="relative w-full max-w-md rounded-3xl p-6 bg-white shadow-2xl" style={{ border: "1px solid #E2E8F0" }}>
            <button onClick={() => setIsCreateOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-2">Tambah User</h3>
            <p className="text-sm text-slate-600 mb-4">Masukkan data user baru.</p>

            <div className="flex flex-col gap-2">
              <input className="rounded-md border px-3 py-2 text-sm" placeholder="Nama" value={createName} onChange={(e) => setCreateName(e.target.value)} />
              <input className="rounded-md border px-3 py-2 text-sm" placeholder="Email" value={createEmail} onChange={(e) => setCreateEmail(e.target.value)} />
              <input className="rounded-md border px-3 py-2 text-sm" placeholder="Password" type="password" value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} />

              <div className="flex gap-3 mt-4">
                <button onClick={() => setIsCreateOpen(false)} className="flex-1 py-2 rounded-xl font-semibold border border-slate-200 text-slate-600 hover:bg-slate-100">
                  Batal
                </button>

                <Button className="flex-1" onClick={createUser} disabled={loading}>
                  Buat
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditOpen && editId && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsEditOpen(false)} />

          <div className="relative w-full max-w-md rounded-3xl p-6 bg-white shadow-2xl" style={{ border: "1px solid #E2E8F0" }}>
            <button onClick={() => setIsEditOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-2">Edit User</h3>
            <p className="text-sm text-slate-600 mb-4">Perbarui informasi user.</p>

            <div className="flex flex-col gap-2">
              <input className="rounded-md border px-3 py-2 text-sm" placeholder="Nama" value={editName ?? ""} onChange={(e) => setEditName(e.target.value)} />
              <input className="rounded-md border px-3 py-2 text-sm" placeholder="Reset Password (optional)" type="password" value={editPassword ?? ""} onChange={(e) => setEditPassword(e.target.value)} />

              <div className="flex gap-3 mt-4">
                <button onClick={() => setIsEditOpen(false)} className="flex-1 py-2 rounded-xl font-semibold border border-slate-200 text-slate-600 hover:bg-slate-100">
                  Batal
                </button>

                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => saveEdit(editId!)} disabled={loading}>
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteId(null)} />

          <div className="relative w-full max-w-md rounded-3xl p-6 bg-white shadow-2xl" style={{ border: "1px solid #E2E8F0" }}>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Hapus User</h3>
            <p className="text-sm text-slate-600 mb-4">Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak bisa dibatalkan.</p>

            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 rounded-xl font-semibold border border-slate-200 text-slate-600 hover:bg-slate-100">
                Batal
              </button>

              <Button className="flex-1" variant="destructive" onClick={() => removeUser(deleteId!)} disabled={loading}>
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
