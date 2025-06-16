import React, { useState } from 'react';

const About: React.FC = () => {
  const [openBoxes, setOpenBoxes] = useState({
    hobbies: false,
    additional: false,
    education: false,
    experience: false,
    skills: false,
  });

  const toggleBox = (key: keyof typeof openBoxes) => {
    setOpenBoxes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      style={{
  background: `linear-gradient(
    135deg,
    #2e3033 0%,
    #1f2124 70%,
    #141618 100%
  )`,
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
}}

    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#242629',
          opacity: 0.85,
          zIndex: 0,
        }}
      />

      <main
        style={{ position: 'relative', zIndex: 10 }}
        className="text-[#d4d4d4] min-h-screen px-6 py-16 flex flex-col items-center"
      >
        {/* Who am I? section */}
        <section className="max-w-8xl w-full mb-12">
          <h1 className="text-4xl md:text-6xl text-center mb-6">
            About Me
          </h1>
          <div className="max-w-5xl mx-auto text-center space-y-6 px-4 md:px-0">
            <p className="text-lg md:text-xl leading-relaxed text-green-500">
              I'm Jamie, a results-driven Computer Science graduate with a First-Class degree and hands-on experience in software development, IT support, and web technologies. I’m passionate about solving real-world problems with clean, effective code and user-focused solutions.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-green-500">
              My experience spans developing Power Platform apps, automating business processes, building SQL procedures, and supporting hybrid infrastructure environments.
            </p>
          </div>
        </section>

        {/* Boxes container */}
        <section className="w-full max-w-5xl space-y-6">

          {/* 1. Professional Experience full width */}
          <div className="bg-[#252526] shadow-lg rounded-xl border border-[#2d2d30]">
            <button
              onClick={() => toggleBox('experience')}
              className="w-full flex justify-between items-center p-6 cursor-pointer focus:outline-none"
              aria-expanded={openBoxes.experience}
            >
              <h3 className="text-xl font-semibold text-[#9cdcfe]">Professional Experience</h3>
              <span
                className={`transform transition-transform duration-300 ${
                  openBoxes.experience ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </button>
            {openBoxes.experience && (
              <div className="px-6 pb-6 pt-0 leading-relaxed space-y-10">
                <div>
                  <p className="font-semibold text-lg">IT Support Engineer</p>
                  <p className="text-sm italic mb-2">Morningfoods, Crewe | Jun 2023 – Present</p>
                  <ul className="list-disc pl-8 text-[#a3d1ff] text-base max-w-3xl mx-auto space-y-1">
                    <li>Developed and maintained Power Platform applications and automated internal processes using PowerShell scripts.</li>
                    <li>Managed SharePoint sites and intranet content using DNN (C#, JavaScript, HTML, CSS).</li>
                    <li>Provided daily technical support for hardware/software issues, reducing downtime and improving system reliability.</li>
                    <li>Assisted in administration of Microsoft 365 and Exchange in a hybrid environment.</li>
                    <li>Built SQL stored procedures and integrated REST APIs with NetSuite to improve data workflows.</li>
                    <li>Supported network troubleshooting and contributed to infrastructure projects.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-lg">Customer Service Assistant</p>
                  <p className="text-sm italic mb-2">Tenpin, Stoke-On-Trent | Nov 2022 – May 2023</p>
                  <ul className="list-disc pl-8 text-[#a3d1ff] text-base max-w-3xl mx-auto space-y-1">
                    <li>Delivered high-quality customer service across multiple departments including bar, reception, and diner.</li>
                    <li>Trained new staff on operational procedures and food safety.</li>
                    <li>Assisted with basic technical maintenance of bowling equipment.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-lg">Bartender</p>
                  <p className="text-sm italic mb-2">Bassa Villa, Bridgnorth | Jun 2020 – Sep 2022</p>
                  <ul className="list-disc pl-8 text-[#a3d1ff] text-base max-w-3xl mx-auto space-y-1">
                    <li>Provided prompt and attentive customer service while managing bar operations.</li>
                    <li>Monitored guest safety and ensured compliance with licensing regulations.</li>
                    <li>Managed stock levels and maintained cleanliness of the work area.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-lg">Shift Runner</p>
                  <p className="text-sm italic mb-2">Laser Quest, Stoke-On-Trent | Oct 2021 – Apr 2022</p>
                  <ul className="list-disc pl-8 text-[#a3d1ff] text-base max-w-3xl mx-auto space-y-1">
                    <li>Supervised daily operations and ensured adherence to safety and scheduling protocols.</li>
                    <li>Led end-of-day reconciliation tasks including cash-ups and paperwork.</li>
                    <li>Coordinated opening/closing procedures and trained new staff.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-lg">Office Assistant (Summer Placement)</p>
                  <p className="text-sm italic mb-2">National Hickman, Wolverhampton | Jun 2016 – Aug 2016</p>
                  <ul className="list-disc pl-8 text-[#a3d1ff] text-base max-w-3xl mx-auto space-y-1">
                    <li>Supported administrative and logistics tasks during departmental relocation.</li>
                    <li>Ensured accurate record-keeping and document transfer.</li>
                    <li>Collaborated with cross-departmental teams to facilitate the move.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* 2. Education full width */}
          <div className="bg-[#252526] shadow-lg rounded-xl border border-[#2d2d30]">
            <button
              onClick={() => toggleBox('education')}
              className="w-full flex justify-between items-center p-6 cursor-pointer focus:outline-none"
              aria-expanded={openBoxes.education}
            >
              <h3 className="text-xl font-semibold text-[#d7ba7d]">Education</h3>
              <span
                className={`transform transition-transform duration-300 ${
                  openBoxes.education ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </button>
            {openBoxes.education && (
              <div className="px-6 pb-6 pt-0 leading-relaxed space-y-10 text-[#d4d4d4]">
                <div>
                  <p className="font-semibold text-lg">
                    BSc Computer Science – <span className="text-[#d7ba7d]">First Class Honours</span>
                  </p>
                  <p className="text-sm italic mb-2">Staffordshire University, Stoke-On-Trent | Jun 2022</p>
                  <ul className="list-disc pl-8 text-[#d7ba7d] text-base max-w-3xl mx-auto space-y-1">
                    <li>Software Development</li>
                    <li>Web Development</li>
                    <li>Operating Systems</li>
                    <li>Networking Concepts</li>
                    <li>Cyber Security</li>
                    <li>Cloud Infrastructure</li>
                    <li>Data Structures</li> 
                    <li>Databases</li> 
                    <li>IT Infrastructure Security</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-lg">A-Levels</p>
                  <p className="text-sm italic mb-2">Codsall Community Sixth Form, Wolverhampton | 2019</p>
                  <ul className="list-disc pl-8 text-[#d7ba7d] text-base max-w-3xl mx-auto space-y-1">
                    <li>Physics (D)</li>
                    <li>Computer Science (D)</li>
                    <li>Product Design (D)</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-lg">GCSEs</p>
                  <p className="text-sm italic mb-2">Codsall Community High School, Wolverhampton | 2017</p>
                  <ul className="list-disc pl-8 text-[#d7ba7d] text-base max-w-3xl mx-auto space-y-1">
                    <li>Mathematics (7)</li>
                    <li>English Language (6)</li>
                    <li>Computer Science (B)</li>
                    <li>Physics (B)</li>
                    <li>Additional Subjects: Graphic Design, Biology, Chemistry, Business Studies, Citizenship</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* 3. Hobbies & Interests full width (swapped below Education) */}
          <div className="bg-[#252526] shadow-lg rounded-xl border border-[#2d2d30]">
            <button
              onClick={() => toggleBox('hobbies')}
              className="w-full flex justify-between items-center p-6 cursor-pointer focus:outline-none"
              aria-expanded={openBoxes.hobbies}
            >
              <h3 className="text-xl font-semibold text-[#3b82f6]">Hobbies & Interests</h3>
              <span
                className={`transform transition-transform duration-300 ${
                  openBoxes.hobbies ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </button>
            {openBoxes.hobbies && (
              <div className="px-6 pb-6 pt-0 text-[#d4d4d4] text-lg leading-relaxed space-y-4">
                <p>
                  Outside of my professional work, I lead a fulfilling personal life that keeps me grounded and inspired. I'm a proud father to a beautiful young daughter, which has enriched my life with responsibility, patience, and a deeper sense of purpose. In my spare time, I’m learning to play the guitar, enjoying the creative expression and discipline it requires.
                </p>
                <p>
                  I’m a passionate Wolverhampton Wanderers supporter and have a deep appreciation for team sports. I've actively played football and American football, experiences that have strengthened my teamwork, communication, and leadership skills.
                </p>
                <p>
                  Additionally, I’m an avid video game enthusiast who enjoys titles that challenge problem-solving, strategic thinking, and creativity — skills that complement my professional interests in software and technology.
                </p>
                <p>
                  These hobbies provide balance and continually support the development of my focus, determination, and collaboration skills.
                </p>
              </div>
            )}
          </div>

          {/* 4. Bottom row: Key Skills and Additional Information side by side, independent heights */}
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 mt-6 items-start">
{/* Key Skills box */}
<div className="flex-1 w-full md:w-auto bg-[#252526] shadow-lg rounded-xl border border-[#2d2d30] flex flex-col">
  <button
    onClick={() => toggleBox('skills')}
    className="w-full flex justify-between items-center p-6 cursor-pointer focus:outline-none"
    aria-expanded={openBoxes.skills}
  >
    <h3 className="text-xl font-semibold text-[#4ade80]">Key Skills</h3>
    <span
      className={`transform transition-transform duration-300 ${
        openBoxes.skills ? 'rotate-180' : ''
      }`}
    >
      ▼
    </span>
  </button>
  {openBoxes.skills && (
    <div className="px-6 pb-6 pt-0 text-[#4ade80]">
      <ul className="list-disc pl-8 text-base space-y-1 max-w-3xl mx-auto">
        <li>Software Development (C#, Java, PowerShell)</li>
        <li>Microsoft Power Platform (Power Automate, Power Apps)</li>
        <li>SQL Server & Stored Procedures</li>
        <li>REST APIs Integration</li>
        <li>SharePoint & DNN CMS Management</li>
        <li>Microsoft 365 & Exchange Administration</li>
        <li>Troubleshooting & IT Support</li>
        <li>Agile & Collaborative Teamwork</li>
      </ul>
    </div>
  )}
</div>

{/* Additional Information box */}
<div className="flex-1 w-full md:w-auto bg-[#252526] shadow-lg rounded-xl border border-[#2d2d30] flex flex-col">

  <button
    onClick={() => toggleBox('additional')}
    className="w-full flex justify-between items-center p-6 cursor-pointer focus:outline-none"
    aria-expanded={openBoxes.additional}
  >
    <h3 className="text-xl font-semibold text-[#a78bfa]">Additional Information</h3>
    <span
      className={`transform transition-transform duration-300 ${
        openBoxes.additional ? 'rotate-180' : ''
      }`}
    >
      ▼
    </span>
  </button>
  {openBoxes.additional && (
    <div className="px-6 pb-6 pt-0 text-[#a78bfa]">
      <ul className="list-disc pl-8 text-base space-y-1 max-w-3xl mx-auto">
        <li>Full UK Driver’s License</li>
        <li>Nationality: British</li>
        <li>Date of Birth: 26/04/2001</li>
      </ul>
    </div>
  )}
</div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
