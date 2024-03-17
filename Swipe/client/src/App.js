import React from 'react';
import SwipeFeature from './SwipeFeature';

function App() {
  // Dummy organization data for testing
  const organizations = [
    { id: 1, name: 'Organization 1', description: 'Description 1' },
    { id: 2, name: 'Organization 2', description: 'Description 2' },
    // Add more organizations as needed
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Organization Swiper</h1>
        <SwipeFeature organizations={organizations} />
      </header>
    </div>
  );
}

export default App;