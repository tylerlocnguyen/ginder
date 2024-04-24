import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Themes from './Themes';
import reportWebVitals from './reportWebVitals';

//Sets up the root node and renders it
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Themes />
  </React.StrictMode>
);

reportWebVitals();