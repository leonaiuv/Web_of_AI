import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

// 动态导入以避免SSR问题
const ParticleEffect = dynamic(() => import('@/components/ParticleEffect'), {
  ssr: false,
});

const AiBackground = dynamic(() => import('@/components/AiBackground'), {
  ssr: false,
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [useParticleEffect, setUseParticleEffect] = useState(true);

  useEffect(() => {
    // 模拟加载效果
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    // 随机选择背景效果
    setUseParticleEffect(Math.random() > 0.5);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {useParticleEffect ? <ParticleEffect /> : <AiBackground />}
      
      <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        
        <main>
          <Hero />
          <Features />
          <Projects />
        </main>
        
        <Footer />
      </div>
      
      {/* 加载动画 */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-dark transition-opacity duration-500 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="text-4xl font-mono font-bold ai-text ai-glow animate-pulse">
          AI空间<span className="animate-ping">_</span>
        </div>
      </div>
    </div>
  );
} 