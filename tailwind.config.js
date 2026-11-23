/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medicore: {
          navy: '#12304A',
          blue: '#2563EB',
          teal: '#0D9488',
          bg: '#F5F8FC',
          card: '#FFFFFF',
          text: '#172B4D',
          muted: '#64748B',
          warning: '#F59E0B',
          critical: '#DC2626',
          success: '#10B981',
          border: '#E2E8F0',
          hover: '#F1F5F9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
