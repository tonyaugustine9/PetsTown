import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import SignIn from './components/SignIn/SignIn';
import SiteHome from './components/SiteHome/SiteHome';
import UserHome from './components/User/UserHome';
import UserProvider from './store/UserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="signin" element={<SignIn />} />
            <Route index element={<SiteHome />} />
          </Route>
          <Route path="userhome" element={<UserHome />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
