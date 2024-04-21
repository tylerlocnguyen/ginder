import React, { useState, useEffect } from 'react';
import SwipeFeature from './SwipeFeature';
import axios from 'axios'; // Import axios for HTTP requests

function App() {
  const [tab, setTab] = useState('swipe'); // State to track active tab
  const [organizations, setOrganizations] = useState([]); // State to store organizations
  const [matches, setMatches] = useState([]); // State to store matched organizations
  const [nonMatches, setNonMatches] = useState([]); // State to store non-matched organizations

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
    const currentOrg = organizations.find((_, index) => index === 0);
    setNonMatches((prevNonMatches) => [...prevNonMatches, currentOrg]);
    setOrganizations((prevOrgs) => prevOrgs.slice(1));
  };

  const handleSwipeRight = () => {
    const currentOrg = organizations.find((_, index) => index === 0);
    setMatches((prevMatches) => [...prevMatches, currentOrg]);
    setOrganizations((prevOrgs) => prevOrgs.slice(1));
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
