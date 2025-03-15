import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const teamMembers: TeamMember[] = [
    {
      name: '张明',
      role: '创始人 & 创意总监',
      bio: '拥有10年数字设计经验，曾为多家国际品牌打造品牌形象和数字体验。专注于将艺术与技术融合，创造令人惊叹的视觉作品。',
      photoUrl: '/images/team/team-1.jpg',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      },
    },
    {
      name: '李华',
      role: '技术总监',
      bio: '全栈开发者，精通React、Three.js和WebGL。热衷于探索前沿技术，并将复杂的技术概念转化为优雅的用户体验。',
      photoUrl: '/images/team/team-2.jpg',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
    },
    {
      name: '王思',
      role: 'UX/UI设计师',
      bio: '专注于创造既美观又实用的用户界面。结合用户研究和设计思维，确保每个项目都能超越客户期望。',
      photoUrl: '/images/team/team-3.jpg',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-gradient-to-b from-primary/40 to-primary/10">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-primary to-transparent opacity-30"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">关于我们</h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            未来视觉是一家充满激情的创意科技工作室，专注于创造令人惊叹的数字体验。我们将艺术创意与尖端技术相结合，为客户打造独特的视觉故事。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">我们的故事</h3>
            <p className="text-white/70 mb-4">
              未来视觉成立于2018年，由一群热爱创意和技术的专业人士共同创立。我们从一个小型工作室起步，如今已发展成为行业内备受尊敬的数字创意机构。
            </p>
            <p className="text-white/70 mb-4">
              我们相信，真正的创新来自于跨学科思维的碰撞。我们的团队汇集了设计师、开发者、动画师和策略师，共同为每个项目注入独特的见解和专业知识。
            </p>
            <p className="text-white/70">
              无论是品牌网站、互动装置还是沉浸式体验，我们都致力于创造既视觉震撼又功能强大的作品，帮助品牌在数字世界中脱颖而出。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-morphism p-8 rounded-2xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-white">我们的价值观</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">创新</h4>
                    <p className="text-white/70">我们不断探索新技术和创意方法，突破传统界限。</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">品质</h4>
                    <p className="text-white/70">我们对每个项目都倾注匠心，确保卓越的品质和性能。</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">协作</h4>
                    <p className="text-white/70">我们重视与客户的密切合作，将您的愿景转化为现实。</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <h3 className="text-2xl font-bold mb-8 text-center text-white">认识我们的团队</h3>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="glass-morphism p-6 rounded-xl overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 mx-auto mb-4">
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl text-white font-bold">
                    {member.photoUrl ? (
                      <img 
                        src={member.photoUrl} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // 如果图片加载失败，显示首字母
                          const target = e.target as HTMLElement;
                          target.innerText = member.name.charAt(0);
                        }} 
                      />
                    ) : (
                      member.name.charAt(0)
                    )}
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-center text-white mb-1">{member.name}</h4>
                <p className="text-center text-purple-300 mb-4">{member.role}</p>
                <p className="text-white/70 text-center mb-6">{member.bio}</p>
                
                <div className="flex justify-center space-x-4">
                  {member.socialLinks.linkedin && (
                    <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.223 0h.002z" />
                      </svg>
                    </a>
                  )}
                  
                  {member.socialLinks.twitter && (
                    <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  )}
                  
                  {member.socialLinks.github && (
                    <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold mb-6 text-white">加入我们</h3>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            我们始终在寻找有才华、充满激情的创意人才。如果您对加入未来视觉团队感兴趣，请将您的简历和作品集发送至：
          </p>
          <a 
            href="mailto:careers@futurevision.com" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-medium text-white hover:shadow-lg transition-shadow"
          >
            careers@futurevision.com
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 