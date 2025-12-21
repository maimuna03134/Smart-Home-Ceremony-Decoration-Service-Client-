import React from "react";
import MyContainer from "../../components/container/MyContainer";
import { Calendar, CheckCircle, TrendingUp, Users } from "lucide-react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const Features = () => {
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
      <section className="py-20 bg-white">
        <MyContainer className={"px-4 sm:px-6 lg:px-8"}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose StyleDecor?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-linear-to-br from-primary to-orange-600 rounded-xl flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </MyContainer>
      </section>
    </div>
  );
};

export default Features;
