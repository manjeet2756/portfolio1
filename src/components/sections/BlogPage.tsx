import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, Tag, Hash, FileText, Globe } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { blogPosts } from '../../data/portfolio';

const BlogPage: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('all');

  const platforms = [
    { id: 'all', name: 'All Posts', icon: Globe, color: theme.colors.primary },
    { id: 'Hashnode', name: 'Hashnode', icon: Hash, color: '#2962ff' },
    { id: 'Dev.to', name: 'Dev.to', icon: FileText, color: '#000000' },
    { id: 'Notion', name: 'Notion', icon: FileText, color: '#000000' },
  ];

  const filteredPosts = activeTab === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.platform === activeTab);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Hashnode': return Hash;
      case 'Dev.to': return FileText;
      case 'Notion': return FileText;
      default: return Globe;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Hashnode': return '#2962ff';
      case 'Dev.to': return '#000000';
      case 'Notion': return '#000000';
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
            Blog & Articles
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: theme.gradients.primary }}
          />
          <p
            className="mt-6 text-lg max-w-2xl mx-auto"
            style={{ color: theme.colors.textSecondary }}
          >
            Sharing insights on DevOps, AI, and Cloud technologies through various platforms
          </p>
        </motion.div>

        {/* Platform Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {platforms.map((platform) => (
            <motion.button
              key={platform.id}
              onClick={() => setActiveTab(platform.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === platform.id ? 'text-white' : ''
              }`}
              style={{
                backgroundColor: activeTab === platform.id ? platform.color : theme.colors.surface,
                color: activeTab === platform.id ? '#ffffff' : theme.colors.text,
                border: `2px solid ${activeTab === platform.id ? platform.color : theme.colors.border}`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <platform.icon size={20} />
              <span>{platform.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredPosts.map((post, index) => {
              const PlatformIcon = getPlatformIcon(post.platform);
              const platformColor = getPlatformColor(post.platform);

              return (
                <motion.article
                  key={post.id}
                  className="group relative overflow-hidden rounded-2xl border cursor-pointer"
                  style={{
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    boxShadow: `0 20px 40px ${platformColor}20`,
                  }}
                >
                  {/* Glass Morphism Background */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${platformColor}10, transparent)`,
                      backdropFilter: 'blur(10px)',
                    }}
                  />

                  {/* Content */}
                  <div className="relative p-6">
                    {/* Platform Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: platformColor + '20',
                          color: platformColor,
                        }}
                      >
                        <PlatformIcon size={14} />
                        <span>{post.platform}</span>
                      </div>
                      
                      <div
                        className="flex items-center text-xs"
                        style={{ color: theme.colors.textSecondary }}
                      >
                        <Calendar size={12} className="mr-1" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-opacity-80 transition-all"
                      style={{ color: theme.colors.text }}
                    >
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm mb-4 line-clamp-3"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {post.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center px-2 py-1 rounded text-xs font-medium"
                          style={{
                            backgroundColor: theme.colors.border,
                            color: theme.colors.textSecondary,
                          }}
                        >
                          <Tag size={10} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <motion.div
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all"
                        style={{
                          backgroundColor: platformColor + '15',
                          color: platformColor,
                          border: `1px solid ${platformColor}30`,
                        }}
                        whileHover={{
                          backgroundColor: platformColor,
                          color: '#ffffff',
                          scale: 1.05,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Read Article</span>
                        <ExternalLink size={14} />
                      </motion.a>

                      {/* Slide-in Animation Indicator */}
                      <motion.div
                        className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: platformColor + '20' }}
                        animate={{
                          x: [0, 5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <ExternalLink size={16} style={{ color: platformColor }} />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: `linear-gradient(45deg, ${platformColor}20, transparent)`,
                      filter: 'blur(20px)',
                    }}
                  />
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Coming Soon Message */}
        {filteredPosts.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div
              className="text-6xl mb-4"
              style={{ color: theme.colors.textSecondary }}
            >
              📝
            </div>
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: theme.colors.text }}
            >
              More Articles Coming Soon
            </h3>
            <p
              style={{ color: theme.colors.textSecondary }}
            >
              Stay tuned for more insights on DevOps, AI, and Cloud technologies!
            </p>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          className="mt-16 text-center p-8 rounded-2xl border"
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: theme.colors.text }}
          >
            Stay Updated
          </h3>
          <p
            className="mb-6"
            style={{ color: theme.colors.textSecondary }}
          >
            Get notified when I publish new articles about DevOps, AI, and Cloud technologies
          </p>
          <motion.button
            className="px-8 py-3 rounded-lg font-medium text-white"
            style={{ background: theme.gradients.primary }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe to Newsletter
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogPage;