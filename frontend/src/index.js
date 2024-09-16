import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SearchContextProvider } from './context/searchContext';
import { AuthContextProvider } from './context/authContext';
import { RegisterContextProvider } from './context/registerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RegisterContextProvider>
    <AuthContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthContextProvider>
    </RegisterContextProvider>
  </React.StrictMode>
);

