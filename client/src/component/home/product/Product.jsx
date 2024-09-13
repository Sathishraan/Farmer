import React from 'react';
import './product.css'; // Import the CSS for styling

const Product = () => {
  const products = [
    { id: 1, name: 'TOMATO', price: '$50.00', imageUrl: '/home/tomato.jpg' },
    { id: 2, name: 'BRINJAL', price: '$35.00', imageUrl: '/home/brinjal.jpg' },
    { id: 3, name: 'ONION', price: '$25.00', imageUrl: '/home/onion.jpg' },
    { id: 4, name: 'POTATO', price: '$40.00', imageUrl: '/home/potato.jpg' },
    { id: 5, name: 'CARROT', price: '$30.00', imageUrl: '/home/potato.jpg' },
    { id: 6, name: 'CABBAGE', price: '$28.00', imageUrl: '/home/potato.jpg' },
    { id: 7, name: 'LETTUCE', price: '$22.00', imageUrl: '/home/potato.jpg' },
    { id: 8, name: 'PEPPER', price: '$55.00', imageUrl: '/home/potato.jpg' }
  ];

  return (
    <div className="product-list-wrapper">
      <div className="product-display-container">
        {products.map((product) => (
          <div key={product.id} className="grid-item-containerr">
            <img src={product.imageUrl} alt={product.name} className="grid-itemm" />
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>{product.price}</p>
            </div>
            <button className="buy-button">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
