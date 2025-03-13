import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import LeetCodeIcon from "../assets/leetcode-icon";
import logo from "../assets/favicon-transparent.png";

// Navigation links configuration
const links = [
  { to: "/home", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" }
];

// Footer links configuration (Privacy Policy, Terms of Service)
const footerLinks = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms-of-service", label: "Terms of Service" }
];

// Custom hook for managing active link
const useActiveLink = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return { activeLink, setActiveLink };
};

// Custom hook to track underline position
const useUnderlinePosition = (
  activeLink: string,
  hoveredLink: string | null,
  linkRefs: React.RefObject<(HTMLAnchorElement | null)[]>
) => {
  const [position, setPosition] = useState({ left: 0, width: 0 });

  const updateUnderline = useCallback(() => {
    const targetLink = hoveredLink || activeLink;
    const linkIndex = links.findIndex((l) => l.to === targetLink);
    const linkElement = linkRefs.current[linkIndex];

    if (linkElement) {
      setPosition({ left: linkElement.offsetLeft, width: linkElement.offsetWidth });
    }
  }, [hoveredLink, activeLink]);

  useEffect(() => {
    updateUnderline();
    window.addEventListener("resize", updateUnderline);

    return () => window.removeEventListener("resize", updateUnderline);
  }, [updateUnderline]);

  return position;
};

// Custom hook for footer visibility (only show at bottom & update on route change)
const useFooterVisibility = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation(); // Detects route changes

  const updateVisibility = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    setVisible(scrollTop + clientHeight >= scrollHeight - 10);
  };

  useEffect(() => {
    updateVisibility(); // Run on mount & route change
    window.addEventListener("scroll", updateVisibility);
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [location]); // Runs whenever the route changes

  return visible;
};

// Footer Component
const Footer: React.FC = () => {
  const { activeLink, setActiveLink } = useActiveLink();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const { left, width } = useUnderlinePosition(activeLink, hoveredLink, linkRefs);
  const visible = useFooterVisibility();

  return (
    <footer
      className={`text-white shadow-lg transition-opacity duration-500 fixed bottom-0 left-0 w-full ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{
        background: "#1E1E1E"
      }}
    >

      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row items-center md:justify-between px-6 md:px-10 py-4 space-y-6 md:space-y-0">
        {/* Left Section (Hidden on small screens) */}
        <div className="hidden md:flex md:w-1/5 justify-center md:justify-start">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </div>

        {/* Center Section (Navigation Links) */}
        <nav className="md:w-3/5 w-full flex justify-evenly items-center">
          <ul className="flex space-x-10 relative w-full justify-evenly" onMouseLeave={() => setHoveredLink(null)}>
            {links.map((link, index) => (
              <li key={link.to} className="m-0">
                <NavLink
                  to={link.to}
                  ref={(el) => {
                    linkRefs.current[index] = el;
                  }}
                  className={`pb-1 text-lg transition-all duration-300 ${
                    link.to === activeLink ? "text-[#00FF00]" : "text-white"
                  }`}
                  onMouseEnter={() => setHoveredLink(link.to)}
                  onClick={() => setActiveLink(link.to)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            {/* Moving underline */}
            <span className="absolute bottom-0 bg-[#00FF00] h-[2px] transition-all duration-300" style={{ left, width }} />
          </ul>
        </nav>

        {/* Right Section (Social Media Icons) */}
        <div className="md:w-1/5 flex justify-center md:justify-end space-x-5 text-xl mt-4 md:mt-0">
          <a href="https://www.linkedin.com/in/jamie-b-campbell/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#00FF00] w-6 h-6"><FaLinkedin /></a>
          <a href="https://github.com/Jamb0Camb0123" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#00FF00] w-6 h-6"><FaGithub /></a>
          <a href="https://leetcode.com/u/JamboCambo123/" target="_blank" rel="noopener noreferrer" className="fill-white hover:fill-[#00FF00] w-5 h-5"><LeetCodeIcon /></a>
        </div>
      </div>

      {/* Bottom Section with Divider */}
      <div className="border-t border-gray-600 text-sm py-2 flex flex-col md:flex-row justify-between items-center px-6 md:px-10 space-y-4 md:space-y-0">
        {/* Left (Copyright) */}
        <div>© {new Date().getFullYear()} Jamie Campbell Portfolio Site.</div>

        {/* Right (Links) */}
        <div className="flex space-x-4">
          {footerLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={`text-white hover:text-[#00FF00]`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
