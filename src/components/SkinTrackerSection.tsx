import React, { useState, useEffect } from 'react';
import { SkinTrackerEntry, UserProfile } from '../types';
import { api } from '../services/api';
import { 
  Camera, 
  Upload, 
  Plus, 
  Trash2, 
  TrendingDown, 
  Layers, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Info,
  Sliders,
  Calendar
} from 'lucide-react';

interface SkinTrackerSectionProps {
  user: UserProfile;
}

export const SkinTrackerSection: React.FC<SkinTrackerSectionProps> = ({ user }) => {
  const [entries, setEntries] = useState<SkinTrackerEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [bodyArea, setBodyArea] = useState(user.affectedAreas[0] || 'Siku Kanan');
  const [weekLabel, setWeekLabel] = useState(`Minggu ${entries.length + 1}`);
  const [erythema, setErythema] = useState<number>(2);
  const [scaling, setScaling] = useState<number>(2);
  const [induration, setInduration] = useState<number>(2);
  const [pruritus, setPruritus] = useState<number>(2);
  const [estimatedArea, setEstimatedArea] = useState('4 cm x 3 cm');
  const [notes, setNotes] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Comparison selector
  const [compareLeftIdx, setCompareLeftIdx] = useState<number>(0);
  const [compareRightIdx, setCompareRightIdx] = useState<number>(0);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    setLoading(true);
    try {
      const data = await api.getSkinTracker();
      setEntries(data);
      if (data.length > 0) {
        setCompareLeftIdx(0);
        setCompareRightIdx(data.length - 1);
        setWeekLabel(`Minggu ${data.length + 1}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.addSkinTrackerEntry({
        date: new Date().toISOString().split('T')[0],
        weekLabel: weekLabel || `Minggu ${entries.length + 1}`,
        bodyArea,
        photoUrl: photoPreview,
        erythema,
        scaling,
        induration,
        pruritus,
        estimatedArea,
        notes: notes || 'Pemeriksaan rutin mingguan.'
      });
      setNotification('Dokumentasi kondisi kulit berhasil ditambahkan!');
      setTimeout(() => setNotification(null), 3000);
      setShowAddForm(false);
      setPhotoPreview('');
      setNotes('');
      await loadEntries();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteSkinTrackerEntry(id);
      await loadEntries();
    } catch (e) {
      console.error(e);
    }
  };

  const leftItem = entries[compareLeftIdx];
  const rightItem = entries[compareRightIdx];

  const calcCompositeScore = (item: SkinTrackerEntry) => {
    return item.erythema + item.scaling + item.induration + item.pruritus;
  };

  const scoreImprovementPercent = leftItem && rightItem && calcCompositeScore(leftItem) > 0
    ? Math.round(((calcCompositeScore(leftItem) - calcCompositeScore(rightItem)) / calcCompositeScore(leftItem)) * 100)
    : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
            <Camera className="w-3.5 h-3.5 text-indigo-600" />
            <span>Skin Tracker – Dokumentasi Kondisi Kulit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pelacak & Pemantau Perkembangan Kulit
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Dokumentasikan foto dan nilai tingkat kemerahan, sisik, dan gatal secara berkala untuk membandingkan perubahan kondisi kulit dari minggu ke minggu.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-all shadow-sm flex items-center gap-2 self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Tutup Form' : 'Tambah Dokumentasi Baru'}</span>
        </button>
      </div>

      {/* Safety Notice Banner (Mandatory as per PDF specs page 3) */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-600 leading-relaxed">
        <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800">Prinsip Keamanan PsoriaCare:</strong> Fitur ini berfungsi sebagai alat dokumentasi pribadi dan pemantau perubahan kondisi kulit, <em>bukan penentu diagnosis medis otomatis</em> dari hasil scan foto. Hasil pemantauan berupa perbandingan perubahan dari waktu ke waktu untuk dikonsultasikan bersama dokter spesialis kulit Anda.
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{notification}</span>
        </div>
      )}

      {/* Form Tambah Dokumentasi Baru */}
      {showAddForm && (
        <div className="bg-white rounded-2xl border border-indigo-200 shadow-md p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-600" />
            <span>Form Dokumentasi Perkembangan Kulit Mingguan</span>
          </h2>

          <form onSubmit={handleAddEntry} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Area Kulit yang Dipantau
                </label>
                <select
                  value={bodyArea}
                  onChange={(e) => setBodyArea(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Siku Kanan">Siku Kanan</option>
                  <option value="Siku Kiri">Siku Kiri</option>
                  <option value="Lutut Kanan">Lutut Kanan</option>
                  <option value="Lutut Kiri">Lutut Kiri</option>
                  <option value="Kulit Kepala (Scalp)">Kulit Kepala (Scalp)</option>
                  <option value="Punggung Bawah">Punggung Bawah</option>
                  <option value="Dada / Perut">Dada / Perut</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Label Periode
                </label>
                <input
                  type="text"
                  value={weekLabel}
                  onChange={(e) => setWeekLabel(e.target.value)}
                  placeholder="Contoh: Minggu 4"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Estimasi Luas Lesi
                </label>
                <input
                  type="text"
                  value={estimatedArea}
                  onChange={(e) => setEstimatedArea(e.target.value)}
                  placeholder="Contoh: 3 cm x 2 cm"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Photo Upload Slot */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Foto Area Kulit (Unggah dari Kamera / Galeri)
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                />
                {photoPreview ? (
                  <div className="flex items-center gap-2">
                    <img src={photoPreview} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-slate-200" />
                    <span className="text-xs text-emerald-600 font-semibold">Foto siap disimpan</span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400">
                    *Gunakan pencahayaan terang alami untuk konsistensi foto mingguan
                  </span>
                )}
              </div>
            </div>

            {/* 4 Clinical Severity Sliders (0 - 4) */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-600" />
                <span>Skala Penilaian Kondisi Kulit (0 = Tidak Ada, 4 = Berat)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. Kemerahan (Eritema) */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800">Tingkat Kemerahan (Eritema)</span>
                    <span className="font-mono text-indigo-600 font-bold">Skor: {erythema}/4</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={erythema}
                    onChange={(e) => setErythema(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>0: Samar / Normal</span>
                    <span>2: Merah Sedang</span>
                    <span>4: Merah Sangat Gelap</span>
                  </div>
                </div>

                {/* 2. Sisik (Deskuamasi) */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800">Ketebalan Sisik (Deskuamasi)</span>
                    <span className="font-mono text-indigo-600 font-bold">Skor: {scaling}/4</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={scaling}
                    onChange={(e) => setScaling(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>0: Bersih</span>
                    <span>2: Sisik Halus</span>
                    <span>4: Sisik Tebal Berlapis</span>
                  </div>
                </div>

                {/* 3. Ketebalan Plak (Indurasi) */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800">Ketebalan Plak (Indurasi)</span>
                    <span className="font-mono text-indigo-600 font-bold">Skor: {induration}/4</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={induration}
                    onChange={(e) => setInduration(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>0: Rata Kulit</span>
                    <span>2: Teraba Menonjol</span>
                    <span>4: Sangat Tebal Keras</span>
                  </div>
                </div>

                {/* 4. Gatal (Pruritus) */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800">Rasa Gatal (Pruritus)</span>
                    <span className="font-mono text-indigo-600 font-bold">Skor: {pruritus}/4</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={pruritus}
                    onChange={(e) => setPruritus(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>0: Bebas Gatal</span>
                    <span>2: Gatal Sesekali</span>
                    <span>4: Sangat Mengganggu Tidur</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Catatan Tambahan */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Catatan Kondisi Minggu Ini
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Misal: Sisik mulai melunak setelah pemakaian Calcipotriol teratur. Masih terasa sedikit perih bila berkeringat..."
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm"
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Dokumentasi'}
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Side-by-Side Comparison Feature (Wireframe Screen 9) */}
      {entries.length >= 2 && leftItem && rightItem && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span>Perbandingan Perkembangan Antara Dua Periode</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Bandingkan perubahan visual dan skor parameter klinis secara langsung
              </p>
            </div>

            {/* Improvement Banner */}
            {scoreImprovementPercent > 0 && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 text-xs font-bold">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                <span>Tingkat Keparahan Lesi Turun {scoreImprovementPercent}%</span>
              </div>
            )}
          </div>

          {/* Selectors for comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Pilih Periode Pembanding (Sebelumnya)
              </label>
              <select
                value={compareLeftIdx}
                onChange={(e) => setCompareLeftIdx(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              >
                {entries.map((item, idx) => (
                  <option key={item.id} value={idx}>
                    {item.weekLabel} ({item.date}) - {item.bodyArea}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Pilih Periode Evaluasi (Terbaru)
              </label>
              <select
                value={compareRightIdx}
                onChange={(e) => setCompareRightIdx(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              >
                {entries.map((item, idx) => (
                  <option key={item.id} value={idx}>
                    {item.weekLabel} ({item.date}) - {item.bodyArea}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            {/* Left Box (Earlier) */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                  {leftItem.weekLabel} ({leftItem.date})
                </span>
                <span className="text-xs font-mono font-bold text-slate-600">
                  Area: {leftItem.bodyArea}
                </span>
              </div>

              {leftItem.photoUrl ? (
                <img src={leftItem.photoUrl} alt="Foto Lesi Awal" className="w-full h-44 object-cover rounded-xl border border-slate-200" />
              ) : (
                <div className="w-full h-44 bg-slate-200/60 rounded-xl flex flex-col items-center justify-center text-slate-400 text-xs">
                  <Camera className="w-6 h-6 mb-1 text-slate-400" />
                  <span>Foto tidak dilampirkan</span>
                </div>
              )}

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-600">Kemerahan (Eritema):</span>
                  <span className="font-bold text-slate-900">{leftItem.erythema}/4</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-600">Sisik (Deskuamasi):</span>
                  <span className="font-bold text-slate-900">{leftItem.scaling}/4</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-600">Ketebalan Plak:</span>
                  <span className="font-bold text-slate-900">{leftItem.induration}/4</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-600">Rasa Gatal:</span>
                  <span className="font-bold text-slate-900">{leftItem.pruritus}/4</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 italic">
                "{leftItem.notes}"
              </p>
            </div>

            {/* Right Box (Later) */}
            <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300">
                  {rightItem.weekLabel} ({rightItem.date})
                </span>
                <span className="text-xs font-mono font-bold text-slate-600">
                  Area: {rightItem.bodyArea}
                </span>
              </div>

              {rightItem.photoUrl ? (
                <img src={rightItem.photoUrl} alt="Foto Lesi Terbaru" className="w-full h-44 object-cover rounded-xl border border-emerald-200" />
              ) : (
                <div className="w-full h-44 bg-emerald-100/50 rounded-xl flex flex-col items-center justify-center text-emerald-700/60 text-xs">
                  <Camera className="w-6 h-6 mb-1" />
                  <span>Foto tidak dilampirkan</span>
                </div>
              )}

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-emerald-200">
                  <span className="text-slate-600">Kemerahan (Eritema):</span>
                  <span className="font-bold text-slate-900">{rightItem.erythema}/4</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-200">
                  <span className="text-slate-600">Sisik (Deskuamasi):</span>
                  <span className="font-bold text-slate-900">{rightItem.scaling}/4</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-200">
                  <span className="text-slate-600">Ketebalan Plak:</span>
                  <span className="font-bold text-slate-900">{rightItem.induration}/4</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-200">
                  <span className="text-slate-600">Rasa Gatal:</span>
                  <span className="font-bold text-slate-900">{rightItem.pruritus}/4</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 italic">
                "{rightItem.notes}"
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Historical Entries Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          Riwayat Seluruh Dokumentasi Kulit ({entries.length})
        </h2>

        {entries.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
            Belum ada dokumentasi tersimpan. Klik tombol "Tambah Dokumentasi Baru" di atas untuk mulai mencatat.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {entries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-900">{entry.weekLabel}</span>
                    <span className="text-slate-400 font-mono text-[10px]">{entry.date}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {entry.bodyArea}
                  </span>

                  <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600 pt-3">
                    <div>Kemerahan: <strong>{entry.erythema}/4</strong></div>
                    <div>Sisik: <strong>{entry.scaling}/4</strong></div>
                    <div>Ketebalan: <strong>{entry.induration}/4</strong></div>
                    <div>Gatal: <strong>{entry.pruritus}/4</strong></div>
                  </div>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 italic">
                    "{entry.notes}"
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-1 text-slate-300 hover:text-rose-500 transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
