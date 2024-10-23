import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    // Load cart from localStorage or use state passed from previous page
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    // Handle removing item from cart
    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
    };

    // Handle buy button click - redirect to address page
    const handleBuy = () => {
        navigate('/address');
        removeFromCart(); // Redirect to the address page
    };
    const backtohome = () => {
        navigate('/home');
    }

    return (


        <div className='main-conatiner'>
            <button className='back-to-home' onClick={backtohome}>BACK TO HOME</button>
            <div className="cart-container">
                <h1 className="cart-title">Your Cart</h1>
                {cart.length === 0 ? (
                    <p className="cart-empty-message">No items in the cart.</p>
                ) : (
                    <ul className="cart-list">
                        {cart.map((item) => (
                            <li key={item.id} className="cart-list-item">
                                <span className="cart-icon">🛒</span>
                                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                </div>
                                <div className="cart-item-price">{item.price}</div>
                                <button
                                    className="remove-cart-button"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </button>
                                <button
                                    className="buy-cart-button"
                                    onClick={handleBuy}
                                >
                                    Buy
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>

    );
};

export default Cart;
