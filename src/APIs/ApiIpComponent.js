import React, { useState, useEffect } from 'react';

// Constants for API (Move API Token to .env for security)
const API_URL = 'https://gateway.devxidp.com/9ce837cf-d7a8-4cc6-97d8-4ce4472e6671/';
const Auth_TOKEN_In_Header = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiIwMTgzZjJiMjczNDYxZTQ4ZGEwNDc0ZTlhYjYwZmEzNjA2YWEwYzlhNzQxMWRiN2Q4ZWU2NzlkNjcyOTAwNjdkIiwiZXhwIjoxNzY2MDQ5MzE1fQ.NlKeuQ7MocrrutTBttXoq9t2iq5TEsJniv1m6AHIr4c';

const ApiIpComponent = () => {
  const [searchResults, setSearchResults] = useState(null); // Store the single search result
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling state
  const [q, setQ] = useState(''); // State for search query

  // Function to fetch search results
  const fetchSearchResults = async () => {
    if (!q.trim()) { 
      setSearchResults(null);
      return; 
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}?q=${q}`, {
        headers: {
          'Authorization': `Bearer ${Auth_TOKEN_In_Header}`, // Corrected Authorization header
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      
      // Extract relevant details from mydata response
      const result = {
        ip: data.ip,
        datacenter: data.datacenter ? data.datacenter.datacenter : 'N/A',
        company: data.company ? data.company.name : 'N/A',
        location: data.location ? `${data.location.city}, ${data.location.country}` : 'N/A',
        abuse_email: data.abuse ? data.abuse.email : 'N/A',
        is_vpn: data.is_vpn ? 'Yes' : 'No',
        is_datacenter: data.is_datacenter ? 'Yes' : 'No',
      };

      setSearchResults(result); // Save the result in state
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.'); // Handle error
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setQ(e.target.value); // Update the query when input changes
  };

  // Handle submit function to fetch search results
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults(); // Call the function when user clicks "Search"
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">API IP Search Engine</h1>

        {/* Search Input and Button */}
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={q}
            onChange={handleInputChange}
            placeholder="Enter IP address or search query..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button 
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Show loading state */}
        {loading && (
          <div className="flex justify-center items-center mt-6">
            <div className="loader"></div> {/* Custom loader (add CSS) */}
            <p className="ml-2 text-blue-500">Loading...</p>
          </div>
        )}

        {/* Show error message */}
        {error && (
          <div className="mt-4 bg-red-100 text-red-700 border border-red-400 p-4 rounded">
            Error: {error}
          </div>
        )}

        {/* Show search results */}
        {searchResults && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">IP Information for: "{q}"</h2>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md">
              <p><strong>IP Address:</strong> {searchResults.ip}</p>
              <p><strong>Datacenter:</strong> {searchResults.datacenter}</p>
              <p><strong>Company:</strong> {searchResults.company}</p>
              <p><strong>Location:</strong> {searchResults.location}</p>
              <p><strong>Abuse Email:</strong> {searchResults.abuse_email}</p>
              <p><strong>Is VPN:</strong> {searchResults.is_vpn}</p>
              <p><strong>Is Datacenter:</strong> {searchResults.is_datacenter}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApiIpComponent;
