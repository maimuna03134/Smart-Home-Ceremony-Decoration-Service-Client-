import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import MyContainer from '../../components/container/MyContainer';
import Button from '../shared/button/Button';
import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const { isDark } = useTheme();

  const pricingPlans = [
    {
      id: 1,
      name: "Basic Package",
      price: 299,
      period: "Event",
      image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvbWUlMjBsaWdodGluZ3xlbnwwfHwwfHx8MA%3D%3D",
      isPopular: false,
      features: [
        "Birthday Party Decoration",
        "Basic Smart Lighting Setup", 
        "Sound System Installation",
        "Photo Booth Area",
        "Basic Theme Decoration"
      ]
    },
    {
      id: 2,
      name: "Premium Package",
      price: 599,
      period: "Event",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
      isPopular: true,
      features: [
        "Wedding/Anniversary Decoration",
        "Advanced Smart Home Setup",
        "Professional Sound & Lighting", 
        "Floral Arrangements",
        "Custom Theme Design",
        "Photography Setup"
      ]
    },
    {
      id: 3,
      name: "Luxury Package",
      price: 999,
      period: "Event",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80",
      isPopular: false,
      features: [
        "Grand Wedding/Corporate Event",
        "Complete Smart Home Automation",
        "Premium Audio/Visual Setup",
        "Luxury Floral & Decor", 
        "Custom Lighting Design",
        "Professional Event Management"
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
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <MyContainer className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                PRICING PACKAGES
              </h1>
              <div className="flex items-center justify-center gap-2 text-white/80">
                <span>Home</span>
                <span>›</span>
                <span>Pricing Packages</span>
              </div>
            </motion.div>
          </MyContainer>
        </div>
      </div>

      {/* Pricing Cards Section */}
      <div className="py-20">
        <MyContainer className="px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-[#af5f44] text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      POPULAR
                    </div>
                  </div>
                )}

                {/* Plan Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                </div>

                {/* Plan Content */}
                <div className="p-8 flex flex-col grow">
                  {/* Plan Name */}
                  <h3 className={`text-2xl font-bold mb-6 text-center ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-sm text-[#af5f44]">$</span>
                      <span className="text-5xl font-bold text-[#af5f44]">
                        {plan.price}
                      </span>
                      <span className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        /{plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8 grow">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className={`text-sm ${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Get Started Button */}
                  <div className="w-full mt-auto">
                    <Button
                      label="Get Started"
                      onClick={() => console.log(`Selected ${plan.name}`)}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-16"
          >
            <h3 className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Need a Custom Package?
            </h3>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Contact us for personalized smart home automation and ceremony decoration packages tailored to your specific event needs and budget.
            </p>
            <Button
              label="Contact Us"
              onClick={() => window.location.href = '/contact'}
              outline
            />
          </motion.div>

          {/* Features Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-20"
          >
            <h3 className={`text-3xl font-bold text-center mb-12 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Why Choose Our Smart Home & Ceremony Services?
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "🏠",
                  title: "Smart Technology",
                  description: "Latest smart home automation and IoT integration"
                },
                {
                  icon: "🎉",
                  title: "Event Expertise",
                  description: "Professional ceremony and celebration decorations"
                },
                {
                  icon: "⚡",
                  title: "Quick Setup",
                  description: "Fast installation and event setup services"
                },
                {
                  icon: "🛡️",
                  title: "100% Guarantee",
                  description: "Satisfaction guaranteed or money back"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`text-center p-6 rounded-xl ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  } shadow-lg hover:shadow-xl transition-shadow duration-300`}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className={`text-xl font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h4>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </MyContainer>
      </div>
    </div>
  );
};

export default Pricing;