import React, { useState } from 'react';
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
  const [navHovered, setNavHovered] = useState(false);

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
      className={`fixed left-0 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block transition-transform duration-300 ${navHovered ? 'translate-x-0' : '-translate-x-full'}`}
      onMouseEnter={() => setNavHovered(true)}
      onMouseLeave={() => setNavHovered(false)}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div
        className="flex flex-col space-y-2 p-4 rounded-2xl border backdrop-blur-lg"
        style={{
          backgroundColor: theme.colors.surface + '90',
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
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <section.icon size={20} />
              
              {/* Active indicator */}
              {currentSection === section.id && (
                <motion.div
                  className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-full"
                  style={{ backgroundColor: theme.colors.primary }}
                  layoutId="activeIndicator"
                />
              )}
            </motion.button>

            {/* Tooltip */}
            {hoveredSection === section.id && (
              <motion.div
                className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 px-3 py-2 rounded-lg border whitespace-nowrap"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{section.label}</span>
                  <ChevronRight size={14} style={{ color: theme.colors.primary }} />
                </div>
                
                {/* Arrow */}
                <div
                  className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent"
                  style={{ borderRightColor: theme.colors.border }}
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.nav>
  );
};

export default VerticalNavigation;