import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import SearchBar from '../SearchBar/SearchBar';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';

const Navbar = () => {
  const navRef = useRef();
  const dropdownRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // 🔽 Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  // Toggle notifications
  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
  };

  // Fetch notifications (Now Playing Movies)
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          'https://api.themoviedb.org/3/movie/now_playing?api_key=682839b5c7a2b07202f2cdb7e479cfce&language=en-US&page=1'
        );
        const data = await res.json();
        setNotifications(data.results.slice(0, 5)); // show top 5
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    };
    fetchNotifications();
  }, []);

  // Add dark background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current?.classList.add('nav-dark');
      } else {
        navRef.current?.classList.remove('nav-dark');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🔓 Handle sign out
  const handleSignOut = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div ref={navRef} className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <img
          src={logo}
          alt="Netflix Logo"
          className="logo"
          onClick={() => navigate('/')}
        />
        <ul className="navbar-menu">
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/tvshows')}>TV Shows</li>
          <li onClick={() => navigate('/movies')}>Movies</li>
          <li onClick={() => navigate('/new-popular')}>New & Popular</li>
          <li onClick={() => navigate('/my-list')}>My List</li>
          <li onClick={() => navigate('/browse-languages')}>Browse by Languages</li>
          <li onClick={() => navigate('/anime')}>Anime</li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-right" ref={dropdownRef}>
        <img
          src={search_icon}
          alt="Search"
          className="icons"
          onClick={() => setShowSearchBar(!showSearchBar)}
        />
        {showSearchBar && <SearchBar />}

        <p onClick={() => alert("Switching to children's profile...")}>Children</p>

        {/* 🔔 Notifications */}
        <div className="notification-wrapper">
          <img
            src={bell_icon}
            alt="Notifications"
            className="icons"
            onClick={toggleNotifications}
          />
          {showNotifications && (
            <div className="notification-dropdown">
              <h4>What's New</h4>
              <ul>
                {notifications.map((movie) => (
                  <li key={movie.id}>
                    <strong>{movie.title}</strong>
                    <p>{movie.overview.slice(0, 80)}...</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="navbar-profile" onClick={toggleDropdown}>
          <img src={profile_img} alt="Profile" className="profile" />
          <img src={caret_icon} alt="Dropdown" className="caret" />
          {isDropdownOpen && (
            <div className="navbar-dropdown">
              <p onClick={handleSignOut}>Sign Out of Netflix</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
