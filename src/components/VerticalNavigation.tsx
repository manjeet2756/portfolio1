import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  User, 
  Code, 
  FolderOpen, 
  Trophy, 
  FileText, 
  Mail,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface VerticalNavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const VerticalNavigation: React.FC<VerticalNavigationProps> = ({ 
  currentSection, 
  onSectionChange 
}) => {
  const { theme } = useTheme();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [navVisible, setNavVisible] = useState(false);
  const hideTimeout = useRef<number | null>(null);

  // Always show nav and disable animation if on home
  React.useEffect(() => {
    if (currentSection === 'home') {
      setNavVisible(true);
    }
  }, [currentSection]);

  // Show nav when mouse enters top border (only if not home)
  const handleMouseMove = (e: MouseEvent) => {
    if (currentSection !== 'home' && e.clientY <= 8) {
      setNavVisible(true);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    }
  };

  // Hide nav after 5s of no interaction (only if not home)
  const handleNavMouseLeave = () => {
    if (currentSection !== 'home') {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      hideTimeout.current = setTimeout(() => setNavVisible(false), 5000);
    }
  };

  // Always show nav if hovered
  const handleNavMouseEnter = () => {
    setNavVisible(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [currentSection]);

  const sections = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <motion.nav
      className={`fixed left-0 top-0 w-full z-40 hidden lg:flex justify-center transition-transform duration-500`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: navVisible ? 0 : -80, opacity: navVisible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      onMouseEnter={handleNavMouseEnter}
      onMouseLeave={handleNavMouseLeave}
      style={{ pointerEvents: navVisible ? 'auto' : 'none' }}
    >
      <div
        className="flex flex-row space-x-2 p-4 rounded-b-2xl border backdrop-blur-lg"
        style={{
          backgroundColor: theme.colors.surface + 'E6',
          borderColor: theme.colors.border,
        }}
      >
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className="relative"
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <motion.button
              onClick={() => onSectionChange(section.id)}
              className={`relative p-3 rounded-xl transition-all duration-300 ${
                currentSection === section.id ? 'text-white' : ''
              }`}
              style={{
                backgroundColor: currentSection === section.id 
                  ? theme.colors.primary 
                  : 'transparent',
                color: currentSection === section.id 
                  ? '#ffffff' 
                  : theme.colors.text,
                // no shadow
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
            >
              <section.icon size={20} />
              {/* Active indicator */}
              {currentSection === section.id && (
                <motion.div
                  className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-6 h-1 rounded-full"
                  style={{ backgroundColor: theme.colors.primary }}
                  layoutId="activeIndicator"
                />
              )}
            </motion.button>
            {/* Tooltip */}
            {hoveredSection === section.id && (
              <motion.div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 rounded-lg border whitespace-nowrap"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                  // no shadow
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{section.label}</span>
                  <ChevronRight size={14} style={{ color: theme.colors.primary }} />
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.nav>
  );
};

export default VerticalNavigation;