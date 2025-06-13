import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import LeetCodeIcon from "../assets/leetcode-icon";
import logo from "../assets/favicon-transparent.png";

const links = [
  { to: "/home", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const footerLinks = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms-of-service", label: "Terms of Service" },
];

const useActiveLink = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return { activeLink, setActiveLink };
};

const useUnderlinePosition = (
  activeLink: string,
  hoveredLink: string | null,
  linkRefs: React.RefObject<(HTMLAnchorElement | null)[]>
) => {
  const [position, setPosition] = useState({ left: 0, width: 0 });
  const [hidden, setHidden] = useState(false);

  const updateUnderline = useCallback(() => {
    const navPaths = links.map((l) => l.to);
    const targetLink = hoveredLink || activeLink;

    if (!navPaths.includes(targetLink)) {
      setHidden(true);
      return;
    }

    setHidden(false);
    const linkIndex = links.findIndex((l) => l.to === targetLink);
    const linkElement = linkRefs.current?.[linkIndex];

    if (linkElement) {
      setPosition({ left: linkElement.offsetLeft, width: linkElement.offsetWidth });
    }
  }, [hoveredLink, activeLink]);

  useEffect(() => {
    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [updateUnderline]);

  return { position, hidden };
};

const useFooterControl = () => {
  const [visible, setVisible] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Detect if page is scrollable
    setIsScrollable(document.documentElement.scrollHeight > window.innerHeight);

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
            } else {
              setVisible(false);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0,
        }
      );

      observer.observe(footer);

      return () => observer.disconnect();
    } else {
      // Fallback to always visible
      setVisible(true);
    }
  }, [footerRef]);

  return { visible, footerRef, isScrollable };
};

const Footer: React.FC = () => {
  const { activeLink, setActiveLink } = useActiveLink();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const {
    position: { left, width },
    hidden,
  } = useUnderlinePosition(activeLink, hoveredLink, linkRefs);
  const { visible, footerRef, isScrollable } = useFooterControl();

  return (
    <footer
      ref={footerRef}
      className={`text-white shadow-lg transition-opacity duration-700 ease-in-out ${
        isScrollable ? "relative" : "fixed bottom-0 left-0"
      } w-full`}
      style={{
        background: "#1e1e1e",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="flex flex-col md:flex-row items-center md:justify-between px-6 md:px-10 py-4 space-y-6 md:space-y-0">
        <div className="hidden md:flex md:w-1/5 justify-center md:justify-start">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </div>

        <nav className="md:w-3/5 w-full flex justify-evenly items-center">
          <ul
            className="flex space-x-10 relative w-full justify-evenly"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {links.map((link, index) => (
              <li key={link.to} className="m-0">
                <NavLink
                  to={link.to}
                  ref={(el) => {
                    linkRefs.current[index] = el;
                  }}
                  className={`pb-1 text-lg transition-all duration-300 ${
                    link.to === activeLink || link.to === hoveredLink
                      ? "text-[#00FF00]"
                      : "text-white"
                  }`}
                  onMouseEnter={() => setHoveredLink(link.to)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => {
                    setActiveLink(link.to);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            {!hidden && (
              <span
                className="absolute bottom-0 bg-[#00FF00] h-[2px] transition-all duration-300"
                style={{ left, width }}
              />
            )}
          </ul>
        </nav>

        <div className="md:w-1/5 flex justify-center md:justify-end space-x-5 text-xl mt-4 md:mt-0">
          <a
            href="https://www.linkedin.com/in/jamie-b-campbell/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#00FF00] w-6 h-6"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/Jamb0Camb0123"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#00FF00] w-6 h-6"
          >
            <FaGithub />
          </a>
          <a
            href="https://leetcode.com/u/JamboCambo123/"
            target="_blank"
            rel="noopener noreferrer"
            className="fill-white hover:fill-[#00FF00] w-5 h-5"
          >
            <LeetCodeIcon />
          </a>
        </div>
      </div>

      <div className="border-t border-gray-600 text-sm py-2 flex flex-col md:flex-row justify-between items-center px-6 md:px-10 space-y-4 md:space-y-0">
        <div>© {new Date().getFullYear()} Jamie Campbell Portfolio Site.</div>
        <div className="flex space-x-4">
          {footerLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="text-white hover:text-[#00FF00]"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
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
