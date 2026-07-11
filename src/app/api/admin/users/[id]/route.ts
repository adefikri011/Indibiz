import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("DELETE /api/admin/users/:id error", e);
    if (e?.code === "P2025") {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ error: "Gagal menghapus user" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { name, password } = body;
    
    if (!id) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const data: any = { name };
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({ where: { id }, data });
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt.toISOString() } });
  } catch (e: any) {
    console.error("PUT /api/admin/users/:id error", e);
    if (e?.code === "P2025") {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ error: "Gagal menyimpan perubahan" }, { status: 500 });
  }
}
