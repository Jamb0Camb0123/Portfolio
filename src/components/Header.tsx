import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const links = [
  { to: '/home', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' }
];

const Header: React.FC = () => {
  const [activeLink, setActiveLink] = useState('/home'); // Track active link
  const [hoveredLink, setHoveredLink] = useState<string | null>(null); // Track hovered link
  const navRef = useRef<HTMLUListElement>(null); // Reference to the nav container
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]); // Refs for each link

  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname); // Update active link when the route changes
  }, [location]);

  const getLinkPosition = (index: number) => {
    const linkElement = linkRefs.current[index];
    if (linkElement) {
      const { offsetLeft, offsetWidth } = linkElement;
      return { left: offsetLeft, width: offsetWidth };
    }
    return { left: 0, width: 0 };
  };

  const currentLink = hoveredLink || activeLink;
  const linkIndex = links.findIndex((link) => link.to === currentLink);
  const { left, width } = getLinkPosition(linkIndex);

  // Function to determine the link class
  const getLinkClass = (link: { to: string }) => {
    const isActive = link.to === activeLink;
    return `${isActive ? 'text-green-400' : 'text-white'} pb-1 transition-all duration-300`;
  };

  return (
    <header className="bg-[#1E1E1E] text-white shadow-lg font-Consolas">
      <nav className="ml-10 mr-10 px-4 py-4">
        <ul
          ref={navRef}
          className="flex justify-start space-x-10 relative"
          onMouseLeave={() => setHoveredLink(null)} // Reset hover state when mouse leaves
        >
          {links.map((link, index) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                ref={(el) => { linkRefs.current[index] = el; }} // Save ref for each link
                className={getLinkClass(link)} // Apply dynamic classes based on hover or active
                onMouseEnter={() => setHoveredLink(link.to)} // Set hovered link
                onClick={() => setActiveLink(link.to)} // Update active link when clicked
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          {/* Underline that moves based on hover or active */}
          <span
            className="absolute bottom-0 left-0 bg-green-400 h-[2px] transition-all duration-300"
            style={{
              left: `${left}px`,
              width: `${width}px`,
            }}
          />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
