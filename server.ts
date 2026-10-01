import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-Memory Database store with rich initial clinical data
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'Laki-laki' | 'Perempuan';
  psoriasisDuration: string;
  affectedAreas: string[];
  currentMedications: string[];
  otherDiseases: string;
  registeredAt: string;
}

interface Medication {
  id: string;
  name: string;
  genericName: string;
  category: 'Kortikosteroid Topikal' | 'Analog Vitamin D3' | 'Kombinasi' | 'Keratolitik' | 'Inhibitor Kalsineurin' | 'Emolien & Pelembap' | 'Lainnya';
  form: 'Salep (Ointment)' | 'Krim' | 'Gel' | 'Solusio / Losio';
  potency?: 'Ringan' | 'Sedang' | 'Kuat' | 'Sangat Kuat (Superpoten)' | 'Bukan Steroid';
  indication: string;
  ftuRecommendation: string;
  frequency: string;
  maxDuration: string;
  howToApply: string[];
  precautions: string[];
  sideEffects: string[];
  taperingGuidance: string;
  isPrescriptionRequired: boolean;
}

interface AdherenceLog {
  id: string;
  date: string; // YYYY-MM-DD
  timeSlot: 'Pagi' | 'Siang' | 'Malam';
  medicationName: string;
  status: 'used' | 'missed';
  sideEffectReport: 'none' | 'burning' | 'redness' | 'itching' | 'atrophy';
  note?: string;
  recordedAt: string;
}

interface SkinTrackerEntry {
  id: string;
  date: string;
  weekLabel: string;
  bodyArea: string;
  photoUrl?: string;
  erythema: number; // 0 - 4
  scaling: number;  // 0 - 4 (deskuamasi)
  induration: number; // 0 - 4 (ketebalan plak)
  pruritus: number; // 0 - 4 (gatal)
  estimatedArea: string; // misal "5 cm x 4 cm" atau "3%"
  notes: string;
}

// Initial Data
let currentUser: UserProfile = {
  id: 'usr-001',
  name: 'Dadi Prasetyo',
  email: 'dadi.prasetyo@example.com',
  phone: '081234567890',
  age: 34,
  gender: 'Laki-laki',
  psoriasisDuration: '2 tahun',
  affectedAreas: ['Siku Kanan & Kiri', 'Lutut', 'Kulit Kepala'],
  currentMedications: ['Calcipotriol 0.005% Salep', 'Klobetasol Propionat 0.05% Salep (hanya saat plak menebal)'],
  otherDiseases: 'Tidak ada riwayat penyakit penyerta',
  registeredAt: '2026-08-15',
};

