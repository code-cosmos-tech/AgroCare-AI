// src/components/HowItWorks.js
import React from 'react';
import './HowItWorks.css'; // Specific styles

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section how-it-works text-center">
      <div className="container">
        <h2>Simple Steps to a Smarter Farm</h2>
        <div className="steps-grid">
          <div className="step-item">
            <div className="icon">📸</div> {/* Replace with actual icons */}
            <h3>Capture or Upload</h3>
            <p>Easily upload images of your crops from a smartphone, drone, or satellite. No special equipment needed to get started.</p>
          </div>
          <div className="step-item">
            <div className="icon">🧠</div> {/* Replace with actual icons */}
            <h3>AI Analysis</h3>
            <p>Our powerful AI analyzes every pixel to instantly detect diseases, pests, and nutrient deficiencies with high accuracy.</p>
          </div>
          <div className="step-item">
            <div className="icon">📊</div> {/* Replace with actual icons */}
            <h3>Get Actionable Advice</h3>
            <p>Receive a simple, clear report on your dashboard with precise recommendations on fertilizer, water, and treatment needed.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;