import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Route titles mapping
const routeTitles: { [key: string]: string } = {
  "/home": "Home",
  "/about": "About",
  "/projects": "Projects",
  "/contact": "Contact",
};

// Hook to update the page title dynamically
function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    const title = routeTitles[location.pathname] || "404 - Page Not Found"; // Use fallback title
    document.title = title;
  }, [location]);
}

function App() {
  return (
    <Router basename="/portfolio">
      <PageTitleUpdater />
      <MainContent />
    </Router>
  );
}

// Separate component to use `useLocation()` inside Router
function MainContent() {
  const location = useLocation();
  const isNotFound = !routeTitles[location.pathname]; // If route is not in `routeTitles`, it's a 404

  return (
    <div>
      {/* Show Header & Footer only if it's NOT a 404 page */}
      {!isNotFound && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> {/* 404 Page */}
      </Routes>

      {!isNotFound && <Footer />} {/* Same check for Footer */}
    </div>
  );
}

// Component to update page title
function PageTitleUpdater() {
  usePageTitle();
  return null;
}

export default App;