const medicationsList: Medication[] = [
  {
    id: 'med-01',
    name: 'Calcipotriol 0.005% Ointment',
    genericName: 'Calcipotriol',
    category: 'Analog Vitamin D3',
    form: 'Salep (Ointment)',
    potency: 'Bukan Steroid',
    indication: 'Terapi topikal lini pertama untuk psoriasis plak vulgaris ringan hingga sedang.',
    ftuRecommendation: 'Gunakan sesuai ukuran luas plak (1 FTU untuk luas 2 telapak tangan). Maksimal 100 gram per minggu pada orang dewasa.',
    frequency: '1-2 kali sehari (biasanya pagi dan malam, atau dikombinasi berselang-seling dengan steroid).',
    maxDuration: 'Dapat digunakan jangka panjang dengan evaluasi berkala oleh dokter.',
    howToApply: [
      'Cuci tangan dengan sabun lembut dan air mengalir sebelum aplikasi.',
      'Oleskan tipis-tipis hanya pada area plak bersisik, hindari kulit sehat di sekitarnya.',
      'Usap lembut searah arah tumbuhnya rambut kulit, jangan digosok secara agresif.',
      'Hindari penggunaan pada wajah dan lipatan kulit karena dapat memicu iritasi.'
    ],
    precautions: [
      'Jangan melebihi dosis maksimal 100 gram/minggu untuk menghindari risiko hiperkalsemia.',
      'Hindari paparan sinar matahari terik langsung setelah pemakaian.',
      'Tidak dianjurkan pada kehamilan tanpa petunjuk spesialis kulit.'
    ],
    sideEffects: ['Iritasi kulit sementara', 'Rasa perih/terbakar ringan saat awal pemakaian', 'Dermatitis kontak'],
    taperingGuidance: 'Tidak menimbulkan rebound phenomenon seperti kortikosteroid, tetapi penurunan frekuensi bertahap tetap dianjurkan saat lesi membaik.',
    isPrescriptionRequired: true
  },
  {
    id: 'med-02',
    name: 'Kombinasi Calcipotriol 0.005% + Betametason Dipropionat 0.05%',
    genericName: 'Calcipotriol + Betamethasone Dipropionate',
    category: 'Kombinasi',
    form: 'Salep (Ointment)',
    potency: 'Kuat',
    indication: 'Standar emas pengobatan psoriasis plak vulgaris kronis pada badan dan anggota gerak untuk hasil cepat dan peredaman inflamasi efektif.',
    ftuRecommendation: '1 FTU per 2 luas telapak tangan. Maksimal 15 gram per hari atau 100 gram per minggu.',
    frequency: '1 kali sehari, sebaiknya malam hari.',
    maxDuration: 'Maksimal 4 minggu penggunaan berturut-turut untuk satu siklus.',
    howToApply: [
      'Pastikan area kulit bersih dan kering.',
      'Oleskan tipis merata pada plak psoriasis.',
      'Biarkan meresap minimal 30 menit sebelum memakai pakaian tebal.',
      'Cuci tangan segera setelah mengoleskan obat.'
    ],
    precautions: [
      'Jangan gunakan di bawah balutan kasa kedap udara (oklusif) kecuali atas instruksi dokter.',
      'Hindari area wajah, ketiak, dan selangkangan.',
      'Wajib melakukan tapering off (penurunan bertahap) setelah perbaikan lesi.'
    ],
    sideEffects: ['Atrofi kulit jika digunakan berlebihan', 'Folikulitis', 'Hipopigmentasi lokal'],
    taperingGuidance: 'Setelah 4 minggu pemakaian harian, turunkan menjadi 2 kali seminggu (misal: Sabtu & Minggu saja) untuk terapi pemeliharaan jangka panjang.',
    isPrescriptionRequired: true
  },
  {
    id: 'med-03',
    name: 'Klobetasol Propionat 0.05% Salep',
    genericName: 'Clobetasol Propionate',
    category: 'Kortikosteroid Topikal',
    form: 'Salep (Ointment)',
    potency: 'Sangat Kuat (Superpoten)',
    indication: 'Psoriasis plak tebal, hiperkeratotik, membandel pada area kulit tebal seperti siku, lutut, telapak tangan dan kaki.',
    ftuRecommendation: 'Gunakan sesedikit mungkin (tipis sekali). Maksimal 50 gram per minggu.',
    frequency: '1-2 kali sehari sesuai resep dokter spesialis.',
    maxDuration: 'Maksimal 2-4 minggu. DILARANG digunakan jangka panjang terus-menerus tanpa pengawasan dokter.',
    howToApply: [
      'Oleskan lapisan sangat tipis tepat pada inti plak tebal.',
      'Hindari kulit normal di sekitarnya.',
      'Jangan digunakan pada lipatan tubuh atau wajah.'
    ],
    precautions: [
      'Risiko penipisan kulit (atrofi), guratan merah (striae), dan supresi aksis HPA.',
      'Jangan dihentikan secara mendadak saat lesi mulai bersih untuk mencegah flare-up hebat (rebound effect).'
    ],
    sideEffects: ['Atrofi kulit', 'Telangiektasia (pelebaran pembuluh darah)', 'Sensasi terbakar'],
    taperingGuidance: 'Wajib tapering: dari 2x sehari -> 1x sehari -> 2 hari sekali -> beralih ke pelembap atau Calcipotriol.',
    isPrescriptionRequired: true
  },
  {
    id: 'med-04',
    name: 'Mometason Furoat 0.1% Krim / Salep',
    genericName: 'Mometasone Furoate',
    category: 'Kortikosteroid Topikal',
    form: 'Krim',
    potency: 'Sedang',
    indication: 'Psoriasis plak sedang pada tubuh, lengan, dan tungkai.',
    ftuRecommendation: '1 FTU untuk area seluas 2 telapak tangan.',
    frequency: 'Cukup 1 kali sehari.',
    maxDuration: '3-4 minggu berturut-turut.',
    howToApply: [
      'Oleskan tipis pada plak yang meradang.',
      'Cocok dalam sediaan krim untuk lesi yang tidak terlalu bersisik tebal.'
    ],
    precautions: ['Hindari kontak dengan mata', 'Jangan digunakan pada infeksi jamur atau virus'],
    sideEffects: ['Iritasi lokal ringan', 'Rasa gatal sesaat'],
    taperingGuidance: 'Dapat diturunkan ke kortikosteroid potensi lebih rendah atau emolien saat peradangan mereda.',
    isPrescriptionRequired: true
  },
  {
    id: 'med-05',
    name: 'Asam Salisilat 3% - 5% Salep',
    genericName: 'Salicylic Acid',
    category: 'Keratolitik',
    form: 'Salep (Ointment)',
    potency: 'Bukan Steroid',
    indication: 'Melunakkan, melarutkan, dan mengangkat sisik (skuama) tebal sehingga penyerapan obat kortikosteroid/calcipotriol menjadi maksimal.',
    ftuRecommendation: 'Oleskan secukupnya pada area skuama tebal.',
    frequency: '1-2 kali sehari, atau 30-60 menit sebelum mandi.',
    maxDuration: 'Digunakan hingga skuama tebal terangkat (biasanya 5-10 hari).',
    howToApply: [
      'Oleskan pada plak bersisik tebal.',
      'Biarkan melunakkan sisik.',
      'Sisik yang melunak dapat dibersihkan perlahan saat mandi tanpa ditarik paksa.'
    ],
    precautions: [
      'Jangan dioleskan pada area luas (>20% luas tubuh) untuk menghindari toksisitas salisilat (salisilismus).',
      'Jangan gunakan bersamaan pada tabung yang sama dengan Calcipotriol karena asam salisilat dapat merusak molekul Calcipotriol jika dicampur langsung.'
    ],
    sideEffects: ['Iritasi lokal', 'Kulit kering di sekitar lesi'],
    taperingGuidance: 'Hentikan pemakaian jika sisik tebal sudah rontok dan plak sudah menjadi tipis.',
    isPrescriptionRequired: false
  },
  {
    id: 'med-06',
    name: 'Tacrolimus 0.1% Ointment',
    genericName: 'Tacrolimus',
    category: 'Inhibitor Kalsineurin',
    form: 'Salep (Ointment)',
    potency: 'Bukan Steroid',
    indication: 'Terapi alternatif yang sangat aman untuk psoriasis di area kulit sensitif (wajah, leher, lipatan ketiak, dan selangkangan/inversa) karena tidak menyebabkan atrofi kulit.',
    ftuRecommendation: 'Oleskan tipis-tipis pada area wajah atau lipatan.',
    frequency: '2 kali sehari.',
    maxDuration: 'Dapat digunakan jangka menengah dengan panduan dokter.',
    howToApply: [
      'Oleskan tipis pada lesi di wajah atau lipatan tubuh.',
      'Jangan terkena paparan sinar matahari langsung tanpa tabir surya.'
    ],
    precautions: ['Sensasi panas atau terbakar terasa pada 3-5 hari pertama dan akan hilang dengan sendirinya.'],
    sideEffects: ['Sensasi hangat/panas pada hari-hari awal penggunaan'],
    taperingGuidance: 'Turunkan menjadi 2-3 kali seminggu setelah keluhan di wajah terkontrol.',
    isPrescriptionRequired: true
  },
  {
    id: 'med-07',
    name: 'Pelembap Medis Ceramide & Urea 10%',
    genericName: 'Ceramide + Urea 10%',
    category: 'Emolien & Pelembap',
    form: 'Krim',
    potency: 'Bukan Steroid',
    indication: 'Pondasi utama perawatan psoriasis untuk memperbaiki sawar kulit (skin barrier), mencegah transepidermal water loss (TEWL), dan mengurangi gatal.',
    ftuRecommendation: 'Gunakan secara dermawan ke seluruh tubuh tanpa batasan ketat dosis.',
    frequency: 'Minimal 2-3 kali sehari, terutama 3 menit setelah mandi.',
    maxDuration: 'Digunakan setiap hari seumur hidup sebagai terapi suportif.',
    howToApply: [
      'Gunakan metode "The 3-Minute Rule": oleskan pelembap dalam waktu 3 menit setelah selesai mandi saat kulit masih sedikit lembap.',
      'Jika menggunakan obat aktif (steroid/calcipotriol), berikan jeda waktu 15-30 menit antara pelembap dan obat aktif.'
    ],
    precautions: ['Pilihlah pelembap yang bebas parfum (fragrance-free) dan bebas zat pewarna.'],
    sideEffects: ['Hampir tidak ada efek samping sistemik, perih ringan jika ada luka terbuka.'],
    taperingGuidance: 'Tidak perlu tapering. Merupakan perawatan harian esensial sepanjang waktu.',
    isPrescriptionRequired: false
  }
];

