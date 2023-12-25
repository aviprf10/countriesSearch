import React, { useState, useEffect } from 'react';

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
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <h1>Country List</h1>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredCountries.map((country) => (
        <div key={country.cca3} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
          <img
            src={country.flags.png}
            alt={`${country.name.common} Flag`}
            style={{ width: '30px', height: '20px' }}
          />
          <span>{country.name.common}</span>
        </div>
      ))}
      {filteredCountries.length === 0 && <p>No matching countries found</p>}
    </div>
  );
};

export default CountryList;
