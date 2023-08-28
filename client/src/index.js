import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserProvider from "./UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId = '868843873472-44sieqa82g9hh89ukghga5fmeur8fo03.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}> 
    <UserProvider>
        <App />
    </UserProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

