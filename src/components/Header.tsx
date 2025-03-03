import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/portfolio/home">Home</Link></li>
          <li><Link to="/portfolio/about">About</Link></li>
          <li><Link to="/portfolio/projects">Projects</Link></li>
          <li><Link to="/portfolio/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;