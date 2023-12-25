import React, { useState, useEffect } from 'react';
import './App.css';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from the API on initial render
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter countries based on the partial search term
    const filtered = countries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(term) ||
        country.name.official.toLowerCase().includes(term)
    );
    setFilteredCountries(filtered);
  };

  return (
    <div>
      <h1>Country List</h1>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="country-list">
        {filteredCountries.length === 0 ? (
          <p>No matching countries found</p>
        ) : (
          filteredCountries.map((country) => (
            <div key={country.cca3} className='country-card'>
              <img
                src={country.flags.png}
                alt={`${country.name.common} Flag`}
                style={{ width: '100%', height: '85%' }}
              />
              <span>{country.name.common}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CountryList;
