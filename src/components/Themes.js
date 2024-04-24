import React, { useState, useEffect } from 'react';
import SwipeFeature from './SwipeFeature';
import axios from 'axios'; // Import axios for HTTP requests
import ThemeSelection from './ThemeSelection';
import './Themes.css';
import Search from './Search';
import logo from '../public/logo.png';

//Displays all of the themes on the page
function Themes() {
  const [tab, setTab] = useState('swipe'); // State to track active tab
  const [organizations, setOrganizations] = useState([]); // State to store organizations
  const [matches, setMatches] = useState([]); // State to store matched organizations
  const [nonMatches, setNonMatches] = useState([]); // State to store non-matched organizations
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [showThemeSelection, setShowThemeSelection] = useState(true);

  // Fetch organizations from the backend when the component mounts
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/organizations');
        const filteredOrgs = response.data.filter(org => 
          org.Tags && (selectedThemes.includes(org.Tags[0]) || 
                       selectedThemes.includes(org.Tags[1]) || 
                       selectedThemes.includes(org.Tags[2])));
        setOrganizations(filteredOrgs);
        //console.log(filteredOrgs);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };
  
    fetchOrganizations();
  }, [selectedThemes]);
  

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
    
    // Check if currentOrg is defined
    if (!currentOrg) {
      console.error("Current organization is undefined");
      return;
    }

    // Check if the organization is already in non-matches
    if (!nonMatches.some(org => org._id === currentOrg._id)) {
      setMatches((prevMatches) => [...prevMatches, currentOrg]);
    }

    setOrganizations((prevOrgs) => prevOrgs.filter((_, index) => index !== activeIndex));
  };

  const handleSelectThemes = (themes) => {
    setSelectedThemes(themes);
    setShowThemeSelection(false);
  };

  return (
    <div style={{ backgroundColor: '#e6f7ec' }} className="Themes">
      <header className="Themes-header">
        <img src={logo} alt="Logo" className="Themes-logo" />
        <h1>Welcome to Ginder</h1>
        <Search />
        {showThemeSelection && <ThemeSelection onSelectThemes={handleSelectThemes} />}
        {!showThemeSelection && (
          <div>
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
                  <div key={match.id}>
                    <p>{match.OrganizationName}</p>
                  </div>
                ))}
              </div>
            )}
            {tab === 'nonMatches' && (
              <div>
                <h2>Non-Matches</h2>
                {nonMatches.map((nonMatch) => (
                  <div key={nonMatch.id}>
                    <p>{nonMatch.OrganizationName}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default Themes;
