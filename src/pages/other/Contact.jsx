import React, { useState } from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";
import toast from "react-hot-toast";
import MyContainer from "../../components/container/MyContainer";
import Coverage from "../coverage/Coverage";
import Button from "../shared/button/Button";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router";

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Message sent successfully! We'll get back to you soon.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setSubmitting(false);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : ''}`}>
      {/* Hero Section with Background Image */}
      <section className="relative h-80 lg:h-96 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://plus.unsplash.com/premium_photo-1683880731792-39c07ceea617?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9kZXJuJTIwb2ZmaWNlfGVufDB8fDB8fHww')`
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
                Get In Touch
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Have questions about our smart home and ceremony decoration services? We'd love to hear from you.
              </p>
              <div className="flex items-center justify-center gap-2 text-white/60 mt-4">
                <Link to='/'>
                  <span>Home</span>
                </Link>
                <span>›</span>
                <span>Contact Us</span>
              </div>
            </motion.div>
          </MyContainer>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <MyContainer className={"px-4 sm:px-6 lg:px-8"}>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'
                }`}>
                Contact Information
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: <FaPhone />,
                    title: "Phone",
                    content: "+880 1XXX-XXXXXX",
                    link: "tel:+8801XXXXXXXXX",
                  },
                  {
                    icon: <FaEnvelope />,
                    title: "Email",
                    content: "hello@styledecor.com",
                    link: "mailto:hello@styledecor.com",
                  },
                  {
                    icon: <FaMapMarkerAlt />,
                    title: "Address",
                    content:
                      "House 123, Road 45, Gulshan-2, Dhaka 1212, Bangladesh",
                    link: null,
                  },
                  {
                    icon: <FaClock />,
                    title: "Business Hours",
                    content:
                      "Saturday - Thursday: 9:00 AM - 8:00 PM\nFriday: Closed",
                    link: null,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-linear-to-r from-primary to-amber-600 rounded-xl flex items-center justify-center text-white shrink-0">
                      {React.cloneElement(item.icon, { className: "w-6 h-6" })}
                    </div>
                    <div>
                      <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                        {item.title}
                      </h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className={`hover:text-primary transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'
                            }`}
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className={`whitespace-pre-line ${isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                          {item.content}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-10">
                <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'
                  }`}>Follow Us</h3>
                <div className="flex gap-4">
                  {["Facebook", "Instagram", "Twitter", "LinkedIn"].map(
                    (social, index) => (
                      <motion.a
                        key={social}
                        href="#"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 bg-linear-to-r from-primary to-amber-600 rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-all"
                      >
                        {social[0]}
                      </motion.a>
                    )
                  )}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-8 shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'
                }`}
            >
              <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'
                }`}>
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${isDark
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+880 1XXX-XXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3  rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking Question</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 ">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none "
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button
                  label={submitting ? "Sending..." : "Send Message"}
                  loading={submitting}
                  disabled={submitting}
                  icon={FaPaperPlane}
                />
              </form>
            </motion.div>
          </div>
        </MyContainer>
      </section>

      {/* Map Section */}
      <section>
        <Coverage />
      </section>
    </div>
  );
};

export default Contact;
