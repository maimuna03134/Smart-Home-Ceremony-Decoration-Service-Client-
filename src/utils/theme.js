// Theme utilities and helpers

export const getThemeClasses = (isDark) => ({
  // Background classes
  bgPrimary: 'bg-base-100',
  bgSecondary: 'bg-base-200', 
  bgAccent: 'bg-base-300',
  
  // Text classes
  textPrimary: 'text-base-content',
  textSecondary: 'text-base-content/70',
  textMuted: 'text-base-content/50',
  
  // Border classes
  border: 'border-base-300',
  borderHover: 'hover:border-base-400',
  
  // Card classes
  card: 'bg-base-100 border border-base-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200',
  
  // Button classes
  btnPrimary: 'bg-primary text-white hover:bg-primary/90 transition-all duration-200',
  btnSecondary: 'bg-base-200 text-base-content hover:bg-base-300 border border-base-300 hover:border-base-400 transition-all duration-200',
  
  // Theme-specific classes
  pattern: isDark ? 'bg-pattern-dark' : 'bg-pattern-light',
  glow: isDark ? 'shadow-lg shadow-primary/20' : 'shadow-lg shadow-primary/10',
});

export const themeColors = {
  light: {
    primary: '#af5f44',
    secondary: '#ffffff', 
    accent: '#f3f4f6',
    neutral: '#374151',
    'base-100': '#ffffff',
    'base-200': '#f9fafb',
    'base-300': '#f3f4f6',
    info: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  dark: {
    primary: '#d97706',
    secondary: '#1f2937',
    accent: '#374151', 
    neutral: '#d1d5db',
    'base-100': '#111827',
    'base-200': '#1f2937',
    'base-300': '#374151',
    info: '#60a5fa',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
  },
};

// Helper function to apply theme to document
export const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.className = theme;
};

// Helper function to get system theme preference
export const getSystemTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

// Helper function to get saved theme from localStorage
export const getSavedTheme = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme');
  }
  return null;
};