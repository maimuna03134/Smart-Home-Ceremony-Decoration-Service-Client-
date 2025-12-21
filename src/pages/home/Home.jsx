import React from "react";
import StyleDecorHero from "./banner/StyleDecorHero";
import Features from "../other/Features";
import FeaturedServices from "../other/FeaturedServices";
import TopDecorators from "../other/TopDecorators";
import Coverage from "../coverage/Coverage";
import TestimonialsSection from "../other/TestimonialsSection";
import CTASection from "../other/CTASection";




const Home = () => {
 

 
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <StyleDecorHero />

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
