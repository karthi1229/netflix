import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {  
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "" 
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODI4MzliNWM3YTJiMDcyMDJmMmNkYjdlNDc5Y2ZjZSIsIm5iZiI6MTc0MjIxNTA0Ny42MDMwMDAyLCJzdWIiOiI2N2Q4MTc4N2ViYzMwYTBiNDgwMTY3NWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZhMfr1WP-y_dHFw3fUs7YcgzbPxSoVMNe6tK-MwlBfs'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]);
        }
      })
      .catch(err => console.error(err));
  }, [id]); // Fixed dependency array

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-1)} /> {/* Fixed navigation */}
      <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apiData.key}`}
        title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className='player-info'>
        <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : ""}</p> {/* Fixed potential undefined error */}
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
}

export default Player;
