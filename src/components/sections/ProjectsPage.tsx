import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Play, X, Code, Zap, Brain } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { projects } from '../../data/portfolio';

const ProjectsPage: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'DevOps': return Code;
      case 'GenAI': return Brain;
      case 'Fullstack': return Zap;
      case 'Cloud': return ExternalLink;
      default: return Code;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'DevOps': return '#00ff88';
      case 'GenAI': return '#8b5cf6';
      case 'Fullstack': return '#06b6d4';
      case 'Cloud': return '#f59e0b';
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
            Featured Projects
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: theme.gradients.primary }}
          />
        </motion.div>

        {/* Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => {
            const TypeIcon = getTypeIcon(project.type);
            const typeColor = getTypeColor(project.type);
            
            return (
              <motion.div
                key={project.id}
                className="group relative cursor-pointer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{
                  rotateY: 10,
                  rotateX: 5,
                  scale: 1.05,
                }}
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => setSelectedProject(project.id)}
              >
                <div
                  className="relative h-96 rounded-2xl border overflow-hidden"
                  style={{
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  }}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(45deg, ${typeColor}40, transparent)`,
                      }}
                    />
                    
                    {/* Type Badge */}
                    <div
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center space-x-1"
                      style={{ backgroundColor: typeColor }}
                    >
                      <TypeIcon size={12} />
                      <span>{project.type}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: theme.colors.text }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-sm mb-4 line-clamp-3"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {project.description}
                    </p>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: typeColor + '20',
                            color: typeColor,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: theme.colors.border,
                            color: theme.colors.textSecondary,
                          }}
                        >
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center py-2 rounded-lg border font-medium text-sm"
                        style={{
                          borderColor: theme.colors.border,
                          color: theme.colors.text,
                        }}
                        whileHover={{
                          backgroundColor: theme.colors.primary,
                          color: '#ffffff',
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={16} className="mr-1" />
                        GitHub
                      </motion.a>
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center py-2 rounded-lg font-medium text-sm text-white"
                          style={{ backgroundColor: typeColor }}
                          whileHover={{ scale: 1.05 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Play size={16} className="mr-1" />
                          Demo
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      boxShadow: `0 0 40px ${typeColor}40`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Other Projects */}
        <motion.div
          className="mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3
            className="text-2xl font-bold mb-8 text-center"
            style={{ color: theme.colors.text }}
          >
            More Projects
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => {
              const TypeIcon = getTypeIcon(project.type);
              const typeColor = getTypeColor(project.type);
              
              return (
                <motion.div
                  key={project.id}
                  className="group p-6 rounded-xl border cursor-pointer"
                  style={{
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  }}
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => setSelectedProject(project.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: typeColor + '20' }}
                    >
                      <TypeIcon size={24} style={{ color: typeColor }} />
                    </div>
                    
                    <div className="flex-1">
                      <h4
                        className="font-semibold mb-2"
                        style={{ color: theme.colors.text }}
                      >
                        {project.title}
                      </h4>
                      <p
                        className="text-sm mb-3"
                        style={{ color: theme.colors.textSecondary }}
                      >
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded text-xs"
                            style={{
                              backgroundColor: theme.colors.border,
                              color: theme.colors.textSecondary,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border"
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              {(() => {
                const project = projects.find(p => p.id === selectedProject);
                if (!project) return null;
                
                const TypeIcon = getTypeIcon(project.type);
                const typeColor = getTypeColor(project.type);
                
                return (
                  <>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors"
                    >
                      <X size={20} />
                    </button>
                    
                    <div className="relative h-64 overflow-hidden rounded-t-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(45deg, ${typeColor}40, transparent)`,
                        }}
                      />
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: typeColor + '20' }}
                        >
                          <TypeIcon size={24} style={{ color: typeColor }} />
                        </div>
                        <div>
                          <h3
                            className="text-2xl font-bold"
                            style={{ color: theme.colors.text }}
                          >
                            {project.title}
                          </h3>
                          <span
                            className="text-sm font-medium"
                            style={{ color: typeColor }}
                          >
                            {project.type}
                          </span>
                        </div>
                      </div>
                      
                      <p
                        className="text-lg mb-6"
                        style={{ color: theme.colors.textSecondary }}
                      >
                        {project.description}
                      </p>
                      
                      <div className="mb-6">
                        <h4
                          className="font-semibold mb-3"
                          style={{ color: theme.colors.text }}
                        >
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-full text-sm font-medium"
                              style={{
                                backgroundColor: typeColor + '20',
                                color: typeColor,
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-6 py-3 rounded-lg border font-medium"
                          style={{
                            borderColor: theme.colors.border,
                            color: theme.colors.text,
                          }}
                          whileHover={{
                            backgroundColor: theme.colors.primary,
                            color: '#ffffff',
                          }}
                        >
                          <Github size={20} className="mr-2" />
                          View on GitHub
                        </motion.a>
                        {project.demo && (
                          <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-6 py-3 rounded-lg font-medium text-white"
                            style={{ backgroundColor: typeColor }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <ExternalLink size={20} className="mr-2" />
                            Live Demo
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectsPage;