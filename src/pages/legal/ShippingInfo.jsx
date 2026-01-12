import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import MyContainer from '../../components/container/MyContainer';
import { motion } from 'framer-motion';
import { Truck, MapPin, Clock, Package, Shield, Headphones } from 'lucide-react';
import { Link } from 'react-router';

const ShippingInfo = () => {
  const { isDark } = useTheme();

  const sections = [
    {
      id: 'service-delivery',
      title: 'Service Delivery Areas',
      icon: MapPin,
      content: [
        'We provide smart home and ceremony decoration services within 50 miles of major cities',
        'Same-day service available within 15 miles for urgent requests (additional fees apply)',
        'Extended service areas available with advance booking and travel fees',
        'Rural and remote locations require minimum 48-hour advance notice',
        'International services available for destination events (custom quotes provided)'
      ]
    },
    {
      id: 'equipment-delivery',
      title: 'Equipment and Material Delivery',
      icon: Package,
      content: [
        'All decoration materials and smart home equipment included in service packages',
        'Delivery and setup included in all service bookings at no extra charge',
        'Specialized equipment (projectors, sound systems) delivered day of event',
        'Smart home devices shipped directly to your location for pre-installation review',
        'Backup equipment always available on-site for critical installations'
      ]
    },
    {
      id: 'scheduling-timeline',
      title: 'Scheduling and Timeline',
      icon: Clock,
      content: [
        'Standard booking requires 7-14 days advance notice for optimal scheduling',
        'Rush services (24-48 hours) available with 50% surcharge',
        'Peak season (holidays, wedding season) requires 3-4 weeks advance booking',
        'Setup begins 2-4 hours before event start time depending on complexity',
        'Smart home installations typically require 1-3 days depending on scope'
      ]
    },
    {
      id: 'delivery-process',
      title: 'Delivery and Setup Process',
      icon: Truck,
      content: [
        'Professional team arrives with all necessary equipment and materials',
        'Pre-delivery site inspection for complex installations (included in service)',
        'Real-time updates provided throughout delivery and setup process',
        'Quality check and client walkthrough before event or final handover',
        'Post-event breakdown and cleanup included in all ceremony services'
      ]
    },
    {
      id: 'service-guarantee',
      title: 'Service Guarantee',
      icon: Shield,
      content: [
        'On-time delivery guarantee - we arrive when promised or service is discounted',
        'Complete setup guarantee - everything ready before your event starts',
        'Quality assurance - all equipment tested and verified before client handover',
        'Damage protection - we carry insurance for all equipment and installations',
        'Satisfaction guarantee - we make it right or provide full refund'
      ]
    },
    {
      id: 'support-contact',
      title: 'Delivery Support',
      icon: Headphones,
      content: [
        'Dedicated delivery coordinator assigned to each booking',
        'Real-time tracking and updates via SMS and email notifications',
        '24/7 emergency support during active service periods',
        'Direct contact with setup team lead for immediate assistance',
        'Post-delivery support for smart home systems and troubleshooting'
      ]
    }
  ];

  const deliveryZones = [
    {
      zone: 'Zone 1 (0-15 miles)',
      time: 'Same Day Available',
      fee: 'Included',
      description: 'Priority service area with fastest response times'
    },
    {
      zone: 'Zone 2 (15-30 miles)',
      time: '24-48 Hours',
      fee: '$50 Travel Fee',
      description: 'Standard service area with next-day availability'
    },
    {
      zone: 'Zone 3 (30-50 miles)',
      time: '48-72 Hours',
      fee: '$100 Travel Fee',
      description: 'Extended service area requiring advance planning'
    },
    {
      zone: 'Zone 4 (50+ miles)',
      time: 'Custom Quote',
      fee: 'Custom Pricing',
      description: 'Special arrangements for distant locations'
    }
  ];

  return (
    <div className={` min-h-screen transition-all duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Hero Banner */}
      <div className="relative h-80 lg:h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://media.istockphoto.com/id/1414981067/photo/young-man-repairing-cable-wiring-and-installs-or-replaces-the-halogen-lamp-on-the-ceiling.jpg?s=612x612&w=0&k=20&c=ggr-_jkpLsGHKUgVPfpHiLe2xCKwcaS7X7mUvzutXto=')`
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
             
                <h1 className="text-4xl lg:text-6xl font-bold text-white">
                  Service Delivery
                </h1>
              </div>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Professional delivery and setup for all smart home and ceremony decoration services.
              </p>
              <div className="flex items-center justify-center gap-2 text-white/60 mt-4">
                <Link to='/'>
                  <span>Home</span>
                </Link>
                <span>›</span>
                <span>Service Delivery</span>
              </div>
            </motion.div>
          </MyContainer>
        </div>
      </div>

      {/* Content */}
      <div className="py-20">
        <MyContainer className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`text-center mb-12 p-6 rounded-xl ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}
            >
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                We provide comprehensive delivery and setup services for all our smart home automation 
                and ceremony decoration packages. Our professional team ensures everything is delivered 
                on time and set up perfectly for your event or installation.
              </p>
            </motion.div>

            {/* Delivery Zones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-16"
            >
              <h2 className={`text-3xl font-bold text-center mb-8 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Service Delivery Zones
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {deliveryZones.map((zone, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl shadow-lg text-center ${
                      isDark ? 'bg-gray-800' : 'bg-white'
                    }`}
                  >
                    <h3 className={`text-lg font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {zone.zone}
                    </h3>
                    <div className="space-y-2">
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Delivery Time
                      </p>
                      <p className="text-[#af5f44] font-semibold">{zone.time}</p>
                      
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Travel Fee
                      </p>
                      <p className="text-[#af5f44] font-semibold">{zone.fee}</p>
                      
                      <p className={`text-xs mt-3 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {zone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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
                    transition={{ delay: (index + 4) * 0.1, duration: 0.6 }}
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
              transition={{ delay: 1, duration: 0.6 }}
              className={`mt-12 p-8 rounded-xl text-center ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}
            >
              <h3 className={`text-2xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Need Delivery Information?
              </h3>
              <p className={`text-lg mb-6 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Contact us to discuss your specific delivery needs and get a customized quote 
                for your smart home or ceremony decoration project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="px-8 py-4 bg-[#af5f44] text-white rounded-full font-semibold hover:bg-[#8d4d36] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Get Quote
                </button>
                <button
                  onClick={() => window.location.href = '/services'}
                  className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
                    isDark
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  View Services
                </button>
              </div>
            </motion.div>
          </div>
        </MyContainer>
      </div>
    </div>
  );
};

export default ShippingInfo;