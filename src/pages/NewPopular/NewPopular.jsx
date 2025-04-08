import React, { useEffect, useState } from "react";
import "./NewPopular.css";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";

const API_KEY = "682839b5c7a2b07202f2cdb7e479cfce";

const NewPopular = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    // Fetch all sections
    fetchPopularMovies();
    fetchPopularTV();
    fetchTopRatedMovies();
    fetchTrending();
  }, []);

  const fetchPopularMovies = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
    const data = await res.json();
    setPopularMovies(data.results);
  };

  const fetchPopularTV = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`);
    const data = await res.json();
    setPopularTV(data.results);
  };

  const fetchTopRatedMovies = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
    const data = await res.json();
    setTopRated(data.results);
  };

  const fetchTrending = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`);
    const data = await res.json();
    setTrending(data.results);
  };

  return (
    <div className="new-popular-page">
      <h2></h2>
      <MovieCarousel title="" movies={trending} />
      <MovieCarousel title="Popular Movies" movies={popularMovies} />
      <MovieCarousel title="Popular TV Shows" movies={popularTV} />
      <MovieCarousel title="Top Rated Movies" movies={topRated} />
    </div>
  );
};

export default NewPopular;
