
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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 ">
      <MyContainer className={"px-6 py-12 lg:py-16"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium home decor and interior solutions. Transforming spaces
              with elegance and style.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <FaEnvelope className="text-amber-500" />
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-amber-500" />
                <span>+880 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-amber-500" />
                <span>hello@styledecor.com</span>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-amber-500 mt-0.5" />
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
            <h4 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <FaClock className="text-amber-500" />
              Business Hours
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Monday – Friday</span>
                <span className="text-amber-400">9:00 AM – 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-amber-400">10:00 AM – 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-green-400">11:00 AM – 5:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition group"
              >
                <FaFacebookF className="text-lg group-hover:scale-110 transition" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition group"
              >
                <FaInstagram className="text-xl group-hover:scale-110 transition" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition group"
              >
                <FaTwitter className="text-lg group-hover:scale-110 transition" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition group"
              >
                <FaYoutube className="text-xl group-hover:scale-110 transition" />
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-6">
              Get inspired daily with our latest collections
            </p>
          </div>
        </div>

        {/* Copyright & Links */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {currentYear} StyleDecor. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-amber-400 transition">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-amber-400 transition">
              Terms of Service
            </a>
            <a href="/shipping" className="hover:text-amber-400 transition">
              Shipping Info
            </a>
          </div>
        </div>
      </MyContainer>
    </footer>
  );
};

export default Footer;
