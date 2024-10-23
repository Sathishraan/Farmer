import axios from 'axios';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // Hook to access location data

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Reset message

    try {
      const res = await axios.post('http://localhost:7007/auth/login', { email, password });
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
    <div className="login-container">
      <h2 className="login-header">Customer LOGIN</h2>

      {message && (
        <div className={`message-box ${messageType}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
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
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
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
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Submit'}
        </button>
        <div className="forgot-password">
          <Link to="/forgotPassword" className="forgot-link">Forgot Password?</Link>
        </div>
        <p className="signup-prompt">
          Don't have an account? <Link to="/signup" className="signup-link">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
