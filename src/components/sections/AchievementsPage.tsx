import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Code, Medal, Calendar, MapPin } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { achievements } from '../../data/portfolio';

const AchievementsPage: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hackathon': return Trophy;
      case 'sports': return Medal;
      case 'project': return Code;
      default: return Award;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hackathon': return '#f59e0b';
      case 'sports': return '#ef4444';
      case 'project': return '#8b5cf6';
      default: return theme.colors.primary;
    }
  };

  return (
    <motion.div
      className="min-h-screen py-20 px-4"
      style={{ backgroundColor: theme.colors.background }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-6xl mx-auto">
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
            Achievements & Awards
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: theme.gradients.primary }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div
            className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full rounded-full"
            style={{ background: theme.gradients.primary }}
          />

          {/* Achievement Cards */}
          <div className="space-y-12">
            {achievements.map((achievement, index) => {
              const CategoryIcon = getCategoryIcon(achievement.category);
              const categoryColor = getCategoryColor(achievement.category);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={achievement.id}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:space-x-8`}
                  initial={{ 
                    opacity: 0, 
                    x: isEven ? -50 : 50,
                    y: 30 
                  }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {/* Timeline Node */}
                  <motion.div
                    className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 flex items-center justify-center z-10"
                    style={{
                      backgroundColor: theme.colors.surface,
                      borderColor: categoryColor,
                      boxShadow: `0 0 20px ${categoryColor}40`,
                    }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: `0 0 30px ${categoryColor}60`,
                    }}
                  >
                    <CategoryIcon size={24} style={{ color: categoryColor }} />
                  </motion.div>

                  {/* Achievement Card */}
                  <motion.div
                    className={`w-full md:w-5/12 ml-24 md:ml-0 ${
                      isEven ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                    whileHover={{ 
                      scale: 1.02,
                      rotateY: isEven ? 5 : -5,
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div
                      className="p-6 rounded-2xl border group cursor-pointer relative overflow-hidden"
                      style={{
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.border,
                      }}
                    >
                      {/* Glow Effect */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(45deg, ${categoryColor}10, transparent)`,
                        }}
                      />

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                            style={{
                              backgroundColor: categoryColor + '20',
                              color: categoryColor,
                            }}
                          >
                            {achievement.category}
                          </div>
                          <div className="flex items-center text-sm" style={{ color: theme.colors.textSecondary }}>
                            <Calendar size={14} className="mr-1" />
                            {achievement.year}
                          </div>
                        </div>

                        <h3
                          className="text-xl font-bold mb-3"
                          style={{ color: theme.colors.text }}
                        >
                          {achievement.title}
                        </h3>

                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: theme.colors.textSecondary }}
                        >
                          {achievement.description}
                        </p>

                        {/* Achievement Badge */}
                        <motion.div
                          className="mt-4 inline-flex items-center space-x-2 px-4 py-2 rounded-full"
                          style={{
                            backgroundColor: categoryColor + '15',
                            border: `1px solid ${categoryColor}30`,
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: categoryColor }}
                          />
                          <span
                            className="text-xs font-medium"
                            style={{ color: categoryColor }}
                          >
                            Achievement Unlocked
                          </span>
                        </motion.div>
                      </div>

                      {/* Parallax Shadow */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
                        style={{
                          background: `linear-gradient(135deg, ${categoryColor}40, transparent)`,
                          transform: 'translateZ(-10px) scale(1.1)',
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[
            { label: 'Hackathons', value: '3+', icon: Trophy, color: '#f59e0b' },
            { label: 'Projects', value: '8+', icon: Code, color: '#8b5cf6' },
            { label: 'Sports Wins', value: '1', icon: Medal, color: '#ef4444' },
            { label: 'Years Experience', value: '2+', icon: Award, color: '#06b6d4' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-xl border"
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 10px 30px ${stat.color}20`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: stat.color + '20' }}
              >
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
              <div
                className="text-2xl font-bold mb-1"
                style={{ color: theme.colors.text }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm"
                style={{ color: theme.colors.textSecondary }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AchievementsPage;