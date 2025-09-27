/**
 * State Management
 * Centralized state management for the application
 */

import { EventEmitter } from './utils.js';

/**
 * Application State Class
 */
class AppState extends EventEmitter {
  constructor() {
    super();
    this.state = {
      user: null,
      isAuthenticated: false,
      currentScreen: 'dashboard',
      notifications: [],
      settings: {},
      matches: [],
      projects: [],
      conversations: [],
      loading: false,
      error: null
    };
    this.loadFromStorage();
  }

  /**
   * Get current state
   * @returns {Object} Current state
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Get specific state property
   * @param {string} key - State key
   * @returns {any} State value
   */
  get(key) {
    return this.state[key];
  }

  /**
   * Set state property
   * @param {string} key - State key
   * @param {any} value - State value
   */
  set(key, value) {
    const oldValue = this.state[key];
    this.state[key] = value;
    this.saveToStorage();
    this.emit('stateChange', { key, value, oldValue });
  }

  /**
   * Update multiple state properties
   * @param {Object} updates - State updates
   */
  update(updates) {
    const oldState = { ...this.state };
    Object.assign(this.state, updates);
    this.saveToStorage();
    this.emit('stateChange', { updates, oldState });
  }

  /**
   * Reset state to initial values
   */
  reset() {
    this.state = {
      user: null,
      isAuthenticated: false,
      currentScreen: 'dashboard',
      notifications: [],
      settings: {},
      matches: [],
      projects: [],
      conversations: [],
      loading: false,
      error: null
    };
    this.saveToStorage();
    this.emit('stateReset');
  }

  /**
   * Load state from localStorage
   */
  loadFromStorage() {
    try {
      const savedState = localStorage.getItem('appState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        this.state = { ...this.state, ...parsedState };
      }
    } catch (error) {
      console.error('Error loading state from storage:', error);
    }
  }

  /**
   * Save state to localStorage
   */
  saveToStorage() {
    try {
      const stateToSave = {
        user: this.state.user,
        isAuthenticated: this.state.isAuthenticated,
        currentScreen: this.state.currentScreen,
        settings: this.state.settings
      };
      localStorage.setItem('appState', JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Error saving state to storage:', error);
    }
  }

  // User management methods
  setUser(user) {
    this.set('user', user);
    this.set('isAuthenticated', !!user);
  }

  getUser() {
    return this.get('user');
  }

  isAuthenticated() {
    return this.get('isAuthenticated');
  }

  logout() {
    this.set('user', null);
    this.set('isAuthenticated', false);
    this.set('matches', []);
    this.set('projects', []);
    this.set('conversations', []);
  }

  // Screen navigation methods
  setCurrentScreen(screen) {
    this.set('currentScreen', screen);
  }

  getCurrentScreen() {
    return this.get('currentScreen');
  }

  // Notification methods
  addNotification(notification) {
    const notifications = [...this.get('notifications')];
    const id = Date.now() + Math.random();
    notifications.push({ id, ...notification, timestamp: new Date() });
    this.set('notifications', notifications);
  }

  removeNotification(id) {
    const notifications = this.get('notifications').filter(n => n.id !== id);
    this.set('notifications', notifications);
  }

  clearNotifications() {
    this.set('notifications', []);
  }

  // Settings methods
  updateSettings(settings) {
    const currentSettings = this.get('settings');
    this.set('settings', { ...currentSettings, ...settings });
  }

  getSettings() {
    return this.get('settings');
  }

  // Loading state methods
  setLoading(loading) {
    this.set('loading', loading);
  }

  isLoading() {
    return this.get('loading');
  }

  // Error handling methods
  setError(error) {
    this.set('error', error);
  }

  getError() {
    return this.get('error');
  }

  clearError() {
    this.set('error', null);
  }
}

/**
 * Create global state instance
 */
export const appState = new AppState();

/**
 * State selectors for common state access patterns
 */
export const selectors = {
  user: () => appState.getUser(),
  isAuthenticated: () => appState.isAuthenticated(),
  currentScreen: () => appState.getCurrentScreen(),
  notifications: () => appState.get('notifications'),
  settings: () => appState.getSettings(),
  matches: () => appState.get('matches'),
  projects: () => appState.get('projects'),
  conversations: () => appState.get('conversations'),
  loading: () => appState.isLoading(),
  error: () => appState.getError()
};

/**
 * State actions for common state updates
 */
export const actions = {
  // User actions
  login: (user) => appState.setUser(user),
  logout: () => appState.logout(),
  
  // Navigation actions
  navigateTo: (screen) => appState.setCurrentScreen(screen),
  
  // Notification actions
  showNotification: (notification) => appState.addNotification(notification),
  hideNotification: (id) => appState.removeNotification(id),
  clearAllNotifications: () => appState.clearNotifications(),
  
  // Settings actions
  updateSettings: (settings) => appState.updateSettings(settings),
  
  // Data actions
  setMatches: (matches) => appState.set('matches', matches),
  setProjects: (projects) => appState.set('projects', projects),
  setConversations: (conversations) => appState.set('conversations', conversations),
  
  // UI actions
  setLoading: (loading) => appState.setLoading(loading),
  setError: (error) => appState.setError(error),
  clearError: () => appState.clearError()
};
