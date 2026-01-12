import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import MyContainer from './container/MyContainer';
import { 
  FaCouch, 
  FaPaintRoller, 
  FaWindowMaximize
} from 'react-icons/fa';
import { MdCarpenter } from 'react-icons/md';

const OurServices = () => {
  const { isDark } = useTheme();

  const services = [
    {
      id: 1,
      title: "Interior Design",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some.",
      icon: FaCouch,
      color: "#af5f44"
    },
    {
      id: 2,
      title: "Carpet Installation",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some.",
      icon: MdCarpenter,
      color: "#af5f44"
    },
    {
      id: 3,
      title: "Wall Mural Painting",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some.",
      icon: FaPaintRoller,
      color: "#af5f44"
    },
    {
      id: 4,
      title: "Window Glass Replacement",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some.",
      icon: FaWindowMaximize,
      color: "#af5f44"
    }
  ];

  return (
    <>
      <MyContainer>
        <section className={`pt-16 px-2 transition-all duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      <MyContainer>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            OUR <span className="text-[#af5f44]">SERVICES</span>
          </h2>
          <p className={`text-base max-w-2xl mx-auto leading-relaxed mb-4 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
                From intimate home makeovers to grand celebration setups, we bring your decoration dreams to reality.
           
          </p>
          <p className={`text-base max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Professional decoration services tailored to your needs, delivered with creativity and precision.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-1 items-center">
          {/* Left Side - Image */}
          <div className="relative order-2 lg:order-1">
            <div className={`rounded-2xl overflow-hidden ${
              isDark ? 'shadow-black/50' : 'shadow-gray-900/10'
            }`}>
              <img
                    src='https://i.ibb.co.com/R473M7Mc/decoration-services.png'
                alt="Professional home decoration service - Woman working on interior design"
                className="w-full h-64 sm:h-80 lg:w-96 lg:h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Services List */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
              <div
                key={service.id}
                className="flex items-start space-x-3 sm:space-x-4 lg:space-x-6"
              >
                {/* Icon */}
                <div className="shrink-0 mt-1">
                  <div className={`w-12 h-12 flex items-center justify-center ${
                    isDark ? 'text-[#af5f44]' : 'text-[#af5f44]'
                  }`}>
                    <Icon className="text-2xl" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`leading-relaxed text-base ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {service.description}
                  </p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </MyContainer>
    </section>
      </MyContainer>
      
    </>
  
  );
};

export default OurServices;