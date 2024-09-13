import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forgot.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:7007/auth/forgotpassword', { email })
      .then(res => {
        if (res.data.status) {
          alert("Check your email for the reset password link");
          navigate('/login');
        } else {
          setError('Something went wrong, please try again.');
        }
      })
      .catch(err => {
        console.error(err);
        setError('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="forgot-container">
      <h2 className="forgot-header">FORGOT PASSWORD</h2>
      <form onSubmit={handleSubmit} className="forgot-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="submit-button">Send Reset Link</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default ForgotPassword;
