import React, { useEffect } from 'react';
import './SwipeFeature.css';

//Creates the swipe feature page and checks if the user swipes left or right and then performs the correct actions from there
const SwipeFeature = ({ organizations, activeIndex, onSwipeLeft, onSwipeRight }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        onSwipeLeft();
      } else if (event.key === 'ArrowRight') {
        onSwipeRight();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSwipeLeft, onSwipeRight]);

  return (
    <div className="swipe-container">
      {organizations[activeIndex] && (
        <div key={organizations[activeIndex]._id} className="card">
          <h2>{organizations[activeIndex].OrganizationName}</h2>
          <p>{organizations[activeIndex].OrganizationDescription}</p>
        </div>
      )}
    </div>
  );
};

export default SwipeFeature;
