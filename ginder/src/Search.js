import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const search = async (val) => {
        const res = await axios(`http://localhost:5500/search?q=${val}`);
        const data = res.data;
        setResults(data);
    };

    const onChange = (e) => {
        setQuery(e.target.value);
        search(e.target.value);
    };

    return (
        <div>
            <input type="text" value={query} onChange={onChange} placeholder="Search" />
            {results.map(result => (
                <div key={result._id}>{result.OrganizationName}</div>
            ))}
        </div>
    );
};

export default Search;