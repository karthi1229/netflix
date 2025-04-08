import React, { useRef } from "react";
import "./MovieCarousel.css";
import MovieCardHover from "../MovieCardHover/MovieCardHover";

const MovieCarousel = ({ title, movies = [] }) => {
  const scrollRef = useRef(null);

  const handleWheelScroll = (e) => {
    const container = scrollRef.current;
    if (container) {
      e.preventDefault(); // prevent default vertical scrolling
      container.scrollLeft += e.deltaY; // scroll horizontally instead
    }
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">{title}</h2>
      <div
        className="carousel"
        ref={scrollRef}
        onWheel={handleWheelScroll}
      >
        {movies.map((movie) => (
          <MovieCardHover key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
