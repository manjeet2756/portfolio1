import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { toggleTheme, theme, currentTheme } = useTheme();

  return (
    <motion.div
      className="fixed top-8 right-8 z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.button
        onClick={toggleTheme}
        className="relative p-4 rounded-full backdrop-blur-lg border shadow-lg"
        style={{
          backgroundColor: theme.colors.surface + '90',
          borderColor: theme.colors.border,
        }}
        animate={{
          rotate: [0, -10, 10, -5, 5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
        whileHover={{
          boxShadow: `0 0 20px ${theme.colors.primary}40`,
        }}
      >
        <Lightbulb
          size={24}
          style={{ color: theme.colors.primary }}
          className={currentTheme === 'neo' ? 'animate-pulse' : ''}
        />
        
        {/* Theme indicator */}
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium"
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.background,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {currentTheme === 'white' ? 'Pro' : currentTheme === 'black' ? 'Dev' : 'Neo'}
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default ThemeSwitcher;