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
        country.name.common.toLowerCase().includes(term)
    );
    setFilteredCountries(filtered);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ margin: "10px", width: "50%", height: "29px" }}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '10px',
        }}
      >
        {filteredCountries.map((country) => (
          <div
            key={country.cca3}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={country.flags.png}
              alt={`${country.name.common} Flag`}
              style={{ width: '100px', height: '100px' }}
            />
            <span style={{ padding: '10px' }}>{country.name.common}</span>
          </div>
        ))}
      </div>
      {filteredCountries.length === 0 && <p>No matching countries found</p>}
    </div>
  );
};

export default CountryList;
