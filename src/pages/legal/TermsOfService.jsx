import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import MyContainer from '../../components/container/MyContainer';
import { motion } from 'framer-motion';
import { FileText, Handshake, AlertTriangle, CreditCard, Calendar, Phone } from 'lucide-react';
import { Link } from 'react-router';

const TermsOfService = () => {
  const { isDark } = useTheme();

  const sections = [
    {
      id: 'service-agreement',
      title: 'Service Agreement',
      icon: Handshake,
      content: [
        'By booking our smart home automation or ceremony decoration services, you agree to these terms',
        'Services include consultation, design, installation, setup, and post-service support',
        'All services are provided by licensed and insured professionals',
        'Service availability may vary by location and seasonal demand',
        'We reserve the right to refuse service for safety or legal reasons'
      ]
    },
    {
      id: 'booking-payment',
      title: 'Booking and Payment Terms',
      icon: CreditCard,
      content: [
        'A 30% deposit is required to confirm your booking and secure your date',
        'Full payment is due upon completion of services unless other arrangements are made',
        'We accept major credit cards, bank transfers, and approved payment methods',
        'Late payment fees may apply for overdue accounts (2% per month)',
        'Refunds are processed according to our cancellation policy outlined below'
      ]
    },
    {
      id: 'cancellation-policy',
      title: 'Cancellation and Rescheduling',
      icon: Calendar,
      content: [
        'Cancellations 7+ days before service date: Full refund minus 10% processing fee',
        'Cancellations 3-7 days before: 50% refund of total amount paid',
        'Cancellations less than 3 days: No refund, but credit toward future services',
        'Rescheduling is allowed up to 48 hours before service date at no charge',
        'Weather-related cancellations for outdoor events are handled case-by-case'
      ]
    },
    {
      id: 'liability-warranty',
      title: 'Liability and Warranty',
      icon: AlertTriangle,
      content: [
        'We carry comprehensive liability insurance for all our services and installations',
        'Smart home installations come with a 1-year warranty on workmanship',
        'Decoration services include setup, event support, and breakdown/cleanup',
        'Client is responsible for venue access and basic utilities (power, water)',
        'We are not liable for damages due to misuse, natural disasters, or third-party actions'
      ]
    },
    {
      id: 'client-responsibilities',
      title: 'Client Responsibilities',
      icon: FileText,
      content: [
        'Provide accurate venue information, access details, and event requirements',
        'Ensure venue has necessary permits and meets safety requirements',
        'Notify us of any changes to event details at least 48 hours in advance',
        'Provide safe working conditions and access to necessary utilities',
        'Respect our staff and maintain a professional working environment'
      ]
    },
    {
      id: 'contact-support',
      title: 'Support and Contact',
      icon: Phone,
      content: [
        'Customer support available Monday-Friday 9 AM - 6 PM, weekends by appointment',
        'Emergency support for smart home systems available 24/7',
        'All service requests and changes must be submitted in writing (email/text)',
        'Response time: We respond to inquiries within 4 business hours',
        'For urgent matters during events, use our emergency hotline: +1 (555) 123-EVENT'
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
            backgroundImage: `url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29udGFjdCUyMHVzfGVufDB8fDB8fHww')`
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
                <FileText className="w-12 h-12 text-[#af5f44] mr-4" />
                <h1 className="text-4xl lg:text-6xl font-bold text-white">
                  Terms of Service
                </h1>
              </div>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Clear terms and conditions for our smart home and ceremony decoration services.
              </p>
              <div className="flex items-center justify-center gap-2 text-white/60 mt-4">
                <Link to='/'>
                  <span>Home</span>
                </Link>
                <span>›</span>
                <span>Terms of Service</span>
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
                Effective Date: January 12, 2026
              </p>
              <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                These Terms of Service govern your use of our smart home automation and ceremony 
                decoration services. Please read them carefully before booking our services.
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

            {/* Agreement Section */}
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
                Agreement to Terms
              </h3>
              <p className={`text-lg mb-6 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                By using our services, you acknowledge that you have read, understood, and agree 
                to be bound by these Terms of Service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '/services'}
                  className="px-8 py-4 bg-[#af5f44] text-white rounded-full font-semibold hover:bg-[#8d4d36] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  View Our Services
                </button>
                <button
                  onClick={() => window.location.href = '/contact'}
                  className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
                    isDark
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          </div>
        </MyContainer>
      </div>
    </div>
  );
};

export default TermsOfService;