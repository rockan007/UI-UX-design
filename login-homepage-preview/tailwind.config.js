/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          500: '#737373',
          800: '#262626',
          950: '#0a0a0a',
        },
        surface: {
          blue: '#eff6ff',
          cyan: '#ecfeff',
          amber: '#fffbeb',
          green: '#f0fdf4',
          warm: '#fafaf9',
          neutral: '#f5f5f5',
        },
        border: {
          blue: '#bfdbfe',
          cyan: '#a5f3fc',
          amber: '#fde68a',
          green: '#bbf7d0',
        }
      },
      borderRadius: {
        'btn': '6px',
        'card': '8px',
        'input': '4px',
      },
      spacing: {
        'page': '32px',
        'section': '48px',
        'card': '24px',
      }
    },
  },
  plugins: [],
}
