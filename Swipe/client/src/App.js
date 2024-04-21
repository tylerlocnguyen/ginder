import React, { useState, useEffect } from 'react';
import SwipeFeature from './SwipeFeature';
import axios from 'axios'; // Import axios for HTTP requests

function App() {
  const [tab, setTab] = useState('swipe'); // State to track active tab
  const [organizations, setOrganizations] = useState([]); // State to store organizations
  const [matches, setMatches] = useState([]); // State to store matched organizations
  const [nonMatches, setNonMatches] = useState([]); // State to store non-matched organizations
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch organizations from the backend when the component mounts
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/organizations');
        setOrganizations(response.data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleSwipeLeft = () => {
    const currentOrg = organizations[activeIndex];
    
    // Check if the organization is already in matches
    if (!matches.some(org => org._id === currentOrg._id)) {
      setNonMatches((prevNonMatches) => [...prevNonMatches, currentOrg]);
    }
    
    setOrganizations((prevOrgs) => prevOrgs.filter((_, index) => index !== activeIndex));
  };

  const handleSwipeRight = () => {
    const currentOrg = organizations[activeIndex];
    
    // Check if the organization is already in non-matches
    if (!nonMatches.some(org => org._id === currentOrg._id)) {
      setMatches((prevMatches) => [...prevMatches, currentOrg]);
    }

    setOrganizations((prevOrgs) => prevOrgs.filter((_, index) => index !== activeIndex));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Organization Swiper</h1>
        <div className="tabs">
          <button onClick={() => setTab('swipe')}>Swipe</button>
          <button onClick={() => setTab('matches')}>Matches</button>
          <button onClick={() => setTab('nonMatches')}>Non-Matches</button>
        </div>
        {tab === 'swipe' && (
          <SwipeFeature
            organizations={organizations}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          />
        )}
        {tab === 'matches' && (
          <div>
            <h2>Matches</h2>
            {matches.map((match) => (
              <div key={match._id}>
                <p>{match.OrganizationName}</p>
              </div>
            ))}
          </div>
        )}
        {tab === 'nonMatches' && (
          <div>
            <h2>Non-Matches</h2>
            {nonMatches.map((nonMatch) => (
              <div key={nonMatch._id}>
                <p>{nonMatch.OrganizationName}</p>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
