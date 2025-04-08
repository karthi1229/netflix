import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";

const API_KEY = "682839b5c7a2b07202f2cdb7e479cfce";

const Home = () => {
  const navigate = useNavigate();

  const [heroMovie, setHeroMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [indianMovies, setIndianMovies] = useState([]);

  const handleMovieClick = (id) => {
    navigate(`/player/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hero Section - Popular Movies
        const popularRes = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        const popularData = await popularRes.json();
        const randomHero =
          popularData.results[Math.floor(Math.random() * popularData.results.length)];
        setHeroMovie(randomHero);

        // Trending
        const trendingRes = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
        );
        const trendingData = await trendingRes.json();
        setTrendingMovies(trendingData.results);

        // Top Rated
        const topRatedRes = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
        );
        const topRatedData = await topRatedRes.json();
        setTopRated(topRatedData.results);

        // Popular TV Shows
        const tvRes = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
        );
        const tvData = await tvRes.json();
        setPopularTV(tvData.results);

        // Upcoming Movies
        const upcomingRes = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
        );
        const upcomingData = await upcomingRes.json();
        setUpcomingMovies(upcomingData.results);

        // Indian Movies (Hindi, Tamil, Telugu, Malayalam, Kannada)
        const indianLangCodes = ['hi', 'ta', 'te', 'ml', 'kn'];
        const indianMoviesPromises = indianLangCodes.map((lang) =>
          fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=${lang}&sort_by=popularity.desc`
          )
            .then((res) => res.json())
            .then((data) => data.results || [])
        );
        const indianMoviesResults = await Promise.all(indianMoviesPromises);
        const combinedIndianMovies = indianMoviesResults.flat().slice(0, 20);
        setIndianMovies(combinedIndianMovies);
      } catch (err) {
        console.error("Something went wrong while fetching TMDB data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <Navbar />

      {/* Hero Section */}
      {heroMovie && (
        <div className="hero">
          {heroMovie.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
              alt={heroMovie.title}
              className="banner-img"
            />
          ) : (
            <div className="banner-fallback">No Image Available</div>
          )}

          <div className="hero-caption">
            <h1 className="caption-title">{heroMovie.title || "Untitled"}</h1>
            <p>
              {heroMovie.overview
                ? heroMovie.overview.slice(0, 150) + "..."
                : "No description available."}
            </p>
            <div className="hero-btns">
              <button className="btn" onClick={() => handleMovieClick(heroMovie.id)}>
                <img src={play_icon} alt="Play Icon" /> Play
              </button>
              <button className="btn dark-btn">
                <img src={info_icon} alt="Info Icon" /> More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Carousels */}
      <MovieCarousel title="Trending Now" movies={trendingMovies} />
      <MovieCarousel title="Blockbuster Movies" movies={topRated} />
      <MovieCarousel title="Popular TV Shows" movies={popularTV} />
      <MovieCarousel title="Upcoming Movies" movies={upcomingMovies} />
      <MovieCarousel title="Indian Movies" movies={indianMovies} />

      <Footer />
    </div>
  );
};

export default Home;
