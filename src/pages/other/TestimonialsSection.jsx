import React from 'react';
import MyContainer from '../../components/container/MyContainer';
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Quote, Star } from 'lucide-react';

const TestimonialsSection = () => {
    const testimonials = [
      {
        name: "Ayesha Rahman",
        role: "Bride",
        image:
          "https://ui-avatars.com/api/?name=Ayesha+Rahman&background=8B5CF6&color=fff&size=100",
        text: "StyleDecor made our wedding absolutely magical! The attention to detail and professionalism was outstanding.",
        rating: 5,
      },
      {
        name: "Kamal Hossain",
        role: "CEO, Tech Corp",
        image:
          "https://ui-avatars.com/api/?name=Kamal+Hossain&background=EC4899&color=fff&size=100",
        text: "They transformed our office space beautifully. Highly recommend their corporate decoration services!",
        rating: 5,
      },
      {
        name: "Fatima Begum",
        role: "Homeowner",
        image:
          "https://ui-avatars.com/api/?name=Fatima+Begum&background=F59E0B&color=fff&size=100",
        text: "My home interior decoration exceeded all expectations. Professional, creative, and on-time delivery!",
        rating: 5,
      },
    ];
    return (
      <div>
        <section className="py-20 bg-white">
          <MyContainer className={"px-4 sm:px-6 lg:px-8"}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real stories from real customers who loved our services
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300"
                >
                  <Quote className="w-10 h-10 text-purple-400 mb-4" />
                  <p className="text-gray-700 mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full border-2 border-white shadow-lg"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </MyContainer>
        </section>
      </div>
    );
};

export default TestimonialsSection;