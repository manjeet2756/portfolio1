import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, Phone, Mail, MessageCircle, Download, ExternalLink } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface HomePageProps {
  onSectionChange: (section: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSectionChange }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [nameTyped, setNameTyped] = useState('');
  
  const roles = [
    t('roles.devops'),
    t('roles.genai'),
    t('roles.fullstack'),
  ];

  const fullName = 'Manjeet Kumar';

  // Typewriter effect for name
  useEffect(() => {
    let i = 0;
    const typeName = () => {
      if (i < fullName.length) {
        setNameTyped(fullName.slice(0, i + 1));
        i++;
        setTimeout(typeName, 100);
      }
    };
    typeName();
  }, []);

  // Role rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/manjeetkumar', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/manjeetkumar', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/manjeet', label: 'Instagram' },
  ];

  const quickContacts = [
    { icon: Phone, href: 'tel:+918757119995', label: 'Call' },
    { icon: Mail, href: 'mailto:mkdas62999@gmail.com', label: 'Email' },
    { icon: MessageCircle, href: 'https://wa.me/918757119995', label: 'WhatsApp' },
  ];

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: theme.colors.background }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Tech Icons */}
        <div className="absolute inset-0">
          {['⚛️', '🐳', '☸️', '🤖', '⚡', '🚀', '💻', '🌐', '🔧', '📊'].map((icon, index) => (
            <motion.div
              key={index}
              className="absolute text-2xl opacity-20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                rotate: 360,
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {icon}
            </motion.div>
          ))}
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${theme.colors.primary}20, transparent 70%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Content */}
        <motion.div
          className="space-y-8"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Name with Typewriter Effect */}
          <div>
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-4"
              style={{ color: theme.colors.text }}
            >
              {nameTyped}
              <motion.span
                className="ml-2"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
            </motion.h1>
            
            {/* Rotating Roles */}
            <div className="h-16 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentRoleIndex}
                  className="text-2xl md:text-3xl font-semibold"
                  style={{ color: theme.colors.primary }}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {roles[currentRoleIndex]}
                </motion.h2>
              </AnimatePresence>
            </div>
          </div>

          {/* Quote */}
          <motion.p
            className="text-xl italic opacity-80"
            style={{ color: theme.colors.textSecondary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1 }}
          >
            "You don't know how much capable of you"
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.button
              onClick={() => onSectionChange('contact')}
              className="px-8 py-4 rounded-full font-semibold text-white shadow-lg"
              style={{ background: theme.gradients.primary }}
              whileHover={{ scale: 1.05, boxShadow: `0 20px 40px ${theme.colors.primary}40` }}
              whileTap={{ scale: 0.95 }}
            >
              {t('contactMe')}
            </motion.button>
            
            <motion.button
              className="px-8 py-4 rounded-full font-semibold border-2 backdrop-blur-lg"
              style={{
                borderColor: theme.colors.primary,
                color: theme.colors.primary,
                backgroundColor: theme.colors.surface + '80',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} className="inline mr-2" />
              {t('viewResume')}
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex space-x-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full backdrop-blur-lg border"
                style={{
                  backgroundColor: theme.colors.surface + '80',
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: theme.colors.primary,
                  color: '#ffffff',
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.6 + index * 0.1 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Profile */}
        <motion.div
          className="relative"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Profile Image Container */}
          <div className="relative">
            <motion.div
              className="w-80 h-80 mx-auto rounded-full overflow-hidden border-4 shadow-2xl"
              style={{
                borderColor: theme.colors.primary,
                background: theme.gradients.primary,
              }}
              animate={{
                boxShadow: [
                  `0 0 0px ${theme.colors.primary}40`,
                  `0 0 40px ${theme.colors.primary}40`,
                  `0 0 0px ${theme.colors.primary}40`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <img
                src="/WhatsApp Image 2025-07-18 at 06.40.03_8134d650.jpg"
                alt="Manjeet Kumar"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Orbiting Tech Icons */}
            <div className="absolute inset-0">
              {['⚛️', '🐳', '☸️', '🤖', '⚡', '🚀'].map((icon, index) => (
                <motion.div
                  key={index}
                  className="absolute text-2xl"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    rotate: 360,
                    x: Math.cos((index * 60) * Math.PI / 180) * 180,
                    y: Math.sin((index * 60) * Math.PI / 180) * 180,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    {icon}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default HomePage;