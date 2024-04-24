// ThemeSelection.js
import React, { useState } from 'react';

//Containes all of the themes and logs if any of them are selected by the user
const themes = [
    'Nursing',
    'Agricultural and Life Sciences',
    'Arts',
    'Business',
    'Dentistry',
    'Design',
    'Construction',
    'Planning',
    'Education',
    'Engineering',
    'Health/Human Performance',
    'Journalism/Communications',
    'Law',
    'Liberal Arts',
    'Medicine',
    'Pharmacy',
    'Public Health',
    'Health Professions',
    'Veterinary Medicine',
    'Ambassador',
    'Community/Volunteer Service',
    'Cultural',
    'Fine Arts',
    'Graduate',
    'Healthy Living',
    'Honor Society',
    'Interfraternity Council',
    'Media/Publication',
    'Military',
    'Multicultural Greek Council',
    'National Pan-Hellenic Council',
    'Panhellenic Council',
    'Political Interests',
    'Professional/Career',
    'Recreation',
    'Religious/Spiritual',
    'Social and Global Change',
    'Special Interest',
    'Sport Clubs',
    'Student Government Political Party',
  ];
  

const ThemeSelection = ({ onSelectThemes }) => {
  const [selectedThemes, setSelectedThemes] = useState([]);

  const toggleTheme = (theme) => {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes((prevThemes) => prevThemes.filter((t) => t !== theme));
    } else {
      setSelectedThemes((prevThemes) => [...prevThemes, theme]);
    }
  };

  const handleSubmit = () => {
    onSelectThemes(selectedThemes);
  };

  return (
    <div>
      <h2>Select Your Interests</h2>
      <div className="theme-list">
        {themes.map((theme) => (
          <div key={theme}>
            <input
              type="checkbox"
              id={theme}
              name={theme}
              checked={selectedThemes.includes(theme)}
              onChange={() => toggleTheme(theme)}
            />
            <label htmlFor={theme}>{theme}</label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Continue</button>
    </div>
  );
};

export default ThemeSelection;
