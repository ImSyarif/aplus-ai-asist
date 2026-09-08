import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Bot, User, Sparkles, Loader2, X, MessageSquare, 
  MapPin, Phone, ShieldCheck, Wrench, Laptop, HardDrive, 
  CheckCircle2, Menu, Mail, History, Award, Trash2
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

const INITIAL_MESSAGE: Message = {
  id: 'welcome-msg',
  sender: 'bot',
  text: 'Halo! Selamat datang di APLUSCOM Kotamobagu. Saya Aplus AI, siap membantu Anda terkait rekomendasi laptop, rakitan PC, aksesoris, atau konsultasi servis komputer. Ada yang bisa dibantu?',
};

const STORAGE_KEY = 'aplus_chat_history';

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // 1. Inisialisasi messages langsung dari localStorage (jika ada)
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Gagal membaca chat dari localStorage:', e);
    }
    return [INITIAL_MESSAGE];
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 2. Simpan messages ke localStorage secara otomatis setiap kali ada perubahan
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Gagal menyimpan chat ke localStorage:', e);
    }
  }, [messages]);

  useEffect(() => {
    if (isChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isChatOpen]);

  // Fungsi untuk membersihkan riwayat obrolan
  const handleClearChat = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus seluruh riwayat obrolan?')) {
      const resetMessages = [INITIAL_MESSAGE];
      setMessages(resetMessages);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resetMessages));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage || loading) return;

    const newMsgId = Date.now().toString();
    setInput('');
    setMessages((prev) => [...prev, { id: newMsgId, sender: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('https://aplus-ai-asist.vercel.app/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: response.ok ? data.text : 'Maaf, terjadi kesalahan pada server backend.',
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Gagal terhubung ke backend. Pastikan server Backend berjalan di port 5000.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white overflow-x-hidden">
      
      {/* 1. NAVBAR FULL-WIDTH */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="w-full px-4 md:px-12 lg:px-16 py-3 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <img 
              src="/logo-apluscom.png" 
              alt="APLUSCOM Logo" 
              className="w-10 h-10 object-contain rounded-full border border-sky-500/30"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=A+';
              }}
            />
            <div>
              <span className="font-black text-lg sm:text-xl tracking-tight text-white">
                APLUS<span className="text-sky-400">COM</span>
              </span>
              <span className="block text-[9px] text-slate-400 tracking-widest font-semibold">KOTAMOBAGU</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-10 text-sm font-medium text-slate-300">
            <a href="#home" className="hover:text-sky-400 transition-colors">Beranda</a>
            <a href="#services" className="hover:text-sky-400 transition-colors">Layanan & Produk</a>
            <a href="#history" className="hover:text-sky-400 transition-colors">Sejarah</a>
            <a href="#about" className="hover:text-sky-400 transition-colors">Profil Direktur</a>
            <a href="#contact" className="hover:text-sky-400 transition-colors">Kontak</a>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsChatOpen(true)}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-sky-600/30 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>Tanya Aplus AI</span>
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-4 space-y-3">
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-300 hover:text-sky-400 py-1 text-sm">Beranda</a>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-300 hover:text-sky-400 py-1 text-sm">Layanan & Produk</a>
            <a href="#history" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-300 hover:text-sky-400 py-1 text-sm">Sejarah Toko</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-300 hover:text-sky-400 py-1 text-sm">Profil Direktur</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-300 hover:text-sky-400 py-1 text-sm">Kontak & Lokasi</a>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION FULL SCREEN */}
      <section id="home" className="min-h-screen pt-32 pb-20 px-6 md:px-16 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 md:w-225 h-150 md:h-225 bg-sky-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs md:text-sm font-semibold mb-8">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" /> Sales • Services • Maintenance
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight md:leading-none mb-6">
            Integrasi Teknologi Terdepan, <br className="hidden md:inline"/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-blue-500 to-indigo-500">
              Solusi IT Terpercaya
            </span> Kotamobagu
          </h1>
          
          <p className="text-slate-400 text-base sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Pusat penjualan laptop, rakitan PC kustom, perbaikan hardware, serta pemeliharaan sistem yang dikelola secara profesional di Kotamobagu.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://wa.me/6289517477422" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-base px-9 py-4 rounded-xl shadow-xl shadow-sky-600/30 transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5" /> Hubungi WhatsApp
            </a>
            
            <button 
              onClick={() => setIsChatOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-base px-9 py-4 rounded-xl transition-all hover:scale-105"
            >
              <Bot className="w-5 h-5 text-sky-400" /> Konsultasi AI Assistant
            </button>
          </div>
        </div>
      </section>

      {/* 3. LAYANAN UNGGULAN (FULL-WIDTH) */}
      <section id="services" className="py-24 px-6 md:px-16 bg-slate-900/50 border-y border-slate-800">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Layanan & Spesialisasi Utama</h2>
            <p className="text-slate-400 text-sm md:text-base">Standar kualitas terbaik "A+" untuk seluruh kebutuhan komputasi Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/60 p-8 md:p-10 rounded-3xl border border-slate-700/60 hover:border-sky-500/50 transition-all hover:-translate-y-1">
              <div className="p-4 bg-sky-500/10 text-sky-400 rounded-2xl w-fit mb-6">
                <Laptop className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Penjualan Laptop & Aksesoris</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Menyediakan laptop kerja, perkuliahan, hingga gaming bergaransi resmi beserta sparepart & aksesoris komputer pilihan.
              </p>
            </div>

            <div className="bg-slate-800/60 p-8 md:p-10 rounded-3xl border border-slate-700/60 hover:border-sky-500/50 transition-all hover:-translate-y-1">
              <div className="p-4 bg-sky-500/10 text-sky-400 rounded-2xl w-fit mb-6">
                <HardDrive className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Custom Build Rakitan PC</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Perakitan PC disesuaikan budget: Rig Gaming High-End, Workstation Content Creator, hingga PC Perkantoran efisien.
              </p>
            </div>

            <div className="bg-slate-800/60 p-8 md:p-10 rounded-3xl border border-slate-700/60 hover:border-sky-500/50 transition-all hover:-translate-y-1">
              <div className="p-4 bg-sky-500/10 text-sky-400 rounded-2xl w-fit mb-6">
                <Wrench className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Services & Maintenance</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Pembersihan internal, pergantian thermal paste, optimasi OS/Software, hingga perbaikan masalah teknis hardware.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEJARAH SINGKAT TOKO */}
      <section id="history" className="py-24 px-6 md:px-16">
        <div className="w-full max-w-7xl mx-auto bg-linear-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 md:p-14 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 text-sky-400 font-semibold text-xs md:text-sm mb-4">
            <History className="w-5 h-5" /> SEJARAH APLUSCOM
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Berdiri Awal Tahun 2026</h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
            Berdiri pada awal **Januari 2026**, **APLUSCOM Kotamobagu** (Persiapan legalitas **PT APLUS COMPUTER KOTAMOBAGU**) lahir dari visi untuk menghadirkan pusat layanan teknologi modern di Wilayah Bolaang Mongondow.
          </p>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Nama **APLUSCOM** disingkat sebagai brand utama yang melambangkan komitmen nilai **"A+"** (standar kualitas tertinggi) dalam setiap produk dan layanan komputasi, dipadukan dengan implementasi integrasi AI Assistant pertama di Kotamobagu.
          </p>
        </div>
      </section>

      {/* 5. PROFIL DIREKTUR & KONTAK */}
      <section id="about" className="py-24 px-6 md:px-16 bg-slate-900/30">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Kartu Profil Pemilik ELEGAN (Span 7) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-8 md:p-10 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl">
            {/* Wrapper Foto Portrait 3:4 Proposional */}
            <div className="relative shrink-0 w-48 sm:w-56 aspect-3/4 rounded-2xl overflow-hidden border-2 border-sky-500/40 shadow-2xl shadow-sky-500/10 group">
              <img 
                src="/4x6.jpg" 
                alt="Moh. As Syarif Morad, S.Kom." 
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=Syarif+S.Kom';
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold mb-3">
                <Award className="w-4 h-4" /> CEO / DIREKTUR UTAMA
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-1">MOH. AS SYARIF MORAD, S.Kom.</h3>
              <p className="text-sm text-sky-400 font-semibold mb-4">Syarif (25 Tahun) • Fullstack Developer & IT Consultant</p>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6">
                Lulusan **STMIK Multicom Bolaang Mongondow** berpengalaman dalam pengembangan perangkat lunak modern (**MERN Stack & Node.js**) serta integrasi kecerdasan buatan.
              </p>
              <div className="space-y-2 text-xs md:text-sm text-slate-300">
                <div className="flex items-center justify-center md:justify-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" /> Spesialis MERN Stack & AI API
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" /> Konsultasi IT Transparan & Jujur
                </div>
              </div>
            </div>
          </div>

          {/* Kartu Kontak & Lokasi (Span 5) */}
          <div id="contact" className="lg:col-span-5 bg-slate-900 border border-slate-800 p-8 md:p-10 rounded-3xl flex flex-col justify-between space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4">Informasi Kontak & Lokasi Toko</h3>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-sky-500/10 text-sky-400 rounded-2xl shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Alamat Lengkap Toko</h4>
                  <p className="text-slate-400 text-xs md:text-sm mt-1 leading-relaxed">
                    Jl. Gelora Togop, Kelurahan Kotamobagu, Kecamatan Kotamobagu Utara, Kota Kotamobagu, Sulawesi Utara (Depan Gereja Alkitab Anugerah "Tesalonika" Kotamobagu)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-sky-500/10 text-sky-400 rounded-2xl shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">WhatsApp Bisnis</h4>
                  <a href="https://wa.me/6289517477422" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline text-xs md:text-sm mt-0.5 block font-medium">
                    089517477422
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-sky-500/10 text-sky-400 rounded-2xl shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Email Resmi</h4>
                  <a href="mailto:apluscom365@hotmail.com" className="text-slate-400 text-xs md:text-sm mt-0.5 block">
                    apluscom365@hotmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-sky-500/10 text-sky-400 rounded-2xl shrink-0">
                  <FacebookIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Facebook Resmi</h4>
                  <a href="https://www.facebook.com/profile.php?id=61582035609614" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline text-xs md:text-sm mt-0.5 block">
                    APLUSCOM Kotamobagu Page
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center text-xs md:text-sm text-slate-500 px-6">
        <p>© 2026 APLUSCOM Kotamobagu (PT APLUS COMPUTER KOTAMOBAGU). Directed by Moh. As Syarif Morad, S.Kom.</p>
      </footer>

      {/* 6. FLOATING AI CHATBOT WIDGET */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-3 bg-sky-600 hover:bg-sky-500 text-white p-4 rounded-full shadow-2xl shadow-sky-500/50 transition-all transform hover:scale-105"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="hidden sm:inline font-semibold text-sm pr-1">Tanya Aplus AI</span>
          </button>
        ) : (
          <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full h-full sm:w-100 sm:h-137.5 bg-slate-900 border-0 sm:border sm:border-slate-700 sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            
            <div className="bg-slate-800 px-4 py-3.5 border-b border-slate-700 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2.5">
                <img src="/logo-apluscom.png" alt="Logo" className="w-7 h-7 rounded-full" onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/28?text=A+';}} />
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                    Aplus AI Assistant
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-slate-400">APLUSCOM Kotamobagu</p>
                </div>
              </div>

              {/* Action Buttons Header */}
              <div className="flex items-center space-x-1">
                <button 
                  onClick={handleClearChat}
                  title="Hapus Riwayat Chat"
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/60">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {loading && <LoadingIndicator />}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-3.5 bg-slate-800 border-t border-slate-700 flex gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanyakan spesifikasi, harga..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white rounded-xl px-4 py-2.5 transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
}

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
        isUser ? 'bg-sky-500 text-white' : 'bg-slate-800 text-sky-400 border border-slate-700'
      }`}>
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>

      <div className={`max-w-[82%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
        isUser
          ? 'bg-sky-600 text-white rounded-tr-none'
          : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-tl-none whitespace-pre-wrap'
      }`}>
        {message.text}
      </div>
    </div>
  );
}

function LoadingIndicator() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-lg bg-slate-800 text-sky-400 border border-slate-700 flex items-center justify-center">
        <Bot className="w-3.5 h-3.5" />
      </div>
      <div className="bg-slate-800 border border-slate-700/60 rounded-xl rounded-tl-none px-3.5 py-2.5 flex items-center space-x-2">
        <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />
        <span className="text-[11px] text-slate-400">Aplus AI sedang mengetik...</span>
      </div>
    </div>
  );
}