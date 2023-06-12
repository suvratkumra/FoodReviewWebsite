import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthContextProvider from './contexts/authContext/AuthContext';
import ProfileContextProvider from './contexts/profileContext/ProfileContext';
import RestContextProvider from './contexts/restaurantContext/RestContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ProfileContextProvider>
      <RestContextProvider>
        <App />

      </RestContextProvider>
    </ProfileContextProvider>
  </AuthContextProvider >
);
