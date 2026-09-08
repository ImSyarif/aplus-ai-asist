Markdown
# 💻 APLUSCOM Kotamobagu - Landing Page & Aplus AI Assistant

Aplikasi **Fullstack Web Landing Page & Virtual AI Assistant** interaktif untuk toko **APLUSCOM Kotamobagu** (Persiapan legalitas resmi: *PT APLUS COMPUTER KOTAMOBAGU*). Proyek ini dikembangkan sebagai pemenuhan Tugas Akhir kelas **"AI Productivity and AI API Integration for Developers"**.

---

## 🌟 Tentang Proyek & Business Use Case

**APLUSCOM Kotamobagu** adalah pusat layanan teknologi modern di Wilayah Bolaang Mongondow yang berfokus pada *Sales, Services, dan Maintenance* komputer, laptop, serta jaringan.

Sistem **Aplus AI Assistant** terintegrasi secara langsung di dalam *Landing Page* dalam bentuk *floating chatbot widget* yang ramah pengguna (*mobile-responsive*). AI ini bertugas memberikan rekomendasi spesifikasi laptop, rakitan PC (*Gaming*, *Office*, *Content Creation*), estimasi biaya perbaikan/servis, hingga informasi lokasi dan kontak toko secara *real-time* kepada pelanggan.

---

## 🛠️ Tech Stack & Framework

### **Frontend**
* **Framework:** React 18 + Vite
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4
* **Icons:** Lucide Icons

### **Backend**
* **Runtime / Server:** Node.js + Express.js
* **Language:** TypeScript
* **AI Model SDK:** `@google/genai` (Google Gen AI SDK)
* **Model AI:** Gemini 2.5 Flash Lite (`gemini-2.5-flash-lite`)
* **Utilities:** `dotenv`, `cors`, `multer`

---

## 📁 Struktur Folder Proyek

```text
aplus-ai-asist/
├── Backend/
│   ├── uploads/
│   ├── .env                    # Variabel Lingkungan (GEMINI_API_KEY - GitIgnored)
│   ├── index.ts                # Server Express & System Instruction Gemini AI
│   ├── package.json
│   └── tsconfig.json
├── Frontend/
│   ├── public/
│   │   ├── logo-apluscom.png   # Asset Logo Resmi APLUSCOM
│   │   ├── 4x6.jpg             # Foto Profil Direktur Utama
│   │   └── _redirects          # Konfigurasi SPA Routing Netlify
│   ├── src/
│   │   ├── App.tsx             # Main Landing Page & AI Chatbot Component
│   │   ├── index.css           # Styling Utama Tailwind CSS
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
└── README.md
🚀 Cara Menjalankan Proyek di Lokal (Local Development)
Prasyarat (Prerequisites)
Node.js (Versi 18 atau lebih baru)

Gemini API Key dari Google AI Studio

1. Setup Backend
Masuk ke direktori Backend:

Bash
cd Backend
Install seluruh dependencies:

Bash
npm install
Buat file .env di dalam folder Backend, lalu tambahkan API Key Gemini milikmu:

Cuplikan kode
PORT=5000
GEMINI_API_KEY=KUNCI_API_GEMINI_GOOGLE_KAMU
Jalankan server Backend:

Bash
npm run dev
Server Backend akan berjalan di http://localhost:5000.

2. Setup Frontend
Buka terminal baru, lalu masuk ke direktori Frontend:

Bash
cd Frontend
Install seluruh dependencies:

Bash
npm install
Jalankan aplikasi React/Vite:

Bash
npm run dev
Akses tautan lokal yang tertera di terminal (biasanya http://localhost:5173).

🎯 Fitur Unggulan Sistem
Responsive UI (Desktop & Mobile): Tampilan otomatis menyesuaikan layar HP/Tablet dengan Mobile Menu Drawer dan mode obrolan AI fullscreen pada layar kecil.

Context-Aware AI Chatbot: Gemini AI dibekali System Instruction mendalam mengenai profil bisnis, harga layanan, spesifikasi produk, dan sejarah berdiri APLUSCOM Kotamobagu.

Clean Architecture & Fast Performance: Ditingkatkan dengan Vite, TypeScript, dan Tailwind CSS v4 untuk waktu pemuatan halaman yang sangat cepat.

👨‍💻 Profil Pengembang / Direktur Utama
Nama Lengkap: Moh. As Syarif Morad, S.Kom. (Syarif)

Jabatan: CEO / Direktur Utama PT APLUS COMPUTER KOTAMOBAGU

Pendidikan: Sarjana Komputer (S.Kom.) – STMIK Multicom Bolaang Mongondow

Keahlian: MERN Stack Developer & AI Integration Specialist

WhatsApp Bisnis: 089517477422

Email Resmi: apluscom365@hotmail.com

Facebook Page: APLUSCOM Kotamobagu Page

Alamat Toko: Jl. Gelora Togop, Kel. Kotamobagu, Kec. Kotamobagu Utara, Kota Kotamobagu, Sulawesi Utara (Depan Gereja Alkitab Anugerah "Tesalonika" Kotamobagu)

© 2026 APLUSCOM Kotamobagu. All Rights Reserved.