import { useTheme as useThemeContext } from '../contexts/ThemeContext';

// Re-export the theme hook for easier imports
export const useTheme = useThemeContext;

// Additional theme utilities
export const useThemeClasses = () => {
  const { isDark, isLight } = useTheme();
  
  return {
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
    themeSpecific: {
      pattern: isDark ? 'bg-pattern-dark' : 'bg-pattern-light',
      glow: isDark ? 'shadow-lg shadow-primary/20' : 'shadow-lg shadow-primary/10',
    }
  };
};