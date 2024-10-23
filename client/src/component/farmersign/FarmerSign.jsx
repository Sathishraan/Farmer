import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './farmersign.css';

const FarmerSign = () => {
    const [username, setUsername] = useState('');
    const [farmerid, setFarmerid] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const navigate = useNavigate();

    // Farmer ID validation: First 3 letters alphabetic and ends with 'f'
    const validateFarmerID = (id) => {
        const regex = /^[a-zA-Z]{3}[a-zA-Z0-9]*f$/;
        return regex.test(id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(''); // Reset message




        // Farmer ID validation
        if (!validateFarmerID(farmerid)) {
            setMessage('Farmer ID is invalid');
            setMessageType('error');
            setTimeout(() => setMessage(''), 3000); // Auto-hide message after 3 seconds
            return;
        }

        axios.post('http://localhost:7007/auth/farmersign', { username, email, password })
            .then(res => {
                if (res.data.status) {
                    // Show success message
                    setMessage('Registered successfully!');
                    setMessageType('success');

                    // Hide the message after 2 seconds
                    setTimeout(() => {
                        setMessage('');
                        navigate('/farmerlogin'); // Redirect to login page
                    }, 2000);
                } else {
                    // Show error message
                    setMessage(res.data.message || 'Signup failed. Please try again.');
                    setMessageType('error');
                    setTimeout(() => setMessage(''), 3000); // Auto-hide after 3 seconds
                }
            })
            .catch(err => {
                setMessage('An error occurred. Please try again.');
                setMessageType('error');
                setTimeout(() => setMessage(''), 3000); // Auto-hide after 3 seconds
            });
    };

    return (
        <div className="fsigncontainer">
            <h2 className="fsignup-header">FARMER SIGNUP</h2>

            {message && (
                <div className={`message-box ${messageType}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="fsignup-form">
                <div className="fform-group">
                    <label htmlFor="username" className="flabel">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="input-field"
                        required
                    />
                </div>

                <div className="fform-group">
                    <label htmlFor="farmerid" className="flabel">Farmer_ID</label>
                    <input
                        type="text"
                        id="farmerid"
                        value={farmerid}
                        onChange={(e) => setFarmerid(e.target.value)}
                        placeholder="Farmer_ID"
                        className="input-field"
                        required
                    />
                </div>

                <div className="fform-group">
                    <label htmlFor="email" className="flabel">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="input-field"
                        required
                    />
                </div>

                <div className="fform-group">
                    <label htmlFor="password" className="flabel">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input-field"
                        required
                    />
                </div>



                <button type="submit" className="fsubmit-button">Submit</button>
                <p className="flogin-link">Have an Account? <Link to="/farmerlogin">Login</Link></p>
            </form>
        </div>
    );
};

export default FarmerSign;
