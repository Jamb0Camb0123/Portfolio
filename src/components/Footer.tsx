import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

// Navigation links configuration
const links = [
  { to: "/home", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

// Custom hook for managing active link
const useActiveLink = () => {
  const location = useLocation(); // Using React Router's `useLocation` hook
  const [activeLink, setActiveLink] = useState(location.pathname); // Set initial active link to current path

  useEffect(() => {
    setActiveLink(location.pathname); // Update active link on location change
  }, [location]);

  return { activeLink, setActiveLink };
};

// Custom hook to track the position of the underline for active/hovered link
const useUnderlinePosition = (
  activeLink: string,
  hoveredLink: string | null,
  linkRefs: React.RefObject<(HTMLAnchorElement | null)[]>
) => {
  const [position, setPosition] = useState({ left: 0, width: 0 });

  // Function to update the underline position
  const updateUnderline = useCallback(() => {
    const targetLink = hoveredLink || activeLink;
    const linkIndex = links.findIndex((l) => l.to === targetLink); // Find the index of the active/hovered link
    const linkElement = linkRefs.current[linkIndex]; // Get the corresponding DOM element

    if (linkElement) {
      setPosition({ left: linkElement.offsetLeft, width: linkElement.offsetWidth }); // Set the position and width of the underline
    }
  }, [hoveredLink, activeLink]);

  // Effect to update the underline on initial render and when resizing the window
  useEffect(() => {
    updateUnderline();
    window.addEventListener("resize", updateUnderline);

    return () => window.removeEventListener("resize", updateUnderline); // Clean up the event listener
  }, [updateUnderline]);

  return position; // Return the position of the underline
};

// Custom hook for managing footer visibility based on scroll position
const useFooterVisibility = () => {
  const [visible, setVisible] = useState(true);

  // Function to determine footer visibility
  useEffect(() => {
    const updateVisibility = () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      setVisible(scrollHeight <= clientHeight || window.scrollY + window.innerHeight >= scrollHeight - 10); // Show footer when close to bottom
    };

    window.addEventListener("scroll", updateVisibility);
    window.addEventListener("resize", updateVisibility);
    updateVisibility(); // Initial check for visibility

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return visible; // Return visibility state
};

// Footer Component
const Footer: React.FC = () => {
  const { activeLink, setActiveLink } = useActiveLink(); // Manage active link state
  const [hoveredLink, setHoveredLink] = useState<string | null>(null); // Manage hovered link state
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]); // Refs for tracking the links

  // Get the underline position for the active/hovered link
  const { left, width } = useUnderlinePosition(activeLink, hoveredLink, linkRefs);
  const visible = useFooterVisibility(); // Determine if footer should be visible

  return (
    <footer
      className={`fixed bottom-0 left-0 w-full bg-gray-900 text-white shadow-lg transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Main Footer Content */}
      <div className="flex flex-col lg:flex-row items-center lg:justify-between px-6 lg:px-10 py-4 space-y-4 lg:space-y-0">
        {/* Left Section (Image Placeholder) */}
        <div className="lg:w-1/3 flex justify-center lg:justify-start">
          <img src="your-image-path.jpg" alt="Logo" className="h-12 w-auto" />
        </div>

        {/* Center Section (Navigation Links) */}
        <nav className="lg:w-1/3 w-full flex justify-center items-center">
          <ul className="flex space-x-10 relative" onMouseLeave={() => setHoveredLink(null)}>
            {links.map((link, index) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  ref={(el) => {
                    linkRefs.current[index] = el;
                  }}
                  className={`pb-1 transition-all duration-300 ${
                    link.to === activeLink ? "text-green-400" : "text-white"
                  }`}
                  onMouseEnter={() => setHoveredLink(link.to)} // Set hovered link when mouse enters
                  onClick={() => setActiveLink(link.to)} // Update active link when clicked
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            {/* Moving underline */}
            <span className="absolute bottom-0 bg-green-400 h-[2px] transition-all duration-300" style={{ left, width }} />
          </ul>
        </nav>

        {/* Right Section (Social Media Icons) */}
        <div className="lg:w-1/3 flex justify-center lg:justify-end space-x-5 text-xl">
          <a href="#" className="text-white hover:text-green-400"><FaFacebook /></a>
          <a href="#" className="text-white hover:text-green-400"><FaTwitter /></a>
          <a href="#" className="text-white hover:text-green-400"><FaInstagram /></a>
          <a href="#" className="text-white hover:text-green-400"><FaLinkedin /></a>
          <a href="#" className="text-white hover:text-green-400"><FaGithub /></a>
        </div>
      </div>

      {/* Bottom Section with Divider */}
      <div className="border-t border-gray-600 text-sm text-gray-400 py-2 flex flex-col lg:flex-row justify-between items-center px-6 lg:px-10 space-y-2 lg:space-y-0">
        {/* Left (Copyright) */}
        <div>© {new Date().getFullYear()} Jamie Campbell Portfolio Site. All Rights Reserved.</div>

        {/* Right (Links) */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
