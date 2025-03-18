import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleEffect = () => {
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
    
    // 创建粒子系统
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    
    const colorPalette = [
      new THREE.Color(0x0ab5ff), // 主色调蓝色
      new THREE.Color(0x9834ff), // 紫色
      new THREE.Color(0x00ffcc), // 青绿色
      new THREE.Color(0xff3399)  // 粉红色
    ];
    
    for (let i = 0; i < particlesCount; i++) {
      // 位置 - 创建球形分布
      const radius = 4 + Math.random() * 4; // 4-8 范围内的半径
      const theta = Math.random() * Math.PI * 2; // 0-2PI 的角度
      const phi = Math.acos(2 * Math.random() - 1); // 0-PI 的角度
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // 颜色 - 从调色板中随机选择
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // 大小 - 不同大小的粒子
      sizes[i] = Math.random() * 0.1 + 0.02;
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // 创建着色器材质
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        uPointSize: { value: window.innerHeight / 120 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        uniform float time;
        uniform float uPointSize;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          
          // 简单的波动动画
          vec3 pos = position;
          pos.x += sin(time * 0.2 + position.z * 0.5) * 0.1;
          pos.y += cos(time * 0.2 + position.x * 0.5) * 0.1;
          pos.z += sin(time * 0.2 + position.y * 0.5) * 0.1;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * uPointSize * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // 创建圆形粒子
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          // 添加发光效果
          float intensity = 1.0 - dist * 2.0;
          gl_FragColor = vec4(vColor, intensity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // 处理窗口大小变化
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      particlesMaterial.uniforms.uPointSize.value = window.innerHeight / 120;
    };
    
    window.addEventListener('resize', handleResize);
    
    // 动画循环
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      particlesMaterial.uniforms.time.value = elapsedTime;
      
      // 旋转粒子系统
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.z = elapsedTime * 0.03;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
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

export default ParticleEffect; 