let adherenceLogs: AdherenceLog[] = [
  { id: 'adh-01', date: '2026-09-30', timeSlot: 'Pagi', medicationName: 'Calcipotriol 0.005% Ointment', status: 'used', sideEffectReport: 'none', note: 'Dioleskan tipis di kedua siku', recordedAt: '2026-09-30T07:30:00Z' },
  { id: 'adh-02', date: '2026-09-30', timeSlot: 'Malam', medicationName: 'Pelembap Medis Ceramide', status: 'used', sideEffectReport: 'none', note: 'Aplikasi setelah mandi malam', recordedAt: '2026-09-30T20:15:00Z' },
  { id: 'adh-03', date: '2026-09-29', timeSlot: 'Pagi', medicationName: 'Calcipotriol 0.005% Ointment', status: 'used', sideEffectReport: 'none', note: '', recordedAt: '2026-09-29T07:45:00Z' },
  { id: 'adh-04', date: '2026-09-29', timeSlot: 'Malam', medicationName: 'Calcipotriol 0.005% Ointment', status: 'used', sideEffectReport: 'none', note: 'Gatal sudah sangat berkurang', recordedAt: '2026-09-29T21:00:00Z' },
  { id: 'adh-05', date: '2026-09-28', timeSlot: 'Pagi', medicationName: 'Calcipotriol 0.005% Ointment', status: 'used', sideEffectReport: 'none', note: '', recordedAt: '2026-09-28T08:00:00Z' },
  { id: 'adh-06', date: '2026-09-28', timeSlot: 'Malam', medicationName: 'Calcipotriol 0.005% Ointment', status: 'missed', sideEffectReport: 'none', note: 'Lupa karena lembur kerja', recordedAt: '2026-09-28T23:00:00Z' },
  { id: 'adh-07', date: '2026-09-27', timeSlot: 'Pagi', medicationName: 'Calcipotriol 0.005% Ointment', status: 'used', sideEffectReport: 'none', note: '', recordedAt: '2026-09-27T07:15:00Z' },
  { id: 'adh-08', date: '2026-09-26', timeSlot: 'Pagi', medicationName: 'Calcipotriol 0.005% Ointment', status: 'used', sideEffectReport: 'none', note: '', recordedAt: '2026-09-26T07:30:00Z' },
  { id: 'adh-09', date: '2026-09-25', timeSlot: 'Pagi', medicationName: 'Calcipotriol 0.005% Ointment', status: 'used', sideEffectReport: 'burning', note: 'Sedikit perih selama 5 menit lalu reda', recordedAt: '2026-09-25T08:10:00Z' },
  { id: 'adh-10', date: '2026-09-24', timeSlot: 'Pagi', medicationName: 'Calcipotriol 0.005% Ointment', status: 'used', sideEffectReport: 'none', note: 'Mulai rutin oles pelembap sebelum obat', recordedAt: '2026-09-24T07:30:00Z' }
];

