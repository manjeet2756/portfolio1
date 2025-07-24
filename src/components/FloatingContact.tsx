import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Mail, Send } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { socialLinks } from '../data/portfolio';
import { useLanguage } from '../contexts/LanguageContext';

const FloatingContact: React.FC = () => {
  const { theme } = useTheme();
  const { toggleLanguage, currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    {
      icon: Phone,
      label: 'Call',
      href: `tel:+91${socialLinks.phone}`,
      color: '#34a853',
    },
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${socialLinks.email}`,
      color: '#ea4335',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: socialLinks.whatsapp,
      color: '#25d366',
    },
  ];

  return (
    <>
      {/* Floating Button Row */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-row space-x-4">
        {/* Language Button */}
        <motion.button
          onClick={toggleLanguage}
          className="p-4 rounded-full shadow-xl flex items-center justify-center"
          style={{
            background: theme.colors.surface + '90',
            color: theme.colors.text,
            border: `2px solid ${theme.colors.border}`,
            boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)',
          }}
          whileHover={{ rotate: 360, scale: 1.1, backgroundColor: theme.colors.primary, color: '#fff' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <span className="mr-1" role="img" aria-label="language">🌐</span>
          <span className="text-xs font-medium">{currentLanguage.toUpperCase()}</span>
        </motion.button>
        {/* Floating Contact Button */}
        <motion.button
          onClick={() => setIsOpen(true)}
          className="p-4 rounded-full shadow-xl"
          style={{
            background: theme.gradients.primary,
            color: '#ffffff',
            boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)',
          }}
          whileHover={{ rotate: 360, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              `0 0 0px ${theme.colors.primary}40`,
              `0 0 20px ${theme.colors.primary}40`,
              `0 0 0px ${theme.colors.primary}40`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <MessageCircle size={24} />
        </motion.button>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              className="relative w-full max-w-sm rounded-2xl border shadow-2xl"
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="text-xl font-bold"
                    style={{ color: theme.colors.text }}
                  >
                    Quick Contact
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <motion.a
                      key={action.label}
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 rounded-xl border group"
                      style={{
                        backgroundColor: theme.colors.background,
                        borderColor: theme.colors.border,
                      }}
                      whileHover={{
                        backgroundColor: action.color + '10',
                        borderColor: action.color + '40',
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsOpen(false)}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                        style={{ backgroundColor: action.color + '20' }}
                      >
                        <action.icon size={20} style={{ color: action.color }} />
                      </div>
                      <span
                        className="font-medium"
                        style={{ color: theme.colors.text }}
                      >
                        {action.label}
                      </span>
                    </motion.a>
                  ))}
                </div>

                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="w-full mt-6 py-3 rounded-lg font-medium text-white flex items-center justify-center space-x-2"
                  style={{ background: theme.gradients.primary }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={16} />
                  <span>Send Message</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingContact;