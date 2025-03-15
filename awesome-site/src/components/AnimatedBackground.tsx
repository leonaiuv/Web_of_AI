import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 100;
      
      // Color (gradient from purple to cyan)
      if (i % 3 === 0) {
        colorArray[i] = Math.random() * 0.5 + 0.5; // R: 0.5-1.0
        colorArray[i + 1] = Math.random() * 0.5; // G: 0-0.5
        colorArray[i + 2] = Math.random() * 0.5 + 0.5; // B: 0.5-1.0
      }
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );
    
    particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colorArray, 3)
    );

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    // Mesh
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Animation
    const animate = () => {
      particles.rotation.x += 0.0003;
      particles.rotation.y += 0.0005;

      // Responsive to mouse movement (subtle effect)
      if (window.mouseMoveX && window.mouseMoveY) {
        particles.rotation.x += window.mouseMoveY * 0.00002;
        particles.rotation.y += window.mouseMoveX * 0.00002;
      }

      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Window resize handler
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Mouse move effect
    const handleMouseMove = (event: MouseEvent) => {
      window.mouseMoveX = (event.clientX / window.innerWidth) * 2 - 1;
      window.mouseMoveY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameIdRef.current);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
        sceneRef.current?.remove(particlesRef.current);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};

// Global mousemove variables
declare global {
  interface Window {
    mouseMoveX: number;
    mouseMoveY: number;
  }
}

export default AnimatedBackground; 