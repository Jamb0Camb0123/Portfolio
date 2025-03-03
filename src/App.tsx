import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/portfolio/home" element={<Home />} />
        <Route path="/portfolio/about" element={<About />} />
        <Route path="/portfolio/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
