import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthContextProvider from './contexts/authContext/AuthContext';
import ProfileContextProvider from './contexts/profileContext/ProfileContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ProfileContextProvider>
      <App />
    </ProfileContextProvider>
  </AuthContextProvider >
);
