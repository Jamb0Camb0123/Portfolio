import { useEffect, useState } from "react";

interface Base64ViewerProps {
  filePath: string; // Allow passing file path dynamically
}

const Base64Viewer: React.FC<Base64ViewerProps> = ({ filePath }) => {
  const [base64, setBase64] = useState<string>("");

  useEffect(() => {
    if (!filePath) return;

    fetch(filePath)
      .then((res) => res.text())
      .then((data) => setBase64(data))
      .catch((err) => console.error("Error loading file:", err));
  }, [filePath]);

  return (
    <div className="w-full h-200">
      {base64 ? (
        <iframe
          src={`data:application/pdf;base64,${base64}`}
          className="w-full h-200"
          title="Document Viewer"
        />
      ) : (
        <p>Loading Document...</p>
      )}
    </div>
  );
};

export default Base64Viewer;