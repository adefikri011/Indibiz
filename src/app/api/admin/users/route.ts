import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  const serializable = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt.toISOString(),
  }));
  return NextResponse.json({ users: serializable });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  // Enforce ADMIN role server-side
  const user = await prisma.user.create({ data: { name, email, password: hashed, role: "ADMIN" } });

  return NextResponse.json({ user: { ...user, createdAt: user.createdAt.toISOString() } }, { status: 201 });
}
