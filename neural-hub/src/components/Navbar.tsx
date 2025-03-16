import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首页', href: '/' },
    { name: '神经网络', href: '#neural-networks' },
    { name: '超级算法', href: '#super-algorithms' },
    { name: '智能应用', href: '#ai-applications' },
    { name: '联系我们', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neural-500 to-synapse-500 flex items-center justify-center">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-neural-500 rounded-full synapse-glow"></div>
            </div>
          </div>
          <span className="text-xl font-display font-bold bg-gradient-to-r from-neural-400 to-synapse-400 bg-clip-text text-transparent">
            神经中枢
          </span>
        </Link>

        {/* 桌面导航 */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-white/80 hover:text-white transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* 移动端菜单按钮 */}
        <button 
          className="md:hidden flex items-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? '关闭菜单' : '打开菜单'}
        >
          <div className="space-y-2 relative w-8 h-6">
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-8 bg-white origin-center transition-transform"
            ></motion.span>
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-8 bg-white transition-opacity"
            ></motion.span>
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-8 bg-white origin-center transition-transform"
            ></motion.span>
          </div>
        </button>
      </div>

      {/* 移动端菜单 */}
      <motion.div 
        className="md:hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
          display: isOpen ? 'block' : 'none'
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto py-4 space-y-4 bg-black/90 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="block text-white/80 hover:text-white transition-colors duration-300 py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar; 