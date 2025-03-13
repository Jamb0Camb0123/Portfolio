import React from 'react';
import HTMLViewer from '../components/HTMLViewer';

const Privacy: React.FC = () => {
  return <HTMLViewer filePath={`${process.env.PUBLIC_URL}/PrivacyPolicy.html`} />;
};

export default Privacy;