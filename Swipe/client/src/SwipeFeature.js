import React, { useState, useEffect } from 'react';
import './SwipeFeature.css'; // Import CSS for styling

//Sets up the react application for the swipe feature and keeps track if swipes are made
const SwipeFeature = ({ organizations, activeIndex, setActiveIndex, onSwipeLeft, onSwipeRight }) => {
  // Event listener for arrow keys
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        onSwipeLeft();
      } else if (event.key === 'ArrowRight') {
        onSwipeRight();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSwipeLeft, onSwipeRight]);

  return (
    <div className="swipe-container">
      {organizations.map((org, index) => (
        <div key={org._id} className={`card ${index === activeIndex ? 'active' : ''}`}>
          <h2>{org.OrganizationName}</h2>
          <p>{org.OrganizationDescription}</p>
        </div>
      ))}
    </div>
  );
};

export default SwipeFeature;