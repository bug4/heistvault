/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f3ead6',
        'paper-dark': '#e8dcc0',
        ink: '#141210',
        blood: '#d63031',
        'blood-deep': '#a02020',
        gold: '#f4c430',
        tape: '#fdd835',
        getaway: '#2a4d8f',
        vault: '#1a1a1a',
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        bungee: ['Bungee', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sc: ['Noto Sans SC', 'sans-serif'],
        type: ['Special Elite', 'monospace'],
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-3px)' },
          '40%, 80%': { transform: 'translateX(3px)' },
        },
      },
      animation: {
        flicker: 'flicker 1.2s infinite',
        shake: 'shake 0.4s',
      },
    },
  },
  plugins: [],
}
