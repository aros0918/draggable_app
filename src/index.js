import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import your root component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Render the root component into the HTML element with id "root"
);
