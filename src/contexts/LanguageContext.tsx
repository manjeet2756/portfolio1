import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    experience: 'Experience',
    contact: 'Contact',
    
    // Homepage
    roles: {
      devops: 'AI DevOps + Cloud Engineer',
      genai: 'Generative AIops Engineer',
      fullstack: 'Fullstack Engineer',
    },
    contactMe: 'Contact Me',
    viewResume: 'View Resume',
    
    // About
    aboutTitle: 'About Me',
    aboutDescription: 'Passionate AI DevOps Engineer with expertise in Cloud technologies, Generative AI, and Full-stack development.',
    education: 'BCA Final Year - Jagannath University',
    internship: 'Intern @LinuxWorld',
    traits: 'Enthusiastic, Passionate, Smartworker',
    
    // Skills
    devopsTab: 'DevOps',
    genaiTab: 'GenAIops',
    fullstackTab: 'Fullstack',
    cloudTab: 'Cloud',
    
    // Projects
    seeAllProjects: 'See All Projects',
    githubLink: 'GitHub',
    liveDemo: 'Live Demo',
    
    // Contact
    getInTouch: 'Get In Touch',
    sendMessage: 'Send Message',
    
    // AI Assistant
    aiAssistant: 'AI Assistant',
    askMaan: 'Ask Maan anything about Manjeet!',
  },
  hi: {
    // Navigation
    home: 'होम',
    about: 'के बारे में',
    skills: 'कौशल',
    projects: 'प्रोजेक्ट्स',
    experience: 'अनुभव',
    contact: 'संपर्क',
    
    // Homepage
    roles: {
      devops: 'AI DevOps + क्लाउड इंजीनियर',
      genai: 'जेनेरेटिव AIops इंजीनियर',
      fullstack: 'फुलस्टैक इंजीनियर',
    },
    contactMe: 'संपर्क करें',
    viewResume: 'रिज्यूमे देखें',
    
    // About
    aboutTitle: 'मेरे बारे में',
    aboutDescription: 'क्लाउड टेक्नोलॉजी, जेनेरेटिव AI, और फुल-स्टैक डेवलपमेंट में विशेषज्ञता रखने वाला उत्साही AI DevOps इंजीनियर।',
    education: 'BCA अंतिम वर्ष - जगन्नाथ विश्वविद्यालय',
    internship: 'इंटर्न @LinuxWorld',
    traits: 'उत्साही, जुनूनी, स्मार्टवर्कर',
    
    // Skills
    devopsTab: 'DevOps',
    genaiTab: 'GenAIops',
    fullstackTab: 'Fullstack',
    cloudTab: 'Cloud',
    
    // Projects
    seeAllProjects: 'सभी प्रोजेक्ट्स देखें',
    githubLink: 'GitHub',
    liveDemo: 'लाइव डेमो',
    
    // Contact
    getInTouch: 'संपर्क में रहें',
    sendMessage: 'संदेश भेजें',
    
    // AI Assistant
    aiAssistant: 'AI सहायक',
    askMaan: 'मंजीत के बारे में मान से कुछ भी पूछें!',
  },
};

interface LanguageContextType {
  currentLanguage: string;
  t: (key: string) => string;
  setLanguage: (lang: string) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('portfolio-language') || 'en';
    setCurrentLanguage(savedLang);
  }, []);

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('portfolio-language', lang);
  };

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage as keyof typeof translations];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      t,
      setLanguage,
      toggleLanguage,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};