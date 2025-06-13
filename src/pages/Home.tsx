import React from 'react';
import { Link } from 'react-router-dom';  // <-- Add this import
import MeImage from '../assets/me.jpg';

const Home: React.FC = () => {
  return (
    <main
      style={{
        background: `linear-gradient(
          135deg,
          #2e3033 0%,    /* dark gray with just a touch of light */
          #1f2124 70%,   /* darker mid-tone */
          #141618 100%   /* near black */
        )`,
      }}
      className="text-[#d4d4d4] min-h-screen flex flex-col justify-center items-center px-4 py-16 text-center">
      {/* Hero Section with image to the left */}
      <section className="flex-grow flex items-center max-w-3xl w-full mb-16 space-x-8">
        {/* Image with green circular border */}
        <img
          src={MeImage}
          alt="Jamie Campbell"
          className="rounded-full border-4"
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />

        {/* Text content */}
        <div className="text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#d4d4d4]">
            Hi, I'm Jamie...
          </h1>
          <p className="text-lg md:text-xl text-green-400 max-w-2xl leading-relaxed">
            A passionate developer focused on creating clean and interactive experiences using a variety of technologies.
          </p>
        </div>
      </section>

      {/* Call to Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-16">
        <Link
          to="/projects"
          className="px-6 py-3 border border-green-300 text-green-300 rounded-lg
                     hover:bg-green-400 hover:text-black hover:border-green-400 font-semibold transition"
        >
          View Projects
        </Link>

        <Link
          to="/contact"
          className="px-6 py-3 border border-green-300 text-green-300 rounded-lg
                     hover:bg-green-400 hover:text-black hover:border-green-400 font-semibold transition"
        >
          Contact Me
        </Link>

        <a
          href="/portfolio/Jamie_Campbell_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-green-300 text-green-300 rounded-lg hover:bg-green-400 hover:text-black hover:border-green-400 font-semibold transition"
        >
          See My Resume
        </a>
      </div>

      {/* Highlighted Skills */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl w-full pb-16">
        <div className="bg-[#252526] shadow-lg rounded-xl p-6 border border-[#2d2d30]">
          <h3 className="text-xl font-semibold mb-2 text-[#569cd6]">Frontend</h3>
          <p>React, Tailwind, TypeScript, HTML5, CSS3</p>
        </div>
        <div className="bg-[#252526] shadow-lg rounded-xl p-6 border border-[#2d2d30]">
          <h3 className="text-xl font-semibold mb-2 text-[#c586c0]">Backend</h3>
          <p>Node.js, C++, C#, .Net, Java, SQL, Rest APIs</p>
        </div>
        <div className="bg-[#252526] shadow-lg rounded-xl p-6 border border-[#2d2d30]">
          <h3 className="text-xl font-semibold mb-2 text-[#d7ba7d]">Tools</h3>
          <p>GitHub, VS Code, IntelliJ</p>
        </div>
        <div className="bg-[#252526] shadow-lg rounded-xl p-6 border border-[#2d2d30]">
          <h3 className="text-xl font-semibold mb-2 text-[#9cdcfe]">IT</h3>
          <p>
            Power Platform, SharePoint, Microsoft 365, Exchange, Technical Support
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
