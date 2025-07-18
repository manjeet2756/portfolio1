import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const { theme } = useTheme();
  const [commandText, setCommandText] = useState('');
  const [showLogo, setShowLogo] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  
  const fullCommand = 'start manjeet portfolio';

  useEffect(() => {
    // Command typing animation
    let i = 0;
    const typeCommand = () => {
      if (i < fullCommand.length) {
        setCommandText(fullCommand.slice(0, i + 1));
        i++;
        setTimeout(typeCommand, 100);
      } else {
        setTimeout(() => setShowLogo(true), 500);
      }
    };
    
    typeCommand();
  }, []);

  useEffect(() => {
    if (showLogo) {
      setTimeout(() => setShowExplosion(true), 1000);
      setTimeout(() => onLoadingComplete(), 2500);
    }
  }, [showLogo, onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{ backgroundColor: theme.colors.background }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Command Prompt */}
        <motion.div
          className="mb-8 font-mono text-xl"
          style={{ color: theme.colors.text }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span style={{ color: theme.colors.primary }}>manjeet@portfolio:~$</span> {commandText}
          <motion.span
            className="ml-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            |
          </motion.span>
        </motion.div>

        {/* Logo */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              className="relative"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold"
                style={{
                  background: theme.gradients.primary,
                  color: '#ffffff',
                }}
              >
                MK
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech Icons Explosion */}
        <AnimatePresence>
          {showExplosion && (
            <div className="absolute inset-0 overflow-hidden">
              {['⚛️', '🐳', '☸️', '🤖', '⚡', '🚀', '💻', '🌐'].map((icon, index) => (
                <motion.div
                  key={index}
                  className="absolute text-4xl"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: (Math.random() - 0.5) * 800,
                    y: (Math.random() - 0.5) * 800,
                    scale: [0, 1.5, 1],
                    opacity: [0, 1, 0],
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  }}
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Loading Progress */}
        <motion.div
          className="mt-8 w-64 h-1 rounded-full overflow-hidden"
          style={{ backgroundColor: theme.colors.border }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showLogo ? 1 : 0 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: theme.gradients.primary }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;