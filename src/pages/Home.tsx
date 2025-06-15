import React from 'react';
import { FaLinkedin, FaGithub, FaFileAlt } from 'react-icons/fa';
import MeImage from '../assets/me.jpg';
import LeetCodeIcon from '../assets/leetcode-icon';

const Home: React.FC = () => {
  return (
    <main
      style={{
        background: `linear-gradient(
          135deg,
          #2e3033 0%,    
          #1f2124 70%,   
          #141618 100%   
        )`,
      }}
      className="text-[#d4d4d4] min-h-screen flex flex-col justify-center items-center px-4 py-16 text-center"
    >
      {/* Hero Section */}
      <section className="flex-grow flex items-center max-w-3xl w-full mb-16 space-x-8">
        <img
          src={MeImage}
          alt="Jamie Campbell"
          className="rounded-full border-4 border-white"
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />
        <div className="text-left">
          <h1 className="text-4xl md:text-6xl mb-6 text-[#d4d4d4]">
            Hi, I'm Jamie...
          </h1>
          <p className="text-lg md:text-xl text-green-400 max-w-2xl leading-relaxed">
            A passionate developer focused on creating clean and interactive experiences using a variety of technologies.
          </p>
        </div>
      </section>

{/* Social + Resume Icons */}
<div className="flex space-x-6 justify-center mb-16">
  {/* Resume */}
  <a
    href="/portfolio/Jamie_Campbell_CV.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="text-green-300 hover:text-black bg-transparent hover:bg-green-400 border border-green-300 hover:border-green-400 p-4 rounded-full transition w-16 h-16 flex items-center justify-center"
    title="View Resume"
    aria-label="Resume"
  >
    <FaFileAlt size={28} />
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/jamie-b-campbell/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-green-300 hover:text-black bg-transparent hover:bg-green-400 border border-green-300 hover:border-green-400 p-4 rounded-full transition w-16 h-16 flex items-center justify-center"
    title="LinkedIn"
    aria-label="LinkedIn"
  >
    <FaLinkedin size={28} />
  </a>

  {/* GitHub */}
  <a
    href="https://github.com/Jamb0Camb0123"
    target="_blank"
    rel="noopener noreferrer"
    className="text-green-300 hover:text-black bg-transparent hover:bg-green-400 border border-green-300 hover:border-green-400 p-4 rounded-full transition w-16 h-16 flex items-center justify-center"
    title="GitHub"
    aria-label="GitHub"
  >
    <FaGithub size={28} />
  </a>

  {/* LeetCode */}
  <a
    href="https://leetcode.com/u/JamboCambo123/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-green-300 hover:text-black bg-transparent hover:bg-green-400 border border-green-300 hover:border-green-400 p-4 rounded-full transition w-16 h-16 flex items-center justify-center"
    title="LeetCode"
    aria-label="LeetCode"
  >
    <LeetCodeIcon style={{ width: 28, height: 28 }} />
  </a>
</div>


      {/* Skills Section */}
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
          <p>GitHub, VS Code, IntelliJ, Powershell</p>
        </div>
        <div className="bg-[#252526] shadow-lg rounded-xl p-6 border border-[#2d2d30]">
          <h3 className="text-xl font-semibold mb-2 text-[#9cdcfe]">IT</h3>
          <p>Power Platform, SharePoint, Microsoft 365, Exchange, Technical Support</p>
        </div>
      </section>
    </main>
  );
};

export default Home;
