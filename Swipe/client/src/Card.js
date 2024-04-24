import React from 'react';
import './Card.css'; // Import CSS for styling

//Function to hold the name, description, and whether or not the card is active
const Card = ({ name, description, isActive }) => {
  return (
    <div className={`card ${isActive ? 'active' : ''}`}>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;
