import React, { useState } from 'react';
import ChatListComponent from '../chatlist/ChatListComponent';
import Navbar from '../navbar/Navbar';


const ParentComponent = () => {
    const [connectedUsers, setConnectedUsers] = useState([]);

    const addConnection = (username) => {
        // Check if the user is already connected
        if (!connectedUsers.includes(username)) {
            setConnectedUsers((prevUsers) => [...prevUsers, username]); // Add new connection
        } else {
            alert("User is already connected."); // Alert if the user is already connected
        }
    };

    return (
        <div>
            
            <Navbar connectedPeople={connectedUsers} addConnection={addConnection} />
            <ChatListComponent connectedUsers={connectedUsers} />
            {/* Other components */}
        </div>
    );
};

export default ParentComponent;
