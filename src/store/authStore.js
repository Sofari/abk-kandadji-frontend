import { create } from 'zustand';
import { authAPI } from '../api/client';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  // Login
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.login(email, password);
      const { token, refreshToken, user } = response.data.data;

      // Sauvegarder en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      set({ user, token, isLoading: false });
      return true;
    } catch (error) {
      const message = error.response?.data?.error || 'Erreur de connexion';
      set({ error: message, isLoading: false });
      return false;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    set({ user: null, token: null, error: null });
  },

  // Vérifier authentification
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Charger le profil
  loadProfile: async () => {
    try {
      const response = await authAPI.getProfile();
      const user = response.data.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      set({ user });
      return user;
    } catch (error) {
      set({ error: 'Erreur chargement profil' });
      return null;
    }
  },
}));
