import React from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import {
  FaHeart,
  FaUsers,
  FaTrophy,
  FaBullseye,
  FaCheckCircle,
  FaChartLine,
  FaGlobe,
  FaHandSparkles,
} from "react-icons/fa";
import MyContainer from "../../components/container/MyContainer";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router";

const About = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : ''}`}>
      {/* Hero Section with Background Image */}
      <section className="relative h-80 lg:h-96 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1608903172435-6c64fee81d7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGlnaHRpbmclMjBkZWNvcmF0aW9ufGVufDB8fDB8fHww')`
          }}
        />
        
        {/* Dark Overlay */}
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
                About StyleDecor
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Transforming spaces with smart home technology and elegant ceremony decorations
              </p>
              <div className="flex items-center justify-center gap-2 text-white/60 mt-4">
                <Link to='/'>
                  <span>Home</span>
                </Link>
                <span>›</span>
                <span>About Us</span>
              </div>
            </motion.div>
          </MyContainer>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <MyContainer className={"px-4 sm:px-6 lg:px-8"}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-4xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Our Story
              </h2>
              <p className={`text-lg mb-4 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Founded in 2020, StyleDecor began with a simple vision: to
                revolutionize the decoration industry in Bangladesh by making
                premium services accessible through technology.
              </p>
              <p className={`text-lg mb-4 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                What started as a small team of passionate decorators has grown
                into the leading online decoration booking platform, serving
                thousands of happy customers across the country.
              </p>
              <p className={`text-lg ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Today, we're proud to connect talented decorators with clients
                who want to create unforgettable moments, all through our
                easy-to-use platform.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500",
                "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500",
                "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500",
                "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=500",
              ].map((img, index) => (
                <motion.img
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  src={img}
                  alt={`Story ${index + 1}`}
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
              ))}
            </motion.div>
          </div>
        </MyContainer>
      </section>

      {/* Values */}
      <section className="py-20">
        <MyContainer className={"px-4 sm:px-6 lg:px-8"}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Our Core Values
            </h2>
            <p className={`text-xl ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              The principles that guide everything we do
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaHeart />,
                title: "Customer First",
                description:
                  "Your satisfaction and happiness are our top priorities",
              },
              {
                icon: <FaTrophy />,
                title: "Excellence",
                description:
                  "We strive for perfection in every project we undertake",
              },
              {
                icon: <FaUsers />,
                title: "Collaboration",
                description:
                  "Working together with clients and decorators to achieve magic",
              },
              {
                icon: <FaHandSparkles />,
                title: "Innovation",
                description: "Constantly improving our services and technology",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="w-16 h-16 bg-linear-to-r from-primary to-amber-600 rounded-xl flex items-center justify-center text-white mb-6">
                  {React.cloneElement(value.icon, { className: "w-8 h-8" })}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {value.title}
                </h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </MyContainer>
      </section>

      {/* Stats */}
      <section className="py-10 bg-primary/10">
        <MyContainer className={"px-4 sm:px-6 lg:px-8"}>
          <div className="grid md:grid-cols-4 gap-8 ">
            {[
              { value: "5000+", label: "Happy Clients", icon: <FaUsers /> },
              {
                value: "500+",
                label: "Projects Completed",
                icon: <FaCheckCircle />,
              },
              { value: "50+", label: "Expert Decorators", icon: <FaTrophy /> },
              { value: "10+", label: "Cities Covered", icon: <FaGlobe /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-linear-to-r from-primary to-amber-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  {React.cloneElement(stat.icon, { className: "w-10 h-10" })}
                </div>
                <div className="text-4xl font-bold bg-linear-to-r from-primary to-amber-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className={isDark ? 'text-gray-300' : 'text-gray-600'}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </MyContainer>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <MyContainer className={"px-4 sm:px-6 lg:px-8"}>
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-10 shadow-2xl ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="w-16 h-16 bg-linear-to-r from-primary to-amber-600 rounded-xl flex items-center justify-center text-white mb-6">
                <FaBullseye className="w-8 h-8" />
              </div>
              <h3 className={`text-3xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Our Mission
              </h3>
              <p className={`text-lg ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                To democratize professional decoration services by leveraging
                technology, making it easy for anyone to book expert decorators
                and create beautiful spaces for their special moments.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-10 shadow-2xl ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="w-16 h-16 bg-linear-to-r from-primary to-amber-600 rounded-xl flex items-center justify-center text-white mb-6">
                <FaChartLine className="w-8 h-8" />
              </div>
              <h3 className={`text-3xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Our Vision
              </h3>
              <p className={`text-lg ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                To become South Asia's leading decoration service platform,
                known for quality, innovation, and customer satisfaction,
                transforming how people plan and execute their celebrations.
              </p>
            </motion.div>
          </div>
        </MyContainer>
      </section>
    </div>
  );
};

export default About;
