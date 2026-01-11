import React from "react";
import MyContainer from "../../components/container/MyContainer";
import { Calendar, CheckCircle, TrendingUp, Users } from "lucide-react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

const Features = () => {
  const { isDark } = useTheme();
  
  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Easy Online Booking",
      description:
        "Book your decoration service in minutes with our simple online system",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Decorators",
      description:
        "Work with certified and experienced decoration professionals",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Quality Guaranteed",
      description: "Premium materials and flawless execution every time",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real-time Updates",
      description: "Track your project status from planning to completion",
    },
  ];
  return (
    <div>
      <section className="py-20">
        <MyContainer className={"px-4 sm:px-6 lg:px-8"}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Why Choose StyleDecor?
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We make decoration services accessible, affordable, and absolutely
              stunning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 ${
                  isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-xl flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </MyContainer>
      </section>
    </div>
  );
};

export default Features;
