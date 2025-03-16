import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const Hero = () => {
  const neuronRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (neuronRef.current) {
      const neurons = neuronRef.current.querySelectorAll('.neuron');
      
      gsap.to(neurons, {
        scale: 1.2,
        opacity: 0.8,
        duration: 2,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <div ref={neuronRef} className="w-full h-full relative">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="neuron absolute w-2 h-2 rounded-full bg-neural-500 opacity-30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              <span className="block">超级</span>
              <span className="bg-gradient-to-r from-neural-400 to-synapse-400 bg-clip-text text-transparent">
                神经中枢
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              连接智能，释放无限可能，打造未来人工智能的核心引擎
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#neural-networks" className="btn btn-primary">
                探索神经网络
              </a>
              <a href="#contact" className="btn border border-white/20 text-white hover:bg-white/10">
                联系我们
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neural-500/20 to-synapse-500/20 animate-pulse-slow"></div>
              <div className="absolute inset-10 rounded-full bg-gradient-to-br from-neural-600/30 to-synapse-600/30 animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-20 rounded-full bg-gradient-to-br from-neural-700/40 to-synapse-700/40 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-neural-500 to-synapse-500 synapse-glow flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neural-400 to-synapse-400 synapse-glow"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 