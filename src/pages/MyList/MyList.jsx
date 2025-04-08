import React, { useEffect, useState } from "react";
import "./MyList.css";
import MovieCardHover from "../../components/MovieCardHover/MovieCardHover";

const MyList = () => {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myList")) || [];
    setMyList(stored);
  }, []);

  return (
    <div className="my-list-page">
      <h1></h1>
      <div className="my-list-grid">
        {myList.length === 0 ? (
          <p>No movies in your list.</p>
        ) : (
          myList.map((movie) => <MovieCardHover key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
};

export default MyList;
