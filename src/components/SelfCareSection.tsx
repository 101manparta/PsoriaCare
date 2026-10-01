import React, { useState, useEffect } from 'react';
import { AppImages } from '../assets/images';
import { 
  HeartHandshake, 
  Droplets, 
  Clock, 
  Wind, 
  Utensils, 
  Sun, 
  ShieldCheck, 
  Play, 
  Pause, 
  RotateCcw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const SelfCareSection: React.FC = () => {
  // Breathing exercise state (4-7-8 method)
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathingCount, setBreathingCount] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (breathingActive) {
      timer = setInterval(() => {
        setBreathingCount((prev) => {
          if (prev <= 1) {
            // switch phase
            if (breathingPhase === 'Inhale') {
              setBreathingPhase('Hold');
              return 7;
            } else if (breathingPhase === 'Hold') {
              setBreathingPhase('Exhale');
              return 8;
            } else {
              setBreathingPhase('Inhale');
              setCyclesCompleted((c) => c + 1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [breathingActive, breathingPhase]);

  const resetBreathing = () => {
    setBreathingActive(false);
    setBreathingPhase('Inhale');
    setBreathingCount(4);
    setCyclesCompleted(0);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
          <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />
          <span>Perawatan Diri – Terapi Nonfarmakologi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Panduan Perawatan Kulit & Gaya Hidup Holistik
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Pengobatan topikal akan bekerja optimal bila didampingi oleh perawatan sawar kulit (skin barrier) yang benar, manajemen stres, dan penghindaran pemicu flare-up dalam kehidupan sehari-hari.
        </p>
      </div>

      {/* Hero Visual Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 sm:p-8">
        <div className="md:col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
            Fondasi Penting Terapi
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            Sinergi Antara Obat Topikal dan Perawatan Kulit Harian
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Studi klinis menunjukkan bahwa pasien yang rutin menggunakan pelembap dan menghindari trauma kulit mengalami remisi lebih lama serta memerlukan dosis steroid topikal yang lebih rendah.
          </p>
          <div className="flex flex-wrap gap-2 pt-2 text-xs">
            <span className="px-2.5 py-1 bg-rose-50 text-rose-800 rounded-md font-semibold border border-rose-200">
              pH Seimbang
            </span>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-md font-semibold border border-emerald-200">
              Bebas Pewangi Sintetis
            </span>
            <span className="px-2.5 py-1 bg-blue-50 text-blue-800 rounded-md font-semibold border border-blue-200">
              Kaya Ceramide
            </span>
          </div>
        </div>

        <div className="md:col-span-5">
          <img
            src={AppImages.selfCareImg}
            alt="Perawatan Diri Psoriasis"
            className="w-full h-56 object-cover rounded-xl shadow-md border border-slate-200"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* 4 Core Pillars of Daily Care */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pillar 1: Mandi Ramah Kulit */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              1. Ritual Mandi Ramah Kulit
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Menjaga kelembapan tanpa mengikis minyak alami kulit
            </p>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Air Suam-Suam Kuku:</strong> Hindari air panas mandi karena melarutkan lipid interseluler dan memicu rasa gatal lebih parah.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Batas Waktu &lt; 10-15 Menit:</strong> Mandi terlalu lama justru menarik air keluar dari lapisan epidermis.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Pembersih Bebas Sabun (Syndet):</strong> Gunakan sabun hipoalergenik, bebas SLS (Sodium Lauryl Sulfate), dan tanpa pewangi tajam.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Keringkan dengan Menepuk (Pat Dry):</strong> Jangan menggosok handuk secara agresif. Cukup ditepuk-tepuk lembut.</span>
            </li>
          </ul>
        </div>

        {/* Pillar 2: Aturan 3 Menit Pelembap */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              2. "The 3-Minute Moisturizing Rule"
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Mengunci hidrasi saat pori-pori kulit masih lembap
            </p>
          </div>
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
            Oleskan pelembap/emolien dalam waktu <strong>kurang dari 3 menit setelah keluar dari kamar mandi</strong>. Langkah ini mengunci molekul air di dalam lapisan stratum korneum sebelum menguap ke udara.
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Pilihlah pelembap bertekstur salep (ointment) atau krim kental kaya ceramide, gliserin, atau urea.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Oleskan kembali pelembap 2-3 kali sehari, terutama saat berada di ruangan ber-AC.</span>
            </li>
          </ul>
        </div>

        {/* Pillar 3: Menghindari Fenomena Koebner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              3. Proteksi Kulit & Fenomena Koebner
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Mencegah timbulnya lesi baru di area trauma fisik
            </p>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Gunting Kuku Pendek:</strong> Menghindari garukan malam hari yang tidak disadari.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Pakaian Katun Longgar:</strong> Hindari gesekan kain sintetis ketat di area lipatan paha, dada, dan pinggang.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Bila Gatal Menyerang:</strong> Gunakan kompres es/air dingin yang dibungkus handuk tipis, JANGAN digaruk atau dikelupas.</span>
            </li>
          </ul>
        </div>

        {/* Pillar 4: Nutrisi & Sinar Matahari */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              4. Nutrisi Anti-inflamasi & Matahari Pagi
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Mendukung regenerasi sel dari dalam tubuh
            </p>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span><strong>Omega-3 Alami:</strong> Konsumsi ikan laut (kembung, tongkol, salmon) dan kacang-kacangan untuk menekan mediator peradangan.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span><strong>Hidrasi 2 - 2.5 Liter/Hari:</strong> Air putih membantu fleksibilitas jaringan kulit.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span><strong>Matahari Pagi 10-15 Menit:</strong> Paparan sinar UVB pagi (sebelum jam 9) membantu sintesis vitamin D alami. Hindari sampai kulit memerah atau terbakar!</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Interactive Stress Management Tool (Breathing Exercise 4-7-8) */}
      <div className="bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold mb-2">
              <Wind className="w-3.5 h-3.5" />
              <span>Latihan Relaksasi Interaktif</span>
            </div>
            <h3 className="text-xl font-bold">
              Manajemen Stres: Teknik Pernapasan 4-7-8
            </h3>
            <p className="text-xs text-teal-100 max-w-xl mt-1">
              Stres psikologis adalah pemicu utama kekambuhan (flare-up) psoriasis. Lakukan relaksasi pernapasan ini 5 menit setiap kali merasa tegang atau gatal memuncak.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-teal-300 block">Siklus Selesai</span>
            <span className="text-2xl font-bold font-mono text-white tabular-nums">
              {cyclesCompleted}x
            </span>
          </div>
        </div>

        {/* Breathing Circle Display */}
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className={`relative w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-1000 border-4 ${
            breathingPhase === 'Inhale'
              ? 'scale-110 bg-teal-500/20 border-teal-400'
              : breathingPhase === 'Hold'
              ? 'scale-110 bg-amber-500/20 border-amber-400'
              : 'scale-90 bg-blue-500/20 border-blue-400'
          }`}>
            <span className="text-xs uppercase font-bold tracking-widest text-teal-200">
              {breathingPhase === 'Inhale' ? 'Tarik Napas' : breathingPhase === 'Hold' ? 'Tahan Napas' : 'Hembuskan'}
            </span>
            <span className="text-4xl font-extrabold font-mono text-white mt-1 tabular-nums">
              {breathingCount}
            </span>
          </div>

          <p className="text-xs text-teal-200 text-center max-w-md">
            {breathingPhase === 'Inhale' && 'Tarik napas perlahan melalui hidung selama 4 detik...'}
            {breathingPhase === 'Hold' && 'Tahan napas dengan tenang dan rileks selama 7 detik...'}
            {breathingPhase === 'Exhale' && 'Hembuskan napas perlahan melalui mulut selama 8 detik...'}
          </p>
        </div>

        {/* Breathing Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setBreathingActive(!breathingActive)}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
          >
            {breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{breathingActive ? 'Jeda Latihan' : 'Mulai Latihan'}</span>
          </button>
          <button
            onClick={resetBreathing}
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
