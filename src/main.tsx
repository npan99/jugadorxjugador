import React from 'react';
import ReactDOM from 'react-dom/client';
import PlayerRatingWidget from './PlayerRatingWidget';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <PlayerRatingWidget />
  </React.StrictMode>
);
