/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // 包含 src 目录下所有可能的文件
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // app 目录
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // pages 目录(如果使用)
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // 组件目录
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(120, 90, 255)',
          light: 'rgb(140, 110, 255)',
          dark: 'rgb(100, 70, 235)',
        },
        secondary: {
          DEFAULT: 'rgb(255, 50, 120)',
          light: 'rgb(255, 70, 140)',
          dark: 'rgb(235, 30, 100)',
        },
        accent: {
          DEFAULT: 'rgb(0, 255, 170)',
          light: 'rgb(20, 255, 190)',
          dark: 'rgb(0, 235, 150)',
        },
        dark: {
          DEFAULT: 'rgb(30, 20, 60)',
          light: 'rgb(50, 40, 80)',
          dark: 'rgb(10, 5, 30)',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },
      boxShadow: {
        'glow': '0 0 15px rgba(120, 90, 255, 0.5), 0 0 30px rgba(120, 90, 255, 0.3)',
        'glow-accent': '0 0 15px rgba(0, 255, 170, 0.5), 0 0 30px rgba(0, 255, 170, 0.3)',
        'glow-secondary': '0 0 15px rgba(255, 50, 120, 0.5), 0 0 30px rgba(255, 50, 120, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};