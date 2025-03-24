'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Environment, Sparkles, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 定义属性接口
interface FloatingObjectProps {
    position: [number, number, number]; // 使用元组定义位置
    scale: number;
    color: string;
    speed?: number;
    rotationFactor?: number;
  }
  
  
// 定义属性接口
interface FloatingObjectProps {
    position: [number, number, number]; // 使用元组定义位置
    scale: number;
    color: string;
    speed?: number;
    rotationFactor?: number;
}
  
const FloatingObject: React.FC<FloatingObjectProps> = ({ position, scale, color, speed = 1, rotationFactor = 0.01 }) => {
    const mesh = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);
    
    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x += rotationFactor * speed;
            mesh.current.rotation.y += rotationFactor * speed * 1.5;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
            <mesh
                ref={mesh}
                position={position}
                scale={hovered ? scale * 1.1 : scale}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial 
                    color={color} 
                    emissive={color} 
                    emissiveIntensity={hovered ? 2 : 0.5}
                    roughness={0.1}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
};

// 创建数字网格
const DigitalGrid = () => {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper 
        args={[20, 20, '#3d21a5', '#1e1448']} 
        rotation={[Math.PI / 2, 0, 0]} 
        position={[0, 0, -5]} 
      />
      <gridHelper 
        args={[20, 20, '#3d21a5', '#1e1448']} 
        position={[0, -5, 0]} 
      />
    </group>
  );
};

const ThreeDScene = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="w-full h-[70vh] relative"
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff327a" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#785aff" />
        
        <Sparkles count={200} scale={20} size={2} speed={0.3} opacity={0.5} />
        
        <DigitalGrid />
        
        <FloatingObject position={[-4, 2, 0]} scale={1.5} color="#785aff" speed={0.5} />
        <FloatingObject position={[4, -2, 2]} scale={1} color="#ff327a" speed={0.8} />
        <FloatingObject position={[0, 0, -1]} scale={2} color="#00ffaa" speed={0.3} />
        <FloatingObject position={[5, 3, -2]} scale={0.8} color="#34abeb" speed={1.2} />
        <FloatingObject position={[-3, -4, 1]} scale={1.2} color="#ffcc00" speed={0.7} />
        
        <Environment preset="night" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 1.5} 
        />
      </Canvas>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-light opacity-70">与场景互动：拖动旋转，点击悬浮物体</p>
      </div>
    </motion.div>
  );
};

export default ThreeDScene; 