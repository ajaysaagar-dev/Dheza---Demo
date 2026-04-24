export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e1b4b',
        secondary: '#312e81',
        accent: '#fbbf24',
        'accent-hover': '#f59e0b',
        'text-main': '#0f1111',
        'text-muted': '#565959',
        'bg-light': '#f3f4f6',
        success: '#059669',
        error: '#dc2626',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        outfit: ['Outfit', 'system-ui'],
      },
    },
  },
  plugins: [],
}
