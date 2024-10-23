import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './nav.css';

const Navbar = ({ connectedPeople = [], addConnection }) => { // Default to empty array
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.post('http://localhost:7007/auth/navbar', { username: searchQuery });
            if (response.data.username) {
                setSearchResult(response.data);
                setError('');
            } else {
                setError('User not found. Please try again.');
            }
        } catch (error) {
            console.error('Search failed', error);
            setError('An error occurred. Please try again later.');
        }
    };

    const handleConnect = () => {
        if (searchResult && searchResult.username) {
            addConnection(searchResult.username); // Add connection
            setIsConnected(true);
        }
    };

    const handleMessageIconClick = () => {
        navigate('/chats');
    };

    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <div className="admin">
                        <img src="/home/avatar.jpg" alt="Avatar" />
                    </div>

                    <div className="search_container">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="search" 
                            value={searchQuery}
                            onChange={handleInputChange}
                        />
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            fill="currentColor" 
                            className="search_icon" 
                            viewBox="0 0 16 16"
                            onClick={handleSearch}
                        >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zm-5.242 1a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
                        </svg>
                    </div>

                    {/* Show the message icon only if there are connected people */}
                    {connectedPeople.length > 0 && (
                        <button onClick={handleMessageIconClick} className="cart-icon">
                            Messages ({connectedPeople.length})
                        </button>
                    )}
                </div>
            </nav>

            {error && <div className="error-message">{error}</div>}

            {searchResult && (
                <div className="search-result">
                    <p><strong>Username:</strong> {searchResult.username}</p>
                    <p><strong>Message:</strong> {searchResult.message}</p>
                    <button 
                        onClick={handleConnect}
                        className="connect-btn"
                    >
                        {isConnected ? '✔ Connected' : 'Connect'}
                    </button>
                </div>
            )}
        </>
    );
};

export default Navbar;
