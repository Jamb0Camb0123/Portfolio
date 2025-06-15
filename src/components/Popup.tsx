import { useState, useEffect } from "react";

export default function Popup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "60px", // Adjust to your header height
        right: "20px", // Moved to the left
        backgroundColor: "#252526",
        color: "white",
        padding: "1rem 1.5rem",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        maxWidth: "320px",
        zIndex: 1000,
      }}
    >
      <button
        onClick={() => setVisible(false)}
        style={{
          position: "absolute",
          top: "8px",
          right: "16px", // Moved from right to left
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "1.25rem",
          cursor: "pointer",
        }}
        aria-label="Close popup"
      >
        &times;
      </button>

      <h2 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Like the site?</h2>
      <p style={{ margin: 0 }}>
        This website is built entirely by me using React. I’d love to hear your feedback, feel free to get in touch anytime with your thoughts.
      </p>
    </div>
  );
}
