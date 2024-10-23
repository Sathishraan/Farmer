// Footer.jsx
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import './footer.css';



const Footer = () => {
    return (
        
        <footer className="footer" id="footer">
            <div className="footer-container">
                {/* Newsletter Subscription */}
                <div className="newsletter-section">
                    <h2 className="newsletter-heading">Subscribe to newsletter</h2>
                    <div className="newsletter-input-wrapper">
                        <input
                            type="email"
                            placeholder="Enter your feedback"
                            className="newsletter-input"
                        />
                
                        <button className="subscribe-button">
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>

                {/* Company Info */}
                <div className="company-info-section" id='footer'>
                    <h3 className="company-logo">Ogenix</h3>
                    <p>We're Providing Everyday Fresh and Quality Products.</p>
                    <div className="social-icons">
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-pinterest"></i>
                        <i className="fab fa-instagram"></i>
                    </div>
                </div>

                {/* Explore Section */}
                <div className="explore-section" id='footer'>
                    <h4>Explore</h4>
                    <ul>
                        <li>About Company</li>
                        <li>Our Services</li>
                        <li>Become a Seller</li>
                        <li>New Products</li>
                        <li>Contact</li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="contact-section" id='footer'>
                    <h4>Contact</h4>
                    <p>GCT opposite, thadagam Road ,coimbatore - 641013</p>
                    <p>Phone: +91 8925315954</p>
                    <p>Email: agritech@gmail.com</p>
                </div>
            </div>

            {/* Footer Bottom Links */}
            <div className="footer-bottom" id='footer'>
                <p>&copy; Copyright 2023 by Ogenix WP</p>
                <div className="footer-links">
                    <a href="#">Terms & Conditions</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Support</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
