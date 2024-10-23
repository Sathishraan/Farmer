import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './farmerlogin.css';

const Farmerlogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(''); // Reset message

        try {
            const res = await axios.post('http://localhost:7007/auth/farmerlogin', { email, password });
            if (res.data.status) {
                // Show success message
                setMessage('Login successful!');
                setMessageType('success');

                // Redirect the user to the previous page or default to '/address'
                //const redirectTo = location.state?.from || '/address'; // Check if the user was trying to access another page before login

                // Hide the message after 2 seconds and navigate to the intended page
                setTimeout(() => {
                    setMessage('');
                    navigate('/home'); // Navigate to the saved page or address
                }, 2000);
            } else {
                // Show error message
                setMessage(res.data.message || 'Login failed. Please try again.');
                setMessageType('error');
                setTimeout(() => setMessage(''), 2000); // Auto-hide after 2 seconds
            }
        } catch (err) {
            setMessage('Password or Username is incorrect Please check it!!!');
            setMessageType('error');
            setTimeout(() => setMessage(''), 2000); // Auto-hide after 2 seconds
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flogin-container">
            <h2 className="flogin-header">Farmer LOGIN</h2>

            {message && (
                <div className={`message-box ${messageType}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flogin-form">
                <div className="fform-group">
                    <label htmlFor="email" className="fform-label">Email</label>
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
                    <label htmlFor="password" className="fform-label">Password</label>
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
                <button type="submit" className="fsubmit-button" disabled={loading}>
                    {loading ? 'Logging in...' : 'Submit'}
                </button>
                <div className="forgot-password">
                    <Link to="/forgotPassword" className="fforgot-link">Forgot Password?</Link>
                </div>
                <p className="fsignup-prompt">
                    Don't have an account? <Link to="/farmersign" className="fsignup-link">Signup</Link>
                </p>
            </form>
        </div>
    );
};

export default Farmerlogin;
