import { UserProfile, Medication, AdherenceLog, AdherenceStats, SkinTrackerEntry, ConsultationSummary } from '../types';

export const api = {
  // Auth & Profile
  async getUserProfile(): Promise<UserProfile> {
    try {
      const res = await fetch('/api/user/profile');
      if (!res.ok) throw new Error('Failed to fetch profile');
      return await res.json();
    } catch {
      const stored = localStorage.getItem('psoriacare_user');
      if (stored) return JSON.parse(stored);
      return {
        id: 'usr-default',
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
      };
    }
  },

  async updateUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      localStorage.setItem('psoriacare_user', JSON.stringify(data.user));
      return data.user;
    } catch {
      const current = await this.getUserProfile();
      const updated = { ...current, ...profile };
      localStorage.setItem('psoriacare_user', JSON.stringify(updated));
      return updated;
    }
  },

  async registerUser(userData: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      localStorage.setItem('psoriacare_user', JSON.stringify(data.user));
      return data.user;
    } catch {
      const newUsr: UserProfile = {
        id: `usr-${Date.now()}`,
        name: userData.name || 'Pengguna Baru',
        email: userData.email || '',
        phone: userData.phone || '',
        age: userData.age || 30,
        gender: userData.gender || 'Laki-laki',
        psoriasisDuration: userData.psoriasisDuration || '< 1 tahun',
        affectedAreas: userData.affectedAreas || ['Siku'],
        currentMedications: userData.currentMedications || [],
        otherDiseases: userData.otherDiseases || '',
        registeredAt: new Date().toISOString().split('T')[0]
      };
      localStorage.setItem('psoriacare_user', JSON.stringify(newUsr));
      return newUsr;
    }
  },

  // Medications
  async getMedications(query?: { search?: string; category?: string }): Promise<Medication[]> {
    try {
      const params = new URLSearchParams();
      if (query?.search) params.append('search', query.search);
      if (query?.category) params.append('category', query.category);
      const res = await fetch(`/api/medications?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch medications');
      const data = await res.json();
      return data.medications;
    } catch {
      return [];
    }
  },

  async getMedicationById(id: string): Promise<Medication | null> {
    try {
      const res = await fetch(`/api/medications/${id}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  // Adherence
  async getAdherence(): Promise<{ logs: AdherenceLog[]; stats: AdherenceStats }> {
    try {
      const res = await fetch('/api/adherence');
      if (!res.ok) throw new Error('Failed to fetch adherence');
      return await res.json();
    } catch {
      return {
        logs: [],
        stats: { totalLogs: 0, completedDoses: 0, missedDoses: 0, adherenceRate: 100, streakDays: 0 }
      };
    }
  },

  async addAdherenceLog(log: Omit<AdherenceLog, 'id' | 'recordedAt'>): Promise<AdherenceLog> {
    const res = await fetch('/api/adherence', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(log)
    });
    const data = await res.json();
    return data.log;
  },

  async deleteAdherenceLog(id: string): Promise<boolean> {
    const res = await fetch(`/api/adherence/${id}`, { method: 'DELETE' });
    return res.ok;
  },

  // Skin Tracker
  async getSkinTracker(): Promise<SkinTrackerEntry[]> {
    try {
      const res = await fetch('/api/skin-tracker');
      if (!res.ok) throw new Error('Failed to fetch skin tracker');
      const data = await res.json();
      return data.entries;
    } catch {
      return [];
    }
  },

  async addSkinTrackerEntry(entry: Omit<SkinTrackerEntry, 'id'>): Promise<SkinTrackerEntry> {
    const res = await fetch('/api/skin-tracker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    });
    const data = await res.json();
    return data.entry;
  },

  async deleteSkinTrackerEntry(id: string): Promise<boolean> {
    const res = await fetch(`/api/skin-tracker/${id}`, { method: 'DELETE' });
    return res.ok;
  },

  // Consultation Summary
  async getConsultationSummary(): Promise<ConsultationSummary | null> {
    try {
      const res = await fetch('/api/consultation/summary');
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }
};
