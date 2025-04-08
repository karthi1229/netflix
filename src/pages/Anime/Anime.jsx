import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Anime.css";
import MovieCardHover from "../../components/MovieCardHover/MovieCardHover";

const API_KEY = "682839b5c7a2b07202f2cdb7e479cfce";

const animeCategories = [
  { title: "Popular Anime", query: "popularity.desc" },
  { title: "Top Rated Anime", query: "vote_average.desc" },
  { title: "New Releases", query: "first_air_date.desc" },
  { title: "Most Voted", query: "vote_count.desc" },
  { title: "Old Classics", query: "first_air_date.asc" },
];

const Anime = () => {
  const [animeData, setAnimeData] = useState({});

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const results = {};

        await Promise.all(
          animeCategories.map(async (cat) => {
            const res = await axios.get(
              `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=1&sort_by=${cat.query}&with_original_language=ja&with_genres=16`
            );
            results[cat.title] = res.data.results;
          })
        );

        setAnimeData(results);
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };

    fetchAnime();
  }, []);

  // Enable horizontal scroll with mouse wheel
  useEffect(() => {
    const scrollContainers = document.querySelectorAll(".scrollable-row");

    const handleWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      e.currentTarget.scrollLeft += e.deltaY;
    };

    scrollContainers.forEach((container) => {
      container.addEventListener("wheel", handleWheel);
    });

    return () => {
      scrollContainers.forEach((container) => {
        container.removeEventListener("wheel", handleWheel);
      });
    };
  }, []);

  return (
    <div className="anime-page">
      {animeCategories.map((cat) => (
        <div key={cat.title} className="anime-category">
          <h2 className="anime-title">{cat.title}</h2>
          <div className="anime-row scrollable-row">
            {animeData[cat.title]?.map((anime) => (
              <MovieCardHover key={anime.id} movie={anime} media_type="tv" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Anime;
