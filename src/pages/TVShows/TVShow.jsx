import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import "./TVShows.css";

const API_KEY = "682839b5c7a2b07202f2cdb7e479cfce";

const TVShows = () => {
  const navigate = useNavigate();

  const [heroShow, setHeroShow] = useState(null);
  const [popularTV, setPopularTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [airingTodayTV, setAiringTodayTV] = useState([]);
  const [onTheAirTV, setOnTheAirTV] = useState([]);
  const [trendingTodayTV, setTrendingTodayTV] = useState([]);
  const [trendingWeekTV, setTrendingWeekTV] = useState([]);
  const [comedyTV, setComedyTV] = useState([]); // Genre-based

  const handlePlay = (id) => {
    navigate(`/player/${id}`);
  };

  useEffect(() => {
    // Hero Banner
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const randomShow = data.results[Math.floor(Math.random() * data.results.length)];
        setHeroShow(randomShow);
      });

    // Fetch TV Sections
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setPopularTV(data.results));

    fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setTopRatedTV(data.results));

    fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setAiringTodayTV(data.results));

    fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setOnTheAirTV(data.results));

    fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setTrendingTodayTV(data.results));

    fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setTrendingWeekTV(data.results));

    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=35`) // Comedy
      .then((res) => res.json())
      .then((data) => setComedyTV(data.results));
  }, []);

  return (
    <div className="home">
      <Navbar />

      {heroShow && (
        <div className="hero">
          {heroShow.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${heroShow.backdrop_path}`}
              alt={heroShow.name}
              className="banner-img"
            />
          )}
          <div className="hero-caption">
            <h1 className="caption-title">{heroShow.name}</h1>
            <p>{heroShow.overview?.slice(0, 150) || "No description available"}...</p>
            <div className="hero-btns">
              <button className="btn" onClick={() => handlePlay(heroShow.id)}>
                <img src={play_icon} alt="Play Icon" /> Play
              </button>
              <button className="btn dark-btn">
                <img src={info_icon} alt="Info Icon" /> More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Row Sections */}
      <MovieCarousel title="Popular TV Shows" movies={popularTV} />
      <MovieCarousel title="Top Rated Shows" movies={topRatedTV} />
      <MovieCarousel title="Airing Today" movies={airingTodayTV} />
      <MovieCarousel title="Currently On Air" movies={onTheAirTV} />
      <MovieCarousel title="Trending Today" movies={trendingTodayTV} />
      <MovieCarousel title="Trending This Week" movies={trendingWeekTV} />
      <MovieCarousel title="Comedy TV Shows" movies={comedyTV} />

      <Footer />
    </div>
  );
};

export default TVShows;
