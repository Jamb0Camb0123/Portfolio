import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer>
      <nav>
        <ul>
          <li><Link to="/portfolio/home">Home</Link></li>
          <li><Link to="/portfolio/about">About</Link></li>
          <li><Link to="/portfolio/projects">Projects</Link></li>
          <li><Link to="/portfolio/contact">Contact</Link></li>
        </ul>
      </nav>
      <p>&copy; {new Date().getFullYear()} Your Portfolio. All rights reserved.</p>
    </footer>
  );
};

export default Footer;