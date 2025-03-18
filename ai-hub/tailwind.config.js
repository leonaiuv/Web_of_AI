/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e0f7ff',
          100: '#b8ecff',
          200: '#8ddfff',
          300: '#5ad2ff',
          400: '#36c5ff',
          500: '#0ab5ff',
          600: '#0095e6',
          700: '#0077cc',
          800: '#005fb3',
          900: '#004d99',
        },
        secondary: {
          50: '#f3e5ff',
          100: '#e5c8ff',
          200: '#d3a8ff',
          300: '#c287ff',
          400: '#b066ff',
          500: '#9834ff',
          600: '#8517ff',
          700: '#7200f5',
          800: '#6000d1',
          900: '#4c00ad',
        },
        dark: '#050815',
        'dark-light': '#0a0f25',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
} 