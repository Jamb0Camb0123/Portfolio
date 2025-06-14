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

  // Track window width for responsive behavior
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

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

  const [underlinePos, setUnderlinePos] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    updateUnderline();
  }, [activeLink, hoveredLink, windowWidth]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    window.addEventListener('resize', updateUnderline);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', updateUnderline);
    };
  }, [activeLink, hoveredLink]);

  // Decide breakpoint to hide name and center links — e.g., 640px
  const showName = windowWidth >= 640;

  return (
    <header className="bg-[#1e1e1e] text-white shadow-lg font-Consolas py-4">
      <nav
        className={`mx-auto px-10 max-w-screen-xl flex items-center ${
          showName ? 'justify-between' : 'justify-center'
        }`}
      >
        {showName && (
          <div className="text-green-400 text-xl cursor-pointer select-none">
            Jamie Campbell
          </div>
        )}
        <ul
          ref={navRef}
          className="flex space-x-8 relative"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {links.map((link, index) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                ref={(el) => {
                  linkRefs.current[index] = el;
                }}
                className={({ isActive }) =>
                  `pb-1 transition-all duration-300 hover:text-green-400 ${
                    isActive ? 'text-green-400' : 'text-white'
                  }`
                }
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
