import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import Web3Modal from './config/wagmiConfig'; // Import the Web3Modal component

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Web3Modal> {/* Use the Web3Modal component */}
      <App />
    </Web3Modal>
  </React.StrictMode>
);
