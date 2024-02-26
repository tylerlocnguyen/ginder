import React, { useState, useEffect } from 'react';

//the idea is to have 2 ways of swiping - if Ginder is a web app ppl can access it on their phones/tablets or computer
// So we want them to be able to swipe with finger OR left/right arrow on keyboard

// Component for displaying individual club cards
const ClubCard = ({ club, onSwipeLeft, onSwipeRight }) => {
  // Event handler for keydown events (left and right arrow keys)
  const handleKeyDown = (e) => {
    // If left arrow key is pressed, trigger swipe left function
    if (e.keyCode === 37) {
      onSwipeLeft();
    }
    // If right arrow key is pressed, trigger swipe right function
    else if (e.keyCode === 39) {
      onSwipeRight();
    }
  };

  return (
    // Make the club card and listen for keydown events
    <div className="club-card" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Display club information */}
      <h2>{club.name}</h2>
      <p>{club.description}</p>
      {/* add more club info here if we want*/}
    </div>
  );
};

// Component for the main club swiper functionality
const ClubSwiper = () => {
  // State to store fetched clubs and current club index
  const [clubs, setClubs] = useState([]);
  const [currentClubIndex, setCurrentClubIndex] = useState(0);

  // Effect to fetch clubs from the server when the component mounts
  useEffect(() => {
    // Fetch clubs from the server and update state
    // Example: fetchClubs().then(setClubs);
  }, []);

  // Event handler for when the user swipes left
  const handleSwipeLeft = () => {
    // Logic to handle swiping left
    const nextIndex = currentClubIndex + 1;
    if (nextIndex < clubs.length) {
      setCurrentClubIndex(nextIndex);
    } else {
      // Optional: Handle reaching the end of the club list??
    }
  };

  // Event handler for when the user swipes right
  const handleSwipeRight = () => {
    // Logic to handle swiping right
    const prevIndex = currentClubIndex - 1;
    if (prevIndex >= 0) {
      setCurrentClubIndex(prevIndex);
    } else {
      // Optional: Handle reaching the beginning of the club list??
    }
  };

  return (
    <div className="club-swiper">
      {/* Render the current club card if clubs have been fetched */}
      {clubs.length > 0 && (
        <ClubCard
          club={clubs[currentClubIndex]}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        />
      )}
    </div>
  );
};

export default ClubSwiper;
