import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct for React 18
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement); // Use createRoot in React 18

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
