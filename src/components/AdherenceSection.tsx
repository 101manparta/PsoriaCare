import React, { useState, useEffect } from 'react';
import { UserProfile, AdherenceLog, AdherenceStats } from '../types';
import { api } from '../services/api';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Calendar, 
  Check, 
  Flame, 
  Sparkles,
  Layers
} from 'lucide-react';

interface AdherenceSectionProps {
  user: UserProfile;
  onAdherenceUpdated: () => void;
}

export const AdherenceSection: React.FC<AdherenceSectionProps> = ({
  user,
  onAdherenceUpdated,
}) => {
  const [logs, setLogs] = useState<AdherenceLog[]>([]);
  const [stats, setStats] = useState<AdherenceStats>({
    totalLogs: 0,
    completedDoses: 0,
    missedDoses: 0,
    adherenceRate: 100,
    streakDays: 0
  });
  const [loading, setLoading] = useState(true);

  // Form State
  const [medicationName, setMedicationName] = useState(
    user.currentMedications.length > 0 ? user.currentMedications[0] : 'Calcipotriol 0.005% Ointment'
  );
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState<'Pagi' | 'Siang' | 'Malam'>('Pagi');
  const [status, setStatus] = useState<'used' | 'missed'>('used');
  const [sideEffectReport, setSideEffectReport] = useState<'none' | 'burning' | 'redness' | 'itching' | 'atrophy'>('none');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await api.getAdherence();
      setLogs(data.logs);
      setStats(data.stats);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.addAdherenceLog({
        date,
        timeSlot,
        medicationName,
        status,
        sideEffectReport,
        note
      });
      setNotification('Catatan penggunaan obat berhasil disimpan!');
      setTimeout(() => setNotification(null), 3000);
      setNote('');
      await loadData();
      onAdherenceUpdated();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLog = async (id: string) => {
    try {
      await api.deleteAdherenceLog(id);
      await loadData();
      onAdherenceUpdated();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>Monitoring Pengobatan – Log Kepatuhan Terapi Topikal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Buku Catatan Penggunaan Obat
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Bukan alarm aplikasi yang mengganggu, melainkan log mandiri terstruktur untuk melihat riwayat kepatuhan pemakaian obat serta mendokumentasikan keluhan efek samping secara akurat.
        </p>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{notification}</span>
        </div>
      )}

      {/* Stats Cards (Wireframe Screen 8) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Tingkat Kepatuhan
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">
              {stats.adherenceRate}%
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {stats.adherenceRate >= 80 ? 'Kepatuhan sangat baik' : 'Perlu ditingkatkan'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Dosis Selesai
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600 font-mono tabular-nums">
              {stats.completedDoses}
            </span>
            <span className="text-xs text-slate-400">kali dioles</span>
          </div>
          <p className="text-[11px] text-slate-500">Tercatat sesuai anjuran</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Dosis Terlewat
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-500 font-mono tabular-nums">
              {stats.missedDoses}
            </span>
            <span className="text-xs text-slate-400">kali</span>
          </div>
          <p className="text-[11px] text-slate-500">Lupa atau tertunda</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Streak Harian
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-600 font-mono tabular-nums">
              {stats.streakDays}
            </span>
            <span className="text-xs text-slate-400">hari berturut</span>
          </div>
          <p className="text-[11px] text-slate-500">Rutinitas berkelanjutan</p>
        </div>

      </div>

      {/* Form Catat Penggunaan Obat (Screen 8) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Plus className="w-5 h-5 text-blue-600" />
          <span>Catat Penggunaan Obat Baru</span>
        </h2>

        <form onSubmit={handleAddLog} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Obat */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pilih Nama Obat
              </label>
              <select
                value={medicationName}
                onChange={(e) => setMedicationName(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {user.currentMedications.map((m, idx) => (
                  <option key={idx} value={m}>{m}</option>
                ))}
                <option value="Calcipotriol 0.005% Ointment">Calcipotriol 0.005% Ointment</option>
                <option value="Klobetasol Propionat 0.05% Salep">Klobetasol Propionat 0.05% Salep</option>
                <option value="Mometason Furoat 0.1% Krim">Mometason Furoat 0.1% Krim</option>
                <option value="Pelembap Medis Ceramide">Pelembap Medis Ceramide</option>
                <option value="Asam Salisilat 3% Salep">Asam Salisilat 3% Salep</option>
              </select>
            </div>

            {/* Tanggal */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tanggal
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* Waktu Sesi */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Waktu Sesi
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(['Pagi', 'Siang', 'Malam'] as const).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                      timeSlot === slot
                        ? 'bg-blue-600 text-white border-blue-600 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Status Pemakaian */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status Pemakaian
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('used')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                    status === 'used'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-400 ring-1 ring-emerald-400'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Sudah Digunakan</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('missed')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                    status === 'missed'
                      ? 'bg-rose-50 text-rose-800 border-rose-400 ring-1 ring-rose-400'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <XCircle className="w-4 h-4 text-rose-500" />
                  <span>Terlewat / Lupa</span>
                </button>
              </div>
            </div>

            {/* Keluhan / Efek Samping */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Apakah Ada Keluhan / Efek Samping?
              </label>
              <select
                value={sideEffectReport}
                onChange={(e) => setSideEffectReport(e.target.value as any)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="none">Tidak Ada Keluhan (Aman & Nyaman)</option>
                <option value="burning">Sensasi Panas / Perih Terbakar</option>
                <option value="redness">Kemerahan Bertambah di Sekitar Lesi</option>
                <option value="itching">Rasa Gatal Meningkat</option>
                <option value="atrophy">Kulit Terasa Menipis / Timbul Garis Merah</option>
              </select>
            </div>

          </div>

          {/* Catatan */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Catatan Penggunaan (Opsional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Contoh: Dioleskan tipis di kedua siku setelah mandi, jeda 20 menit dari pelembap..."
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{isSubmitting ? 'Menyimpan...' : 'Simpan ke Log Kepatuhan'}</span>
            </button>
          </div>

        </form>
      </div>

      {/* Riwayat Logbook Terapi */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Riwayat Log Penggunaan Obat ({logs.length})
          </h2>
          <span className="text-xs text-slate-500">
            Terurut dari yang terbaru
          </span>
        </div>

        {loading ? (
          <p className="text-center py-8 text-xs text-slate-500">Memuat log...</p>
        ) : logs.length === 0 ? (
          <p className="text-center py-8 text-xs text-slate-500">Belum ada riwayat tercatat. Silakan masukkan catatan pertamamu di atas.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {logs.map((log) => (
              <div key={log.id} className="py-3.5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {log.status === 'used' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {log.medicationName}
                      </span>
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {log.timeSlot}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {log.date}
                      </span>
                    </div>

                    {log.sideEffectReport !== 'none' && (
                      <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <AlertCircle className="w-3 h-3" />
                        <span>Keluhan: {
                          log.sideEffectReport === 'burning' ? 'Sensasi panas/terbakar' :
                          log.sideEffectReport === 'redness' ? 'Kemerahan meningkat' :
                          log.sideEffectReport === 'itching' ? 'Gatal bertambah' : 'Kulit menipis'
                        }</span>
                      </div>
                    )}

                    {log.note && (
                      <p className="text-xs text-slate-600 mt-1 italic">
                        "{log.note}"
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteLog(log.id)}
                  className="p-1 text-slate-300 hover:text-rose-500 transition-colors"
                  title="Hapus Catatan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
