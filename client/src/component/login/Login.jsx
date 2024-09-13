


import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });

    axios.post('http://localhost:7007/auth/login', { email, password })
    .then(res => {
        console.log('Login response:', res.data);
        if (res.data.status) {
            navigate('/');
        } else {
            console.error('Login failed:', res.data.message);
        }
    })
    .catch(err => {
        console.error('Login error:', err);
    });
  };

  return (
    <div className="login-container">
      <h2 className="login-header">LOGIN</h2>
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
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
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
