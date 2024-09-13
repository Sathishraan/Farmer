import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './reset.css';

const Resetpassword = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useParams(); // Extract token from URL

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`http://localhost:7007/auth/resetPassword/${token}`, { password })
      .then(res => {
        if (res.data.status) {
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
    <div className="reset-container">
      <h2 className="reset-header">RESET PASSWORD</h2>
      <form onSubmit={handleSubmit} className="reset-form">
        <div className="form-group">
          <label htmlFor="password" className="form-label">New Password</label>
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
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default Resetpassword;
