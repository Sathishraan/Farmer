import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './chat.css';

const socket = io('http://localhost:7007'); // Initialize Socket.IO client

const ChatWindow = ({ recipient }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(() => {
        // Load old messages from localStorage
        const storedMessages = localStorage.getItem(`messages_${recipient}`);
        return storedMessages ? JSON.parse(storedMessages) : [];
    });

    useEffect(() => {
        socket.on('receiveMessage', (msg) => {
            if (msg.sender === recipient) {
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages, msg];
                    localStorage.setItem(`messages_${recipient}`, JSON.stringify(updatedMessages)); // Store in localStorage
                    return updatedMessages;
                });
            }
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [recipient]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = { sender: 'You', recipient, text: message };
            socket.emit('sendMessage', newMessage); // Send message via Socket.IO

            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, newMessage];
                localStorage.setItem(`messages_${recipient}`, JSON.stringify(updatedMessages)); // Store in localStorage
                return updatedMessages;
            });
            setMessage(''); // Clear input field
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h3>Chat with {recipient}</h3>
            </div>
            <div className="chat-body">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'You' ? 'chat-message self' : 'chat-message'}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatWindow;
