import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { api } from '../services/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'register';
  onSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Form State
  const [name, setName] = useState('Dadi Prasetyo');
  const [email, setEmail] = useState('dadi.prasetyo@example.com');
  const [phone, setPhone] = useState('081234567890');
  const [password, setPassword] = useState('rahasia123');
  const [age, setAge] = useState<number>(34);
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [psoriasisDuration, setPsoriasisDuration] = useState('1-3 tahun');
  const [affectedAreas, setAffectedAreas] = useState<string[]>(['Siku', 'Lutut']);
  const [currentMedications, setCurrentMedications] = useState<string[]>(['Calcipotriol 0.005% Salep', 'Pelembap Medis Ceramide']);
  const [otherDiseases, setOtherDiseases] = useState('');

  if (!isOpen) return null;

  const toggleArea = (area: string) => {
    if (affectedAreas.includes(area)) {
      setAffectedAreas(affectedAreas.filter((a) => a !== area));
    } else {
      setAffectedAreas([...affectedAreas, area]);
    }
  };

  const toggleMedication = (med: string) => {
    if (currentMedications.includes(med)) {
      setCurrentMedications(currentMedications.filter((m) => m !== med));
    } else {
      setCurrentMedications([...currentMedications, med]);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await api.getUserProfile();
      user.name = name || user.name;
      user.email = email || user.email;
      onSuccess(user);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsLoading(true);
    try {
      const newUser = await api.registerUser({
        name,
        email,
        phone,
        age,
        gender,
        psoriasisDuration,
        affectedAreas,
        currentMedications,
        otherDiseases,
      });
      onSuccess(newUser);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {mode === 'login' ? 'Masuk ke PsoriaCare' : 'Daftar Akun PsoriaCare'}
              </h3>
              <p className="text-xs text-slate-500">
                {mode === 'login' ? 'Kelola perjalanan terapi kulitmu di satu tempat' : `Langkah ${step} dari 3: ${step === 1 ? 'Data Diri' : step === 2 ? 'Kondisi Psoriasis' : 'Riwayat Obat & Penyakit'}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {mode === 'login' ? (
            /* Login Form (Wireframe 2) */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email atau Nomor Telepon
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com atau 0812..."
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Kata Sandi
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); }} className="text-xs text-emerald-600 hover:underline">
                    Lupa Password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  id="remember"
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <label htmlFor="remember" className="text-xs text-slate-600">
                  Ingat sesi saya pada perangkat ini
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Memproses...' : 'Masuk Sekarang'}
                </button>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs text-slate-500 uppercase">
                  <span className="bg-white px-2">Atau</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setName('Dadi Prasetyo');
                  setEmail('dadi.prasetyo@example.com');
                  onSuccess({
                    id: 'usr-demo',
                    name: 'Dadi Prasetyo',
                    email: 'dadi.prasetyo@example.com',
                    phone: '081234567890',
                    age: 34,
                    gender: 'Laki-laki',
                    psoriasisDuration: '2 tahun',
                    affectedAreas: ['Siku Kanan & Kiri', 'Lutut'],
                    currentMedications: ['Calcipotriol 0.005% Salep', 'Pelembap Medis Ceramide'],
                    otherDiseases: 'Tidak ada',
                    registeredAt: '2026-08-15'
                  });
                  onClose();
                }}
                className="w-full py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Masuk Akun Demo (Pasien Terapi Aktif)</span>
              </button>

              <p className="text-center text-xs text-slate-500 pt-2">
                Belum punya akun?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('register'); setStep(1); }}
                  className="text-emerald-700 font-semibold hover:underline"
                >
                  Daftar di sini
                </button>
              </p>
            </form>
          ) : (
            /* Multi-step Registration Wizard (Wireframe 3) */
            <form onSubmit={handleRegister} className="space-y-4">
              
              {/* Stepper Bar */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${step >= 1 ? 'text-emerald-700' : 'text-slate-400'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200'}`}>1</span>
                  <span>Data Diri</span>
                </div>
                <div className="h-0.5 w-8 bg-slate-200"></div>
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${step >= 2 ? 'text-emerald-700' : 'text-slate-400'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200'}`}>2</span>
                  <span>Psoriasis</span>
                </div>
                <div className="h-0.5 w-8 bg-slate-200"></div>
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${step === 3 ? 'text-emerald-700' : 'text-slate-400'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200'}`}>3</span>
                  <span>Pengobatan</span>
                </div>
              </div>

              {step === 1 && (
                /* Step 1: Info Diri */
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Dadi Prasetyo"
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
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
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Jenis Kelamin
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as 'Laki-laki' | 'Perempuan')}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nomor WhatsApp / HP
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0812xxxxxxx"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                /* Step 2: Kondisi Psoriasis */
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Sejak Kapan Anda Mengalami Psoriasis?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['< 1 tahun', '1-3 tahun', '> 3 tahun'].map((dur) => (
                        <button
                          key={dur}
                          type="button"
                          onClick={() => setPsoriasisDuration(dur)}
                          className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                            psoriasisDuration === dur
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          {dur}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Bagian Tubuh yang Sering Mengalami Lesi (Pilih semua yang sesuai)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Siku',
                        'Lutut',
                        'Kulit Kepala (Scalp)',
                        'Punggung & Pinggang',
                        'Dada / Perut',
                        'Wajah / Leher',
                        'Kuku Tangan/Kaki',
                        'Lipatan Kulit (Ketiak/Selangkangan)',
                        'Telapak Tangan & Kaki'
                      ].map((area) => {
                        const isSelected = affectedAreas.includes(area);
                        return (
                          <button
                            key={area}
                            type="button"
                            onClick={() => toggleArea(area)}
                            className={`px-3 py-1.5 text-xs rounded-lg border flex items-center gap-1.5 transition-colors ${
                              isSelected
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                            <span>{area}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500">
                    ℹ️ <em>Catatan:</em> Informasi ini membantu PsoriaCare menampilkan kalkulator dosis FTU dan panduan area tubuh yang paling relevan untuk Anda.
                  </div>
                </div>
              )}

              {step === 3 && (
                /* Step 3: Riwayat Obat & Penyakit (Opsional) */
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Obat yang Sedang atau Pernah Digunakan
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Calcipotriol 0.005% Salep',
                        'Klobetasol Propionat (Steroid Kuat)',
                        'Betametason Dipropionat',
                        'Kombinasi Calcipotriol + Betametason',
                        'Asam Salisilat 3-5%',
                        'Tacrolimus / Pimecrolimus',
                        'Pelembap Medis Ceramide / Urea',
                        'Belum Tahu / Belum Mulai Obat'
                      ].map((med) => {
                        const isSelected = currentMedications.includes(med);
                        return (
                          <button
                            key={med}
                            type="button"
                            onClick={() => toggleMedication(med)}
                            className={`px-3 py-1.5 text-xs rounded-lg border flex items-center gap-1.5 transition-colors ${
                              isSelected
                                ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                            <span>{med}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Riwayat Penyakit Lain yang Dimiliki (Opsional)
                    </label>
                    <input
                      type="text"
                      value={otherDiseases}
                      onChange={(e) => setOtherDiseases(e.target.value)}
                      placeholder="Contoh: Alergi obat tertentu, hipertensi, gastritis (atau kosongkan bila tidak ada)"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 leading-relaxed">
                    ⚠️ <strong>Pemberitahuan Medis:</strong> Informasi autoimun dan riwayat klinis yang diisi di sini tidak digunakan sebagai dasar diagnosis otomatis oleh website, melainkan untuk melengkapi catatan terapi dan persiapan konsultasi dengan dokter spesialis kulit.
                  </div>
                </div>
              )}

              {/* Wizard Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Kembali
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs text-slate-500 hover:underline"
                  >
                    Sudah punya akun? Masuk
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>{step === 3 ? (isLoading ? 'Menyimpan...' : 'Selesaikan Pendaftaran') : 'Lanjut'}</span>
                  {step < 3 && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
