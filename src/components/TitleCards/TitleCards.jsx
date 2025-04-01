import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODI4MzliNWM3YTJiMDcyMDJmMmNkYjdlNDc5Y2ZjZSIsIm5iZiI6MTc0MjIxNTA0Ny42MDMwMDAyLCJzdWIiOiI2N2Q4MTc4N2ViYzMwYTBiNDgwMTY3NWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZhMfr1WP-y_dHFw3fUs7YcgzbPxSoVMNe6tK-MwlBfs'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results) {
          setApiData(res.results);
        }
      })
      .catch(err => console.error(err));

    const cardList = cardsRef.current;
    if (cardList) {
      cardList.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (cardList) {
        cardList.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]); // Added category as a dependency

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className='card' key={index}> {/* Fixed space issue */}
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
