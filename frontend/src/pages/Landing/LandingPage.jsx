import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, ArrowRight, Shield, PieChart, Zap } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <nav className="landing-nav">
                <div className="logo">
                    <Wallet size={32} color="#6366f1" />
                    <span className="logo-text">Finance<span className="text-accent">Flow</span></span>
                </div>
                <div className="nav-links">
                    <Link to="/sign-in" className="btn-text">Sign In</Link>
                    <Link to="/sign-up" className="btn-primary">Get Started</Link>
                </div>
            </nav>

            <main className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Master Your Money <br />
                        <span className="text-gradient">Build Your Future</span>
                    </h1>
                    <p className="hero-subtitle">
                        Track expenses, visualize your spending, and achieve your financial goals with our premium, intuitive expense tracker.
                    </p>
                    <div className="hero-cta">
                        <Link to="/sign-up" className="btn-lg btn-primary">
                            Start Tracking Free <ArrowRight size={20} />
                        </Link>
                        <Link to="/sign-in" className="btn-lg btn-outline">
                            Log In
                        </Link>
                    </div>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="icon-box">
                            <PieChart size={24} color="#6366f1" />
                        </div>
                        <h3>Smart Analytics</h3>
                        <p>Visualize your spending habits with beautiful, interactive charts.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-box">
                            <Shield size={24} color="#ec4899" />
                        </div>
                        <h3>Bank-Grade Security</h3>
                        <p>Your financial data is encrypted and protected with industry standards.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-box">
                            <Zap size={24} color="#10b981" />
                        </div>
                        <h3>Real-time Tracking</h3>
                        <p>Add transactions instantly and see your balance update in real-time.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
