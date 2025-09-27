/**
 * API Service
 * Handles all API communications and data management
 */

// import { storage } from './utils.js';

/**
 * API Configuration
 */
const API_CONFIG = {
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

/**
 * HTTP Client Class
 */
class HttpClient {
  constructor(config = {}) {
    this.config = { ...API_CONFIG, ...config };
  }

  /**
   * Make HTTP request
   * @param {string} url - Request URL
   * @param {Object} options - Request options
   * @returns {Promise} Response promise
   */
  async request(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: { ...this.config.headers, ...options.headers },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return await response.text();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  /**
   * GET request
   * @param {string} url - Request URL
   * @param {Object} options - Request options
   * @returns {Promise} Response promise
   */
  get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' });
  }

  /**
   * POST request
   * @param {string} url - Request URL
   * @param {Object} data - Request data
   * @param {Object} options - Request options
   * @returns {Promise} Response promise
   */
  post(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * PUT request
   * @param {string} url - Request URL
   * @param {Object} data - Request data
   * @param {Object} options - Request options
   * @returns {Promise} Response promise
   */
  put(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  /**
   * DELETE request
   * @param {string} url - Request URL
   * @param {Object} options - Request options
   * @returns {Promise} Response promise
   */
  delete(url, options = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  }
}

/**
 * API Service Class
 */
class ApiService {
  constructor() {
    this.client = new HttpClient();
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Get cached data or fetch from API
   * @param {string} key - Cache key
   * @param {Function} fetchFn - Function to fetch data
   * @returns {Promise} Cached or fresh data
   */
  async getCachedData(key, fetchFn) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    const data = await fetchFn();
    this.cache.set(key, { data, timestamp: Date.now() });
    return data;
  }

  /**
   * Clear cache
   * @param {string} key - Optional cache key to clear specific item
   */
  clearCache(key = null) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  // User API methods
  async getUsers() {
    return this.getCachedData('users', () => 
      this.client.get(`${this.client.config.baseURL}/users`)
    );
  }

  async getUser(id) {
    return this.getCachedData(`user_${id}`, () => 
      this.client.get(`${this.client.config.baseURL}/users/${id}`)
    );
  }

  async createUser(userData) {
    this.clearCache('users');
    return this.client.post(`${this.client.config.baseURL}/users`, userData);
  }

  async updateUser(id, userData) {
    this.clearCache(`user_${id}`);
    this.clearCache('users');
    return this.client.put(`${this.client.config.baseURL}/users/${id}`, userData);
  }

  async deleteUser(id) {
    this.clearCache(`user_${id}`);
    this.clearCache('users');
    return this.client.delete(`${this.client.config.baseURL}/users/${id}`);
  }

  // Projects API methods
  async getProjects() {
    return this.getCachedData('projects', () => 
      this.client.get(`${this.client.config.baseURL}/projects`)
    );
  }

  async getProject(id) {
    return this.getCachedData(`project_${id}`, () => 
      this.client.get(`${this.client.config.baseURL}/projects/${id}`)
    );
  }

  async createProject(projectData) {
    this.clearCache('projects');
    return this.client.post(`${this.client.config.baseURL}/projects`, projectData);
  }

  async updateProject(id, projectData) {
    this.clearCache(`project_${id}`);
    this.clearCache('projects');
    return this.client.put(`${this.client.config.baseURL}/projects/${id}`, projectData);
  }

  async deleteProject(id) {
    this.clearCache(`project_${id}`);
    this.clearCache('projects');
    return this.client.delete(`${this.client.config.baseURL}/projects/${id}`);
  }

  // Matchmaking API methods
  async getMatches(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    return this.getCachedData(`matches_${queryString}`, () => 
      this.client.get(`${this.client.config.baseURL}/matches?${queryString}`)
    );
  }

  async getMatch(id) {
    return this.getCachedData(`match_${id}`, () => 
      this.client.get(`${this.client.config.baseURL}/matches/${id}`)
    );
  }

  async createMatch(matchData) {
    this.clearCache('matches');
    return this.client.post(`${this.client.config.baseURL}/matches`, matchData);
  }

  async updateMatch(id, matchData) {
    this.clearCache(`match_${id}`);
    this.clearCache('matches');
    return this.client.put(`${this.client.config.baseURL}/matches/${id}`, matchData);
  }

  // Messages API methods
  async getMessages(conversationId) {
    return this.getCachedData(`messages_${conversationId}`, () => 
      this.client.get(`${this.client.config.baseURL}/messages/${conversationId}`)
    );
  }

  async sendMessage(messageData) {
    this.clearCache(`messages_${messageData.conversationId}`);
    return this.client.post(`${this.client.config.baseURL}/messages`, messageData);
  }

  // Files API methods
  async uploadFile(file, onProgress = null) {
    const formData = new FormData();
    formData.append('file', file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      if (onProgress) {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100;
            onProgress(percentComplete);
          }
        });
      }

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Upload failed: ${xhr.statusText}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      xhr.open('POST', `${this.client.config.baseURL}/files/upload`);
      xhr.send(formData);
    });
  }

  async deleteFile(fileId) {
    this.clearCache('files');
    return this.client.delete(`${this.client.config.baseURL}/files/${fileId}`);
  }
}

/**
 * Create API service instance
 */
export const apiService = new ApiService();

/**
 * Error handling wrapper
 * @param {Function} fn - Function to wrap
 * @returns {Function} Wrapped function with error handling
 */
export const withErrorHandling = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };
};
