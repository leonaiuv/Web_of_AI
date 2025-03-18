import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorEffect = () => {
  // 存储鼠标位置
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // 判断是否悬浮在可点击元素上
  const [isPointer, setIsPointer] = useState(false);
  
  useEffect(() => {
    // 处理鼠标移动，更新鼠标位置
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // 处理鼠标悬浮在可点击元素上的检测
    const handlePointerDetection = () => {
      // 选择所有可点击元素
      const hoveredElement = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      
      // 鼠标悬浮和移出事件处理函数
      const handleMouseOver = () => setIsPointer(true);
      const handleMouseOut = () => setIsPointer(false);
      
      // 为所有可点击元素添加事件监听器
      hoveredElement.forEach(element => {
        element.addEventListener('mouseover', handleMouseOver);
        element.addEventListener('mouseout', handleMouseOut);
      });
      
      // 返回清理函数，移除事件监听器
      return () => {
        hoveredElement.forEach(element => {
          element.removeEventListener('mouseover', handleMouseOver);
          element.removeEventListener('mouseout', handleMouseOut);
        });
      };
    };
    
    // 添加鼠标移动事件监听器
    window.addEventListener('mousemove', handleMouseMove);
    const cleanup = handlePointerDetection();
    
    // 组件卸载时的清理函数
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cleanup();
    };
  }, []);
  
  return (
    <>
      {/* 主光标 - 叶子形状 */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isPointer ? 1.5 : 1,
          opacity: 1,
          rotate: isPointer ? 45 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
          mass: 0.5
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234CAF50'%3E%3Cpath d='M6.05 8.05c-2.73 2.73-2.73 7.17 0 9.9s7.17 2.73 9.9 0l1.9-1.9c1.1-1.1 1.1-2.91 0-4.01-1.1-1.1-2.91-1.1-4.01 0l-1.9 1.9c-1.5 1.5-3.93 1.5-5.42 0s-1.5-3.93 0-5.42l6.37-6.37c.78-.78 2.05-.78 2.83 0l1.9 1.9c1.1 1.1 2.91 1.1 4.01 0 1.1-1.1 1.1-2.91 0-4.01l-1.9-1.9C15.45.76 9.3.76 5.01 5.04L2.58 7.47c-1.37 1.37-1.37 3.58 0 4.95 1.37 1.37 3.58 1.37 4.95 0l1.42-1.42-2-2-1.42 1.42c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L6.05 8.05z'/%3E%3C/svg%3E")`,
          backgroundSize: 'contain',
          mixBlendMode: 'difference',
        }}
      />
      
      {/* 跟随光标 - 小点 */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: 1
        }}
        transition={{
          type: 'spring',
          stiffness: 800,
          damping: 35,
          mass: 0.2
        }}
        style={{
          mixBlendMode: 'multiply',
        }}
      />
      
      {/* 光晕效果 - 水波纹 */}
      <motion.div
        className="fixed top-0 left-0 w-40 h-40 rounded-full pointer-events-none z-40 filter blur-xl"
        animate={{
          x: mousePosition.x - 80,
          y: mousePosition.y - 80,
          scale: isPointer ? 1.2 : 1,
          opacity: 0.15
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 30,
          mass: 1
        }}
        style={{
          background: 'radial-gradient(circle, rgba(3, 169, 244, 0.8) 0%, rgba(76, 175, 80, 0.5) 70%, rgba(255, 255, 255, 0) 100%)',
        }}
      />
    </>
  );
};

export default CursorEffect; 