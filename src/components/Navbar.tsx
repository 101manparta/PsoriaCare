import React from 'react';
import { UserProfile } from '../types';
import { ShieldCheck, User, LogIn, Sparkles, BookOpen, Pill, Clock, HeartHandshake, Camera, AlertCircle } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  user: UserProfile | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  user,
  onOpenAuth,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate(user ? 'dashboard' : 'landing')}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-98"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-700/20 group-hover:bg-emerald-700 transition-colors">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-sans block leading-none">
              Psoria<span className="text-emerald-600">Care</span>
            </span>
            <span className="text-[10px] tracking-wide font-medium text-slate-500 uppercase mt-0.5 block">
              Edukasi & Terapi Topikal
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-slate-600">
          {user ? (
            <>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentView === 'dashboard' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('knowledge')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentView === 'knowledge' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                Knowledge
              </button>
              <button
                onClick={() => onNavigate('medications')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentView === 'medications' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Pill className="w-4 h-4 text-teal-600" />
                Obatku
              </button>
              <button
                onClick={() => onNavigate('ftu-guide')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentView === 'ftu-guide' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                Cara Pakai (FTU)
              </button>
              <button
                onClick={() => onNavigate('adherence')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentView === 'adherence' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Clock className="w-4 h-4 text-blue-500" />
                Monitoring
              </button>
              <button
                onClick={() => onNavigate('skin-tracker')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentView === 'skin-tracker' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Camera className="w-4 h-4 text-indigo-500" />
                Skin Tracker
              </button>
              <button
                onClick={() => onNavigate('self-care')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentView === 'self-care' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <HeartHandshake className="w-4 h-4 text-rose-500" />
                Perawatan Diri
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onNavigate('landing')}
                className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                Beranda
              </button>
              <a
                href="#fitur"
                className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                Fitur Unggulan
              </a>
              <a
                href="#kesenjangan-informasi"
                className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                Edukasi Terapi
              </a>
              <a
                href="#tentang"
                className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                Tentang Jurnal
              </a>
            </>
          )}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('consultation')}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors"
                title="Bantuan Konsultasi Dokter"
              >
                <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>Konsultasi</span>
              </button>
              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <User className="w-4 h-4 text-emerald-700" />
                <span className="max-w-[120px] truncate">{user.name}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                Masuk
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg transition-colors shadow-sm"
              >
                Daftar Akun
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
