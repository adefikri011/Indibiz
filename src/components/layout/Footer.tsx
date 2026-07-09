import Container from "@/components/ui/Container";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white py-12 border-t border-white/10">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold">
              <span className="text-primary">i</span>ndibiz
            </h3>
            <p className="text-gray-400 text-sm mt-2 max-w-xs">
              Internet Digital Bisnis by Telkom Indonesia. Solusi internet andal untuk semua kebutuhan bisnis Anda.
            </p>
          </div>

          {/* Quick Links & Contact */}
          <div className="flex flex-col md:flex-row gap-8 text-center md:text-left">
            <div>
              <h4 className="font-semibold mb-3 text-gray-200">Menu</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#pricing" className="hover:text-white transition">Paket Harga</Link></li>
                <li><Link href="https://wa.me/6285189300718" target="_blank" className="hover:text-white transition">Kontak</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-gray-200">Kontak</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>WA: +62 851-8930-0718</li>
                <li>indibiz.co.id</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Copyright Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} INDIBIZ. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}