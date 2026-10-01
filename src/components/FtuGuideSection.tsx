import React, { useState } from 'react';
import { AppImages } from '../assets/images';
import { 
  Sparkles, 
  Clock, 
  ShieldAlert, 
  HelpCircle, 
  CheckCircle2, 
  ChevronRight,
  Info,
  Maximize2
} from 'lucide-react';

interface BodyAreaSpec {
  id: string;
  name: string;
  defaultFtu: number;
  description: string;
}

export const FtuGuideSection: React.FC = () => {
  const [selectedAreas, setSelectedAreas] = useState<Record<string, number>>({
    'siku-lengan': 1,
    'lutut-kaki': 1,
  });
  const [frequencyPerDay, setFrequencyPerDay] = useState<number>(1);
  const [tubeSize, setTubeSize] = useState<number>(30); // 15g, 30g, 50g

  const bodyAreas: BodyAreaSpec[] = [
    { id: 'wajah-leher', name: 'Wajah & Leher', defaultFtu: 2.5, description: '2.5 FTU (~1.25 gram)' },
    { id: 'satu-lengan', name: 'Satu Lengan Utuh', defaultFtu: 4.0, description: '4.0 FTU (~2.0 gram)' },
    { id: 'siku-lengan', name: 'Siku & Lengan Bawah', defaultFtu: 1.5, description: '1.5 FTU (~0.75 gram)' },
    { id: 'tangan', name: 'Satu Tangan (Depan & Belakang)', defaultFtu: 1.0, description: '1.0 FTU (~0.5 gram)' },
    { id: 'tungkai-kaki', name: 'Satu Tungkai Kaki (Paha s/d Betis)', defaultFtu: 6.0, description: '6.0 FTU (~3.0 gram)' },
    { id: 'lutut-kaki', name: 'Lutut & Tulang Kering', defaultFtu: 2.0, description: '2.0 FTU (~1.0 gram)' },
    { id: 'dada-perut', name: 'Dada & Perut', defaultFtu: 7.0, description: '7.0 FTU (~3.5 gram)' },
    { id: 'punggung-bokong', name: 'Punggung & Bokong', defaultFtu: 7.0, description: '7.0 FTU (~3.5 gram)' },
    { id: 'kulit-kepala', name: 'Kulit Kepala (Scalp)', defaultFtu: 3.5, description: '3.5 FTU (~1.75 gram)' },
  ];

  const handleToggleArea = (areaId: string, defaultVal: number) => {
    setSelectedAreas((prev) => {
      const copy = { ...prev };
      if (copy[areaId]) {
        delete copy[areaId];
      } else {
        copy[areaId] = defaultVal;
      }
      return copy;
    });
  };

  const handleUpdateMultiplier = (areaId: string, delta: number) => {
    setSelectedAreas((prev) => {
      const current = prev[areaId] || 1;
      const next = Math.max(0.5, Math.min(10, current + delta));
      return { ...prev, [areaId]: next };
    });
  };

  // Calculation
  const totalFtuPerApplication = Object.values(selectedAreas).reduce((acc, curr) => acc + curr, 0);
  const totalGramsPerApplication = totalFtuPerApplication * 0.5;
  const totalGramsPerDay = totalGramsPerApplication * frequencyPerDay;
  const daysTubeWillLast = totalGramsPerDay > 0 ? Math.round(tubeSize / totalGramsPerDay) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Cara Penggunaan Obat Topikal & Kalkulator FTU</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Panduan Aplikasi Obat Topikal yang Tepat
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Mengatasi kesenjangan informasi antara apoteker dan pasien: ketahui dengan pasti berapa banyak obat yang dioleskan, urutan jeda waktu dengan pelembap, dan teknik aplikasi searah bulu halus.
        </p>
      </div>

      {/* Visual Guide: Apa itu Fingertip Unit (FTU)? */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Konsep Standar Dermatologi
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Apa Itu 1 Fingertip Unit (FTU)?
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong>1 Fingertip Unit (FTU)</strong> adalah jumlah salep atau krim yang dipencet keluar dari tube obat (nozzle standar 5mm) di sepanjang ujung jari telunjuk orang dewasa—dari <strong>lipatan sendi pertama (distal) hingga ke ujung jari</strong>.
            </p>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs text-amber-950">
              <div className="flex items-center gap-2 font-bold text-sm">
                <span>1 FTU</span>
                <span>=</span>
                <span>± 0.5 Gram Obat</span>
                <span>=</span>
                <span>2 Telapak Tangan Dewasa</span>
              </div>
              <p className="leading-relaxed">
                Satu takaran FTU cukup untuk menutupi area plak kulit seluas dua telapak tangan orang dewasa beserta jari-jarinya.
              </p>
            </div>

            <p className="text-xs text-slate-500 italic">
              *Panduan FTU mencegah pengolesan terlalu tipis (kurang berkhasiat) atau terlalu berlebihan (meningkatkan risiko efek samping steroid).
            </p>
          </div>

          <div className="md:col-span-6">
            <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-md bg-slate-50">
              <img
                src={AppImages.ftuGuideImg}
                alt="Visual Diagram Fingertip Unit (FTU) Salep"
                className="w-full h-[240px] sm:h-[280px] object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 p-3 text-white text-xs backdrop-blur-xs flex items-center justify-between">
                <span>Visual 1 FTU (Ujung jari ke lipatan pertama)</span>
                <span className="font-mono text-amber-300">~0.5g</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive FTU Calculator */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Maximize2 className="w-5 h-5 text-amber-600" />
            <span>Kalkulator Takaran FTU Berdasarkan Area Tubuh</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pilih bagian tubuh yang terkena plak psoriasis untuk menghitung kebutuhan harian obat dan estimasi habisnya satu tube.
          </p>
        </div>

        {/* Body Area Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {bodyAreas.map((area) => {
            const isSelected = !!selectedAreas[area.id];
            const currentFtu = selectedAreas[area.id] || area.defaultFtu;
            return (
              <div
                key={area.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-400 bg-amber-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900">{area.name}</h3>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleArea(area.id, area.defaultFtu)}
                      className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Standar: {area.description}
                  </p>
                </div>

                {isSelected && (
                  <div className="mt-3 pt-2 border-t border-amber-200/60 flex items-center justify-between">
                    <span className="text-xs text-amber-900 font-semibold">Takaran:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleUpdateMultiplier(area.id, -0.5)}
                        className="w-6 h-6 rounded bg-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center hover:bg-amber-300"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono font-bold text-amber-950 px-1">
                        {currentFtu} FTU
                      </span>
                      <button
                        onClick={() => handleUpdateMultiplier(area.id, 0.5)}
                        className="w-6 h-6 rounded bg-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center hover:bg-amber-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Prescription Parameters */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Frekuensi Pemakaian Harian
            </label>
            <div className="flex gap-2">
              {[1, 2].map((freq) => (
                <button
                  key={freq}
                  onClick={() => setFrequencyPerDay(freq)}
                  className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg border transition-colors ${
                    frequencyPerDay === freq
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {freq} Kali Sehari {freq === 1 ? '(misal: Malam saja)' : '(Pagi & Malam)'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ukuran Kemasan Tube Obat
            </label>
            <div className="flex gap-2">
              {[15, 30, 50].map((size) => (
                <button
                  key={size}
                  onClick={() => setTubeSize(size)}
                  className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg border transition-colors ${
                    tubeSize === size
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  Tube {size} Gram
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation Result Summary Box */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl p-5 shadow-sm space-y-3">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-amber-200">
            Hasil Estimasi Kebutuhan Terapi
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-2.5 rounded-lg bg-white/10 backdrop-blur-xs">
              <span className="text-[10px] text-amber-200 block">Total FTU / Oles</span>
              <span className="text-xl font-bold font-mono tabular-nums">{totalFtuPerApplication} FTU</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/10 backdrop-blur-xs">
              <span className="text-[10px] text-amber-200 block">Gram Obat / Oles</span>
              <span className="text-xl font-bold font-mono tabular-nums">{totalGramsPerApplication.toFixed(2)} g</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/10 backdrop-blur-xs">
              <span className="text-[10px] text-amber-200 block">Kebutuhan / Hari</span>
              <span className="text-xl font-bold font-mono tabular-nums">{totalGramsPerDay.toFixed(2)} g</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/10 backdrop-blur-xs">
              <span className="text-[10px] text-amber-200 block">1 Tube ({tubeSize}g) Bertahan</span>
              <span className="text-xl font-bold font-mono tabular-nums">± {daysTubeWillLast} Hari</span>
            </div>
          </div>

          <p className="text-[11px] text-amber-100 text-center pt-1">
            *Catatan: Jika menggunakan kortikosteroid potensi sangat kuat (Superpoten seperti Klobetasol), pastikan total penggunaan tidak melebihi 50 gram per minggu!
          </p>
        </div>

      </div>

      {/* Golden Rules: Aturan Urutan & Jeda Waktu Pelembap (Wireframe Screen 7) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <span>Aturan Jeda Waktu 15-30 Menit (Pelembap vs Obat Aktif)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Salah satu kesalahan paling sering yang ditemukan apoteker: mencampur pelembap dan obat kortikosteroid dalam satu waktu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase">
              <span className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px]">1</span>
              <span>Langkah Pertama</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Oleskan Pelembap Terlebih Dahulu</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Oleskan pelembap/emolien secara merata ke seluruh kulit (atau area lesi) untuk menghidrasi stratum korneum dan memperbaiki sawar kulit.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase">
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px]">2</span>
              <span>Tunggu Jeda 15-30 Menit</span>
            </div>
            <h3 className="text-sm font-bold text-emerald-950">Lalu Oleskan Obat Aktif (Steroid/Calcipotriol)</h3>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Beri waktu minimal 15-30 menit agar pelembap meresap sempurna. Setelah itu, oleskan obat aktif tipis-tipis hanya pada plak psoriasis. Hal ini mencegah obat aktif larut atau terbawa ke kulit sehat.
            </p>
          </div>
        </div>

        {/* 5 Langkah Aplikasi Benar */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-900">
            5 Langkah Mengoleskan Obat Topikal dengan Benar:
          </h3>
          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>1. Cuci Tangan Bersih:</strong> Cuci tangan menggunakan air mengalir dan sabun lembut sebelum menyentuh tube obat.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>2. Takar Sesuai FTU:</strong> Pencet salep/krim sesuai hitungan Fingertip Unit yang dibutuhkan.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>3. Oles Searah Rambut Halus:</strong> Usap perlahan searah tumbuhnya bulu kulit. JANGAN digosok memutar dengan keras karena dapat memicu iritasi dan folikulitis (radang akar rambut).</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>4. Jangan Dibalut Ketat:</strong> Biarkan obat meresap di udara terbuka. Jangan menutupnya dengan plastik cling wrap atau perban kedap udara kecuali atas instruksi eksplisit dari dokter.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>5. Cuci Tangan Kembali:</strong> Bilas tangan segera setelah selesai mengoles agar obat tidak tidak sengaja mengenai mata, mulut, atau area kulit sehat lainnya.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
