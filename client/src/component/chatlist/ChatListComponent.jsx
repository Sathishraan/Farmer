import React from 'react';
import { useNavigate } from 'react-router-dom';
import './chatList.css';

const ChatListComponent = ({ connectedUsers }) => {
    const navigate = useNavigate();

    const handleChatClick = (username) => {
        navigate(`/chat/${username}`); // Navigate to the specific chat window for the selected user
    };

    return (
        <div className="chat-list-container">
            <h2>Chat with Connected Users</h2>
            {connectedUsers && connectedUsers.length > 0 ? (
                <ul className="connected-users-list">
                    {connectedUsers.map((user, index) => (
                        <li key={index} className="user-item">
                            <p>{user}</p>
                            <button onClick={() => handleChatClick(user)} className="message-btn">
                                Message
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No connected users yet.</p>
            )}
        </div>
    );
};

export default ChatListComponent;
