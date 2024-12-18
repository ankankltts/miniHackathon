import React, { useState } from 'react';

const BASE_URL = 'https://gateway.devxidp.com/5a9a5a9a-1a71-4778-bd3e-da39fe5f6d37/geo/';
const AUTH_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiIwMTgzZjJiMjczNDYxZTQ4ZGEwNDc0ZTlhYjYwZmEzNjA2YWEwYzlhNzQxMWRiN2Q4ZWU2NzlkNjcyOTAwNjdkIiwiZXhwIjoxNzY2MDUxNDcyfQ.lRVLoVfherA4iBceitITdIf6WISH-A5hwUrOFkX0lfg';

const GeoLocationApi = () => {
  const [params, setParams] = useState({ region: '', city: '', country: '' });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to build the URL dynamically based on the input parameters
  const buildEndpoint = () => {
    const { region, city, country } = params;

    if (region) {
      return `country/region/${region}`;
    }
    if (city) {
      return `city/name/${city}`;
    }
    if (country) {
      return `country/cities/${country}`;
    }

    return null; // No valid input
  };

  // Function to call the API
  const fetchGeoData = async () => {
    const endpoint = buildEndpoint();

    if (!endpoint) {
      setError('Please enter at least one of the following: region, city, or country.');
      return;
    }

    setLoading(true);
    setError(null);

    const url = `${BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${AUTH_TOKEN}`,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      
      setResults(data);
    } catch (error) {
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams((prevParams) => ({ ...prevParams, [name]: value }));
  };

  // Handle the form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchGeoData();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">GeoLocation API</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
              Region (e.g., Asia)
            </label>
            <input 
              type="text" 
              id="region" 
              name="region" 
              value={params.region} 
              onChange={handleChange} 
              placeholder="Enter region..." 
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City (e.g., London)
            </label>
            <input 
              type="text" 
              id="city" 
              name="city" 
              value={params.city} 
              onChange={handleChange} 
              placeholder="Enter city..." 
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
              Country (e.g., India)
            </label>
            <input 
              type="text" 
              id="country" 
              name="country" 
              value={params.country} 
              onChange={handleChange} 
              placeholder="Enter country..." 
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button 
            type="submit" 
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>

        {loading && <p className="mt-6 text-blue-500">Loading...</p>}
        {error && <p className="mt-4 text-red-500">Error: {error}</p>}

        {results && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Results</h2>
            <ul>
              {results.map((result, index) => (
                <li key={index} className="mb-4 bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-bold mb-2">{result.name}</h3>
                  <p><strong>Capital:</strong> {result.capital}</p>
                  <p><strong>Population:</strong> {result.population}</p>
                  <p><strong>Currency:</strong> {result.currencies[0].name}</p>
                  
                  <p><strong>Timezones:</strong> {result.timezones ? result.timezones.join(', ') : 'N/A'}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeoLocationApi;
