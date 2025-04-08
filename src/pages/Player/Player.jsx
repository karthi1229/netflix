import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODI4MzliNWM3YTJiMDcyMDJmMmNkYjdlNDc5Y2ZjZSIsIm5iZiI6MTc0MjIxNTA0Ny42MDMwMDAyLCJzdWIiOiI2N2Q4MTc4N2ViYzMwYTBiNDgwMTY3NWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZhMfr1WP-y_dHFw3fUs7YcgzbPxSoVMNe6tK-MwlBfs";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]);
        } else {
          setApiData(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching video:", err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        className="back-arrow"
        onClick={() => navigate(-1)}
      />

      {loading ? (
        <p>Loading trailer...</p>
      ) : apiData ? (
        <>
          <iframe
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title={apiData.name}
            allowFullScreen
          ></iframe>
          <div className="player-info">
            <p>{apiData.published_at?.slice(0, 10)}</p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
          </div>
        </>
      ) : (
        <p>No trailer available.</p>
      )}
    </div>
  );
};

export default Player;
