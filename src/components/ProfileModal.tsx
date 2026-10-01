import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, User, Check, ShieldCheck, Trash2, Plus, LogOut } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdate: (updated: Partial<UserProfile>) => void;
  onLogout: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdate,
  onLogout,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [psoriasisDuration, setPsoriasisDuration] = useState(user.psoriasisDuration);
  const [affectedAreas, setAffectedAreas] = useState<string[]>(user.affectedAreas);
  const [currentMedications, setCurrentMedications] = useState<string[]>(user.currentMedications);
  const [newMedInput, setNewMedInput] = useState('');
  const [otherDiseases, setOtherDiseases] = useState(user.otherDiseases);

  const toggleArea = (area: string) => {
    if (affectedAreas.includes(area)) {
      setAffectedAreas(affectedAreas.filter((a) => a !== area));
    } else {
      setAffectedAreas([...affectedAreas, area]);
    }
  };

  const handleAddMed = () => {
    if (newMedInput.trim() && !currentMedications.includes(newMedInput.trim())) {
      setCurrentMedications([...currentMedications, newMedInput.trim()]);
      setNewMedInput('');
    }
  };

  const handleRemoveMed = (index: number) => {
    setCurrentMedications(currentMedications.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      name,
      age,
      gender,
      psoriasisDuration,
      affectedAreas,
      currentMedications,
      otherDiseases,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Profil & Data Klinis Pasien
              </h3>
              <p className="text-xs text-slate-500">
                Perbarui data diri dan riwayat psoriasis Anda
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Usia (Tahun)
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jenis Kelamin
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lama Mengalami Psoriasis
              </label>
              <select
                value={psoriasisDuration}
                onChange={(e) => setPsoriasisDuration(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="< 1 tahun">&lt; 1 tahun</option>
                <option value="1-3 tahun">1-3 tahun</option>
                <option value="> 3 tahun">&gt; 3 tahun</option>
              </select>
            </div>
          </div>

          {/* Area Tubuh */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Area Tubuh yang Sering Mengalami Plak
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Siku',
                'Lutut',
                'Kulit Kepala (Scalp)',
                'Punggung',
                'Dada / Perut',
                'Wajah / Leher',
                'Kuku',
                'Lipatan Kulit'
              ].map((area) => {
                const isSelected = affectedAreas.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleArea(area)}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {area}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Obat Saat Ini */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Daftar Obat yang Sedang Digunakan
            </label>
            <div className="space-y-1.5 mb-2">
              {currentMedications.map((med, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <span>{med}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMed(idx)}
                    className="text-slate-400 hover:text-rose-600 p-0.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newMedInput}
                onChange={(e) => setNewMedInput(e.target.value)}
                placeholder="Tambah obat lain..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddMed}
                className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah</span>
              </button>
            </div>
          </div>

          {/* Riwayat Lain */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Riwayat Penyakit Penyerta (Opsional)
            </label>
            <input
              type="text"
              value={otherDiseases}
              onChange={(e) => setOtherDiseases(e.target.value)}
              placeholder="Contoh: Alergi, asma, hipertensi..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="text-xs text-rose-600 hover:underline flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar Akun</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm"
            >
              Simpan Perubahan
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
