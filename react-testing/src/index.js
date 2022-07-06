import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { worker } from './mocks/worker';

// temporary worker setup till backend ready
if (process.env.NODE_ENV === "development") {
  console.log(process.env.NODE_ENV)
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
