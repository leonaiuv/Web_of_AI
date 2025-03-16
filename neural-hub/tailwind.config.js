/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#C0DFFF',
          300: '#A1CFFF',
          400: '#81BFFF',
          500: '#61AFFF',
          600: '#418CCC',
          700: '#216999',
          800: '#104566',
          900: '#002233',
        },
        neural: {
          50: '#F5F0FF',
          100: '#EAE0FF',
          200: '#D6C2FF',
          300: '#C2A3FF',
          400: '#AD85FF',
          500: '#9966FF',
          600: '#7A52CC',
          700: '#5B3D99',
          800: '#3C2966',
          900: '#1D1433',
        },
        synapse: {
          50: '#FFF0F7',
          100: '#FFE0EF',
          200: '#FFC2DF',
          300: '#FFA3CF',
          400: '#FF85BF',
          500: '#FF66AF',
          600: '#CC528C',
          700: '#993D69',
          800: '#662946',
          900: '#331423',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'neural-pattern': "url('/images/neural-pattern.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { filter: 'brightness(100%) blur(0)' },
          '100%': { filter: 'brightness(150%) blur(4px)' },
        },
      },
    },
  },
  plugins: [],
} 