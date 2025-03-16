import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handlePointerDetection = () => {
      const hoveredElement = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      
      const handleMouseOver = () => setIsPointer(true);
      const handleMouseOut = () => setIsPointer(false);
      
      hoveredElement.forEach(element => {
        element.addEventListener('mouseover', handleMouseOver);
        element.addEventListener('mouseout', handleMouseOut);
      });
      
      return () => {
        hoveredElement.forEach(element => {
          element.removeEventListener('mouseover', handleMouseOver);
          element.removeEventListener('mouseout', handleMouseOut);
        });
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    const cleanup = handlePointerDetection();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cleanup();
    };
  }, []);
  
  return (
    <>
      {/* 主光标 */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-primary pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isPointer ? 1.5 : 1,
          opacity: 1
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
      
      {/* 跟随光标 */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: 1
        }}
        transition={{
          type: 'spring',
          stiffness: 1000,
          damping: 40,
          mass: 0.2
        }}
      />
      
      {/* 光晕效果 */}
      <motion.div
        className="fixed top-0 left-0 w-40 h-40 bg-primary/20 rounded-full pointer-events-none z-40 filter blur-xl"
        animate={{
          x: mousePosition.x - 80,
          y: mousePosition.y - 80,
          scale: isPointer ? 1.2 : 1,
          opacity: 0.5
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 30,
          mass: 1
        }}
      />
    </>
  );
};

export default CursorEffect; 