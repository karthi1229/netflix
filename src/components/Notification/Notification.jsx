// src/components/Notification/Notification.jsx
import React, { useEffect, useState } from 'react';
import './Notification.css';
import notificationIcon from '../../assets/notification_icon.png';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=682839b5c7a2b07202f2cdb7e479cfce`);
        const data = await res.json();
        setNotifications(data.results.slice(0, 5)); // Top 5
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notification">
      <img
        src={notificationIcon}
        alt="Notifications"
        className="notification-icon"
        onClick={() => setShowDropdown(!showDropdown)}
      />

      {showDropdown && (
        <div className="notification-dropdown">
          <h4>New Releases</h4>
          {notifications.map((item) => (
            <div className="notification-item" key={item.id}>
              <p>🎬 {item.title}</p>
              <span>{item.release_date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
