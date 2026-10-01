import React, { useState, useEffect } from 'react';
import { AppImages } from '../assets/images';
import { UserProfile, ConsultationSummary } from '../types';
import { api } from '../services/api';
import { 
  AlertTriangle, 
  Stethoscope, 
  Pill, 
  FileText, 
  Printer, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight,
  ShieldAlert,
  Flame,
  Activity,
  Layers
} from 'lucide-react';

interface ConsultationSectionProps {
  user: UserProfile;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({ user }) => {
  const [summary, setSummary] = useState<ConsultationSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    setLoading(true);
    try {
      const data = await api.getConsultationSummary();
      setSummary(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const redFlags = [
    {
      title: 'Lesi Meluas Cepat (>10% Tubuh)',
      desc: 'Plak kemerahan menyebar secara mendadak ke area tubuh baru dalam beberapa hari.'
    },
    {
      title: 'Muncul Pustul (Bintik Nanah) & Demam',
      desc: 'Timbul lenting berisi nanah steril di atas plak merah disertai rasa meriang atau menggigil (suspek Psoriasis Pustulosa).'
    },
    {
      title: 'Eritroderma (>80-90% Kulit Merah Terbakar)',
      desc: 'Kondisi gawat darurat di mana hampir seluruh kulit tubuh mengelupas dan memerah parah sehingga mengganggu pengaturan suhu tubuh.'
    },
    {
      title: 'Nyeri & Pembengkakan Sendi (Pagi Hari)',
      desc: 'Jari-jari membengkak seperti sosis (daktilitis) atau persendian lutut/tumit kaku lebih dari 30 menit saat bangun tidur.'
    },
    {
      title: 'Infeksi Bakteri Sekunder',
      desc: 'Lesi mengeluarkan cairan kuning lengket, nanah berbau, atau nyeri berdenyut yang mengindikasikan infeksi bakteri.'
    },
    {
      title: 'Efek Samping Kortikosteroid Topikal',
      desc: 'Muncul guratan garis merah/ungu (striae), kulit menjadi transparan rapuh (atrofi), atau pembuluh darah kapiler melebar (telangiektasia).'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
          <Stethoscope className="w-3.5 h-3.5 text-amber-700" />
          <span>Arahan untuk Konsultasi – Panduan Medis & Rekomendasi Klinis</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Kapan Harus Menghubungi Dokter atau Apoteker?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          PsoriaCare membantu Anda menyadari kapan kondisi kulit memerlukan evaluasi profesional lebih lanjut, serta menyiapkan rangkuman data terapi Anda untuk dikonsultasikan secara efektif.
        </p>
      </div>

      {/* Visual Consultation Setting Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 sm:p-8">
        <div className="md:col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Kolaborasi Pasien & Tenaga Medis
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            Tingkatkan Kualitas Diskusi Saat Kunjungan Kontrol
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Membawa data log kepatuhan obat dan rekaman perkembangan foto kulit membantu dokter menentukan apakah dosis perlu disesuaikan, dilakukan tapering-off steroid, atau beralih ke lini terapi pemeliharaan.
          </p>
          <div className="pt-1">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Unduh Ringkasan Rekam Pasien</span>
            </button>
          </div>
        </div>

        <div className="md:col-span-5">
          <img
            src={AppImages.doctorConsultImg}
            alt="Konsultasi Dokter Kulit"
            className="w-full h-56 object-cover rounded-xl shadow-md border border-slate-200"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Tanda Bahaya (Red Flags) Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          <h2>Tanda Bahaya: Segera Kunjungi Dokter Spesialis Kulit Bila Mengalami:</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {redFlags.map((flag, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-rose-200/80 shadow-xs hover:border-rose-300 transition-all space-y-2">
              <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Indikasi {idx + 1}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {flag.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {flag.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Kapan Berkonsultasi ke Apoteker */}
      <div className="bg-teal-50/70 rounded-2xl border border-teal-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5 text-teal-900 font-bold text-base">
          <Pill className="w-5 h-5 text-teal-700" />
          <h3>Peran Apoteker dalam Keberhasilan Terapi Topikal Anda</h3>
        </div>
        <p className="text-xs sm:text-sm text-teal-950/80 leading-relaxed">
          Sesuai dengan temuan jurnal ilmiah mengenai kesenjangan instruksi obat, Anda sangat disarankan untuk berdiskusi dengan apoteker di apotek mengenai:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-teal-900">
          <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-teal-200">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span><strong>Konfirmasi Takaran FTU:</strong> Memastikan berapa banyak pencetan salep yang tepat untuk luas plak Anda.</span>
          </div>
          <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-teal-200">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span><strong>Urutan Pelembap & Salep:</strong> Memastikan jeda waktu 15-30 menit agar obat tidak terdilusi.</span>
          </div>
          <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-teal-200">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span><strong>Jadwal Tapering-Off:</strong> Mengetahui cara menurunkan frekuensi steroid secara bertahap saat lesi membaik.</span>
          </div>
          <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-teal-200">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span><strong>Penyimpanan Obat:</strong> Memastikan suhu simpan obat yang tepat agar zat aktif tidak rusak.</span>
          </div>
        </div>
      </div>

      {/* Ringkasan Rekam Medis Pasien (Print Ready Layout) */}
      <div id="printable-summary" className="bg-white rounded-2xl border-2 border-slate-300 p-6 sm:p-8 space-y-6 shadow-sm">
        
        {/* Printable Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              Laporan Mandiri Pasien (Patient Self-Report)
            </span>
            <h3 className="text-xl font-extrabold text-slate-900">
              Ringkasan Kepatuhan & Perkembangan Terapi Kulit
            </h3>
            <p className="text-xs text-slate-500">
              Disusun otomatis oleh PsoriaCare untuk bahan diskusi bersama Dokter / Apoteker
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 block">Tanggal Cetak:</span>
            <span className="text-xs font-mono font-bold text-slate-700">
              {new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}
            </span>
          </div>
        </div>

        {/* Patient Profile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Nama Pasien</span>
            <span className="font-bold text-slate-800">{user.name}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Usia / Gender</span>
            <span className="font-bold text-slate-800">{user.age} Tahun / {user.gender}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Durasi Psoriasis</span>
            <span className="font-bold text-slate-800">{user.psoriasisDuration}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Area Terkena</span>
            <span className="font-bold text-slate-800">{user.affectedAreas.join(', ')}</span>
          </div>
        </div>

        {/* Treatment & Adherence Data */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            1. Terapi Aktif & Tingkat Kepatuhan
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-500 block mb-1">Obat yang Sedang Digunakan:</span>
              <ul className="list-disc list-inside space-y-1 font-semibold text-slate-800">
                {user.currentMedications.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-500 block mb-1">Kepatuhan Pemakaian Obat:</span>
              <p className="text-base font-extrabold text-emerald-700 font-mono">
                {summary?.treatmentSummary.adherenceRate ?? 88}% Teratur
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Keluhan efek samping dilaporkan: <strong>{summary?.treatmentSummary.sideEffectEventsCount ?? 1} kali</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Skin Progression */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            2. Evaluasi Perkembangan Kulit (Skin Tracker)
          </h4>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-2">
            <div className="flex justify-between items-center">
              <span>Perubahan Skor Gabungan (Kemerahan + Sisik + Ketebalan):</span>
              <span className="font-mono font-bold text-emerald-700">
                {summary?.skinProgression.initialScore ?? 9}/12 (Awal) → {summary?.skinProgression.latestScore ?? 3}/12 (Terkini)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Perubahan Rasa Gatal:</span>
              <span className="font-mono font-bold text-slate-800">
                Skala {summary?.skinProgression.pruritusChange ?? '3 -> 1'}
              </span>
            </div>
            <p className="text-slate-600 italic pt-1 border-t border-slate-200">
              Catatan Pasien: "{summary?.skinProgression.notes ?? 'Plak di kedua siku mulai menipis dan sisik rontok perlahan.'}"
            </p>
          </div>
        </div>

        {/* Suggested Questions for Doctor */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>3. Rekomendasi Pertanyaan untuk Dokter / Apoteker</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-700">
            {summary?.recommendedDoctorQuestions.map((q, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="font-bold text-amber-700">{idx + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Printable Footer / Disclaimer */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 gap-2">
          <span>Dicetak melalui platform PsoriaCare (https://psoriacare.id)</span>
          <span>Bukan rekam medis rumah sakit formal, disusun sebagai catatan mandiri pasien.</span>
        </div>

      </div>

    </div>
  );
};
