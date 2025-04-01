import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';  // Import logout function

const Navbar = () => {
  const navRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {  // Fixed scrollY -> window.scrollY
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);  // Cleanup event listener
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState); // Toggle dropdown visibility
  };

  return (
    <div ref={navRef} className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <img src={logo} alt="Netflix Logo" className="logo" />
        <ul className="navbar-menu">
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        <img src={search_icon} alt="Search" className="icons" aria-label="Search" />
        <p>Children</p>
        <img src={bell_icon} alt="Notifications" className="icons" aria-label="Notifications" />
        <div className="navbar-profile" onClick={toggleDropdown}>
          <img src={profile_img} alt="Profile" className="profile" />
          <img src={caret_icon} alt="Dropdown" className="caret" />
          {isDropdownOpen && (
            <div className="navbar-dropdown">
              <p onClick={logout}>Sign Out of Netflix</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
