import React, { useState, useEffect } from 'react';
import { UserProfile, AdherenceStats } from './types';
import { api } from './services/api';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { KnowledgeSection } from './components/KnowledgeSection';
import { MedicationsSection } from './components/MedicationsSection';
import { FtuGuideSection } from './components/FtuGuideSection';
import { SelfCareSection } from './components/SelfCareSection';
import { AdherenceSection } from './components/AdherenceSection';
import { SkinTrackerSection } from './components/SkinTrackerSection';
import { ConsultationSection } from './components/ConsultationSection';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentView, setCurrentView] = useState<string>('landing');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [medSearchQuery, setMedSearchQuery] = useState('');
  
  const [adherenceStats, setAdherenceStats] = useState<AdherenceStats>({
    totalLogs: 10,
    completedDoses: 9,
    missedDoses: 1,
    adherenceRate: 90,
    streakDays: 4,
  });

  useEffect(() => {
    // Initial user load
    const init = async () => {
      try {
        const u = await api.getUserProfile();
        if (u) {
          setUser(u);
          // If already has user session, default to dashboard
          setCurrentView('dashboard');
        }
        const adh = await api.getAdherence();
        if (adh?.stats) {
          setAdherenceStats(adh.stats);
        }
      } catch (e) {
        console.error('Failed to init user', e);
      }
    };
    init();
  }, []);

  const refreshAdherenceStats = async () => {
    try {
      const adh = await api.getAdherence();
      if (adh?.stats) {
        setAdherenceStats(adh.stats);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (loggedUser: UserProfile) => {
    setUser(loggedUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  const handleUpdateProfile = async (partial: Partial<UserProfile>) => {
    if (!user) return;
    try {
      const updated = await api.updateUserProfile(partial);
      setUser(updated);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearchFromDashboard = (query: string) => {
    setMedSearchQuery(query);
    setCurrentView('medications');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'profile') {
            setProfileModalOpen(true);
          } else {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main View Area */}
      <main className="flex-1">
        
        {/* Landing Page */}
        {currentView === 'landing' && (
          <LandingPage
            onStart={() => {
              if (user) {
                setCurrentView('dashboard');
              } else {
                handleOpenAuth('register');
              }
            }}
            onExploreDemo={() => {
              // Direct login demo
              api.getUserProfile().then((demoUser) => {
                setUser(demoUser);
                setCurrentView('dashboard');
              });
            }}
          />
        )}

        {/* Dashboard */}
        {currentView === 'dashboard' && user && (
          <Dashboard
            user={user}
            stats={adherenceStats}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSearch={handleSearchFromDashboard}
          />
        )}

        {/* Knowledge */}
        {currentView === 'knowledge' && (
          <KnowledgeSection />
        )}

        {/* Medications */}
        {currentView === 'medications' && user && (
          <MedicationsSection
            initialSearch={medSearchQuery}
            user={user}
            onUpdateProfile={handleUpdateProfile}
            onNavigateToFtu={() => setCurrentView('ftu-guide')}
          />
        )}

        {/* FTU Guide & Application Technique */}
        {currentView === 'ftu-guide' && (
          <FtuGuideSection />
        )}

        {/* Self Care (Nonfarmakologi) */}
        {currentView === 'self-care' && (
          <SelfCareSection />
        )}

        {/* Adherence Monitoring */}
        {currentView === 'adherence' && user && (
          <AdherenceSection
            user={user}
            onAdherenceUpdated={refreshAdherenceStats}
          />
        )}

        {/* Skin Tracker */}
        {currentView === 'skin-tracker' && user && (
          <SkinTrackerSection user={user} />
        )}

        {/* Consultation Guidance */}
        {currentView === 'consultation' && user && (
          <ConsultationSection user={user} />
        )}

      </main>

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
      />

      {user && (
        <ProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          user={user}
          onUpdate={handleUpdateProfile}
          onLogout={handleLogout}
        />
      )}

    </div>
  );
}
