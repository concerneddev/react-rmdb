import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App';

createRoot(document.getElementById('root')).render( // Use createRoot instead of ReactDOM.render
  <React.StrictMode> {/* Move React.StrictMode inside createRoot */}
    <App />
  </React.StrictMode>
);
