import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    const serializable = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt.toISOString(),
    }));
    return NextResponse.json({ users: serializable });
  } catch (error: any) {
    console.error("GET /api/admin/users error", error);
    if (error?.name === "PrismaClientInitializationError") {
      return NextResponse.json({ error: "Database connection error" }, { status: 500 });
    }
    return NextResponse.json({ error: "Gagal memuat daftar user" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password harus diisi" }, { status: 400 });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Enforce ADMIN role server-side
    const user = await prisma.user.create({ data: { name, email, password: hashed, role: "ADMIN" } });

    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt.toISOString() } }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/admin/users error", error);
    if (error?.name === "PrismaClientInitializationError") {
      return NextResponse.json({ error: "Database connection error" }, { status: 500 });
    }
    return NextResponse.json({ error: "Gagal membuat user" }, { status: 500 });
  }
}
