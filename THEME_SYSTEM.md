# 🎨 Theme System Documentation

A comprehensive light and dark mode implementation for the React frontend application.

## Features

- ✅ **Light & Dark Mode**: Beautiful themes with smooth transitions
- ✅ **Auto-Detection**: Respects system preferences on first visit
- ✅ **Persistent Storage**: Remembers user choice across sessions
- ✅ **Multiple Toggle Variants**: Switch, button, and dropdown styles
- ✅ **DaisyUI Integration**: Seamless integration with DaisyUI themes
- ✅ **Background Patterns**: Subtle visual enhancements for each theme
- ✅ **Smooth Transitions**: CSS transitions for all theme changes
- ✅ **Accessibility**: Proper color contrasts and ARIA labels

## Quick Start

### 1. Basic Usage

The theme system is already integrated into the app. Just use the theme-aware classes:

```jsx
import { useTheme } from '../contexts/ThemeContext';

function MyComponent() {
  const { isDark, theme, toggleTheme } = useTheme();
  
  return (
    <div className="bg-base-100 text-base-content">
      <h1 className="text-2xl font-bold">Current theme: {theme}</h1>
      <button onClick={toggleTheme} className="btn-theme-primary">
        Switch to {isDark ? 'light' : 'dark'} mode
      </button>
    </div>
  );
}
```

### 2. Theme Toggle Components

```jsx
import ThemeToggle from '../components/ThemeToggle';
import ThemeToggleAdvanced from '../components/ThemeToggleAdvanced';

// Simple toggle
<ThemeToggle />

// Advanced variants
<ThemeToggleAdvanced size="sm" />
<ThemeToggleAdvanced variant="button" showLabel={true} />
<ThemeToggleAdvanced variant="dropdown" />
```

## Theme Classes

### DaisyUI Classes (Recommended)
- `bg-base-100` - Primary background
- `bg-base-200` - Secondary background  
- `bg-base-300` - Accent background
- `text-base-content` - Primary text
- `text-base-content/70` - Secondary text
- `text-base-content/50` - Muted text
- `border-base-300` - Borders

### Custom Theme Classes
- `theme-card` - Theme-aware card styling
- `btn-theme-primary` - Primary button
- `btn-theme-secondary` - Secondary button
- `shared-style` - Existing shared button style
- `bg-pattern-light` / `bg-pattern-dark` - Background patterns

## Color Palette

### Light Theme
- Primary: `#af5f44` (Warm brown)
- Background: `#ffffff` (White)
- Secondary: `#f9fafb` (Light gray)

### Dark Theme  
- Primary: `#d97706` (Amber)
- Background: `#111827` (Dark gray)
- Secondary: `#1f2937` (Medium gray)

## Components

### ThemeProvider
Wrap your app with the theme provider (already done in main.jsx):

```jsx
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### useTheme Hook
Access theme state and controls:

```jsx
const {
  theme,        // 'light' | 'dark'
  toggleTheme,  // () => void
  setLightTheme, // () => void  
  setDarkTheme, // () => void
  isDark,       // boolean
  isLight       // boolean
} = useTheme();
```

### Theme Toggle Variants

#### Basic Toggle
```jsx
<ThemeToggle className="my-custom-class" />
```

#### Advanced Toggle
```jsx
<ThemeToggleAdvanced 
  size="md"           // 'sm' | 'md' | 'lg'
  variant="toggle"    // 'toggle' | 'button' | 'dropdown'
  showLabel={false}   // boolean
  className=""        // string
/>
```

## Integration Examples

### Layout Integration
```jsx
function Layout() {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-pattern-dark' : 'bg-pattern-light'}`}>
      <nav className="bg-base-100 border-b border-base-300">
        <ThemeToggleAdvanced size="sm" />
      </nav>
      <main className="bg-base-100">
        {/* Content */}
      </main>
    </div>
  );
}
```

### Card Component
```jsx
function Card({ children }) {
  return (
    <div className="theme-card p-6">
      {children}
    </div>
  );
}
```

### Button Components
```jsx
function Buttons() {
  return (
    <div className="space-x-4">
      <button className="btn-theme-primary">Primary</button>
      <button className="btn-theme-secondary">Secondary</button>
      <button className="shared-style">Shared Style</button>
    </div>
  );
}
```

## Customization

### Adding New Themes
Update `frontend/src/index.css`:

```css
@plugin "daisyui" {
  themes: [
    {
      mytheme: {
        "primary": "#your-color",
        "secondary": "#your-color", 
        // ... other colors
      },
    },
  ],
}
```

### Custom Theme Classes
Add to `frontend/src/index.css`:

```css
.my-theme-class {
  @apply bg-base-100 text-base-content border-base-300;
}
```

## File Structure

```
frontend/src/
├── contexts/
│   └── ThemeContext.jsx      # Theme provider and context
├── components/
│   ├── ThemeToggle.jsx       # Basic toggle component
│   └── ThemeToggleAdvanced.jsx # Advanced toggle variants
├── hooks/
│   └── useTheme.js          # Theme utilities hook
├── utils/
│   └── theme.js             # Theme helper functions
├── theme/
│   └── index.js             # Theme exports
└── index.css                # Theme styles and DaisyUI config
```

## Demo

Visit `/theme-demo` to see all theme features in action with interactive examples.

## Browser Support

- ✅ Chrome/Edge 88+
- ✅ Firefox 85+  
- ✅ Safari 14+
- ✅ Mobile browsers

## Performance

- Minimal re-renders with React context optimization
- CSS transitions for smooth theme switching
- LocalStorage for instant theme restoration
- Efficient theme detection and application