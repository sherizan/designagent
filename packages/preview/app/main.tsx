import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewApp } from './PreviewApp';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <PreviewApp />
    </React.StrictMode>
  );
}
