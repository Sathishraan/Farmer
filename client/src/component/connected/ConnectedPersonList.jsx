import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConnectedPersonList = ({ connectedPeople }) => {
    const navigate = useNavigate();

    const handleClickPerson = (person) => {
        navigate(`/chat/${person}`);  // Navigate to ChatWindow for that person
    };

    return (
        <div className="connected-list">
            <h3>Connected People</h3>
            {connectedPeople.length > 0 ? (
                <ul>
                    {connectedPeople.map((person, index) => (
                        <li key={index} onClick={() => handleClickPerson(person)}>
                            {person}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No connected people yet.</p>
            )}
        </div>
    );
};

export default ConnectedPersonList;
