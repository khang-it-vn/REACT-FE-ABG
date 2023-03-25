import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { GoogleAuthProvider } from './utils/GoogleAuthContext ';


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleAuthProvider>
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
  </GoogleAuthProvider>
);
