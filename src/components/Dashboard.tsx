import React, { useState } from 'react';
import { UserProfile, AdherenceStats } from '../types';
import { 
  Search, 
  BookOpen, 
  Pill, 
  Sparkles, 
  HeartHandshake, 
  Clock, 
  Camera, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle, 
  Calendar,
  Layers,
  Info
} from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  stats: AdherenceStats;
  onNavigate: (view: string) => void;
  onSearch: (query: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  stats,
  onNavigate,
  onSearch,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      onNavigate('medications');
    }
  };

  const menuItems = [
    {
      id: 'knowledge',
      title: 'Knowledge',
      subtitle: 'Mengenal Psoriasis',
      description: 'Pahami apa itu psoriasis, karakteristik plak eritema, skuama tebal, gejala, serta mitos vs fakta ilmiah.',
      icon: BookOpen,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconBg: 'bg-emerald-600 text-white',
      badge: 'Edukasi Ilmiah'
    },
    {
      id: 'medications',
      title: 'Obatku',
      subtitle: 'Mencari Informasi Obat',
      description: 'Basis data obat topikal: Calcipotriol, steroid berbagai potensi, asam salisilat, bentuk sediaan, & peringatan batas pemakaian.',
      icon: Pill,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
      iconBg: 'bg-teal-600 text-white',
      badge: 'Database Terapi'
    },
    {
      id: 'ftu-guide',
      title: 'Cara Penggunaan Obat',
      subtitle: 'Panduan & Kalkulator FTU',
      description: 'Kalkulator Fingertip Unit (FTU) per area tubuh, jeda waktu 15-30 menit dengan pelembap, dan teknik oles searah bulu halus.',
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      iconBg: 'bg-amber-600 text-white',
      badge: 'Kalkulator Dosis'
    },
    {
      id: 'self-care',
      title: 'Perawatan Diri',
      subtitle: 'Terapi Nonfarmakologi',
      description: 'Ritual mandi ramah kulit, "The 3-Minute Rule" pelembap, pencegahan Fenomena Koebner, & latihan pernapasan pereda stres.',
      icon: HeartHandshake,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      iconBg: 'bg-rose-600 text-white',
      badge: 'Gaya Hidup'
    },
    {
      id: 'adherence',
      title: 'Monitoring Pengobatan',
      subtitle: 'Log Kepatuhan Terapi',
      description: 'Catat pemakaian obat harian pagi/malam, pantau efek samping (sensasi terbakar/kemerahan), dan cek skor kepatuhanmu.',
      icon: Clock,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      iconBg: 'bg-blue-600 text-white',
      badge: 'Buku Catatan'
    },
    {
      id: 'skin-tracker',
      title: 'Skin Tracker',
      subtitle: 'Dokumentasi Kondisi Kulit',
      description: 'Unggah foto lesi mingguan, pantau skor kemerahan, ketebalan sisik, & gatal secara berkala untuk melihat perbandingan.',
      icon: Camera,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      iconBg: 'bg-indigo-600 text-white',
      badge: 'Foto & Evaluasi'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner & Search Header (Wireframe Screen 4) */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-100 text-xs font-semibold">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
            <span>Pendamping Terapi Kulit Harian</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Halo, {user.name}!
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Apa yang ingin kamu cari hari ini? Temukan informasi obat topikal, hitung takaran Fingertip Unit (FTU), atau catat perkembangan kulitmu.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="relative flex items-center max-w-xl">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Ketik nama obat (misal: Calcipotriol, Klobetasol), atau topik edukasi..."
                className="w-full pl-11 pr-24 py-3 bg-white text-slate-900 placeholder-slate-400 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Cari
              </button>
            </div>
          </form>
        </div>

        {/* Subtle Decorative Pattern */}
        <div className="absolute -right-8 -bottom-12 w-64 h-64 bg-white/5 rounded-full pointer-events-none"></div>
      </div>

      {/* Patient Profile Quick Summary & Adherence Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Profile Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div className="space-y-1 min-w-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Profil Pasien
            </h3>
            <p className="text-sm font-bold text-slate-800 truncate">
              {user.name} ({user.age} thn)
            </p>
            <p className="text-xs text-slate-500">
              Terkena: <strong className="text-slate-700">{user.psoriasisDuration}</strong> · {user.affectedAreas.slice(0, 2).join(', ')}
            </p>
          </div>
        </div>

        {/* Adherence Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tingkat Kepatuhan Obat
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                {stats.adherenceRate}%
              </span>
              <span className="text-xs text-emerald-600 font-semibold">
                Streak {stats.streakDays} hari berturut
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {stats.completedDoses} dosis tercatat digunakan tepat waktu
            </p>
          </div>
        </div>

        {/* Current Active Regimen */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
            <Pill className="w-5 h-5" />
          </div>
          <div className="space-y-1 min-w-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Rejimen Topikal Aktif
            </h3>
            <p className="text-xs font-semibold text-slate-800 truncate">
              {user.currentMedications.length > 0 ? user.currentMedications[0] : 'Belum memilih obat'}
            </p>
            <p className="text-[11px] text-slate-500">
              {user.currentMedications.length > 1 ? `+${user.currentMedications.length - 1} terapi suportif lainnya` : 'Gunakan sesuai instruksi dokter'}
            </p>
          </div>
        </div>

      </div>

      {/* 6 Core Menus Grid (Wireframe Screen 4 - Menu Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Menu Pilihan Utama
          </h2>
          <span className="text-xs text-slate-500">
            Pilih fitur untuk mempelajari atau mencatat
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="text-left bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group active:scale-[0.99]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <h4 className="text-xs font-semibold text-slate-500 mb-2">
                    {item.subtitle}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Buka Menu</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Arahan untuk Konsultasi (Wireframe Screen 11 Quick Access Banner) */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-amber-950">
              Arahan untuk Konsultasi Dokter & Apoteker
            </h3>
            <p className="text-xs text-amber-900/80 leading-relaxed max-w-2xl">
              Kondisi kulit tidak kunjung membaik, lesi meluas mendadak, atau merasakan efek samping obat seperti rasa terbakar berat atau kulit menipis? Dapatkan panduan tanda bahaya (red flags) dan cetak ringkasan perkembangan kulitmu untuk dibawa ke klinik.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('consultation')}
          className="whitespace-nowrap px-4 py-2.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
        >
          <span>Cek Panduan Konsultasi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Medical Grounding Footnote */}
      <div className="flex items-center gap-2 text-xs text-slate-400 justify-center text-center px-4">
        <Info className="w-4 h-4 text-slate-400 shrink-0" />
        <span>PsoriaCare mengacu pada pedoman klinis terapi topikal dan kepatuhan pengobatan psoriasis.</span>
      </div>

    </div>
  );
};
