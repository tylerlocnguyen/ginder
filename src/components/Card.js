import React from 'react';
import './Card.css'; 

//Holds the react code to display card with name, description, and if active
const Card = ({ name, description, isActive }) => {
  return (
    <div className={`card ${isActive ? 'active' : ''}`}>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;
