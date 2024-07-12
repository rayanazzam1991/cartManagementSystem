/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#72A4FF',
        'primary-dark': '#345A8F',
        'primary-dark-text': '#2C3E50',
        secondary: '#FFC107'
      }
    }
  },
  plugins: []
}

