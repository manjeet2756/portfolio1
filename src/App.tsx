import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import ThemeSwitcher from './components/ThemeSwitcher';
import AIAssistant from './components/AIAssistant';
import FloatingContact from './components/FloatingContact';
import VerticalNavigation from './components/VerticalNavigation';
import HomePage from './components/sections/HomePage';
import AboutPage from './components/sections/AboutPage';
import SkillsPage from './components/sections/SkillsPage';
import ProjectsPage from './components/sections/ProjectsPage';
import AchievementsPage from './components/sections/AchievementsPage';
import ResumePage from './components/sections/ResumePage';
import BlogPage from './components/sections/BlogPage';
import ContactPage from './components/sections/ContactPage';

// Import Google Fonts
const googleFontsUrl = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Orbitron:wght@300;400;500;600;700;800;900&display=swap';

const AppContent: React.FC = () => {
  const { theme, currentTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setCurrentSection(sectionId);
  };

  // Intersection Observer for section detection
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'resume', 'blog', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                setCurrentSection(sectionId);
              }
            });
          },
          { threshold: 0.5 }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [isLoading]);

  useEffect(() => {
    // Apply theme-specific font to body
    document.body.style.fontFamily = `${theme.font}, sans-serif`;
    document.body.style.backgroundColor = theme.colors.background;
    document.body.style.color = theme.colors.text;
  }, [theme]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Manjeet Kumar - AI DevOps Portfolio</title>
        <meta name="description" content="Manjeet Kumar - AI DevOps + Cloud Engineer | Generative AIops Engineer | Fullstack Engineer" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href={googleFontsUrl} rel="stylesheet" />
        <style>
          {`
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: ${theme.font}, sans-serif;
              background-color: ${theme.colors.background};
              color: ${theme.colors.text};
              overflow-x: hidden;
              transition: all 0.3s ease;
            }
            
            /* Custom scrollbar for ${currentTheme} theme */
            ::-webkit-scrollbar {
              width: 8px;
            }
            
            ::-webkit-scrollbar-track {
              background: ${theme.colors.surface};
            }
            
            ::-webkit-scrollbar-thumb {
              background: ${theme.colors.primary};
              border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: ${theme.colors.secondary};
            }
            
            /* Theme-specific cursor effects */
            .cursor-pointer {
              cursor: pointer;
            }
            
            /* Smooth transitions for theme changes */
            * {
              transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
            }
          `}
        </style>
      </Helmet>

      <div className="relative min-h-screen">
        <AnimatePresence>
          {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
        </AnimatePresence>

        {!isLoading && (
          <>
            <Navigation currentSection={currentSection} onSectionChange={scrollToSection} />
            <VerticalNavigation currentSection={currentSection} onSectionChange={scrollToSection} />
            <ThemeSwitcher />
            <AIAssistant />
            <FloatingContact />
            
            <main className="relative">
              {/* Home Section */}
              <section id="home" className="min-h-screen">
                <HomePage onSectionChange={scrollToSection} />
              </section>

              {/* About Section */}
              <section id="about" className="min-h-screen">
                <AboutPage />
              </section>

              {/* Skills Section */}
              <section id="skills" className="min-h-screen">
                <SkillsPage />
              </section>

              {/* Projects Section */}
              <section id="projects" className="min-h-screen">
                <ProjectsPage />
              </section>

              {/* Achievements Section */}
              <section id="achievements" className="min-h-screen">
                <AchievementsPage />
              </section>

              {/* Resume Section */}
              <section id="resume" className="min-h-screen">
                <ResumePage />
              </section>

              {/* Blog Section */}
              <section id="blog" className="min-h-screen">
                <BlogPage />
              </section>

              {/* Contact Section */}
              <section id="contact" className="min-h-screen">
                <ContactPage />
              </section>
            </main>
          </>
        )}
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;