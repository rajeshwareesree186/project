import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Tour from './mini_project.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tour />
  </StrictMode>
);
