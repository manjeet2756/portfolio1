import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Cloud, Cpu, Database } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { skills } from '../../data/portfolio';

const SkillsPage: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<keyof typeof skills>('DevOps');

  const tabs = [
    { id: 'DevOps' as keyof typeof skills, label: t('devopsTab'), icon: Code, color: '#00ff88' },
    { id: 'GenAI' as keyof typeof skills, label: t('genaiTab'), icon: Cpu, color: '#8b5cf6' },
    { id: 'Fullstack' as keyof typeof skills, label: t('fullstackTab'), icon: Database, color: '#06b6d4' },
    { id: 'Cloud' as keyof typeof skills, label: t('cloudTab'), icon: Cloud, color: '#f59e0b' },
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
            Skills & Expertise
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: theme.gradients.primary }}
          />
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === tab.id ? 'text-white' : ''
              }`}
              style={{
                backgroundColor: activeTab === tab.id ? tab.color : theme.colors.surface,
                color: activeTab === tab.id ? '#ffffff' : theme.colors.text,
                border: `2px solid ${activeTab === tab.id ? tab.color : theme.colors.border}`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {skills[activeTab].map((skill, index) => (
              <motion.div
                key={skill}
                className="group relative"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="p-6 rounded-2xl border text-center cursor-pointer"
                  style={{
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    rotateX: 5,
                    boxShadow: `0 20px 40px ${tabs.find(t => t.id === activeTab)?.color}20`,
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Skill Name */}
                  <h3
                    className="font-semibold text-lg mb-2"
                    style={{ color: theme.colors.text }}
                  >
                    {skill}
                  </h3>
                  
                  {/* Skill Level Indicator */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: tabs.find(t => t.id === activeTab)?.color }}
                      initial={{ width: '0%' }}
                      animate={{ width: `${80 + Math.random() * 20}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>

                  {/* Hover Video Background */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"
                    style={{
                      background: `linear-gradient(45deg, ${tabs.find(t => t.id === activeTab)?.color}30, transparent)`,
                    }}
                  />

                  {/* Glow Border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      borderColor: tabs.find(t => t.id === activeTab)?.color,
                      boxShadow: `0 0 20px ${tabs.find(t => t.id === activeTab)?.color}40`,
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Filter Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3
            className="text-2xl font-semibold mb-8"
            style={{ color: theme.colors.text }}
          >
            Technology Stack
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3">
            {Object.values(skills).flat().slice(0, 15).map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 rounded-full text-sm font-medium border"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 + index * 0.05 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: theme.colors.primary,
                  color: '#ffffff',
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillsPage;