import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./TitleCards.css";
import { FaPlus, FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TitleCards = ({ title, category = "popular" }) => {
  const [movies, setMovies] = useState([]);
  const [myList, setMyList] = useState([]);
  const [messages, setMessages] = useState({});
  const cardContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = category.includes("tv")
          ? `https://api.themoviedb.org/3/${category}?api_key=682839b5c7a2b07202f2cdb7e479cfce`
          : `https://api.themoviedb.org/3/movie/${category}?api_key=682839b5c7a2b07202f2cdb7e479cfce`;

        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchMovies();
  }, [category]);

  const scroll = (direction) => {
    if (cardContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      cardContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/player/${movieId}`);
  };

  const toggleMyList = (movie) => {
    let updatedList;
    let newMessages = { ...messages };

    if (myList.some((item) => item.id === movie.id)) {
      updatedList = myList.filter((item) => item.id !== movie.id);
      newMessages[movie.id] = "Removed from My List";
    } else {
      updatedList = [...myList, movie];
      newMessages[movie.id] = "Added to My List";
    }

    setMyList(updatedList);
    setMessages(newMessages);

    setTimeout(() => {
      setMessages((prev) => {
        const updated = { ...prev };
        delete updated[movie.id];
        return updated;
      });
    }, 2000);
  };

  return (
    <div className="title-cards">
      <h2>{title}</h2>
      <div className="card-wrapper">
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          <FaChevronLeft />
        </button>

        <div className="card-container" ref={cardContainerRef}>
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                onClick={() => handleMovieClick(movie.id)}
              />
              <div className="movie-info">
                <p>
                  {movie.title || movie.name}
                  <button className="list-btn" onClick={() => toggleMyList(movie)}>
                    {myList.some((item) => item.id === movie.id) ? <FaCheck /> : <FaPlus />}
                  </button>
                  {messages[movie.id] && <span className="status-text">{messages[movie.id]}</span>}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="scroll-btn right" onClick={() => scroll("right")}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TitleCards;
