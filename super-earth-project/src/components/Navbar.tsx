import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/90 backdrop-blur-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-mono font-bold earth-text earth-glow">
            超级地球
          </Link>
          
          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-medium hover:text-primary transition-colors">
              首页
            </Link>
            <Link href="#ecosystem" className="font-medium hover:text-primary transition-colors">
              生态系统
            </Link>
            <Link href="#technology" className="font-medium hover:text-primary transition-colors">
              绿色科技
            </Link>
            <Link href="#projects" className="font-medium hover:text-primary transition-colors">
              可持续项目
            </Link>
            <Link href="#contact" className="earth-btn">
              加入我们
            </Link>
          </nav>
          
          {/* 移动菜单按钮 */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>
      
      {/* 移动菜单 */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-dark/95 backdrop-blur-md absolute top-full left-0 w-full py-5 border-t border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="font-medium py-2 hover:text-primary transition-colors">
                首页
              </Link>
              <Link href="#ecosystem" className="font-medium py-2 hover:text-primary transition-colors">
                生态系统
              </Link>
              <Link href="#technology" className="font-medium py-2 hover:text-primary transition-colors">
                绿色科技
              </Link>
              <Link href="#projects" className="font-medium py-2 hover:text-primary transition-colors">
                可持续项目
              </Link>
              <Link href="#contact" className="earth-btn text-center mt-2">
                加入我们
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar; 