"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      alert("Email atau password salah");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fb] via-[#eef2f9] to-[#e6ecf7] px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-gray-100">
        
        {/* Logo / Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Panel
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Masuk untuk mengelola landing page
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              required
              placeholder="admin@email.com"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition shadow-md"
          >
            {loading ? "Memproses..." : "Masuk ke Dashboard"}
          </button>
        </form>

        {/* Footer kecil */}
        <div className="mt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Indibiz Admin
        </div>
      </div>
    </div>
  );
}