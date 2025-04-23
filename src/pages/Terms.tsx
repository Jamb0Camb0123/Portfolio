import React from 'react';
import HTMLViewer from "../components/HTMLViewer";

// Use import.meta.env.BASE_URL to dynamically get the correct path
const Terms: React.FC = () => {
  return <HTMLViewer filePath={`${import.meta.env.BASE_URL}TOS.html`} />;
};

export default Terms;