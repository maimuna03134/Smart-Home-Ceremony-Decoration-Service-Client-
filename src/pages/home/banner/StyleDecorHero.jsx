import React from 'react';
import { useNavigate } from 'react-router';
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { ArrowRight, Award, Sparkles } from 'lucide-react';
import MyContainer from '../../../components/container/MyContainer';
import Button from '../../shared/button/Button';

const StyleDecorHero = () => {
     const navigate = useNavigate();
    return (
      <div>
        <section className="bg-linear-to-br from-purple-50 via-pink-50 to-amber-50">
          <MyContainer
            className={
              "relative min-h-screen flex items-center justify-center overflow-hidden "
            }
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [90, 0, 90],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute bottom-10 right-10 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
              />
            </div>

            <div className="relative z-10  px-4 sm:px-6 lg:px-8 py-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6"
                  >
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-gray-700">
                      1 Decoration Service in Bangladesh
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-5xl font-bold mb-6"
                  >
                    <span className="bg-linear-to-r from-primary via-orange-600 to-amber-600 bg-clip-text text-transparent">
                      Transform
                    </span>
                    <br />
                    Your Special
                    <br />
                    Moments
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed"
                  >
                    Professional decoration services for weddings, birthdays,
                    homes, and corporate events. Book expert decorators online
                    and create unforgettable memories.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Button
                      label="Book Decoration Service"
                      onClick={() => navigate("/services")}
                      icon={ArrowRight}
                    />
                    <Button
                      label="Browse Services"
                      onClick={() => navigate("/services")}
                      outline
                    />
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-3 gap-6 mt-12"
                  >
                    {[
                      { value: "5000+", label: "Happy Clients" },
                      { value: "500+", label: "Events Completed" },
                      { value: "4.9", label: "Average Rating" },
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold bg-linear-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Right Content */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500",
                      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500",
                      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500",
                      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=500",
                    ].map((img, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square"
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Floating Badge */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl p-3 md:p-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 md:w-12 h-6 md:h-12 bg-linear-to-br from-primary to-orange-500 rounded-xl flex items-center justify-center">
                        <Award className="w-3 h-3 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          Award Winner
                        </div>
                        <div className="text-sm text-gray-600">
                          Best Service 2024
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </MyContainer>
        </section>
      </div>
    );
};

export default StyleDecorHero;