import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import Categories from './categories/Categories';
import './home.css';
import Info from './Info';
import Product from './product/Product';

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle navigation
  const handleBuyClick = () => {
    navigate('/buy'); // Redirect to Buy page
  };

  return (
    <div>

      <div className="home-container">
        <Navbar />
        {/* Single large image container */}
        <div className="grid-item-container">
          <img src="/home/fruit.png" alt="Fruit" className="grid-item" />

        </div>
        <Info />
        <h1 className='bg'>TODAY'S SPECIAL OFFERS</h1>
        <p className='bg'>Don't miss it</p>


        {/* Image Grid */}
        <div className="grid-container">

          <div className="grid-item-container">
            <img src="/home/banana.png" alt="Banana" className="grid-item" />
            <button className="buy-button" onClick={handleBuyClick}>Buy</button>
          </div>

          <div className="grid-item-container">
            <img src="/home/egg.png" alt="Egg" className="grid-item" />
            <button className="buy-button" onClick={handleBuyClick}>Buy</button>
          </div>

          <div className="grid-item-container">
            <img src="/home/veg.png" alt="Vegetable" className="grid-item" />
            <button className="buy-button" onClick={handleBuyClick}>Buy</button>
          </div>

          <div className="grid-item-container">
            <img src="/home/mango.png" alt="Mango" className="grid-item" />
            <button className="buy-button" onClick={handleBuyClick}>Buy</button>
          </div>
        </div>

        {/* Categories Component */}
        <Categories />

        {/* Video Section */}
        <div className="video-section">
          <div className="video-container">
            <video className="product-video" autoPlay muted loop>
              <source src="/home/fruits_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button className="buy-button large-button" onClick={handleBuyClick}>Buy Now</button>
          </div>

          <div className="video-container">
            <video className="product-video" autoPlay muted loop>
              <source src="/home/vege_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button className="buy-button large-button" onClick={handleBuyClick}>Buy Now</button>
          </div>
        </div>

        {/* Product Component */}

      </div>  <Product />
      <Footer />
     
    </div>
  );
};

export default Home;
