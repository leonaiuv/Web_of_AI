import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-container">
        <motion.div 
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>动感Web</h1>
        </motion.div>

        <div className="nav-container">
          <motion.nav 
            className={`nav-menu ${isOpen ? 'active' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.ul>
              {['首页', '特性', '案例', '联系我们'].map((item, index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                  whileHover={{ scale: 1.05 }}
                >
                  <a href={`#${item}`}>{item}</a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>

          <motion.button 
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <span className={isOpen ? 'open' : ''}></span>
            <span className={isOpen ? 'open' : ''}></span>
            <span className={isOpen ? 'open' : ''}></span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header; 