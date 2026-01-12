import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import MyContainer from '../../components/container/MyContainer';
import { ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const { isDark } = useTheme();
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqSections = [
    {
      id: 'smart-home-services',
      title: 'About Smart Home & Ceremony Decoration Services!',
      image: 'https://images.unsplash.com/photo-1475783006851-1d68dd683eff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGxpZ2h0aW5nfGVufDB8fDB8fHww',
      questions: [
        {
          id: 'service-types',
          question: 'What Types Of Smart Home And Ceremony Decoration Services Do You Offer?',
          answer: 'We specialize in smart home automation, wedding decorations, birthday parties, corporate events, anniversary celebrations, and festival decorations with modern technology integration.',
          isHighlighted: true
        },
        {
          id: 'customize-decoration',
          question: 'Can I Customize Decoration According To My Event Theme?',
          answer: 'Absolutely! We work closely with you to understand your event theme, preferences, and budget to create personalized decorations that perfectly match your vision and celebration style.'
        },
        {
          id: 'smart-home-setup',
          question: 'What Smart Home Technologies Do You Install?',
          answer: 'We install smart lighting systems, automated curtains, smart speakers, security cameras, smart thermostats, voice control systems, and integrated home automation solutions.'
        },
        {
          id: 'decoration-consultation',
          question: 'Do You Provide Free Decoration Consultations?',
          answer: 'Yes, we provide free initial consultations for all ceremony decorations including venue assessment, theme discussions, budget planning, and detailed decoration proposals.'
        }
      ]
    },
    {
      id: 'booking-policies',
      title: 'Booking Agreement & Policies',
      image: 'https://images.unsplash.com/photo-1560117531-02eeab8e3593?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2VkZGluZyUyMGRlY29yYXRpb258ZW58MHx8MHx8fDA%3D',
      questions: [
        {
          id: 'payment-terms',
          question: 'What Are The Payment Terms And Cancellation Policies?',
          answer: 'We require 30% advance payment for booking confirmation. Flexible payment plans available. Cancellations 7+ days prior get full refund, 3-7 days get 50% refund.',
          isHighlighted: true
        },
        {
          id: 'service-agreement',
          question: 'What Does The Service Agreement Include?',
          answer: 'Our agreement includes detailed service scope, decoration items list, setup timeline, payment schedule, venue requirements, and terms for changes or additional services.'
        },
        {
          id: 'service-modifications',
          question: 'Can I Modify My Decoration Package After Booking?',
          answer: 'Yes, modifications can be made up to 48 hours before the event. Additional charges may apply for upgraded items or extended services based on availability.'
        }
      ]
    },
    {
      id: 'service-guide',
      title: 'Smart Home & Ceremony Service Guide',
      image: 'https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZSUyMGxpZ2h0aW5nfGVufDB8fDB8fHww',
      questions: [
        {
          id: 'service-process',
          question: 'What Is Your Service Process For Events?',
          answer: 'Our process includes initial consultation, venue visit, theme planning, decoration design, equipment setup, event execution, and post-event cleanup with quality assurance.'
        },
        {
          id: 'setup-timeline',
          question: 'How Long Does Decoration Setup Take?',
          answer: 'Setup time varies by event size. Small parties take 2-4 hours, medium events 4-8 hours, and large ceremonies 8-12 hours. We arrive early to ensure everything is perfect.'
        },
        {
          id: 'smart-home-installation',
          question: 'How Long Does Smart Home Installation Take?',
          answer: 'Smart home installations typically take 1-3 days depending on the complexity. Basic setups (lighting, speakers) take 4-6 hours, while full automation systems take 2-3 days.'
        },
        {
          id: 'equipment-maintenance',
          question: 'Do You Provide Equipment Maintenance And Support?',
          answer: 'Yes, we provide 1-year warranty on smart home installations and 24/7 technical support. For ceremony equipment, we handle all setup, operation, and breakdown.'
        }
      ]
    },
    {
      id: 'general-info',
      title: 'General Information',
      image: 'https://media.istockphoto.com/id/2252644946/photo/attractive-smiling-woman-changing-a-light-bulb-in-her-home-to-a-energy-efficient-led-bulb-as.jpg?s=612x612&w=0&k=20&c=uF3CunsiVsta8i8vq5LviJwG2QvKu2_9qUl8haiYNqI=',
      questions: [
        {
          id: 'service-areas',
          question: 'What Areas Do You Cover For Services?',
          answer: 'We provide smart home and ceremony decoration services across major cities and surrounding areas. Contact us to confirm service availability in your specific location.'
        },
        {
          id: 'budget-range',
          question: 'What Is The Typical Budget Range For Your Services?',
          answer: 'Ceremony decorations start from $200 for small parties to $5,000+ for grand weddings. Smart home setups range from $500 for basic automation to $10,000+ for complete systems.'
        },
        {
          id: 'emergency-services',
          question: 'Do You Provide Last-Minute Or Emergency Services?',
          answer: 'Yes, we offer emergency decoration services for urgent events with 24-48 hours notice. Additional charges apply for expedited services and same-day bookings.'
        },
        {
          id: 'package-deals',
          question: 'Do You Offer Package Deals For Multiple Services?',
          answer: 'Yes, we offer attractive package deals combining smart home installation with ceremony decorations, or multiple event bookings with significant discounts and added benefits.'
        }
      ]
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Hero Banner */}
      <div className="relative h-80 lg:h-96 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80')`
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <MyContainer className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                FAQ
              </h1>
              <div className="flex items-center justify-center gap-2 text-white/80">
                <span>Home</span>
                <span>›</span>
                <span>FAQ</span>
              </div>
            </motion.div>
          </MyContainer>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="py-20">
        <MyContainer className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {faqSections.map((section, sectionIndex) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.2, duration: 0.6 }}
                className="mb-16"
              >
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Left Side - Title and Image (for sections with images) */}
                  <div className="space-y-6">
                    <div>
                      <p className={`text-sm uppercase tracking-wider mb-2 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        FREQUENTLY ASKED QUESTIONS
                      </p>
                      <h2 className={`text-3xl lg:text-4xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {section.title}
                      </h2>
                    </div>
                    
                    {section.image && (
                      <div className="rounded-2xl overflow-hidden shadow-xl">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-80 object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Right Side - FAQ Items */}
                  <div className="space-y-4">
                    {section.questions.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (sectionIndex * 0.2) + (index * 0.1), duration: 0.4 }}
                        className={`rounded-lg border transition-all duration-300 ${
                          item.isHighlighted
                            ? isDark
                              ? 'bg-gray-800 border-[#af5f44]/30'
                              : 'bg-[#af5f44]/5 border-[#af5f44]/20'
                            : isDark
                              ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                              : 'bg-white border-gray-200 hover:border-gray-300'
                        } hover:shadow-lg`}
                      >
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="w-full p-6 text-left flex items-center justify-between group"
                        >
                          <span className={`font-semibold text-lg pr-4 ${
                            item.isHighlighted
                              ? 'text-[#af5f44]'
                              : isDark
                                ? 'text-white group-hover:text-[#af5f44]'
                                : 'text-gray-900 group-hover:text-[#af5f44]'
                          } transition-colors duration-200`}>
                            {item.question}
                          </span>
                          <div className={`shrink-0 transition-all duration-200 ${
                            item.isHighlighted
                              ? 'text-[#af5f44]'
                              : isDark
                                ? 'text-gray-400 group-hover:text-[#af5f44]'
                                : 'text-gray-500 group-hover:text-[#af5f44]'
                          }`}>
                            {openItems[item.id] ? (
                              <Minus className="w-5 h-5" />
                            ) : (
                              <Plus className="w-5 h-5" />
                            )}
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {openItems[item.id] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6">
                                <p className={`text-base leading-relaxed ${
                                  isDark ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                  {item.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className={`text-center mt-20 p-12 rounded-2xl ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-xl`}
          >
            <h3 className={`text-3xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Still Have Questions?
            </h3>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Can't find the answer you're looking for? Our friendly customer support team is here to help you with any questions about our smart home automation and ceremony decoration services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/contact'}
                className="px-8 py-4 bg-[#af5f44] text-white rounded-full font-semibold hover:bg-[#8d4d36] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Contact Support
              </button>
              <button
                onClick={() => window.location.href = '/services'}
                className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
                  isDark
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                View Our Services
              </button>
            </div>
          </motion.div>
        </MyContainer>
      </div>
    </div>
  );
};

export default FAQ;