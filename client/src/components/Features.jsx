// src/components/Features.js
import React from 'react';
import './Features.css';
import Pest from '/pest detection.png';
import Prediction from '/Soil & Nutrient Management.png';
import SoilAndNue from '/Yield Prediction & Monitoring.png';
import { motion } from 'framer-motion';

const Features = () => {
  const testimonialVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  return (
    <section id="features" className="section features">
      <div className="container">
        <h2 className="text-center">Your All-in-One Digital Agronomist</h2>

        <motion.div className="feature-item"
          variants={testimonialVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="feature-image">
            <img src={Pest} alt="Early Disease & Pest Detection" />
          </div>
          <div className="feature-content">
            <h3>Early Disease & Pest Detection</h3>
            <p>Identify problems before they spread. Our AI recognizes hundreds of crop diseases and pests, helping you save your harvest and reduce pesticide usage by up to 40%.</p>
          </div>
        </motion.div>

        <motion.div className="feature-item reverse"
          variants={testimonialVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="feature-image">
            <img src={SoilAndNue} alt="Soil & Nutrient Management" />
          </div>
          <div className="feature-content">
            <h3>Soil & Nutrient Management</h3>
            <p>Stop guessing. Get precise recommendations for NPK fertilizers based on real-time crop needs. Improve soil health and cut down on waste.</p>
          </div>
        </motion.div>

        <motion.div className="feature-item"
          variants={testimonialVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="feature-image">
            <img src={Prediction} alt="Yield Prediction & Monitoring" />
          </div>
          <div className="feature-content">
            <h3>Yield Prediction & Monitoring</h3>
            <p>Make informed business decisions with accurate yield forecasts. Track the growth and health of your crops throughout the season from our interactive dashboard.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Features;