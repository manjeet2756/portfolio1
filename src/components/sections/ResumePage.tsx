import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Eye, RotateCcw, ZoomIn, ZoomOut, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { experiences, achievements, skills } from '../../data/portfolio';

const ResumePage: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const resumeData = {
    personalInfo: {
      name: 'Manjeet Kumar',
      title: 'AI DevOps + Cloud Engineer',
      email: 'mkdas62999@gmail.com',
      phone: '+91 8757119995',
      location: 'Jaipur, Rajasthan',
      linkedin: 'linkedin.com/in/manjeet-kumar-8b3657343',
      github: 'github.com/manjeet2756',
    },
    summary: 'Passionate AI DevOps Engineer with expertise in Cloud technologies, Generative AI, and Full-stack development. Currently pursuing BCA at Jagannath University with hands-on experience from LinuxWorld Informatics internship.',
    education: [
      {
        degree: 'Bachelor of Computer Applications (BCA)',
        institution: 'Jagannath University',
        year: '2022-2025',
        status: 'Final Year',
      },
    ],
  };

  const handleDownload = () => {
    // Placeholder for PDF download functionality
    alert('Resume download will be available once PDF is uploaded');
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
            Resume
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: theme.gradients.primary }}
          />
        </motion.div>

        {/* View Controls */}
        <motion.div
          className="flex justify-center space-x-4 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            onClick={() => setViewMode('2d')}
            className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 ${
              viewMode === '2d' ? 'text-white' : ''
            }`}
            style={{
              backgroundColor: viewMode === '2d' ? theme.colors.primary : theme.colors.surface,
              color: viewMode === '2d' ? '#ffffff' : theme.colors.text,
              border: `1px solid ${theme.colors.border}`,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye size={20} />
            <span>2D View</span>
          </motion.button>
          
          <motion.button
            onClick={() => setViewMode('3d')}
            className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 ${
              viewMode === '3d' ? 'text-white' : ''
            }`}
            style={{
              backgroundColor: viewMode === '3d' ? theme.colors.primary : theme.colors.surface,
              color: viewMode === '3d' ? '#ffffff' : theme.colors.text,
              border: `1px solid ${theme.colors.border}`,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={20} />
            <span>3D View</span>
          </motion.button>
          
          <motion.button
            onClick={handleDownload}
            className="px-6 py-3 rounded-lg font-medium flex items-center space-x-2 text-white"
            style={{ background: theme.gradients.primary }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={20} />
            <span>Download PDF</span>
          </motion.button>
        </motion.div>

        {/* Resume Content */}
        <AnimatePresence mode="wait">
          {viewMode === '2d' ? (
            <motion.div
              key="2d-view"
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div
                className="bg-white text-black p-8 rounded-lg shadow-2xl"
                style={{ minHeight: '800px' }}
              >
                {/* Header */}
                <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    {resumeData.personalInfo.name}
                  </h1>
                  <h2 className="text-xl text-blue-600 mb-4">
                    {resumeData.personalInfo.title}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    <span>{resumeData.personalInfo.email}</span>
                    <span>{resumeData.personalInfo.phone}</span>
                    <span>{resumeData.personalInfo.location}</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                    PROFESSIONAL SUMMARY
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {resumeData.summary}
                  </p>
                </div>

                {/* Education */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                    EDUCATION
                  </h3>
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                          <p className="text-gray-600">{edu.institution}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600">{edu.year}</p>
                          <p className="text-blue-600 font-medium">{edu.status}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                    EXPERIENCE
                  </h3>
                  {experiences.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-800">{exp.role}</h4>
                          <p className="text-blue-600">{exp.company}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600">{exp.duration}</p>
                          <p className="text-gray-500 text-sm">{exp.location}</p>
                        </div>
                      </div>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                    TECHNICAL SKILLS
                  </h3>
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category} className="mb-3">
                      <h4 className="font-semibold text-gray-800 mb-1">{category}:</h4>
                      <p className="text-gray-700">{skillList.join(', ')}</p>
                    </div>
                  ))}
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                    ACHIEVEMENTS
                  </h3>
                  {achievements.map((achievement, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                        <span className="text-gray-600 text-sm">{achievement.year}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="3d-view"
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="relative"
                animate={{
                  rotateY: [0, 5, -5, 0],
                  rotateX: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="bg-white text-black p-8 rounded-lg shadow-2xl"
                  style={{
                    minHeight: '800px',
                    transform: 'translateZ(20px)',
                    boxShadow: `0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px ${theme.colors.primary}40`,
                  }}
                >
                  {/* Same content as 2D view but with 3D styling */}
                  <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                    <motion.h1
                      className="text-4xl font-bold text-gray-800 mb-2"
                      style={{ transform: 'translateZ(10px)' }}
                    >
                      {resumeData.personalInfo.name}
                    </motion.h1>
                    <motion.h2
                      className="text-xl text-blue-600 mb-4"
                      style={{ transform: 'translateZ(8px)' }}
                    >
                      {resumeData.personalInfo.title}
                    </motion.h2>
                    <motion.div
                      className="flex flex-wrap justify-center gap-4 text-sm text-gray-600"
                      style={{ transform: 'translateZ(6px)' }}
                    >
                      <span>{resumeData.personalInfo.email}</span>
                      <span>{resumeData.personalInfo.phone}</span>
                      <span>{resumeData.personalInfo.location}</span>
                    </motion.div>
                  </div>

                  {/* Rest of the content with subtle 3D transforms */}
                  <motion.div style={{ transform: 'translateZ(4px)' }}>
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                        PROFESSIONAL SUMMARY
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {resumeData.summary}
                      </p>
                    </div>

                    {/* Education, Experience, Skills, and Achievements sections */}
                    {/* (Same content as 2D view) */}
                  </motion.div>
                </div>

                {/* 3D Shadow/Depth effect */}
                <div
                  className="absolute inset-0 bg-gray-400 rounded-lg"
                  style={{
                    transform: 'translateZ(-20px) translateX(10px) translateY(10px)',
                    opacity: 0.3,
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fullscreen Button */}
        <motion.button
          onClick={() => setIsFullscreen(true)}
          className="fixed bottom-8 right-8 p-4 rounded-full shadow-lg"
          style={{
            backgroundColor: theme.colors.primary,
            color: '#ffffff',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ZoomIn size={24} />
        </motion.button>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="w-full max-w-6xl max-h-[90vh] overflow-auto">
              {/* Resume content in fullscreen */}
              <div className="bg-white text-black p-12 rounded-lg">
                {/* Same resume content but larger */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ResumePage;