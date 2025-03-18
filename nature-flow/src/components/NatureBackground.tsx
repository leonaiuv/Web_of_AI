import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';

const NatureBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // 创建和初始化Three.js场景
  useEffect(() => {
    // 如果canvas元素不存在，直接返回
    if (!canvasRef.current) return;

    // 创建场景、相机和渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 粒子系统设置
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;

    // 创建粒子位置数组
    const positions = new Float32Array(particlesCount * 3);
    const scales = new Float32Array(particlesCount);
    const colors = new Float32Array(particlesCount * 3);

    // 设置粒子的初始位置、大小和颜色
    for (let i = 0; i < particlesCount; i++) {
      // 生成随机位置
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      // 随机大小
      scales[i] = Math.random();

      // 随机颜色 - 使用自然的绿色和蓝色色调
      if (Math.random() > 0.5) {
        // 绿色色调 - 代表叶子
        colors[i3] = 0.3 + Math.random() * 0.2; // R
        colors[i3 + 1] = 0.5 + Math.random() * 0.5; // G
        colors[i3 + 2] = 0.2 + Math.random() * 0.3; // B
      } else {
        // 蓝色色调 - 代表水
        colors[i3] = 0.2 + Math.random() * 0.2; // R
        colors[i3 + 1] = 0.3 + Math.random() * 0.4; // G
        colors[i3 + 2] = 0.6 + Math.random() * 0.4; // B
      }
    }

    // 设置粒子属性
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // 创建着色器材质
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 }
      },
      vertexShader: `
        attribute float aScale;
        attribute vec3 color;
        uniform float uTime;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          
          // 模拟自然运动 - 使用正弦和余弦函数创建波浪效果
          vec3 pos = position;
          float t = uTime * 0.15;
          
          // 添加波浪运动
          pos.x += sin(pos.y * 0.5 + t) * 0.5;
          pos.y += cos(pos.x * 0.5 + t) * 0.5;
          pos.z += sin(pos.x * pos.y * 0.1 + t) * 0.5;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aScale * 8.0 * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // 创建柔和的圆形粒子
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          
          gl_FragColor = vec4(vColor, strength);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });

    // 创建粒子系统
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 设置相机位置
    camera.position.z = 5;

    // 处理窗口大小变化
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 动画循环
    const animate = () => {
      const time = performance.now() * 0.001;
      
      // 更新着色器中的时间变量
      particlesMaterial.uniforms.uTime.value = time;
      
      // 轻微旋转场景以增加动感
      particles.rotation.y = time * 0.05;
      particles.rotation.x = time * 0.03;
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // 清理函数
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      // 清理Three.js资源
      scene.remove(particles);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10 bg-transparent"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default NatureBackground; 