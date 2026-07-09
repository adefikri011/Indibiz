import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <Link
      href="https://wa.me/6285189300718?text=Halo,%20saya%20tertarik%20dengan%20INDIBIZ"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
      aria-label="Chat WhatsApp"
    >
      {/* Efek Pulse (Berdenyut) */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-50"></span>
      
      {/* Ikon WA */}
      <MessageCircle className="w-7 h-7 relative z-10 fill-white" />
      
      {/* Tooltip saat di-hover (Desktop only) */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-foreground text-sm font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none hidden md:block">
        Chat Kami!
      </span>
    </Link>
  );
}