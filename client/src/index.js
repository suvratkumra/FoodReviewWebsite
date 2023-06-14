import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthContextProvider from './contexts/authContext/AuthContext';
import ListContextProvider from './contexts/listContext/ListContext';
import ProfileContextProvider from './contexts/profileContext/ProfileContext';
import RestContextProvider from './contexts/restaurantContext/RestContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ProfileContextProvider>
      <RestContextProvider>
        <ListContextProvider>
          <App />
        </ListContextProvider>
      </RestContextProvider>
    </ProfileContextProvider>
  </AuthContextProvider >
);
