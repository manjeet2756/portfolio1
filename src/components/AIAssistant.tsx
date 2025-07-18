import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Volume2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m Maan, Manjeet\'s AI assistant. Ask me anything about his portfolio, skills, or projects!',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return 'You can view Manjeet\'s resume in both 2D and 3D formats! The resume includes his education (BCA Final Year at Jagannath University), experience at LinuxWorld, technical skills, and achievements. You can also download it as a PDF.';
    }
    
    if (lowerMessage.includes('blog') || lowerMessage.includes('article') || lowerMessage.includes('writing')) {
      return 'Manjeet writes technical articles on platforms like Hashnode, Dev.to, and Notion. His recent articles cover CI/CD pipelines with Jenkins & Kubernetes, integrating GenAI with DevOps workflows, and how Agentic AI is reshaping cloud monitoring.';
    }
    
    if (lowerMessage.includes('theme') || lowerMessage.includes('switch') || lowerMessage.includes('color')) {
      return 'You can switch between three amazing themes: Professional White (clean & corporate), Developer Black (terminal-style), and Neo Gradient (futuristic with purple/pink gradients). Just click the light bulb icon in the top-right corner!';
    }
    
    if (lowerMessage.includes('game') || lowerMessage.includes('play') || lowerMessage.includes('entertainment')) {
      return 'The interactive game feature will appear after 2 minutes of inactivity! It\'s designed to keep visitors engaged while exploring the portfolio. Stay tuned for some fun tech-themed games!';
    }
    
    if (lowerMessage.includes('skills') || lowerMessage.includes('technology')) {
      return 'Manjeet specializes in AI DevOps, Cloud Engineering, and Fullstack Development. His key technologies include Jenkins, Docker, Kubernetes, AWS, Python, React, and various AI/ML frameworks like TensorFlow and LangChain.';
    }
    
    if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
      return 'Manjeet has worked on several impressive projects including a CI&CT automation system, ML + DevOps pipeline, Agentic AIops system, Streamlit AI dashboard, AutoInfra Bot, and an accident response system that won 3rd place in an Inter-University Hackathon!';
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('internship')) {
      return 'Manjeet completed a 2-month Multi-Tech Internship at LinuxWorld Informatics Pvt Ltd in Jaipur, where he built multiple AI-integrated projects and gained hands-on experience in DevOps and Cloud technologies.';
    }
    
    if (lowerMessage.includes('education') || lowerMessage.includes('study')) {
      return 'Manjeet is currently in his final year of BCA at Jagannath University. He\'s also achieved recognition in various hackathons and sports competitions.';
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return 'You can reach Manjeet at mkdas62999@gmail.com or call/WhatsApp him at 8757119995. He\'s also active on LinkedIn, GitHub, and Telegram!';
    }
    
    if (lowerMessage.includes('achievement') || lowerMessage.includes('award')) {
      return 'Manjeet has achieved 2nd place in Jaipur Hackathon 2023, 3rd place in Inter-University Hackathon 2024, and is also a Volleyball Champion! He\'s passionate about both technology and sports.';
    }
    
    if (lowerMessage.includes('whatsapp') || lowerMessage.includes('telegram') || lowerMessage.includes('social')) {
      return 'You can reach Manjeet on WhatsApp at +91 8757119995, Telegram @manjeet_mjk, LinkedIn, or GitHub @manjeet2756. He\'s very responsive and loves connecting with fellow tech enthusiasts!';
    }
    
    return 'That\'s an interesting question! Manjeet is a passionate AI DevOps engineer with expertise in Cloud technologies and Fullstack development. Feel free to ask about his skills, projects, experience, or achievements!';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* AI Assistant Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-8 left-8 z-50 p-4 rounded-full backdrop-blur-lg border shadow-lg"
        style={{
          backgroundColor: theme.colors.surface + '90',
          borderColor: theme.colors.border,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [`0 0 0px ${theme.colors.primary}40`, `0 0 20px ${theme.colors.primary}40`, `0 0 0px ${theme.colors.primary}40`],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div className="flex items-center space-x-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{
              background: theme.gradients.primary,
              color: '#ffffff',
            }}
          >
            AI
          </div>
          <span style={{ color: theme.colors.text }} className="hidden md:block text-sm font-medium">
            Maan
          </span>
        </motion.div>
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Chat Window */}
            <motion.div
              className="relative w-full max-w-md h-[600px] rounded-2xl border shadow-2xl flex flex-col overflow-hidden"
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div
                className="p-4 border-b flex items-center justify-between"
                style={{
                  borderColor: theme.colors.border,
                  background: theme.gradients.primary,
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Maan</h3>
                    <p className="text-white/80 text-sm">{t('aiAssistant')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.isUser ? 'rounded-br-md' : 'rounded-bl-md'
                      }`}
                      style={{
                        backgroundColor: message.isUser 
                          ? theme.colors.primary 
                          : theme.colors.background,
                        color: message.isUser 
                          ? '#ffffff' 
                          : theme.colors.text,
                      }}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 opacity-70`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div
                      className="p-3 rounded-2xl rounded-bl-md"
                      style={{
                        backgroundColor: theme.colors.background,
                        color: theme.colors.text,
                      }}
                    >
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: theme.colors.primary }}
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div
                className="p-4 border-t"
                style={{ borderColor: theme.colors.border }}
              >
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t('askMaan')}
                    className="flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.border,
                      color: theme.colors.text,
                      focusRingColor: theme.colors.primary,
                    }}
                  />
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="p-3 rounded-xl disabled:opacity-50"
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: '#ffffff',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;