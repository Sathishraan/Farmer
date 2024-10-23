import React from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.css';
const Welcome = () => {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/signup');

  }

  const handleLoginn = () => {
    navigate('/farmersign');

  }
  return (
    <div>
      <div className='welcome-container'>
        <h1 className='heading'>WELCOME TO AGRI TECH </h1>

        <h4 className='heading' >FRESH FRUITS AND VEGETABLE FROM FARMER HOUSE</h4>

      </div>
      <div className='image-containerr'>
        <img src='/home/customer.png' alt="Customer image" className='image1' />

        <img src='/home/famer.png' alt="Farmer image" className='image2' />


      </div>
      <div className='curve'>
        <button className='curve-button' onClick={handleLogin}>CUSTOMER LOGIN</button>
        <button className='curve-button' onClick={handleLoginn}>FARMER LOGIN</button>
      </div>



    </div>
  )
}

export default Welcome