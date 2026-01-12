import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaPaintBrush, FaAward, FaUsers } from 'react-icons/fa';
import MyContainer from './container/MyContainer';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../pages/shared/button/Button';

const WhyChooseUs = () => {
  const { isDark } = useTheme();

  const features = [
    {
      icon: <FaHome />,
      title: "Qualified Planning",
      description: "There are many variations of passages of Lorem ipsum available, but the majority."
    },
    {
      icon: <FaPaintBrush />,
      title: "Professional Design",
      description: "There are many variations of passages of Lorem ipsum available, but the majority."
    },
    {
      icon: <FaAward />,
      title: "Expert Team",
      description: "There are many variations of passages of Lorem ipsum available, but the majority."
    },
    {
      icon: <FaUsers />,
      title: "Customer Satisfaction",
      description: "There are many variations of passages of Lorem ipsum available, but the majority."
    }
  ];

  return (
    <section className={`pt-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <MyContainer className="px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                WELCOME TO{' '}
                <span className="text-primary">STYLEDECOR</span>
              </h2>
              <p className={`text-lg leading-relaxed mb-8 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                We are passionate, knowing that people live, work, play and inhabit 
                the spaces and places we imagine and envision for our clients. To 
                those wanting to make an impact with design.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6 mb-8">
              {features.slice(0, 2).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-[#af5f44] rounded-lg flex items-center justify-center text-white shrink-0">
                    {React.cloneElement(feature.icon, { className: "w-6 h-6" })}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Learn More Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="inline-block"
            >
              <Button
                label="LEARN MORE"
                onClick={() => window.location.href = '/about'}
                small
              />
            </motion.div>
          </motion.div>

          {/* Right Content - Image with Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://media.istockphoto.com/id/2188246343/photo/modern-villa-exterior-with-christmas-decoration-at-night.webp?a=1&b=1&s=612x612&w=0&k=20&c=A_3OOQchLoQtbCc0A2Us2HGxKKqkfEuwQ1TS4-6OhrU="
                alt="Modern Villa Decoration"
                className="w-full h-96 object-cover"
              />
              
              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute top-6 right-6 bg-white rounded-xl p-6 shadow-xl border-4 border-[#af5f44]"
              >
                <div className="text-center">
                  <div className="text-primary text-sm font-semibold mb-1">
                    STYLEDECOR MODERN
                  </div>
                  <div className="text-gray-900 text-sm font-bold mb-2">
                    INTERIOR DESIGN
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="text-xs text-gray-500 mb-1">
                      YEARS
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      EXPERIENCE
                    </div>
                    <div className="text-6xl font-bold text-[#af5f44]">
                      5+
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary rounded-full opacity-20"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-orange-400 rounded-full opacity-30"
            />
          </motion.div>
        </div>

        {/* Bottom Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`text-center p-6 rounded-xl transition-all duration-300 hover:shadow-lg ${
                isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="w-16 h-16 bg-[#af5f44] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                {React.cloneElement(feature.icon, { className: "w-8 h-8" })}
              </div>
              <h3 className={`text-lg font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </MyContainer>
    </section>
  );
};

export default WhyChooseUs;