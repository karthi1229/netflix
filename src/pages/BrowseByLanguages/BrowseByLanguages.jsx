import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BrowseByLanguages.css';

import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'kn', name: 'Kannada' },
  { code: 'mr', name: 'Marathi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'ur', name: 'Urdu' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
];

const BrowseByLanguage = () => {
  const [moviesByLanguage, setMoviesByLanguage] = useState({});
  const API_KEY = "682839b5c7a2b07202f2cdb7e479cfce";

  useEffect(() => {
    const fetchMovies = async () => {
      const results = {};

      await Promise.all(
        languages.map(async (lang) => {
          try {
            const res = await axios.get(
              `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=${lang.code}&sort_by=popularity.desc`
            );
            results[lang.name] = res.data.results;
          } catch (err) {
            console.error(`Error fetching ${lang.name} movies:`, err);
          }
        })
      );

      setMoviesByLanguage(results);
    };

    fetchMovies();
  }, []);

  return (
    <div className="browse-language-page">
      <h1 className="browse-title"></h1>
      {languages.map((lang) => (
        <div className="language-section" key={lang.code}>
          <h2 className="language-heading">{lang.name} Movies</h2>
          <MovieCarousel movies={moviesByLanguage[lang.name] || []} />
        </div>
      ))}
    </div>
  );
};

export default BrowseByLanguage;
