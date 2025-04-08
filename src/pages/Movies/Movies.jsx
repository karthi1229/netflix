import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Movies.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";

const API_KEY = "682839b5c7a2b07202f2cdb7e479cfce";

const Movies = () => {
  const navigate = useNavigate();

  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [sciFiMovies, setSciFiMovies] = useState([]);
  const [animationMovies, setAnimationMovies] = useState([]);

  const [kollywoodMovies, setKollywoodMovies] = useState([]);
  const [tollywoodMovies, setTollywoodMovies] = useState([]);
  const [mollywoodMovies, setMollywoodMovies] = useState([]);
  const [hollywoodMovies, setHollywoodMovies] = useState([]);
  const [tamilMovies, setTamilMovies] = useState([]);
  const [teluguMovies, setTeluguMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const requests = [
          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`).then(res => res.json()).then(data => setActionMovies(data.results)),
          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`).then(res => res.json()).then(data => setComedyMovies(data.results)),
          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`).then(res => res.json()).then(data => setHorrorMovies(data.results)),
          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`).then(res => res.json()).then(data => setRomanceMovies(data.results)),
          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=878`).then(res => res.json()).then(data => setSciFiMovies(data.results)),
          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16`).then(res => res.json()).then(data => setAnimationMovies(data.results)),

          // Regional movies
          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=ta&sort_by=popularity.desc`).then(res => res.json()).then(data => setKollywoodMovies(data.results)),
          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=te&sort_by=popularity.desc`).then(res => res.json()).then(data => setTollywoodMovies(data.results)),
          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=ml&sort_by=popularity.desc`).then(res => res.json()).then(data => setMollywoodMovies(data.results)),
          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=en&sort_by=popularity.desc`).then(res => res.json()).then(data => setHollywoodMovies(data.results)),
          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=ta&sort_by=popularity.desc`).then(res => res.json()).then(data => setTamilMovies(data.results)),
          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=te&sort_by=popularity.desc`).then(res => res.json()).then(data => setTeluguMovies(data.results)),
        ];

        await Promise.all(requests);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movies">
      <Navbar />
      <div className="movies-category">
        <MovieCarousel title="Action Movies" movies={actionMovies} />
        <MovieCarousel title="Comedy Movies" movies={comedyMovies} />
        <MovieCarousel title="Horror Movies" movies={horrorMovies} />
        <MovieCarousel title="Romantic Movies" movies={romanceMovies} />
        <MovieCarousel title="Sci-Fi Movies" movies={sciFiMovies} />
        <MovieCarousel title="Animated Movies" movies={animationMovies} />

        <MovieCarousel title="Kollywood (Tamil)" movies={kollywoodMovies} />
        <MovieCarousel title="Tollywood (Telugu)" movies={tollywoodMovies} />
        <MovieCarousel title="Mollywood (Malayalam)" movies={mollywoodMovies} />
        <MovieCarousel title="Hollywood" movies={hollywoodMovies} />
        <MovieCarousel title="Tamil Movies" movies={tamilMovies} />
        <MovieCarousel title="Telugu Movies" movies={teluguMovies} />
      </div>
      <Footer />
    </div>
  );
};

export default Movies;
