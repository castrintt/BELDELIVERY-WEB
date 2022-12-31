import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBarLeftContextProvider } from './services/contexts/NavBarLeftContext';
import { PerfilClientContextProvider } from './services/contexts/PerfilClientContext';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PerfilClientContextProvider>
      <NavBarLeftContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </NavBarLeftContextProvider>
    </PerfilClientContextProvider>
  </React.StrictMode>
);