import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaPlus, FaCheck } from "react-icons/fa";
import "./MovieCardHover.css";

const MovieCardHover = ({ movie }) => {
  const [hovered, setHovered] = useState(false);
  const [isInMyList, setIsInMyList] = useState(false);
  const navigate = useNavigate();

  const imageUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  const title = movie?.title || movie?.name || "Untitled";

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("myList")) || [];
    setIsInMyList(storedList.some((m) => m.id === movie.id));
  }, [movie?.id]);

  const handlePlay = () => {
    navigate(`/player/${movie.id}`);
  };

  const handleAddToList = () => {
    const storedList = JSON.parse(localStorage.getItem("myList")) || [];
    const updatedList = isInMyList
      ? storedList.filter((m) => m.id !== movie.id)
      : [...storedList, movie];

    localStorage.setItem("myList", JSON.stringify(updatedList));
    setIsInMyList(!isInMyList);
  };

  if (!movie) return null;

  return (
    <div
      className="movie-card-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img className="movie-poster" src={imageUrl} alt={title} />

      {hovered && (
        <div className="movie-hover-card">
          <img className="hover-image" src={imageUrl} alt={title} />
          <div className="movie-hover-info">
            <div className="movie-hover-title">{title}</div>
            <div className="movie-hover-meta">
              {movie.release_date?.split("-")[0] || "Year"} • U/A 16+ • 1h 30m •{" "}
              {movie.original_language?.toUpperCase() || "LANG"} • Thriller
            </div>
            <div className="movie-hover-actions">
              <div className="movie-hover-button" onClick={handlePlay}>
                <FaPlay /> Watch Now
              </div>
              <div
                className="movie-hover-button secondary"
                onClick={handleAddToList}
              >
                {isInMyList ? <FaCheck /> : <FaPlus />}
              </div>
            </div>
            <div className="movie-hover-description">
              {movie.overview
                ? `${movie.overview.slice(0, 140)}...`
                : "No description available."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCardHover;
