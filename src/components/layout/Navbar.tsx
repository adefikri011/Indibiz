import Container from "@/components/ui/Container";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold text-foreground">
              <span className="text-primary">i</span>ndibiz
            </span>
          </Link>

          {/* Tombol WA */}
          <Link
            href="https://wa.me/6285189300718"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 shadow-sm"
          >
            Hubungi Kami
          </Link>
        </div>
      </Container>
    </header>
  );
}