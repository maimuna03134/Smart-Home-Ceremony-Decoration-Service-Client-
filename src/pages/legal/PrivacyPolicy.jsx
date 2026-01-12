import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import MyContainer from '../../components/container/MyContainer';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, UserCheck, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  const { isDark } = useTheme();

  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: [
        'Personal information you provide when booking our services (name, email, phone, address)',
        'Event details and preferences for smart home and ceremony decoration services',
        'Payment information processed securely through our payment partners',
        'Communication records when you contact our customer support',
        'Website usage data and analytics to improve our services'
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: UserCheck,
      content: [
        'Provide and deliver smart home automation and ceremony decoration services',
        'Process payments and manage your bookings and appointments',
        'Communicate with you about your services, updates, and support',
        'Improve our services based on your feedback and usage patterns',
        'Send promotional offers and updates (with your consent)',
        'Comply with legal obligations and protect our business interests'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: Eye,
      content: [
        'We do not sell, trade, or rent your personal information to third parties',
        'Service providers and contractors who help deliver our services',
        'Payment processors for secure transaction handling',
        'Legal authorities when required by law or to protect our rights',
        'Business partners only with your explicit consent for specific services'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: [
        'Industry-standard encryption for all data transmission and storage',
        'Secure servers with regular security updates and monitoring',
        'Limited access to personal information on a need-to-know basis',
        'Regular security audits and vulnerability assessments',
        'Immediate notification procedures in case of any data breaches'
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      icon: Shield,
      content: [
        'Access and review your personal information we have collected',
        'Request corrections to any inaccurate or incomplete information',
        'Request deletion of your personal information (subject to legal requirements)',
        'Opt-out of marketing communications at any time',
        'Data portability - receive your information in a structured format',
        'Lodge complaints with relevant data protection authorities'
      ]
    },
    {
      id: 'contact-privacy',
      title: 'Privacy Contact',
      icon: Mail,
      content: [
        'For privacy-related questions or concerns, contact us at privacy@smartdecor.com',
        'Data Protection Officer: Available Monday-Friday, 9 AM - 6 PM',
        'Response time: We respond to privacy inquiries within 48 hours',
        'Mailing address: Smart Home & Ceremony Decoration Services, Privacy Department',
        'Phone: +1 (555) 123-PRIVACY for urgent privacy matters'
      ]
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Hero Banner */}
      <div className="relative h-80 lg:h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <MyContainer className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-12 h-12 text-[#af5f44] mr-4" />
                <h1 className="text-4xl lg:text-6xl font-bold text-white">
                  Privacy Policy
                </h1>
              </div>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Your privacy is important to us. Learn how we collect, use, and protect your information.
              </p>
              <div className="flex items-center justify-center gap-2 text-white/60 mt-4">
                <span>Home</span>
                <span>›</span>
                <span>Privacy Policy</span>
              </div>
            </motion.div>
          </MyContainer>
        </div>
      </div>

      {/* Content */}
      <div className="py-20">
        <MyContainer className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Last Updated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`text-center mb-12 p-6 rounded-xl ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}
            >
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Last Updated: January 12, 2026
              </p>
              <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                This Privacy Policy explains how Smart Home & Ceremony Decoration Services collects, 
                uses, and protects your personal information when you use our services.
              </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className={`p-8 rounded-xl shadow-lg ${
                      isDark ? 'bg-gray-800' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-[#af5f44]/10 rounded-lg flex items-center justify-center mr-4">
                        <Icon className="w-6 h-6 text-[#af5f44]" />
                      </div>
                      <h2 className={`text-2xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {section.title}
                      </h2>
                    </div>
                    
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-[#af5f44] rounded-full mt-2 mr-3 shrink-0" />
                          <span className={`${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                          } leading-relaxed`}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className={`mt-12 p-8 rounded-xl text-center ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}
            >
              <h3 className={`text-2xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Questions About Your Privacy?
              </h3>
              <p className={`text-lg mb-6 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                If you have any questions about this Privacy Policy or how we handle your data, 
                please don't hesitate to contact us.
              </p>
              <button
                onClick={() => window.location.href = '/contact'}
                className="px-8 py-4 bg-[#af5f44] text-white rounded-full font-semibold hover:bg-[#8d4d36] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Contact Us
              </button>
            </motion.div>
          </div>
        </MyContainer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;