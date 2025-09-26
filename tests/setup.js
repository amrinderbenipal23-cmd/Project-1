/**
 * Test Setup Configuration
 * Jest setup for Punjabi Music Collaboration Platform
 */

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock fetch
global.fetch = jest.fn();

// Mock FileReader
global.FileReader = jest.fn(() => ({
  readAsDataURL: jest.fn(),
  onload: null,
  onerror: null,
}));

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Setup DOM environment
document.body.innerHTML = `
  <div id="appContainer">
    <div id="loading" class="loading"></div>
    <div class="screen active" id="splash"></div>
    <div class="screen" id="auth"></div>
    <div class="screen" id="role"></div>
    <div class="screen" id="profile">
      <div id="profileContent"></div>
    </div>
    <div class="screen" id="dashboard"></div>
    <div class="bottom-nav"></div>
  </div>
  <div id="successMessage" class="success-message" style="display: none;"></div>
`;

// Mock window methods
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000',
    origin: 'http://localhost:3000',
    pathname: '/',
    search: '',
    hash: '',
  },
  writable: true,
});

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Setup test utilities
global.testUtils = {
  createMockFile: (name, type, size) => ({
    name,
    type,
    size,
    lastModified: Date.now(),
  }),
  
  createMockFormData: (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  },
  
  waitFor: (callback, timeout = 1000) => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const check = () => {
        try {
          if (callback()) {
            resolve();
          } else if (Date.now() - startTime > timeout) {
            reject(new Error('Timeout waiting for condition'));
          } else {
            setTimeout(check, 10);
          }
        } catch (error) {
          reject(error);
        }
      };
      check();
    });
  },
};

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = `
    <div id="appContainer">
      <div id="loading" class="loading"></div>
      <div class="screen active" id="splash"></div>
      <div class="screen" id="auth"></div>
      <div class="screen" id="role"></div>
      <div class="screen" id="profile">
        <div id="profileContent"></div>
      </div>
      <div class="screen" id="dashboard"></div>
      <div class="bottom-nav"></div>
    </div>
    <div id="successMessage" class="success-message" style="display: none;"></div>
  `;
});

