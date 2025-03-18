import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

const footerLinks = [
  {
    title: '产品',
    links: ['特性', '定价', '案例', '教程', '更新日志']
  },
  {
    title: '公司',
    links: ['关于我们', '团队', '招聘', '联系我们', '新闻']
  },
  {
    title: '资源',
    links: ['博客', '文档', '支持', '社区', 'API']
  },
  {
    title: '法律',
    links: ['隐私政策', '条款与条件', '安全', '许可协议']
  }
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="footer-logo">动感Web</h2>
            <p className="footer-tagline">创造令人惊叹的网页体验</p>
            <div className="social-links">
              {['微博', '微信', 'GitHub', 'Dribbble'].map((platform, index) => (
                <motion.a 
                  href={`#${platform}`} 
                  key={platform}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {platform}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <div className="footer-links">
            {footerLinks.map((column, colIndex) => (
              <motion.div 
                className="footer-column" 
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (colIndex + 1) }}
              >
                <h3 className="footer-heading">{column.title}</h3>
                <ul>
                  {column.links.map((link, linkIndex) => (
                    <motion.li 
                      key={link}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <a href={`#${link}`}>{link}</a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>&copy; {new Date().getFullYear()} 动感Web. 保留所有权利.</p>
          <p>用 ❤️ 设计与开发</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 