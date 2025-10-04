// src/components/Testimonials.js
import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <section id="testimonials" className="section testimonials text-center">
      <div className="container">
        <h2>Loved by Farmers Across India</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <div className="testimonial-avatar">
              <img src="https://images.pexels.com/photos/916406/pexels-photo-916406.jpeg?_gl=1*1a2wxsf*_ga*OTYxMjU3OTEzLjE3NDg4ODE0NTY.*_ga_8JE65Q40S6*czE3NTk1NTM5OTUkbzckZzEkdDE3NTk1NTQwMDIkajUzJGwwJGgw" alt="Ramesh Kumar" />
            </div>
            <p className="testimonial-quote">
              "CropCare AI is a game-changer. It helped me identify blight in my tomato crop a week early. The app is so easy to use on my phone. My yield has increased by 20%!"
            </p>
            <p className="testimonial-author">— Ramesh Kumar, Small Farmer, Haryana</p>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-avatar">
              <img src="https://images.pexels.com/photos/5529606/pexels-photo-5529606.jpeg?_gl=1*1kh3kwv*_ga*OTYxMjU3OTEzLjE3NDg4ODE0NTY.*_ga_8JE65Q40S6*czE3NTk1NTM5OTUkbzckZzEkdDE3NTk1NTQxMDkkajE4JGwwJGgw" alt="Priya Singh" />
            </div>
            <p className="testimonial-quote">
              "Managing 500 acres of cotton is a challenge. The dashboard gives us a bird's-eye view of everything. We've saved lakhs on input costs by applying treatments only where they're needed."
            </p>
            <p className="testimonial-author">— Priya Singh, Farm Manager, Maharashtra</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;