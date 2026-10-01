import React, { useState, useEffect } from 'react';
import { Medication, UserProfile } from '../types';
import { api } from '../services/api';
import { 
  Search, 
  Pill, 
  ShieldAlert, 
  Clock, 
  Sparkles, 
  Info, 
  X, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Plus
} from 'lucide-react';

interface MedicationsSectionProps {
  initialSearch?: string;
  user: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onNavigateToFtu: () => void;
}

export const MedicationsSection: React.FC<MedicationsSectionProps> = ({
  initialSearch = '',
  user,
  onUpdateProfile,
  onNavigateToFtu,
}) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);
  const [loading, setLoading] = useState(true);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories = [
    'Semua',
    'Analog Vitamin D3',
    'Kombinasi',
    'Kortikosteroid Topikal',
    'Keratolitik',
    'Inhibitor Kalsineurin',
    'Emolien & Pelembap'
  ];

  useEffect(() => {
    loadMedications();
  }, [searchQuery, selectedCategory]);

  const loadMedications = async () => {
    setLoading(true);
    try {
      const data = await api.getMedications({
        search: searchQuery,
        category: selectedCategory === 'Semua' ? undefined : selectedCategory
      });
      setMedications(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedToUser = (medName: string) => {
    if (!user.currentMedications.includes(medName)) {
      const updated = [...user.currentMedications, medName];
      onUpdateProfile({ currentMedications: updated });
      setAddedNotice(`"${medName}" berhasil ditambahkan ke daftar obat aktifmu!`);
      setTimeout(() => setAddedNotice(null), 3500);
    } else {
      setAddedNotice(`"${medName}" sudah ada di daftar obat aktifmu.`);
      setTimeout(() => setAddedNotice(null), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
          <Pill className="w-3.5 h-3.5 text-teal-600" />
          <span>Obatku – Direktori Informasi Obat Topikal Psoriasis</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Pencarian Informasi Terapi Topikal
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Temukan dosis presisi, sediaan, frekuensi harian, batas durasi pemakaian aman, serta instruksi khusus untuk mendukung efektivitas terapi dan mencegah efek samping.
        </p>
      </div>

      {/* Notice Banner */}
      {addedNotice && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-900 flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>{addedNotice}</span>
          </div>
          <button onClick={() => setAddedNotice(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search and Category Filters */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari obat topikal berdasarkan nama dagang, zat aktif, atau indikasi (misal: Calcipotriol, Klobetasol, Asam Salisilat)..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Medication Cards Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 text-sm">
          Memuat data obat topikal...
        </div>
      ) : medications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
          <Pill className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Obat Tidak Ditemukan</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Tidak ada obat yang cocok dengan kata kunci "{searchQuery}". Coba kata kunci lain atau pilih kategori "Semua".
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }}
            className="px-4 py-2 text-xs font-semibold bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Reset Pencarian
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {medications.map((med) => {
            const isUserMed = user.currentMedications.includes(med.name);
            return (
              <div
                key={med.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all p-5 flex flex-col justify-between group cursor-pointer"
                onClick={() => setSelectedMed(med)}
              >
                <div className="space-y-3">
                  
                  {/* Category and Potency */}
                  <div className="flex items-center justify-between text-[11px] gap-2">
                    <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 truncate">
                      {med.category}
                    </span>
                    <span className="font-mono text-slate-500 shrink-0">
                      {med.form}
                    </span>
                  </div>

                  {/* Name and Generic */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {med.name}
                    </h3>
                    <p className="text-xs text-slate-500 italic mt-0.5">
                      Zat aktif: {med.genericName}
                    </p>
                  </div>

                  {/* Indication */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {med.indication}
                  </p>

                  {/* Quick specs */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Frekuensi: <strong>{med.frequency}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">Durasi Maks: <strong>{med.maxDuration}</strong></span>
                    </div>
                  </div>

                </div>

                {/* Card Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-teal-700 flex items-center gap-1">
                    Detail Info
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddMedToUser(med.name);
                    }}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                      isUserMed
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isUserMed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Obat Aktifmu</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3 text-slate-500" />
                        <span>Tambahkan</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Medication Detail Modal (Wireframe Screen 6) */}
      {selectedMed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                    {selectedMed.category}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-mono">
                    {selectedMed.form}
                  </span>
                  {selectedMed.potency && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                      Potensi: {selectedMed.potency}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedMed.name}
                </h2>
                <p className="text-xs text-slate-500">
                  Zat Aktif: <strong>{selectedMed.genericName}</strong>
                </p>
              </div>

              <button
                onClick={() => setSelectedMed(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-700">
              
              {/* Indikasi */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Kegunaan & Indikasi
                </h4>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed text-slate-800">
                  {selectedMed.indication}
                </p>
              </div>

              {/* Dosis & Fingertip Unit (FTU) */}
              <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    Dosis & Fingertip Unit (FTU)
                  </h4>
                  <button
                    onClick={() => {
                      setSelectedMed(null);
                      onNavigateToFtu();
                    }}
                    className="text-xs font-bold text-amber-800 hover:underline"
                  >
                    Buka Kalkulator FTU →
                  </button>
                </div>
                <p className="text-amber-900 leading-relaxed">
                  {selectedMed.ftuRecommendation}
                </p>
              </div>

              {/* Aturan Pakai: Frekuensi & Durasi Maksimal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Frekuensi Penggunaan
                  </span>
                  <p className="font-semibold text-slate-900">{selectedMed.frequency}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Batas Durasi Maksimal
                  </span>
                  <p className="font-semibold text-slate-900">{selectedMed.maxDuration}</p>
                </div>
              </div>

              {/* Cara Aplikasi yang Benar */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Cara Penggunaan yang Benar
                </h4>
                <ul className="space-y-1.5">
                  {selectedMed.howToApply.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-slate-800 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tapering Guidance */}
              <div className="p-3.5 bg-teal-50 rounded-xl border border-teal-200 space-y-1">
                <h4 className="text-xs font-bold text-teal-950 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-teal-700" />
                  Panduan Tapering-Off (Penurunan Bertahap)
                </h4>
                <p className="text-xs text-teal-900 leading-relaxed">
                  {selectedMed.taperingGuidance}
                </p>
              </div>

              {/* Efek Samping & Kewaspadaan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 space-y-1">
                  <h4 className="text-xs font-bold text-rose-950">Efek Samping yang Perlu Diwaspadai</h4>
                  <ul className="text-xs text-rose-900/90 list-disc list-inside space-y-1">
                    {selectedMed.sideEffects.map((se, idx) => (
                      <li key={idx}>{se}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
                  <h4 className="text-xs font-bold text-amber-950">Hal yang Perlu Diperhatikan</h4>
                  <ul className="text-xs text-amber-900/90 list-disc list-inside space-y-1">
                    {selectedMed.precautions.map((prec, idx) => (
                      <li key={idx}>{prec}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedMed(null)}
                className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Tutup
              </button>

              <button
                onClick={() => {
                  handleAddMedToUser(selectedMed.name);
                  setSelectedMed(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambahkan ke Rejimen Obatku</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
