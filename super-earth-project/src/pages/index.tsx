import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ecosystem from '@/components/Ecosystem';
import Technology from '@/components/Technology';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>超级地球 - 可持续生态星球</title>
        <meta name="description" content="探索未来绿色科技与自然和谐共生的超级地球，体验可再生能源与生态系统的完美平衡。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main>
        <Hero />
        <Ecosystem />
        <Technology />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
    </>
  );
};

export default Home; 