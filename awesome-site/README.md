# Future Vision - Innovative Digital Experience

A modern, stylish website built with Next.js, Framer Motion, Three.js, and Tailwind CSS.

*[查看中文版](./README.zh-CN.md)*

## Features

- 🎨 Modern design with stylish animations
- 🚀 High-performance Next.js framework
- 📱 Fully responsive design
- ✨ Smooth animations with Framer Motion
- 🌈 Immersive 3D backgrounds with Three.js
- 🎭 Custom cursor effects
- 🌟 Glassmorphism design elements
- 🎯 Gradient text and neon effects

## Tech Stack

- **Next.js**: React framework for server-rendered and static websites
- **TypeScript**: Type-safe JavaScript superset
- **Framer Motion**: Powerful React animation library
- **Three.js**: 3D graphics library
- **Tailwind CSS**: Utility-first CSS framework
- **SASS**: CSS preprocessor

## Getting Started

### Prerequisites

Ensure you have Node.js installed (v18.x or higher recommended)

### Installation

```bash
# Clone the repository (if you don't have the project files yet)
git clone https://github.com/yourusername/awesome-site.git
cd awesome-site

# Install dependencies
npm install
# or
yarn install
```

### Development Server

```bash
# Start the development server
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser

## Production Build

```bash
# Build for production
npm run build
# or
yarn build

# Start the production server
npm run start
# or
yarn start
```

## Project Structure

```
awesome-site/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── pages/           # Next.js pages
│   ├── styles/          # Global styles
│   ├── assets/          # Project assets
│   ├── hooks/           # Custom React hooks
│   ├── animations/      # Animation code
│   └── types/           # TypeScript type declarations
├── .env.example         # Environment variables example
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Troubleshooting

### TypeScript Errors

If you encounter TypeScript type errors, ensure all dependencies are properly installed:

```bash
npm install
```

Additionally, check the type declaration files in the `src/types` directory to ensure missing type declarations have corresponding type definitions.

### Development Environment Issues

If you encounter issues running the development server, try clearing the Next.js cache:

```bash
rm -rf .next
# or on Windows
rmdir /s /q .next
```

## License

MIT 