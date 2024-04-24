import React, { useState } from 'react';
import axios from 'axios';

//Communicates with the database and displays any clubs that match what is searched
const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [hoveredResult, setHoveredResult] = useState(null);

  const search = async (val) => {
    const res = await axios(`http://localhost:5500/search?q=${val}`);
    const data = res.data;
    setResults(data.slice(0, 10));
  };

  const onChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value) {
      search(e.target.value);
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={onChange} placeholder="Search" />
      {results.length > 0 && results.map(result => (
        <div 
          key={result._id} 
          onMouseEnter={() => setHoveredResult(result)}
          onMouseLeave={() => setHoveredResult(null)}
        >
          {result.OrganizationName}
        </div>
      ))}
      {hoveredResult && (
        <div className="hoveredResult">
          <h2>{hoveredResult.OrganizationName}</h2>
          <p>{hoveredResult.OrganizationDescription}</p>
          <p>{hoveredResult.Tags}</p>
        </div>
      )}
    </div>
  );
};

export default Search;