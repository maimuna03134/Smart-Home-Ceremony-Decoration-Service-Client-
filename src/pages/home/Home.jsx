import React from "react";
import StyleDecorHero from "./banner/StyleDecorHero";
import Features from "../other/Features";
import FeaturedServices from "../other/FeaturedServices";
import TopDecorators from "../other/TopDecorators";
import Coverage from "../coverage/Coverage";
import TestimonialsSection from "../other/TestimonialsSection";
import CTASection from "../other/CTASection";
import Banner from "./banner/Banner";
import WhyChooseUs from "../../components/WhyChooseUs";
import OurServices from "../../components/OurServices";
import { useTheme } from "../../contexts/ThemeContext";


const Home = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Hero Section */}
      {/* <StyleDecorHero /> */}
      <Banner/>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Our Services Section */}
      <OurServices />

      {/* Features Section */}
      <Features />

      {/* Services Section */}
      <FeaturedServices />

      {/* Top Decorators Section */}
      <TopDecorators />

      {/* Service Coverage Map */}
      <Coverage />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

    </div>
  );
};

export default Home;
