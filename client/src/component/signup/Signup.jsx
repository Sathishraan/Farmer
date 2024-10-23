import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    axios.post('http://localhost:7007/auth/signup', { username, email, password })
      .then(res => {
        if (res.data.status) {
          setMessage('Registered successfully!');
          setMessageType('success');
          setTimeout(() => {
            setMessage('');
            navigate('/login');
          }, 2000);
        } else {
          setMessage(res.data.message || 'Signup failed. Please try again.');
          setMessageType('error');
          setTimeout(() => setMessage(''), 2000);
        }
      })
      .catch(() => {
        setMessage('An error occurred. Please try again.');
        setMessageType('error');
        setTimeout(() => setMessage(''), 2000);
      });
  };

  return (
    <div className="signcontainer">
      <h2 className="signup-header">SIGNUP</h2>
      {message && <div className={`message-box ${messageType}`}>{message}</div>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="username" className="label">Username</label>
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
        <div className="form-group">
          <label htmlFor="email" className="label">Email</label>
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
          <label htmlFor="password" className="label">Password</label>
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
        <button type="submit" className="submit-button">Submit</button>
        <p className="login-link">Have an Account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
