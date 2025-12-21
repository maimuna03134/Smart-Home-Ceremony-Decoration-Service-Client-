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

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-br from-purple-50 via-pink-50 to-amber-50 overflow-hidden">
        <MyContainer className={"px-4 sm:px-6 lg:px-8"}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-linear-to-r from-primary to-amber-600 bg-clip-text text-transparent">
                About StyleDecor
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to make professional decoration services
              accessible to everyone, transforming ordinary spaces into
              extraordinary experiences.
            </p>
          </motion.div>
        </MyContainer>
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
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 2020, StyleDecor began with a simple vision: to
                revolutionize the decoration industry in Bangladesh by making
                premium services accessible through technology.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                What started as a small team of passionate decorators has grown
                into the leading online decoration booking platform, serving
                thousands of happy customers across the country.
              </p>
              <p className="text-lg text-gray-600">
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
      <section className="py-20 bg-linear-to-br from-purple-50 via-pink-50 to-amber-50">
        <MyContainer className={"px-4 sm:px-6 lg:px-8"}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
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
                className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-linear-to-r from-primary to-amber-600 rounded-xl flex items-center justify-center text-white mb-6">
                  {React.cloneElement(value.icon, { className: "w-8 h-8" })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </MyContainer>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <MyContainer className={"px-4 sm:px-6 lg:px-8"}>
          <div className="grid md:grid-cols-4 gap-8">
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
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </MyContainer>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-linear-to-br from-purple-50 via-pink-50 to-amber-50">
        <MyContainer className={"px-4 sm:px-6 lg:px-8"}>
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-10 shadow-2xl"
            >
              <div className="w-16 h-16 bg-linear-to-r from-primary to-amber-600 rounded-xl flex items-center justify-center text-white mb-6">
                <FaBullseye className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-600">
                To democratize professional decoration services by leveraging
                technology, making it easy for anyone to book expert decorators
                and create beautiful spaces for their special moments.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-10 shadow-2xl"
            >
              <div className="w-16 h-16 bg-linear-to-r from-primary to-amber-600 rounded-xl flex items-center justify-center text-white mb-6">
                <FaChartLine className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-lg text-gray-600">
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
