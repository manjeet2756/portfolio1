import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mail, 
  Phone, 
  MessageCircle, 
  Linkedin, 
  Github, 
  MapPin,
  CheckCircle,
  User,
  MessageSquare
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { socialLinks } from '../../data/portfolio';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactPage: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: socialLinks.email,
      href: `mailto:${socialLinks.email}`,
      color: '#ea4335',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: socialLinks.phone,
      href: `tel:+91${socialLinks.phone}`,
      color: '#34a853',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: socialLinks.phone,
      href: socialLinks.whatsapp,
      color: '#25d366',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'manjeet-kumar',
      href: socialLinks.linkedin,
      color: '#0077b5',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'manjeet2756',
      href: socialLinks.github,
      color: '#333333',
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 2000);
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
            {t('getInTouch')}
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: theme.gradients.primary }}
          />
          <p
            className="mt-6 text-lg max-w-2xl mx-auto"
            style={{ color: theme.colors.textSecondary }}
          >
            Let's discuss your next project or collaboration opportunity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div
              className="p-8 rounded-2xl border backdrop-blur-lg"
              style={{
                backgroundColor: theme.colors.surface + '90',
                borderColor: theme.colors.border,
              }}
            >
              <h3
                className="text-2xl font-bold mb-6"
                style={{ color: theme.colors.text }}
              >
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.colors.text }}
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <User
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      style={{ color: theme.colors.textSecondary }}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                        errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2'
                      }`}
                      style={{
                        backgroundColor: theme.colors.background,
                        borderColor: errors.name ? '#ef4444' : theme.colors.border,
                        color: theme.colors.text,
                        focusRingColor: errors.name ? '#ef4444' : theme.colors.primary,
                      }}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <motion.p
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.colors.text }}
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      style={{ color: theme.colors.textSecondary }}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2'
                      }`}
                      style={{
                        backgroundColor: theme.colors.background,
                        borderColor: errors.email ? '#ef4444' : theme.colors.border,
                        color: theme.colors.text,
                        focusRingColor: errors.email ? '#ef4444' : theme.colors.primary,
                      }}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.colors.text }}
                  >
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      style={{ color: theme.colors.textSecondary }}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2'
                      }`}
                      style={{
                        backgroundColor: theme.colors.background,
                        borderColor: errors.phone ? '#ef4444' : theme.colors.border,
                        color: theme.colors.text,
                        focusRingColor: errors.phone ? '#ef4444' : theme.colors.primary,
                      }}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone && (
                    <motion.p
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.colors.text }}
                  >
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare
                      size={20}
                      className="absolute left-3 top-3"
                      style={{ color: theme.colors.textSecondary }}
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none ${
                        errors.message ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2'
                      }`}
                      style={{
                        backgroundColor: theme.colors.background,
                        borderColor: errors.message ? '#ef4444' : theme.colors.border,
                        color: theme.colors.text,
                        focusRingColor: errors.message ? '#ef4444' : theme.colors.primary,
                      }}
                      placeholder="Tell me about your project or how I can help you..."
                    />
                  </div>
                  {errors.message && (
                    <motion.p
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-lg font-semibold text-white flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: theme.gradients.primary }}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </motion.div>
                    ) : isSubmitted ? (
                      <motion.div
                        key="success"
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <CheckCircle size={20} />
                        <span>Message Sent!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Send size={20} />
                        <span>{t('sendMessage')}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Profile Card */}
            <div
              className="p-6 rounded-2xl border text-center"
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              }}
            >
              <motion.div
                className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4"
                style={{ borderColor: theme.colors.primary }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="/WhatsApp Image 2025-07-07 at 18.04.05_ca234677.jpg"
                  alt="Manjeet Kumar"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: theme.colors.text }}
              >
                Manjeet Kumar
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: theme.colors.textSecondary }}
              >
                AI DevOps + Cloud Engineer
              </p>
              <div className="flex items-center justify-center text-sm" style={{ color: theme.colors.textSecondary }}>
                <MapPin size={14} className="mr-1" />
                Jaipur, Rajasthan
              </div>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-xl border group transition-all duration-300"
                  style={{
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: method.color + '10',
                    borderColor: method.color + '40',
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: method.color + '20' }}
                  >
                    <method.icon size={20} style={{ color: method.color }} />
                  </div>
                  <div className="flex-1">
                    <h4
                      className="font-semibold"
                      style={{ color: theme.colors.text }}
                    >
                      {method.label}
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {method.value}
                    </p>
                  </div>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </motion.a>
              ))}
            </div>

            {/* Quick Actions */}
            <div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              }}
            >
              <h4
                className="font-semibold mb-4"
                style={{ color: theme.colors.text }}
              >
                Quick Actions
              </h4>
              <div className="space-y-3">
                <motion.button
                  className="w-full py-2 px-4 rounded-lg border font-medium text-sm"
                  style={{
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  }}
                  whileHover={{
                    backgroundColor: theme.colors.primary,
                    color: '#ffffff',
                  }}
                >
                  Schedule a Call
                </motion.button>
                <motion.button
                  className="w-full py-2 px-4 rounded-lg border font-medium text-sm"
                  style={{
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  }}
                  whileHover={{
                    backgroundColor: theme.colors.primary,
                    color: '#ffffff',
                  }}
                >
                  Download Resume
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Success Confetti Animation */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              className="fixed inset-0 pointer-events-none z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][i % 5],
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{
                    scale: 0,
                    rotate: 0,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: 360,
                    y: [0, -100, 100],
                  }}
                  transition={{
                    duration: 3,
                    delay: Math.random() * 0.5,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ContactPage;