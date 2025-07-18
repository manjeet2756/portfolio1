import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onSectionChange }) => {
  const { theme } = useTheme();
  const { t, toggleLanguage, currentLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { id: 'home', label: t('home') },
    { id: 'about', label: t('about') },
    { id: 'skills', label: t('skills') },
    { id: 'projects', label: t('projects') },
    { id: 'experience', label: t('experience') },
    { id: 'contact', label: t('contact') },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-0 left-1/2 transform -translate-x-1/2 z-40 hidden md:block mt-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div
          className="flex items-center space-x-1 p-2 rounded-full backdrop-blur-lg border"
          style={{
            backgroundColor: theme.colors.surface + '90',
            borderColor: theme.colors.border,
          }}
        >
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                currentSection === section.id
                  ? 'text-white'
                  : ''
              }`}
              style={{
                backgroundColor: currentSection === section.id 
                  ? theme.colors.primary 
                  : 'transparent',
                color: currentSection === section.id 
                  ? '#ffffff' 
                  : theme.colors.text,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {section.label}
            </motion.button>
          ))}
          
          {/* Language Toggle */}
          <motion.button
            onClick={toggleLanguage}
            className="p-2 rounded-full ml-2"
            style={{ color: theme.colors.text }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe size={16} />
            <span className="ml-1 text-xs">{currentLanguage.toUpperCase()}</span>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-4 left-4 z-50 p-3 rounded-full backdrop-blur-lg border md:hidden"
        style={{
          backgroundColor: theme.colors.surface + '90',
          borderColor: theme.colors.border,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu size={20} style={{ color: theme.colors.text }} />
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Menu */}
            <motion.div
              className="absolute top-0 left-0 h-full w-80 max-w-[90vw] p-6"
              style={{ backgroundColor: theme.colors.surface }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div
                  className="text-2xl font-bold"
                  style={{ color: theme.colors.primary }}
                >
                  MK
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full"
                  style={{ color: theme.colors.text }}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => {
                      onSectionChange(section.id);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left p-3 rounded-lg font-medium ${
                      currentSection === section.id ? 'text-white' : ''
                    }`}
                    style={{
                      backgroundColor: currentSection === section.id 
                        ? theme.colors.primary 
                        : 'transparent',
                      color: currentSection === section.id 
                        ? '#ffffff' 
                        : theme.colors.text,
                    }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section.label}
                  </motion.button>
                ))}
                
                <motion.button
                  onClick={toggleLanguage}
                  className="flex items-center p-3 rounded-lg font-medium"
                  style={{ color: theme.colors.text }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Globe size={16} className="mr-2" />
                  Language ({currentLanguage.toUpperCase()})
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;