let skinTrackerEntries: SkinTrackerEntry[] = [
  {
    id: 'skin-01',
    date: '2026-09-15',
    weekLabel: 'Minggu 1 (Baseline)',
    bodyArea: 'Siku Kanan',
    erythema: 3, // Kemerahan berat
    scaling: 3,  // Sisik tebal
    induration: 3, // Plak tebal
    pruritus: 3, // Gatal sangat mengganggu
    estimatedArea: '6 cm x 4 cm',
    notes: 'Plak kemerahan jelas dengan skuama tebal keperakan. Rasa gatal sering timbul terutama saat cuaca dingin.'
  },
  {
    id: 'skin-02',
    date: '2026-09-22',
    weekLabel: 'Minggu 2 (Evaluasi 1)',
    bodyArea: 'Siku Kanan',
    erythema: 2, // Kemerahan sedang
    scaling: 2,  // Sisik mulai menipis
    induration: 2,
    pruritus: 2,
    estimatedArea: '5 cm x 3.5 cm',
    notes: 'Setelah 7 hari pemakaian Calcipotriol teratur dan jeda pelembap, sisik tebal mulai melunak dan berkurang.'
  },
  {
    id: 'skin-03',
    date: '2026-09-29',
    weekLabel: 'Minggu 3 (Evaluasi 2)',
    bodyArea: 'Siku Kanan',
    erythema: 1, // Kemerahan ringan (pink muda)
    scaling: 1,  // Sisik minimal halus
    induration: 1, // Plak hampir rata dengan kulit
    pruritus: 1, // Gatal jarang terjadi
    estimatedArea: '3.5 cm x 2 cm',
    notes: 'Perbaikan signifikan! Plak mulai merata dengan permukaan kulit sekitar. Kemerahan berkurang menjadi merah muda samar.'
  }
];

export async function createApp() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // REST API Routes
  // 1. User Profile & Auth
  app.post('/api/auth/register', (req: Request, res: Response) => {
    const { name, email, phone, age, gender, psoriasisDuration, affectedAreas, currentMedications, otherDiseases } = req.body;
    currentUser = {
      id: `usr-${Date.now()}`,
      name: name || 'Pengguna PsoriaCare',
      email: email || '',
      phone: phone || '',
      age: Number(age) || 30,
      gender: gender || 'Laki-laki',
      psoriasisDuration: psoriasisDuration || '< 1 tahun',
      affectedAreas: Array.isArray(affectedAreas) ? affectedAreas : ['Siku'],
      currentMedications: Array.isArray(currentMedications) ? currentMedications : [],
      otherDiseases: otherDiseases || '',
      registeredAt: new Date().toISOString().split('T')[0]
    };
    res.json({ success: true, user: currentUser });
  });

  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { email } = req.body;
    if (email) {
      currentUser.email = email;
    }
    res.json({ success: true, user: currentUser });
  });

  app.get('/api/user/profile', (_req: Request, res: Response) => {
    res.json(currentUser);
  });

  app.put('/api/user/profile', (req: Request, res: Response) => {
    currentUser = { ...currentUser, ...req.body };
    res.json({ success: true, user: currentUser });
  });

  // 2. Medications Database
  app.get('/api/medications', (req: Request, res: Response) => {
    const { search, category } = req.query;
    let filtered = [...medicationsList];

    if (category && category !== 'Semua') {
      filtered = filtered.filter(m => m.category === category);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      filtered = filtered.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.genericName.toLowerCase().includes(q) ||
        m.indication.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
      );
    }

    res.json({ medications: filtered, count: filtered.length });
  });

  app.get('/api/medications/:id', (req: Request, res: Response) => {
    const med = medicationsList.find(m => m.id === req.params.id);
    if (!med) {
      res.status(404).json({ error: 'Obat tidak ditemukan' });
      return;
    }
    res.json(med);
  });

  // 3. Medication Adherence Logs
  app.get('/api/adherence', (_req: Request, res: Response) => {
    const totalLogs = adherenceLogs.length;
    const completedDoses = adherenceLogs.filter(l => l.status === 'used').length;
    const adherenceRate = totalLogs > 0 ? Math.round((completedDoses / totalLogs) * 100) : 100;

    res.json({
      logs: adherenceLogs,
      stats: {
        totalLogs,
        completedDoses,
        missedDoses: totalLogs - completedDoses,
        adherenceRate,
        streakDays: 4
      }
    });
  });

  app.post('/api/adherence', (req: Request, res: Response) => {
    const { date, timeSlot, medicationName, status, sideEffectReport, note } = req.body;
    const newLog: AdherenceLog = {
      id: `adh-${Date.now()}`,
      date: date || new Date().toISOString().split('T')[0],
      timeSlot: timeSlot || 'Pagi',
      medicationName: medicationName || 'Calcipotriol 0.005%',
      status: status || 'used',
      sideEffectReport: sideEffectReport || 'none',
      note: note || '',
      recordedAt: new Date().toISOString()
    };
    adherenceLogs.unshift(newLog);
    res.status(201).json({ success: true, log: newLog });
  });

  app.delete('/api/adherence/:id', (req: Request, res: Response) => {
    adherenceLogs = adherenceLogs.filter(l => l.id !== req.params.id);
    res.json({ success: true });
  });

  // 4. Skin Tracker
  app.get('/api/skin-tracker', (_req: Request, res: Response) => {
    res.json({ entries: skinTrackerEntries });
  });

  app.post('/api/skin-tracker', (req: Request, res: Response) => {
    const { weekLabel, bodyArea, photoUrl, erythema, scaling, induration, pruritus, estimatedArea, notes } = req.body;
    const newEntry: SkinTrackerEntry = {
      id: `skin-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      weekLabel: weekLabel || `Minggu ${skinTrackerEntries.length + 1}`,
      bodyArea: bodyArea || 'Siku Kanan',
      photoUrl: photoUrl || '',
      erythema: Number(erythema) || 0,
      scaling: Number(scaling) || 0,
      induration: Number(induration) || 0,
      pruritus: Number(pruritus) || 0,
      estimatedArea: estimatedArea || 'Sedang',
      notes: notes || ''
    };
    skinTrackerEntries.push(newEntry);
    res.status(201).json({ success: true, entry: newEntry });
  });

  app.delete('/api/skin-tracker/:id', (req: Request, res: Response) => {
    skinTrackerEntries = skinTrackerEntries.filter(s => s.id !== req.params.id);
    res.json({ success: true });
  });

  // 5. Consultation Summary Generator
  app.get('/api/consultation/summary', (_req: Request, res: Response) => {
    const totalLogs = adherenceLogs.length;
    const completedDoses = adherenceLogs.filter(l => l.status === 'used').length;
    const adherenceRate = totalLogs > 0 ? Math.round((completedDoses / totalLogs) * 100) : 100;
    const recentSideEffects = adherenceLogs.filter(l => l.sideEffectReport !== 'none');

    const firstEntry = skinTrackerEntries[0];
    const latestEntry = skinTrackerEntries[skinTrackerEntries.length - 1];

    res.json({
      patient: currentUser,
      treatmentSummary: {
        activeMedications: currentUser.currentMedications,
        adherenceRate,
        sideEffectEventsCount: recentSideEffects.length,
        sideEffectDetails: recentSideEffects.map(s => `${s.date} (${s.medicationName}): ${s.sideEffectReport}`)
      },
      skinProgression: {
        initialScore: firstEntry ? (firstEntry.erythema + firstEntry.scaling + firstEntry.induration) : 0,
        latestScore: latestEntry ? (latestEntry.erythema + latestEntry.scaling + latestEntry.induration) : 0,
        pruritusChange: latestEntry && firstEntry ? `${firstEntry.pruritus} -> ${latestEntry.pruritus}` : 'Stabil',
        notes: latestEntry?.notes || ''
      },
      recommendedDoctorQuestions: [
        'Apakah rejimen obat topikal saya saat ini sudah tepat atau perlu dilakukan tapering-off?',
        'Berapa lama lagi batas maksimal aman penggunaan kortikosteroid potensi kuat pada area lesi saya?',
        'Kapan waktu yang paling tepat untuk beralih sepenuhnya ke analog Vitamin D atau pelembap?',
        'Bagaimana cara membedakan kulit yang menipis (atrofi efek samping steroid) dengan proses perbaikan alami lesi?',
        'Apakah keluhan gatal yang masih tersisa memerlukan terapi antihistamin tambahan?'
      ],
      generatedAt: new Date().toLocaleString('id-ID')
    });
  });

  // In development, mount Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PsoriaCare server running on http://0.0.0.0:${PORT}`);
  });
}

createApp();
