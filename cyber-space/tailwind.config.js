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
          DEFAULT: '#00f5ff',
          dark: '#00c8d0',
          light: '#7dfcff',
        },
        secondary: {
          DEFAULT: '#ff00e4',
          dark: '#cc00b6',
          light: '#ff66ee',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          light: '#1a1a1a',
          lighter: '#2a2a2a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #00f5ff, 0 0 10px #00f5ff' },
          '100%': { textShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 30px #00f5ff' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
    },
  },
  plugins: [],
}; 