/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#04070d',
          900: '#080c14',
          850: '#0c121e',
          800: '#111927',
          750: '#162032',
          700: '#1e293b',
        },
        cyber: {
          cyan: '#00f0ff',
          blue: '#0284c7',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#ff0055',
          violet: '#8b5cf6',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.25)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.25)',
        'glow-rose': '0 0 25px -5px rgba(255, 0, 85, 0.3)',
      }
    },
  },
  plugins: [],
}
