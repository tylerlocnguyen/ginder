import React, { useState } from 'react';
import SwipeFeature from './SwipeFeature';

function App() {
  const [tab, setTab] = useState('swipe'); // State to track active tab

  // Dummy organization data for testing
  const organizations = [
    { id: 1, name: 'Organization 1', description: 'Description 1' },
    { id: 2, name: 'Organization 2', description: 'Description 2' },
    // Add more organizations as needed
  ];

  // Dummy data for matches and non-matches
  const matches = [
    { id: 1, name: 'Match 1', description: 'Description 1' },
    { id: 2, name: 'Match 2', description: 'Description 2' },
  ];

  const nonMatches = [
    { id: 3, name: 'Non-Match 1', description: 'Description 3' },
    { id: 4, name: 'Non-Match 2', description: 'Description 4' },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Organization Swiper</h1>
        <div className="tabs">
          <button onClick={() => setTab('swipe')}>Swipe</button>
          <button onClick={() => setTab('matches')}>Matches</button>
          <button onClick={() => setTab('nonMatches')}>Non-Matches</button>
        </div>
        {tab === 'swipe' && <SwipeFeature organizations={organizations} />}
        {tab === 'matches' && (
          <div>
            <h2>Matches</h2>
            {matches.map((match) => (
              <div key={match.id}>
                <p>{match.name}</p>
                <p>{match.description}</p>
              </div>
            ))}
          </div>
        )}
        {tab === 'nonMatches' && (
          <div>
            <h2>Non-Matches</h2>
            {nonMatches.map((nonMatch) => (
              <div key={nonMatch.id}>
                <p>{nonMatch.name}</p>
                <p>{nonMatch.description}</p>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
