// src/components/Header.js
import React from 'react';
import './Header.css'; // Specific styles for Header
import { useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">AgroCare AI</div>
        <nav className="nav">
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/login')}>Log In</button>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Get Started Free</button>
        </div>
      </div>
    </header>
  );
};

export default Header;