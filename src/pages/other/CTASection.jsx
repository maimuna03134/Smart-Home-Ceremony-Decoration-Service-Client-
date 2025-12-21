import React from "react";
import { useNavigate } from "react-router";
import MyContainer from "../../components/container/MyContainer";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="py-20 mb-20 bg-linear-to-r from-primary via-orange-600 to-amber-600">
        <MyContainer className={"px-4 sm:px-6 lg:px-8 text-center"}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Book your decoration service today and let our experts create
              magic for your special occasion
            </p>
            <button
              onClick={() => navigate("/services")}
              className="px-10 py-5 bg-white text-primary rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </MyContainer>
      </section>
    </div>
  );
};

export default CTASection;
