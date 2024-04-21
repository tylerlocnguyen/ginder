import React, { useState, useEffect } from 'react';
import './SwipeFeature.css'; // Import CSS for styling

const SwipeFeature = ({ organizations }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Event listener for arrow keys
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handleSwipeLeft();
      } else if (event.key === 'ArrowRight') {
        handleSwipeRight();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  const handleSwipeLeft = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSwipeRight = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, organizations.length - 1));
  };

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