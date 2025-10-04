import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import "../index.css";

export const Home = () => {
    return (
        <div>
            <Header />
            <Hero />
            <HowItWorks />
            <Features />
            <Testimonials />
            <CallToAction />
            <Footer />
        </div>
    )
}