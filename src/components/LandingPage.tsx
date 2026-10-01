import React from 'react';
import { AppImages } from '../assets/images';
import { ArrowRight, BookOpen, Pill, Camera, HeartHandshake, CheckCircle2, ShieldCheck, Stethoscope, ChevronRight } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onExploreDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onExploreDemo }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white py-12 md:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline and Call-to-actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-3 py-1.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Edukasi & Pemantauan Terapi Topikal Terstruktur</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
                Kenali Psoriasis, Pahami Pengobatannya, Jaga Kulitmu Lebih Baik
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl text-balance">
                PsoriaCare hadir untuk membantu kamu memahami karakteristik lesi kulitmu, mengenal dosis dan cara kerja obat topikal yang digunakan, memantau kepatuhan harian, serta mendokumentasikan perkembangan kulit dari waktu ke waktu.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={onStart}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 group"
                >
                  <span>Mulai Sekarang</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={onExploreDemo}
                  className="px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-300 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Eksplorasi Fitur Langsung</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Scientific Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 border-t border-slate-200">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Berdasarkan Jurnal Kepatuhan Terapi Topikal
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Standar Dosis Fingertip Unit (FTU)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Tanpa Klaim Diagnosis Otomatis
                </span>
              </div>
            </div>

            {/* Right Column: Hero Banner Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-white">
                <img
                  src={AppImages.heroBanner}
                  alt="PsoriaCare Platform Edukasi dan Pemantauan Psoriasis"
                  className="w-full h-[320px] sm:h-[400px] object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent flex flex-col justify-end p-6 text-white">
                  <p className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
                    Konsep Utama PsoriaCare
                  </p>
                  <p className="text-sm font-medium mt-1 text-slate-100 leading-snug">
                    "Instruksi penggunaan yang jelas dan tepat mendukung kepatuhan dan efektivitas pengobatan pasien psoriasis."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Feature Highlights Grid (Matching Wireframe Screen 1) */}
      <section id="fitur" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">
              Kenapa PsoriaCare?
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Fitur Lengkap yang Dirancang Khusus untuk Sahabat Psoriasis
            </h3>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              Bukan hanya website informasi umum, PsoriaCare menyediakan instrumen interaktif untuk memandu perjalanan terapi Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                Informasi Lengkap
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pahami apa itu psoriasis, karakteristik lesi (papul, plak eritema, skuama tebal), faktor pemicu flare-up, serta mitos vs fakta.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Pill className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                Panduan Obat & FTU
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Kalkulator Fingertip Unit (FTU) berdasarkan area tubuh. Pelajari durasi maksimal, cara oles yang benar, dan jeda waktu dengan pelembap.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                Skin Tracker Berkala
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dokumentasikan foto area kulit dan catat tingkat kemerahan, sisik, serta gatal setiap minggu untuk melihat perbandingan perkembangan.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                Perawatan Diri Holistik
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Panduan nonfarmakologi: ritual mandi yang aman, aturan 3 menit pelembap, pencegahan Fenomena Koebner, dan relaksasi pereda stres.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Clinical Grounding & Pharmacist Gap Section */}
      <section id="kesenjangan-informasi" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Latar Belakang Penelitian Klinis</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Menjembatani Kesenjangan Informasi Antara Tenaga Kesehatan dan Pasien
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed">
                  Penelitian pada pasien psoriasis menunjukkan masih adanya kesenjangan informasi mengenai aturan penggunaan obat topikal—khususnya dosis pasti (Fingertip Unit), frekuensi pengolesan, batas waktu aman kortikosteroid, serta cara aplikasi yang tepat. Ketidakjelasan instruksi ini sering menyebabkan pasien kurang patuh, lesi tidak kunjung membaik, atau timbul efek samping seperti atrofi kulit.
                </p>

                <p className="text-sm text-slate-600 leading-relaxed">
                  PsoriaCare menyajikan edukasi terstandardisasi dan logbook pemantauan yang mudah dipahami agar pasien merasa berdaya dan terarah dalam menjalani terapi jangka panjang.
                </p>

                <div className="pt-2">
                  <button
                    onClick={onStart}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>Pelajari cara pakai obat yang tepat</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 bg-emerald-50/60 rounded-xl p-6 border border-emerald-200/80 space-y-3">
                <h4 className="text-sm font-bold text-emerald-950">
                  Prinsip Keamanan PsoriaCare
                </h4>
                <ul className="text-xs text-emerald-900/90 space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-emerald-700">•</span>
                    <span><strong>Bukan Penentu Diagnosis:</strong> Website tidak mendiagnosis otomatis dari foto.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-emerald-700">•</span>
                    <span><strong>Pencegah Rebound:</strong> Memberi panduan tapering-off obat steroid agar tidak kambuh mendadak.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-emerald-700">•</span>
                    <span><strong>Mitra Konsultasi:</strong> Memfasilitasi ringkasan data yang siap dibawa saat kontrol ke dokter atau apoteker.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="tentang" className="bg-white py-10 mt-auto border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            <p className="font-bold text-slate-800 text-sm">PsoriaCare</p>
            <p className="mt-1">
              "Kenali psoriasis, pahami pengobatannya, dan jaga kulitmu setiap hari"
            </p>
          </div>
          <div className="text-center sm:text-right">
            <p>Berfokus pada Terapi Topikal & Kepatuhan Pengobatan Psoriasis</p>
            <p className="text-slate-400 mt-1">© {new Date().getFullYear()} PsoriaCare. Seluruh hak cipta dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
