import { useEffect, useState } from "react";

interface HTMLViewerProps {
  filePath: string;
}

const HTMLViewer: React.FC<HTMLViewerProps> = ({ filePath }) => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(filePath)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${filePath}`);
        return res.text();
      })
      .then((data) => setHtmlContent(data))
      .catch((err) => {
        console.error("Error loading document:", err);
        setError("Failed to load content.");
      });
  }, [filePath]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg text-black">
      {htmlContent ? (
        <div className="document-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        <p>Loading Document...</p>
      )}
    </div>
  );
};

export default HTMLViewer;
