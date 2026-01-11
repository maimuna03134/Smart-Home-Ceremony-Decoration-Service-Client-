
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import Logo from "../../components/logo/Logo";
import MyContainer from "../../components/container/MyContainer";
import { useTheme } from "../../contexts/ThemeContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDark } = useTheme();

  return (
    <footer className={`transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-800 text-gray-300 border-t border-gray-700' 
        : 'bg-gray-900 text-gray-300'
    }`}>
      <MyContainer className={"px-6 py-12 lg:py-16"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Logo isFooter={true} />
            <p className={`text-sm leading-relaxed ${
              isDark ? 'text-gray-400' : 'text-gray-400'
            }`}>
              Premium home decor and interior solutions. Transforming spaces
              with elegance and style.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className={`font-bold text-lg mb-5 flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-white'
            }`}>
              <FaEnvelope className="text-primary" />
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary" />
                <span>+880 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <span>hello@styledecor.com</span>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-0.5" />
                <span>
                  123 Gulshan Avenue
                  <br />
                  Dhaka 1212, Bangladesh
                </span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className={`font-bold text-lg mb-5 flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-white'
            }`}>
              <FaClock className="text-primary" />
              Business Hours
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Monday – Friday</span>
                <span className="text-primary">9:00 AM – 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-primary">10:00 AM – 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-success">11:00 AM – 5:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className={`font-bold text-lg mb-6 ${
              isDark ? 'text-white' : 'text-white'
            }`}>
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 rounded-full flex items-center justify-center transition group ${
                  isDark 
                    ? 'bg-gray-700 hover:bg-primary text-gray-300 hover:text-white' 
                    : 'bg-gray-800 hover:bg-amber-600'
                }`}
              >
                <FaFacebookF className="text-lg group-hover:scale-110 transition" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 rounded-full flex items-center justify-center transition group ${
                  isDark 
                    ? 'bg-gray-700 hover:bg-primary text-gray-300 hover:text-white' 
                    : 'bg-gray-800 hover:bg-amber-600'
                }`}
              >
                <FaInstagram className="text-xl group-hover:scale-110 transition" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 rounded-full flex items-center justify-center transition group ${
                  isDark 
                    ? 'bg-gray-700 hover:bg-primary text-gray-300 hover:text-white' 
                    : 'bg-gray-800 hover:bg-amber-600'
                }`}
              >
                <FaTwitter className="text-lg group-hover:scale-110 transition" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 rounded-full flex items-center justify-center transition group ${
                  isDark 
                    ? 'bg-gray-700 hover:bg-primary text-gray-300 hover:text-white' 
                    : 'bg-gray-800 hover:bg-amber-600'
                }`}
              >
                <FaYoutube className="text-xl group-hover:scale-110 transition" />
              </a>
            </div>
            <p className={`text-xs mt-6 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Get inspired daily with our latest collections
            </p>
          </div>
        </div>

        {/* Copyright & Links */}
        <div className={`mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm border-t ${
          isDark ? 'border-gray-700' : 'border-gray-800'
        }`}>
          <p>© {currentYear} StyleDecor. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-primary transition">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-primary transition">
              Terms of Service
            </a>
            <a href="/shipping" className="hover:text-primary transition">
              Shipping Info
            </a>
          </div>
        </div>
      </MyContainer>
    </footer>
  );
};

export default Footer;
