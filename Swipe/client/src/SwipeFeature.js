import React, { useState, useEffect } from 'react';
import './SwipeFeature.css'; // Import CSS for styling

const SwipeFeature = ({ organizations }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(null);

  // Event listener for arrow key navigation
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

  const handleTouchStart = (event) => {
    setStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    if (startX === null) return;

    const currentX = event.touches[0].clientX;
    const diff = currentX - startX;

    // Swipe threshold to prevent accidental swipes
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        handleSwipeRight();
      } else {
        handleSwipeLeft();
      }
      setStartX(null);
    }
  };

  const handleSwipeLeft = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSwipeRight = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, organizations.length - 1));
  };

  return (
    <div className="swipe-container" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
      {organizations.map((org, index) => (
        <div key={org.id} className={`card ${index === activeIndex ? 'active' : ''}`}>
          <h2>{org.name}</h2>
          <p>{org.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SwipeFeature;
