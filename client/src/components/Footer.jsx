// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Specific styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <div className="logo">AgroCare AI</div>
          <p>Empowering farmers with data-driven technology for a sustainable future.</p>
          <div className="social-icons">
            {/* Replace with actual SVG icons or Font Awesome */}
            <a href="#"><i className="fab fa-linkedin"></i>🔗</a>
            <a href="#"><i className="fab fa-twitter"></i>🐦</a>
            <a href="#"><i className="fab fa-youtube"></i>▶️</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Platform</h4>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#">Mobile App</a></li>
            <li><a href="#">For Enterprises</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Case Studies</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom text-center">
        <p>© 2025 AgroCare AI Pvt. Ltd. | Made with ❤️ in India.</p>
      </div>
    </footer>
  );
};

export default Footer;