import React, { useState } from 'react';

const API_URL = 'https://gateway.devxidp.com/c7f492a8-a8e5-4f9a-8869-01dba6a5ce52/textraction';
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiIwMTgzZjJiMjczNDYxZTQ4ZGEwNDc0ZTlhYjYwZmEzNjA2YWEwYzlhNzQxMWRiN2Q4ZWU2NzlkNjcyOTAwNjdkIiwiZXhwIjoxNzY2MDM1OTU5fQ.il0LwWOoN6TatNmrt6In6v7zv0SBaNHnj4GJlG9MQ8E';

const bodyData = [
  {
    "text": "Personal details:\n* Name: Sarah Johnson\n* Email: sarah.johnson@email.com\nEducation:\n* Bachelor of Science in Computer Science, Stanford University, 2014-2018\nSkills:\n* Programming languages: Java, JavaScript, Python, C++\n* Web technologies: HTML, CSS, React, Node.js, Express.js, MongoDB\n* Other tools and technologies: Git, JIRA, Agile methodologies, AWS, Docker\nProjects:\n* Developed a full-stack web application for managing tasks using React, Node.js, and MongoDB as part of a personal project.\n* Contributed to an open-source project for building a chatbot using Python and the Google Cloud Platform.", 
    "entities": [
      { "description": "curriculum vitae summary, up to 10 words", "type": "string", "var_name": "candidate_summary" },
      { "description": "first name of candidate", "type": "string", "var_name": "first_name" },
      { "description": "last name of candidate", "type": "string", "var_name": "last_name" },
      { "description": "email address", "type": "string", "var_name": "email" },
      { "description": "year of bachelor graduation", "type": "integer", "var_name": "bachelor_graduation_year" },
      { "description": "year of master graduation", "type": "integer", "var_name": "master_graduation_year" },
      { "description": "year of phd graduation", "type": "integer", "var_name": "phd_graduation_year" },
      { "description": "candidate familiar with Python", "type": "boolean", "var_name": "python" },
      { "description": "candidate familiar with Matlab", "type": "boolean", "var_name": "matlab" },
      { "description": "candidate skills", "type": "array[string]", "var_name": "skills" }
    ]
  }
];

const TextExtraction = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (candidate) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidate),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setResponseData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Text Extraction</h1>

        {bodyData.map((candidate, index) => (
          <button 
            key={index}
            onClick={() => fetchData(candidate)} 
            disabled={loading} 
            className={`w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold transition-all mb-4 
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            {loading ? "Extracting..." : `Extract Data for Candidate`}
          </button>
        ))}

        {loading && <p className="mt-4 text-blue-500 text-center animate-pulse">Loading...</p>}

        {error && (
          <div className="mt-4 bg-red-100 text-red-700 border border-red-400 p-4 rounded">
            Error: {error}
          </div>
        )}

        {responseData && (
          <div className="mt-6 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Candidate Information</h2>

            <div className="grid grid-cols-2 gap-4">
              {responseData?.results && Object.entries(responseData.results).map(([key, value]) => (
                key !== 'skills' && (
                  <div key={key} className="flex items-center">
                    <span className="font-semibold capitalize w-1/3">{key.replace(/_/g, ' ')}:</span>
                    <span className="ml-2 text-gray-700">
                      {value !== null ? value.toString() : 'N/A'}
                    </span>
                  </div>
                )
              ))}
            </div>

            {responseData?.results?.skills && (
              <>
                <h2 className="text-xl font-bold mt-6 mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {responseData.results.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-100 text-blue-600 text-sm font-medium py-1 px-3 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            )}

            {responseData?.stats && (
              <>
                <h2 className="text-xl font-bold mt-6 mb-4">Statistics</h2>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(responseData.stats).map(([key, value]) => (
                    <div 
                      key={key} 
                      className="bg-white shadow-md p-4 rounded-lg text-center"
                    >
                      <p className="text-sm text-gray-500">{key.replace(/_/g, ' ')}</p>
                      <p className="text-2xl font-bold text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextExtraction;
