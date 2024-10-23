import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './address.css';

const Address = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from || '/';

    // State for form data
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        zip: ''
    });

    const [orderPlaced, setOrderPlaced] = useState(false);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if the form is valid before submitting
        if (!formData.street || !formData.city || !formData.zip) {
            alert("Please fill in all required fields.");
            return;
        }
    
        try {
            // Submit form data to backend
            const response = await axios.post('http://localhost:7007/auth/address', formData);
    
            if (response.status === 200) {
                // Show the order placed popup
                setOrderPlaced(true);
                // Redirect after 2 seconds
                setTimeout(() => {
                    navigate('/cart');
                }, 2000);
            } else {
                alert("Failed to submit address.");
            }
        } catch (error) {
            console.error("Error submitting address:", error);
    
            // Check if error response exists
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error("Response data:", error.response.data);
                
                console.error("Response status:", error.response.status);
                alert(`Error: ${error.response.data.error || 'An error occurred'}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Request data:", error.request);
                alert("No response received from the server.");
            } else {
                // Something happened in setting up the request
                alert("Error in setting up the request.");
            }
        }
    };
    

    return (
        <div className="address-container">
            <h2>Enter your shipping address</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="street">Street Address:</label>
                    <input 
                        type="text" 
                        id="street" 
                        name="street" 
                        value={formData.street} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input 
                        type="text" 
                        id="city" 
                        name="city" 
                        value={formData.city} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="zip">PIN Code:</label>
                    <input 
                        type="text" 
                        id="zip" 
                        name="zip" 
                        value={formData.zip} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <button 
                    type="submit" 
                    className="complete-address-button"
                >
                    Complete Address
                </button>
            </form>

            {orderPlaced && (
                <div className="order-placed-popup">
                    <p>Your order is placed!</p>
                </div>
            )}
        </div>
    );
};

export default Address;
