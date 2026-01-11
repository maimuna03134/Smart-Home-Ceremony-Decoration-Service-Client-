import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
  FaPaintRoller, 
  FaCouch, 
  FaHome, 
  FaWindowMaximize,
  FaArrowRight
} from 'react-icons/fa';
import { MdDesignServices, MdCarpenter } from 'react-icons/md';
import Button from '../pages/shared/button/Button';

const OurServices = () => {
  const { isDark } = useTheme();

  const services = [
    {
      id: 1,
      title: "Interior Design",
      description: "Transform your space with our professional interior design services. We create beautiful, functional spaces that reflect your personal style and preferences.",
      icon: FaCouch,
      color: "#af5f44"
    },
    {
      id: 2,
      title: "Carpet Installation", 
      description: "Professional carpet installation services with high-quality materials and expert craftsmanship for lasting comfort and durability.",
      icon: FaHome,
      color: "#af5f44"
    },
    {
      id: 3,
      title: "Wall Mural Painting",
      description: "Custom wall murals and artistic painting services to add personality, creativity, and visual appeal to your living spaces.",
      icon: FaPaintRoller,
      color: "#af5f44"
    },
    {
      id: 4,
      title: "Window Glass Replacement",
      description: "Expert window glass replacement and installation services for improved energy efficiency, security, and aesthetic appeal.",
      icon: MdCarpenter,
      color: "#af5f44"
    }
  ];

  return (
    <section className={`py-20 px-4 transition-all duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            OUR <span className="text-[#af5f44]">SERVICES</span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We provide comprehensive home decoration and renovation services to transform your space into a beautiful, functional environment. Our expert team delivers quality craftsmanship with attention to every detail.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Image */}
          <div className="relative order-2 lg:order-1">
            <div className={`rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-700 ${
              isDark ? 'shadow-black/50' : 'shadow-gray-900/20'
            }`}>
              <img
                src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Professional home decoration service - Woman working on interior design"
                className="w-full h-[600px] object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Floating Stats */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className={`backdrop-blur-md rounded-2xl p-6 ${
                  isDark ? 'bg-white/10' : 'bg-white/90'
                }`}>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>500+</div>
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Projects</div>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>98%</div>
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Satisfaction</div>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>5+</div>
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Years Exp</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Badge */}
              <div className="absolute top-8 left-8">
                <div className="bg-[#af5f44] text-white px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2">
                  <MdDesignServices className="text-lg" />
                  <span>Professional Service</span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#af5f44]/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-[#af5f44]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>

          {/* Right Side - Services List */}
          <div className="space-y-8 order-1 lg:order-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className={`group p-8 rounded-2xl transition-all duration-500 hover:transform hover:translateX-3 hover:-translateY-1 cursor-pointer ${
                    isDark 
                      ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-[#af5f44]/50' 
                      : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#af5f44]/30 hover:shadow-xl'
                  }`}
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  <div className="flex items-start space-x-6">
                    {/* Icon */}
                    <div className="shrink-0">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                        isDark ? 'bg-[#af5f44]/20 group-hover:bg-[#af5f44]/30' : 'bg-[#af5f44]/10 group-hover:bg-[#af5f44]/20'
                      }`}>
                        <Icon 
                          className="text-[#af5f44] text-2xl transition-all duration-500 group-hover:scale-110" 
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-3 group-hover:text-[#af5f44] transition-colors duration-300 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {service.title}
                      </h3>
                      <p className={`leading-relaxed mb-4 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {service.description}
                      </p>
                      
                      {/* Learn More Link */}
                      <div className="flex items-center text-[#af5f44] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="mr-2">Learn More</span>
                        <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CTA Button */}
            <div className="pt-8">
              <Button
                label="View All Services"
                icon={FaArrowRight}
                onClick={() => window.location.href = '/services'}
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;