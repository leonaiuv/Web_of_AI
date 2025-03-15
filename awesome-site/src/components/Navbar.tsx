import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const navItems = [
  { name: '首页', href: '#home' },
  { name: '关于我们', href: '#about' },
  { name: '服务', href: '#services' },
  { name: '作品', href: '#portfolio' },
  { name: '联系我们', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPosition]);

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      }
    },
  };
  
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
        delayChildren: 0.15,
      },
    },
  };
  
  const mobileItemVariants = {
    closed: { opacity: 0, x: -50 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`hidden md:flex fixed w-full z-50 justify-between items-center px-10 py-5 ${
          scrollPosition > 50 ? 'glass-morphism' : 'bg-transparent'
        } smooth-transition`}
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <Link href="#home">
          <motion.div 
            className="text-xl font-bold neon-glow gradient-text hover-effect"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            未来视觉
          </motion.div>
        </Link>

        <motion.ul className="flex space-x-8" variants={navVariants}>
          {navItems.map((item) => (
            <motion.li key={item.name} variants={itemVariants}>
              <Link href={item.href}>
                <span 
                  className={`relative py-2 px-1 text-white hover-effect ${
                    activeSection === item.href.substring(1) ? 'gradient-text font-bold' : ''
                  }`}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                      layoutId="activeSection"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        className={`md:hidden fixed w-full z-50 ${
          scrollPosition > 50 ? 'glass-morphism' : 'bg-transparent'
        } smooth-transition`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center px-5 py-4">
          <Link href="#home">
            <motion.div 
              className="text-xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              未来视觉
            </motion.div>
          </Link>

          <motion.button
            className="relative w-10 h-10 focus:outline-none hover-effect"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <span className="sr-only">Toggle menu</span>
            <motion.div
              className="absolute w-6 h-0.5 bg-white rounded-full"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 8 : 0,
              }}
              transition={{ duration: 0.2 }}
              style={{ top: '35%', left: '20%' }}
            />
            <motion.div
              className="absolute w-6 h-0.5 bg-white rounded-full"
              animate={{
                opacity: isOpen ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{ top: '50%', left: '20%' }}
            />
            <motion.div
              className="absolute w-6 h-0.5 bg-white rounded-full"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -8 : 0,
              }}
              transition={{ duration: 0.2 }}
              style={{ top: '65%', left: '20%' }}
            />
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="overflow-hidden glass-morphism"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <motion.ul className="px-5 py-4 space-y-4">
                {navItems.map((item) => (
                  <motion.li 
                    key={item.name}
                    variants={mobileItemVariants}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href={item.href} onClick={() => setIsOpen(false)}>
                      <span 
                        className={`block py-2 pl-3 border-l-4 ${
                          activeSection === item.href.substring(1)
                            ? 'border-purple-500 gradient-text font-bold'
                            : 'border-transparent'
                        }`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar; 