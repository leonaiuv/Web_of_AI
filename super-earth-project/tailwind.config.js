/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#0a0c12',
        'dark-light': '#161b25',
        'primary': '#00c896', // 超级地球绿色
        'secondary': '#0073ff', // 蓝色水元素
        'tertiary': '#ffd100', // 能源黄色
        'earth-brown': '#8a5a44', // 大地棕色
        'cloud-white': '#f0f4ff', // 云白色
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'mono': ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular'],
      },
      backgroundImage: {
        'earth-pattern': "url('/images/earth-pattern.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 5s ease-in-out infinite',
      },
      boxShadow: {
        'earth-glow': '0 0 30px rgba(0, 200, 150, 0.5)',
      },
    },
  },
  plugins: [],
} 