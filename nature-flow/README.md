# Nature Flow 自然流动

![Nature Flow](https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&auto=format&fit=crop)

## 项目简介

Nature Flow（自然流动）是一个融合自然元素与现代科技的沉浸式Web体验项目。网站通过流畅的动画、有机的设计和自然元素的交互，为用户创造一个令人难忘的数字体验。

## 特性

- **有机设计**：采用自然界的曲线和元素，创造和谐、舒适的视觉体验
- **流体动画**：灵感来自流水、树叶飘动等自然现象的流畅动画效果
- **沉浸式体验**：结合WebGL、GSAP和Framer Motion打造深度沉浸感
- **自定义光标**：基于用户行为变化的自然元素光标效果
- **响应式布局**：适配各种设备尺寸的流畅体验

## 技术栈

- **前端框架**：React, Next.js
- **动画库**：GSAP, Framer Motion
- **3D渲染**：Three.js
- **样式方案**：Tailwind CSS
- **开发语言**：TypeScript

## 安装与使用

### 本地开发环境

1. 克隆项目

```bash
git clone https://github.com/your-username/nature-flow.git
cd nature-flow
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm run dev
```

4. 在浏览器中访问 [http://localhost:3000](http://localhost:3000)

### 生产环境构建

1. 构建项目

```bash
npm run build
```

2. 启动生产服务器

```bash
npm run start
```

## 项目结构

```
nature-flow/
├── public/             # 静态资源
├── src/                # 源代码
│   ├── components/     # React组件
│   │   ├── CursorEffect.tsx     # 自定义光标效果
│   │   ├── NatureBackground.tsx # 自然背景动画
│   │   ├── Navbar.tsx           # 导航栏组件
│   │   ├── Hero.tsx             # 首屏展示组件
│   │   ├── Features.tsx         # 特性展示组件
│   │   ├── Projects.tsx         # 项目展示组件
│   │   ├── Contact.tsx          # 联系表单组件
│   │   └── Footer.tsx           # 页脚组件
│   ├── pages/          # Next.js页面
│   │   ├── _app.tsx    # 应用入口
│   │   └── index.tsx   # 主页
│   └── styles/         # 样式文件
│       └── globals.css # 全局样式
├── .eslintrc.json      # ESLint配置
├── next.config.js      # Next.js配置
├── package.json        # 项目依赖
├── postcss.config.js   # PostCSS配置
├── tailwind.config.js  # Tailwind CSS配置
└── tsconfig.json       # TypeScript配置
```

## 定制

### 颜色主题

可以在 `tailwind.config.js` 文件中修改颜色配置：

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4CAF50', // 主色调
          // ...其他变种
        },
        // ...其他颜色
      },
    },
  },
};
```

### 动画效果

主要动画效果在以下文件中定义：

- `src/components/NatureBackground.tsx` - 背景粒子动画
- `src/components/CursorEffect.tsx` - 光标效果
- `src/components/Hero.tsx` - 首屏动画效果

## 贡献

欢迎提交Issue和Pull Request！

## 许可

MIT 