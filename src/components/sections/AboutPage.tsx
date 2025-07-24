import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Trophy, Heart, ExternalLink } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const AboutPage: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const achievements = [
    {
      icon: GraduationCap,
      title: t('education'),
      description: 'Final Year Student',
      link: '#',
      color: theme.colors.primary,
    },
    {
      icon: Briefcase,
      title: t('internship'),
      description: 'Multi-Tech Intern - 2 months',
      link: 'https://www.lwindia.com',
      color: theme.colors.secondary,
    },
    {
      icon: Trophy,
      title: 'Achievements',
      description: 'Hackathons & Sports Champion',
      link: '#',
      color: '#f59e0b',
    },
    {
      icon: Heart,
      title: t('traits'),
      description: 'Passionate & Dedicated',
      link: '#',
      color: '#ef4444',
    },
  ];

  return (
    <motion.div
      className="min-h-screen py-20 px-4"
      style={{ backgroundColor: theme.colors.background }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ color: theme.colors.text }}
          >
            {t('aboutTitle')}
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: theme.gradients.primary }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            className="space-y-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="text-lg leading-relaxed"
              style={{ color: theme.colors.textSecondary }}
            >
              <p className="mb-6">
                {t('aboutDescription')}
              </p>
              <p className="mb-6">
                Currently pursuing BCA at Jagannath University, I combine academic excellence 
                with practical experience gained during my internship at LinuxWorld Informatics. 
                My passion extends beyond technology to sports and creative pursuits.
              </p>
              <p>
                I believe in continuous learning and pushing boundaries to create innovative 
                solutions that make a real impact. Whether it's building AI-powered systems 
                or leading sports teams, I bring the same level of dedication and enthusiasm.
              </p>
            </div>

            {/* Tech Summary */}
            <motion.div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              }}
              whileHover={{ scale: 1.02 }}
            >
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: theme.colors.text }}
              >
                Tech Stack Summary
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium" style={{ color: theme.colors.primary }}>
                    DevOps:
                  </span>
                  <span style={{ color: theme.colors.textSecondary }}>
                    {' '}Jenkins, Docker, K8s
                  </span>
                </div>
                <div>
                  <span className="font-medium" style={{ color: theme.colors.primary }}>
                    Cloud:
                  </span>
                  <span style={{ color: theme.colors.textSecondary }}>
                    {' '}AWS, Terraform
                  </span>
                </div>
                <div>
                  <span className="font-medium" style={{ color: theme.colors.primary }}>
                    AI/ML:
                  </span>
                  <span style={{ color: theme.colors.textSecondary }}>
                    {' '}Python, TensorFlow
                  </span>
                </div>
                <div>
                  <span className="font-medium" style={{ color: theme.colors.primary }}>
                    Frontend:
                  </span>
                  <span style={{ color: theme.colors.textSecondary }}>
                    {' '}React, Next.js
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual Elements */}
          <motion.div
            className="space-y-8"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Rotating Avatar */}
            <div className="text-center">
              <motion.div
                className="w-60 h-60 mx-auto rounded-3xl overflow-hidden border-4 shadow-xl"
                style={{
                  borderColor: theme.colors.primary,
                }}
                animate={{
                  rotateY: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="/WhatsApp Image 2025-07-07 at 18.04.05_ca234677.jpg"
                  alt="Manjeet Kumar - Professional"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* 3D Achievement Cards */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className="relative p-4 rounded-xl border cursor-pointer group"
                  style={{
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    rotateX: 5,
                    rotateY: 5,
                    boxShadow: `0 20px 40px ${achievement.color}20`,
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="text-center space-y-2">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                      style={{ backgroundColor: achievement.color + '20' }}
                    >
                      <achievement.icon
                        size={24}
                        style={{ color: achievement.color }}
                      />
                    </div>
                    <h4
                      className="font-semibold text-sm"
                      style={{ color: theme.colors.text }}
                    >
                      {achievement.title}
                    </h4>
                    <p
                      className="text-xs"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {achievement.description}
                    </p>
                    {achievement.link !== '#' && (
                      <motion.a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: achievement.color }}
                      >
                        <ExternalLink size={12} className="mr-1" />
                        Visit
                      </motion.a>
                    )}
                  </div>
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(45deg, ${achievement.color}10, transparent)`,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;