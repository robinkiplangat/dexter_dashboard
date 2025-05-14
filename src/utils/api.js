/**
 * API utility for Dexter platform
 * Handles all communication with backend services
 */

import { mockApi } from './mockApi';

// Determine if we're in development mode
const isDevelopment = import.meta.env.MODE === 'development';

// API base URL - will be replaced with actual backend URL in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

// Default request timeout in milliseconds
const DEFAULT_TIMEOUT = 30000;

/**
 * Creates a fetch request with standardized options
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Request options
 * @returns {Promise} - Fetch promise
 */
const fetchWithTimeout = async (endpoint, options = {}) => {
  const controller = new AbortController();
  const { signal } = controller;
  
  const timeout = setTimeout(() => {
    controller.abort();
  }, options.timeout || DEFAULT_TIMEOUT);
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal,
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('token') ? { 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        } : {}),
        ...(options.headers || {})
      }
    });
    
    clearTimeout(timeout);
    
    // Handle HTTP errors
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error ${response.status}`);
    }
    
    // Parse JSON response
    return await response.json();
  } catch (error) {
    clearTimeout(timeout);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    
    throw error;
  }
};

/**
 * API service object with methods for different endpoints
 */
const realApi = {
  // Authentication
  auth: {
    login: (credentials) => fetchWithTimeout('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),
    
    register: (userData) => fetchWithTimeout('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),
    
    logout: () => fetchWithTimeout('/auth/logout', {
      method: 'POST'
    }),
    
    refreshToken: () => fetchWithTimeout('/auth/refresh', {
      method: 'POST'
    }),
    
    getProfile: () => fetchWithTimeout('/auth/profile')
  },
  
  // Narratives
  narratives: {
    getAll: (params = {}) => fetchWithTimeout('/narratives', {
      method: 'GET',
      params
    }),
    
    getById: (id) => fetchWithTimeout(`/narratives/${id}`),
    
    create: (data) => fetchWithTimeout('/narratives', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    
    update: (id, data) => fetchWithTimeout(`/narratives/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    
    delete: (id) => fetchWithTimeout(`/narratives/${id}`, {
      method: 'DELETE'
    }),
    
    getRelated: (id) => fetchWithTimeout(`/narratives/${id}/related`),
    
    getTimeline: (id) => fetchWithTimeout(`/narratives/${id}/timeline`)
  },
  
  // Actors
  actors: {
    getAll: (params = {}) => fetchWithTimeout('/actors', {
      method: 'GET',
      params
    }),
    
    getById: (id) => fetchWithTimeout(`/actors/${id}`),
    
    getNetwork: (id) => fetchWithTimeout(`/actors/${id}/network`),
    
    getActivity: (id) => fetchWithTimeout(`/actors/${id}/activity`),
    
    getInfluence: (id) => fetchWithTimeout(`/actors/${id}/influence`)
  },
  
  // Content
  content: {
    getAll: (params = {}) => fetchWithTimeout('/content', {
      method: 'GET',
      params
    }),
    
    getById: (id) => fetchWithTimeout(`/content/${id}`),
    
    verify: (id, status) => fetchWithTimeout(`/content/${id}/verify`, {
      method: 'POST',
      body: JSON.stringify({ status })
    })
  },
  
  // Alerts
  alerts: {
    getAll: (params = {}) => fetchWithTimeout('/alerts', {
      method: 'GET',
      params
    }),
    
    getById: (id) => fetchWithTimeout(`/alerts/${id}`),
    
    acknowledge: (id) => fetchWithTimeout(`/alerts/${id}/acknowledge`, {
      method: 'POST'
    }),
    
    escalate: (id) => fetchWithTimeout(`/alerts/${id}/escalate`, {
      method: 'POST'
    })
  },
  
  // Reports
  reports: {
    getAll: (params = {}) => fetchWithTimeout('/reports', {
      method: 'GET',
      params
    }),
    
    getById: (id) => fetchWithTimeout(`/reports/${id}`),
    
    create: (data) => fetchWithTimeout('/reports', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    
    export: (id, format) => fetchWithTimeout(`/reports/${id}/export?format=${format}`)
  },
  
  // Dashboard
  dashboard: {
    getSummary: () => fetchWithTimeout('/dashboard/summary'),
    
    getStats: () => fetchWithTimeout('/dashboard/stats'),
    
    getActivity: (params = {}) => fetchWithTimeout('/dashboard/activity', {
      method: 'GET',
      params
    }),
    
    getTrends: (params = {}) => fetchWithTimeout('/dashboard/trends', {
      method: 'GET',
      params
    })
  },
  
  // Timeline
  timeline: {
    getAll: (params = {}) => fetchWithTimeout('/timeline', {
      method: 'GET',
      params
    })
  },
  
  // Lexicon
  lexicon: {
    getAll: (params = {}) => fetchWithTimeout('/lexicon', {
      method: 'GET',
      params
    }),
    
    getByLanguage: (language) => fetchWithTimeout(`/lexicon/${language}`),
    
    update: (language, data) => fetchWithTimeout(`/lexicon/${language}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }
};

// Use mock API in development, real API in production
const api = isDevelopment ? mockApi : realApi;

export { mockApi, realApi };
export default api;
