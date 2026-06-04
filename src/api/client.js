import axios from 'axios';

const API_BASE_URL = 
  process.env.NODE_ENV === 'production'
    ? 'https://abk-kandadji-api.onrender.com'
    : 'http://localhost:3000';

// Créer l'instance axios
const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter le token aux requêtes
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Gérer les erreurs d'authentification
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// === AUTHENTIFICATION ===

export const authAPI = {
  login: (email, password) =>
    client.post('/auth/login', { email, password }),
  
  refreshToken: (refreshToken) =>
    client.post('/auth/refresh', { refreshToken }),
  
  getProfile: () =>
    client.get('/auth/profile'),
  
  logout: () =>
    client.post('/auth/logout'),
};

// === CONTRATS ===

export const contractsAPI = {
  getAll: (page = 1, limit = 20) =>
    client.get('/contracts', { params: { page, limit } }),
  
  getById: (id) =>
    client.get(`/contracts/${id}`),
  
  create: (data) =>
    client.post('/contracts', data),
  
  update: (id, data) =>
    client.put(`/contracts/${id}`, data),
  
  delete: (id) =>
    client.delete(`/contracts/${id}`),
};

// === ÉCHÉANCES ===

export const deadlinesAPI = {
  getAll: (page = 1, limit = 20) =>
    client.get('/deadlines', { params: { page, limit } }),
  
  getUrgent: () =>
    client.get('/deadlines/urgent'),
  
  getById: (id) =>
    client.get(`/deadlines/${id}`),
  
  create: (data) =>
    client.post('/deadlines', data),
  
  update: (id, data) =>
    client.put(`/deadlines/${id}`, data),
  
  complete: (id) =>
    client.put(`/deadlines/${id}/complete`),
  
  delete: (id) =>
    client.delete(`/deadlines/${id}`),
};

// === ALERTES ===

export const alertsAPI = {
  getAll: (page = 1, limit = 20) =>
    client.get('/alerts', { params: { page, limit } }),
  
  getHistory: (id) =>
    client.get(`/alerts/${id}/history`),
  
  create: (data) =>
    client.post('/alerts', data),
  
  update: (id, data) =>
    client.put(`/alerts/${id}`, data),
  
  toggle: (id, active) =>
    client.put(`/alerts/${id}/toggle`, { active }),
  
  testSend: (id, email) =>
    client.post(`/alerts/${id}/test`, { email }),
  
  delete: (id) =>
    client.delete(`/alerts/${id}`),
};

export default client;
