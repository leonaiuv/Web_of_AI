import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CyberBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 创建场景
    const scene = new THREE.Scene();
    
    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // 创建网格
    const gridSize = 20;
    const gridDivisions = 20;
    const gridColor1 = new THREE.Color(0x00f5ff); // 主色调
    const gridColor2 = new THREE.Color(0xff00e4); // 辅色调
    
    // 创建水平网格
    const gridHelper1 = new THREE.GridHelper(gridSize, gridDivisions, gridColor1, gridColor1);
    gridHelper1.position.y = -2;
    scene.add(gridHelper1);
    
    // 创建垂直网格
    const gridHelper2 = new THREE.GridHelper(gridSize, gridDivisions, gridColor2, gridColor2);
    gridHelper2.position.y = -2;
    gridHelper2.rotation.x = Math.PI / 2;
    scene.add(gridHelper2);
    
    // 创建粒子
    const particlesCount = 500;
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00f5ff,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // 处理窗口大小变化
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      
      // 旋转网格
      gridHelper1.rotation.z += 0.001;
      gridHelper2.rotation.z += 0.001;
      
      // 旋转粒子
      particles.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      scene.remove(gridHelper1);
      scene.remove(gridHelper2);
      scene.remove(particles);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 bg-gradient-to-b from-dark to-dark-light"
    />
  );
};

export default CyberBackground; 