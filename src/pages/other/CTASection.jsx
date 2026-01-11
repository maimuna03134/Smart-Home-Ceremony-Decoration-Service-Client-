import React from "react";
import { useNavigate } from "react-router";
import MyContainer from "../../components/container/MyContainer";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../shared/button/Button";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="py-20 bg-linear-to-r from-orange-400 via-primary to-amber-200">
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
            <Button
              label="Get Started Now"
              onClick={() => navigate("/services")}
              icon={ArrowRight}
              outline
            />
          </motion.div>
        </MyContainer>
      </section>
    </div>
  );
};

export default CTASection;
