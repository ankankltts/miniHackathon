import React, { useState, useEffect } from 'react';

// Constants for API and search
const API_URL = 'https://gateway.devxidp.com/82af0b17-45c3-430f-aebf-2b72ff1427ec/customsearch/v1';
const Auth_TOKEN_In_Header = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiIwMTgzZjJiMjczNDYxZTQ4ZGEwNDc0ZTlhYjYwZmEzNjA2YWEwYzlhNzQxMWRiN2Q4ZWU2NzlkNjcyOTAwNjdkIiwiZXhwIjoxNzY2MDQ1MDA1fQ.28kWqTiKLb-_4h8hBDfDbW3n0r4wnOcGZO0I6U-iCg8';
const key = "AIzaSyA4JAsJV29IFqQCXwER5eOJZMWe5ZTc3ig";
const cx = "81789a589fa68420a";

const ProgrammableSearchEngine = () => {
  const [searchResults, setSearchResults] = useState([]); // Store the search results
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling state
  const [q, setQ] = useState(''); // State for search query

  // Function to fetch search results
  const fetchSearchResults = async () => {
    if (!q.trim()) return; // If the query is empty, don't perform a search
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}?key=${key}&cx=${cx}&q=${q}`, {
        headers: {
          'Authorization': `${Auth_TOKEN_In_Header}`, // Corrected Authorization header
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("myData :  " + data);
      
      setSearchResults(data.items || []); // Save the results in state
    } catch (err) {
      setError(err.message); // Handle error
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setQ(e.target.value); // Update the query when input changes
  };

  // Function to handle form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    fetchSearchResults(); // Trigger search
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Programmable Search Engine</h1>

        {/* Search Input Field */}
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <input
            type="text"
            value={q}
            onChange={handleInputChange}
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="mt-2 w-full p-2 bg-blue-500 text-white rounded-lg"
          >
            Search
          </button>
        </form>

        {/* Show loading state */}
        {loading && <p className="text-blue-500 text-center">Loading...</p>}

        {/* Show error message */}
        {error && (
          <div className="mt-4 bg-red-100 text-red-700 border border-red-400 p-4 rounded">
            Error: {error}
          </div>
        )}

        {/* Show search results */}
        {searchResults.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Search Results for: "{q}"</h2>
            <ul className="space-y-4">
              {searchResults.map((result, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-bold"
                  >
                    {result.title}
                  </a>
                  <p className="text-gray-700 mt-2">{result.snippet}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgrammableSearchEngine;
