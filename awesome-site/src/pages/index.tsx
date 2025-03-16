import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ContactForm from '@/components/ContactForm';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';

// 动态导入组件，避免SSR问题
const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), {
  ssr: false,
});

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>未来视觉 - 创新数字体验</title>
        <meta name="description" content="未来视觉是一家专注于创建震撼人心的数字体验的设计工作室，将创意与技术完美融合。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CustomCursor />
      <AnimatedBackground />
      
      <main className="relative">
        <Navbar />
        <Hero />
        <Services />
        
        {/* 使用新的About组件替换原来的关于我们部分 */}
        <About />
        
        <Portfolio />
        
        <ContactForm />
      </main>

      <footer className="py-8 text-center text-white/60">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} 李沐的AI空间. 保留所有权利.</p>
        </div>
      </footer>
    </>
  );
} 