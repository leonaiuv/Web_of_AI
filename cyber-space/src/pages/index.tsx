import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// 动态导入以避免SSR问题
const CyberBackground = dynamic(() => import('@/components/CyberBackground'), {
  ssr: false,
});

const CursorEffect = dynamic(() => import('@/components/CursorEffect'), {
  ssr: false,
});

export default function Home() {
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
      <CursorEffect />
      <CyberBackground />
      
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
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-dark transition-opacity duration-500 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="text-4xl font-mono font-bold cyber-text cyber-glow animate-pulse">
          赛博空间<span className="animate-ping">_</span>
        </div>
      </div>
    </div>
  );
} 