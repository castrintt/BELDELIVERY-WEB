import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBarLeftContextProvider } from './services/contexts/NavBarLeftContext';
import { PerfilClientContextProvider } from './services/contexts/PerfilClientContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PerfilClientContextProvider>
      <NavBarLeftContextProvider>
        <App />
      </NavBarLeftContextProvider>
    </PerfilClientContextProvider>
  </React.StrictMode>
);