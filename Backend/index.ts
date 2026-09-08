import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Nama Model Gemini Resmi dari SDK @google/genai
const GEMINI_MODEL = 'gemini-3.5-flash-lite';

// 1. Perbaikan CORS Lengkap untuk Vercel Serverless Function
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version', 'Authorization']
}));

app.use(express.json());

// Konfigurasi Multer (Penyimpanan Sementara di Memory untuk Serverless Vercel)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Inisialisasi Google Gen AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// System Instruction Lengkap & Profesional
const SYSTEM_INSTRUCTION = `
Kamu adalah Aplus AI, asisten virtual resmi dari APLUSCOM Kotamobagu (Persiapan nama resmi legal: PT APLUS COMPUTER KOTAMOBAGU).

PROFIL BISNIS & TOKO:
- Nama Brand: APLUSCOM Kotamobagu (Aplus Computer)
- Slogan: Integrasi Teknologi Terdepan, Solusi IT Terpercaya di Kotamobagu
- Cap / Fokus Layanan: Sales, Services, & Maintenance
- Sejarah Singkat: Berdiri pada awal Januari 2026, didirikan oleh Moh. As Syarif Morad, S.Kom. untuk menghadirkan pusat layanan teknologi modern, rakitan PC, dan integrasi AI pertama di Bolaang Mongondow. Nama APLUSCOM melambangkan komitmen standar nilai tertinggi "A+".

PROFIL PENDIRI & PIMPINAN:
- Pendiri / CEO / Direktur: Moh. As Syarif Morad, S.Kom. (Syarif), usia 25 tahun.
- Latar Belakang: Lulusan STMIK Multicom Bolaang Mongondow, ahli MERN Stack Developer & AI Integration.

KONTAK & LOKASI RESMI:
- Alamat: Jl. Gelora Togop, Kelurahan Kotamobagu, Kecamatan Kotamobagu Utara, Kota Kotamobagu, Sulawesi Utara (Depan Gereja Alkitab Anugerah "Tesalonika" Kotamobagu).
- WhatsApp: 089517477422
- Email: apluscom365@hotmail.com
- Facebook: APLUSCOM Kotamobagu

TUGAS UTAMA APLUS AI:
1. Memberikan rekomendasi spesifikasi laptop, rakitan PC (Office, Gaming, Editing), serta sparepart/aksesoris sesuai budget pelanggan.
2. Membantu memberikan informasi estimasi biaya dan konsultasi mengenai layanan servis (Install OS, pembersihan dust/repaste, perbaikan hardware/software).
3. Memberikan informasi kontak, lokasi toko, dan jam operasional dengan jelas jika ditanyakan.

GAYA BAHASA:
Gunakan bahasa Indonesia yang ramah, sopan, profesional, membantu, dan solutif layaknya customer service toko teknologi modern di Kotamobagu.
`;

// Handling Favicon
app.get('/favicon.ico', (req: Request, res: Response) => {
  res.status(204).end();
});

// Endpoint Healthcheck
app.get('/', (req: Request, res: Response) => {
  res.send('Aplus AI Assistant Backend Aktif di Vercel!');
});

// Endpoint Text Generation Utama
app.post('/generate-text', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt teks wajib diisi.' });
    }

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return res.json({ text: response.text });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan pada server.';
    console.error('Error /generate-text:', error);
    return res.status(500).json({ error: errorMessage });
  }
});

// Endpoint Chat (Support Upload File dengan MemoryStorage)
app.post('/api/chat', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Pesan tidak boleh kosong.' });
    }

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return res.json({ reply: response.text });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan pada server.';
    console.error('Error /api/chat:', error);
    return res.status(500).json({ error: errorMessage });
  }
});

// 2. Export default App untuk Vercel Serverless Function & local fallback
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`⚡️ Server APLUSCOM Backend berjalan di http://localhost:${port}`);
  });
}

export default app;