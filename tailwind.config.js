/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#af5f44',
          dark: '#d97706',
        },
        secondary: {
          DEFAULT: '#ffffff',
          dark: '#1f2937',
        },
        accent: {
          DEFAULT: '#f3f4f6',
          dark: '#374151',
        },
        neutral: {
          DEFAULT: '#374151',
          dark: '#d1d5db',
        },
        'base-100': {
          DEFAULT: '#ffffff',
          dark: '#111827',
        },
        'base-200': {
          DEFAULT: '#f9fafb',
          dark: '#1f2937',
        },
        'base-300': {
          DEFAULT: '#f3f4f6',
          dark: '#374151',
        },
        info: '#3b82f6',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}