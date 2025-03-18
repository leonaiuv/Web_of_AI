import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// 动态导入以避免SSR问题
const NatureBackground = dynamic(() => import('@/components/NatureBackground'), {
  ssr: false,
});

const CursorEffect = dynamic(() => import('@/components/CursorEffect'), {
  ssr: false,
});

export default function Home() {
  // 页面加载状态
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 模拟加载效果
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 自定义光标效果 */}
      <CursorEffect />
      
      {/* 背景效果 */}
      <NatureBackground />
      
      {/* 主要内容 */}
      <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        
        <main>
          <Hero />
          <Features />
          <Projects />
          <Contact />
        </main>
        
        <Footer />
      </div>
      
      {/* 加载动画 */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="text-4xl font-display font-bold nature-text nature-glow animate-pulse">
          自然流动<span className="animate-ping">_</span>
        </div>
      </div>
    </div>
  );
} 