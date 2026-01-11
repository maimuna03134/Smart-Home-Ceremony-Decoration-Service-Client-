import { useTheme } from '../contexts/ThemeContext';

const ThemeToggleAdvanced = ({ 
  size = 'md', 
  showLabel = false, 
  className = '',
  variant = 'toggle' // keeping for compatibility but using the new design
}) => {
  const { toggleTheme, isDark } = useTheme();

  // Size variations
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  if (variant === 'button') {
    return (
      <button
        onClick={toggleTheme}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer
          ${isDark 
            ? 'bg-gray-800 border-2 border-gray-600 shadow-[4px_4px_0_#4b5563]' 
            : 'bg-white border-2 border-[#323232] shadow-[4px_4px_0_#323232]'
          }
          active:shadow-none active:translate-x-[3px] active:translate-y-[3px]
          ${className}
        `}
      >
        {!isDark ? (
          <svg viewBox="0 0 24 24" className={`w-5 h-5 ${isDark ? 'stroke-gray-300' : 'stroke-[#323232]'}`} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className={`w-5 h-5 ${isDark ? 'fill-gray-300' : 'fill-[#323232]'}`}>
            <path d="m12.3 4.9c.4-.2.6-.7.5-1.1s-.6-.8-1.1-.8c-4.9.1-8.7 4.1-8.7 9 0 5 4 9 9 9 3.8 0 7.1-2.4 8.4-5.9.2-.4 0-.9-.4-1.2s-.9-.2-1.2.1c-1 .9-2.3 1.4-3.7 1.4-3.1 0-5.7-2.5-5.7-5.7 0-1.9 1.1-3.8 2.9-4.8z" />
          </svg>
        )}
        {showLabel && (
          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-[#323232]'}`}>
            {!isDark ? 'Dark' : 'Light'} Mode
          </span>
        )}
      </button>
    );
  }

  // Default toggle variant with your preferred design
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showLabel && (
        <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-[#323232]'}`}>
          Theme
        </span>
      )}
      <label className={`relative flex items-center justify-center ${sizes[size]} rounded-full transition cursor-pointer ${
        isDark 
          ? 'bg-gray-800 border-2 border-gray-600 shadow-[4px_4px_0_#4b5563]' 
          : 'bg-white border-2 border-[#323232] shadow-[4px_4px_0_#323232]'
      } active:shadow-none active:translate-x-[3px] active:translate-y-[3px]`}>
        {/* checkbox */}
        <input
          type="checkbox"
          checked={isDark}
          onChange={toggleTheme}
          className="peer absolute inset-0 opacity-0 cursor-pointer z-10"
        />
        
        {/* Sun Icon - Show in Light Mode */}
        <svg
          viewBox="0 0 24 24"
          className={`absolute ${iconSizes[size]} peer-checked:hidden block ${
            isDark ? 'stroke-gray-300' : 'stroke-[#323232]'
          }`}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
        
        {/* Moon Icon - Show in Dark Mode */}
        <svg
          viewBox="0 0 24 24"
          className={`absolute ${iconSizes[size]} hidden peer-checked:block ${
            isDark ? 'fill-gray-300' : 'fill-[#323232]'
          }`}
        >
          <path d="m12.3 4.9c.4-.2.6-.7.5-1.1s-.6-.8-1.1-.8c-4.9.1-8.7 4.1-8.7 9 0 5 4 9 9 9 3.8 0 7.1-2.4 8.4-5.9.2-.4 0-.9-.4-1.2s-.9-.2-1.2.1c-1 .9-2.3 1.4-3.7 1.4-3.1 0-5.7-2.5-5.7-5.7 0-1.9 1.1-3.8 2.9-4.8z" />
        </svg>
      </label>
    </div>
  );
};

export default ThemeToggleAdvanced;