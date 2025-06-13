import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const links = [
  { to: '/home', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' }
];

const Header: React.FC = () => {
  const [activeLink, setActiveLink] = useState('/home');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // State to store underline position
  const [underlinePos, setUnderlinePos] = useState({ left: 0, width: 0 });

  const updateUnderline = () => {
    const current = hoveredLink || activeLink;
    const index = links.findIndex(link => link.to === current);
    const linkEl = linkRefs.current[index];
    if (linkEl) {
      setUnderlinePos({ left: linkEl.offsetLeft, width: linkEl.offsetWidth });
    } else {
      setUnderlinePos({ left: 0, width: 0 });
    }
  };

  // Run layout effect after render and refs are attached
  useLayoutEffect(() => {
    updateUnderline();
  }, [activeLink, hoveredLink]);

  // Also update on window resize to keep underline aligned
  useEffect(() => {
    window.addEventListener('resize', updateUnderline);
    return () => window.removeEventListener('resize', updateUnderline);
  }, [activeLink, hoveredLink]);

  return (
    <header className="bg-[#1e1e1e] text-white shadow-lg font-Consolas">
      <nav className="mx-auto px-10 py-4 max-w-screen-xl">
        <ul
          ref={navRef}
          className="flex justify-between w-full relative"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {links.map((link, index) => (
            <li key={link.to} className="flex-1 text-center">
              <NavLink
                to={link.to}
                ref={(el) => { linkRefs.current[index] = el; }}
                className={`${link.to === activeLink ? 'text-green-400' : 'text-white'} pb-1 transition-all duration-300`}
                onMouseEnter={() => setHoveredLink(link.to)}
                onClick={() => setActiveLink(link.to)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <span
            className="absolute bottom-0 bg-green-400 h-[2px] transition-all duration-300"
            style={{ left: underlinePos.left, width: underlinePos.width }}
          />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
