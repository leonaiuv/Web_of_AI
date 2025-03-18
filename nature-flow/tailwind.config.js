/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4CAF50', // 自然绿色
          dark: '#388E3C',
          light: '#81C784',
        },
        secondary: {
          DEFAULT: '#03A9F4', // 流水蓝色
          dark: '#0288D1',
          light: '#4FC3F7',
        },
        dark: {
          DEFAULT: '#2D3748',
          light: '#4A5568',
          lighter: '#718096',
        },
        nature: {
          leaf: '#8BC34A',
          earth: '#795548',
          sky: '#B3E5FC',
          sunset: '#FF9800',
          wood: '#A1887F',
        },
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'wave': 'wave 12s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'grow': 'grow 10s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wave: {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(10px) translateY(-10px)' },
          '50%': { transform: 'translateX(0) translateY(0)' },
          '75%': { transform: 'translateX(-10px) translateY(-5px)' },
          '100%': { transform: 'translateX(0) translateY(0)' },
        },
        grow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
    },
  },
  plugins: [],
}; 