import React from 'react';
import './Footer.css';
import youtube_icon from '../../assets/youtube_icon.png';
import twitter_icon from '../../assets/twitter_icon.png';
import instagram_icon from '../../assets/instagram_icon.png';
import facebook_icon from '../../assets/facebook_icon.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={facebook_icon} alt="Facebook" />
        </a>
        <a
          href="https://www.instagram.com/karthi12__29/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instagram_icon} alt="Instagram" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={twitter_icon} alt="Twitter" />
        </a>
        <a
          href="https://www.youtube.com/@karthiedits941"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={youtube_icon} alt="YouTube" />
        </a>
      </div>

      <nav>
        <ul>
          <li>Audio Description</li>
          <li>Help Center</li>
          <li>Gift Cards</li>
          <li>Media Centre</li>
          <li>Investor Relations</li>
          <li>Jobs</li>
          <li>Terms of Use</li>
          <li>Privacy</li>
          <li>Legal Notices</li>
          <li>Cookie Preferences</li>
          <li>Corporate Information</li>
          <li>Contact Us</li>
        </ul>
      </nav>

      <p className="copyright-text">© 1997-2025 Netflix, Inc.</p>
    </div>
  );
};

export default Footer;
