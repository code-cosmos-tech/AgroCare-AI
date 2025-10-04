// src/components/Hero.js
import React from 'react';
import './Hero.css';
import { useNavigate } from 'react-router';
import { motion } from "framer-motion"

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="section hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 100 }}  // starting state
          animate={{ opacity: 1, y: 0 }}    // final state
          transition={{ duration: 1 }}    // animation speed
        >
          <h1>Smarter Farming, Healthier Harvests.</h1>
          <p className="hero-subtitle">
            CropCare AI uses advanced machine learning to detect diseases, monitor crop health,
            and provide actionable insights—all from your phone or computer. Boost your yield and reduce costs.
          </p>
        </motion.div>
        <div className="hero-actions">
          <a className='demoVideo' href="https://youtu.be/_FPLEWNdONk" target='_blank'><button className="btn btn-primary">► Watch a 2-Minute Demo</button></a>
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Start Your Free Trial</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;