/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0a0a0b',
        surface: '#111113',
        elevated: '#18181b',
        'surface-2': '#1c1c20',
        accent: {
          DEFAULT: '#f59e0b',
          bright: '#fbbf24',
          dim: '#b45309',
        },
        'accent-2': {
          DEFAULT: '#14b8a6',
          dim: '#0d9488',
        },
        fg: {
          primary: '#f5f5f5',
          secondary: '#a1a1aa',
          muted: '#71717a',
          subtle: '#52525b',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.06)',
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          strong: 'rgba(255, 255, 255, 0.16)',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'shimmer': 'shimmer 3s infinite',
        'marquee': 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};
