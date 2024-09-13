import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Import Font Awesome cart icon
import { Link } from 'react-router-dom'; // Import Link from React Router
import './nav.css'; // Import the CSS file

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
           
                <a href="#" className="logo">AGRI TECH</a>
                <ul className="nav-links"> {/* No toggle here */}
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <Link to="/cart" className="cart-icon"> {/* Link to the cart page */}
                    <FaShoppingCart size={24} />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
