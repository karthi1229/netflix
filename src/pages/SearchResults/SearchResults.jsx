// src/pages/SearchResults/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.css';

const API_KEY = "682839b5c7a2b07202f2cdb7e479cfce";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
        .then((res) => res.json())
        .then((data) => setResults(data.results || []));
    }
  }, [query]);

  const handleClick = (id) => {
    navigate(`/player/${id}`);
  };

  return (
    <div className="search-results-page">
      <h2>Search Results for "{query}"</h2>
      <div className="search-grid">
        {results.length > 0 ? (
          results.map((movie) => (
            <div key={movie.id} className="search-card" onClick={() => handleClick(movie.id)}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
