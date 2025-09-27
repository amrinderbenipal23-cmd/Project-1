/**
 * Punjabi Music Collaboration Platform - Main Application
 * Professional, modular JavaScript architecture
 */

import { apiService } from './api.js';
import { appState, actions, selectors } from './state.js';
import { throttle, smoothScrollTo, storage } from './utils.js';

/**
 * Application Class
 * Main application controller
 */
class PunjabiMusicApp {
  constructor() {
    this.isInitialized = false;
    this.eventListeners = new Map();
    this.modules = new Map();
  }

  /**
   * Initialize the application
   */
  async init() {
    if (this.isInitialized) {return;}

    try {
      // Initialize core modules
      await this.initializeCoreModules();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Initialize UI components
      this.initializeComponents();
      
      // Load initial data
      await this.loadInitialData();
      
      this.isInitialized = true;
      console.log('Punjabi Music App initialized successfully');
    } catch (error) {
      console.error('Failed to initialize app:', error);
      actions.setError('Failed to initialize application');
    }
  }

  /**
   * Initialize core modules
   */
  async initializeCoreModules() {
    // Register modules
    this.modules.set('navigation', new NavigationModule());
    this.modules.set('dashboard', new DashboardModule());
    this.modules.set('matchmaking', new MatchmakingModule());
    this.modules.set('collaboration', new CollaborationModule());
    this.modules.set('settings', new SettingsModule());
    this.modules.set('notifications', new NotificationModule());
  }

  /**
   * Setup global event listeners
   */
  setupEventListeners() {
    // Window events
    this.addEventListener(window, 'resize', throttle(this.handleResize.bind(this), 250));
    this.addEventListener(window, 'scroll', throttle(this.handleScroll.bind(this), 100));
    this.addEventListener(window, 'beforeunload', this.handleBeforeUnload.bind(this));

    // State change listeners
    appState.on('stateChange', this.handleStateChange.bind(this));
    appState.on('stateReset', this.handleStateReset.bind(this));
  }

  /**
   * Initialize UI components
   */
  initializeComponents() {
    // Initialize each module
    this.modules.forEach((module, _name) => {
      if (module.init) {
        module.init();
      }
    });
  }

  /**
   * Load initial application data
   */
  async loadInitialData() {
    actions.setLoading(true);
    
    try {
      // Load user data if authenticated
      if (selectors.isAuthenticated()) {
        await this.loadUserData();
      }
      
      // Load settings
      await this.loadSettings();
      
      actions.setLoading(false);
    } catch (error) {
      console.error('Error loading initial data:', error);
      actions.setError('Failed to load application data');
      actions.setLoading(false);
    }
  }

  /**
   * Load user data
   */
  async loadUserData() {
    try {
      const user = await apiService.getUser(selectors.user()?.id);
      if (user) {
        actions.login(user);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  /**
   * Load application settings
   */
  async loadSettings() {
    try {
      const settings = storage.get('appSettings', {});
      actions.updateSettings(settings);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }

  /**
   * Handle window resize
   */
  handleResize() {
    // Notify modules of resize
    this.modules.forEach(module => {
      if (module.handleResize) {
        module.handleResize();
      }
    });
  }

  /**
   * Handle window scroll
   */
  handleScroll() {
    // Update navigation based on scroll position
    const navigationModule = this.modules.get('navigation');
    if (navigationModule && navigationModule.updateActiveSection) {
      navigationModule.updateActiveSection();
    }
  }

  /**
   * Handle before unload
   */
  handleBeforeUnload(_event) {
    // Save any pending data
    this.savePendingData();
  }

  /**
   * Handle state changes
   */
  handleStateChange({ key, value, oldValue }) {
    // Notify modules of state changes
    this.modules.forEach(module => {
      if (module.handleStateChange) {
        module.handleStateChange(key, value, oldValue);
      }
    });
  }

  /**
   * Handle state reset
   */
  handleStateReset() {
    // Reinitialize modules if needed
    this.modules.forEach(module => {
      if (module.handleStateReset) {
        module.handleStateReset();
      }
    });
  }

  /**
   * Add event listener with cleanup tracking
   */
  addEventListener(element, event, handler) {
    element.addEventListener(event, handler);
    
    if (!this.eventListeners.has(element)) {
      this.eventListeners.set(element, []);
    }
    this.eventListeners.get(element).push({ event, handler });
  }

  /**
   * Cleanup event listeners
   */
  cleanup() {
    this.eventListeners.forEach((listeners, element) => {
      listeners.forEach(({ event, handler }) => {
        element.removeEventListener(event, handler);
      });
    });
    this.eventListeners.clear();
  }

  /**
   * Save pending data
   */
  savePendingData() {
    // Save current state
    const currentState = appState.getState();
    storage.set('appState', currentState);
  }
}

/**
 * Navigation Module
 */
class NavigationModule {
  init() {
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section[id]');
    this.setupNavigation();
  }

  setupNavigation() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.navigateToSection(targetId);
      });
    });
  }

  navigateToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      smoothScrollTo(targetSection, 100);
      actions.navigateTo(sectionId);
    }
  }

  updateActiveSection() {
    let current = '';
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
}

/**
 * Dashboard Module
 */
class DashboardModule {
  init() {
    this.setupDashboard();
  }

  setupDashboard() {
    // Setup dashboard functionality
    console.log('Dashboard module initialized');
  }
}

/**
 * Matchmaking Module
 */
class MatchmakingModule {
  init() {
    this.setupMatchmaking();
  }

  setupMatchmaking() {
    // Setup matchmaking functionality
    console.log('Matchmaking module initialized');
  }
}

/**
 * Collaboration Module
 */
class CollaborationModule {
  init() {
    this.setupCollaboration();
  }

  setupCollaboration() {
    // Setup collaboration functionality
    console.log('Collaboration module initialized');
  }
}

/**
 * Settings Module
 */
class SettingsModule {
  init() {
    this.setupSettings();
  }

  setupSettings() {
    // Setup settings functionality
    console.log('Settings module initialized');
  }
}

/**
 * Notification Module
 */
class NotificationModule {
  init() {
    this.setupNotifications();
  }

  setupNotifications() {
    // Setup notification functionality
    console.log('Notification module initialized');
  }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new PunjabiMusicApp();
  app.init();
  
  // Make app globally available for debugging
  window.punjabiMusicApp = app;
});