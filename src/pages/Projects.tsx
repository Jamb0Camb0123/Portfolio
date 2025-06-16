import React, { useEffect, useState } from "react";

const GITHUB_USERNAME = "Jamb0Camb0123";

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;

        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        const filtered = data.filter((repo: any) => !repo.fork);
        setRepos(filtered);
      } catch (err: any) {
        setError(err.message || "Failed to load repositories.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

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
      className="text-[#d4d4d4] min-h-screen px-6 py-16"
    >
      <h1 className="text-4xl md:text-6xl mb-6 text-[#d4d4d4] text-center">
        Explore My Projects
      </h1>
      <p className="text-lg md:text-xl text-green-400 max-w-3xl mx-auto text-center mb-12">
        Here are some of my latest projects hosted on GitHub. Click a tile to view the repository.
      </p>

      {loading ? (
        <p className="text-center text-green-400 text-lg md:text-xl">Loading projects...</p>
      ) : error ? (
        <p className="text-center text-red-400 text-lg md:text-xl">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#252526] border border-[#2d2d30] rounded-xl p-6 shadow-lg flex flex-col hover:scale-[1.05] hover:shadow-xl transition-transform duration-300"
              title={repo.description || "No description"}
            >
              <h3 className="text-xl font-semibold text-[#569cd6] mb-3">{repo.name}</h3>
              <p className="text-lg md:text-xl text-[#a6a6a6] flex-grow">
                {repo.description
                  ? repo.description.length > 80
                    ? repo.description.slice(0, 77) + "..."
                    : repo.description
                  : "No description"}
              </p>
              <div className="mt-4 text-sm text-green-400 font-medium">
                ⭐ {repo.stargazers_count}
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
};

export default Projects;
