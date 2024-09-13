import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:7007/auth/signup', { username, email, password })
      .then(res => {
        console.log(res.data); // Inspect the response
        if (res.data.status) {
          navigate('/login');
        } else {
          console.log('Signup failed');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="signcontainer">
      <h2 className="signup-header">SIGNUP</h2>
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
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
        <p className="login-link">Have an Account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
