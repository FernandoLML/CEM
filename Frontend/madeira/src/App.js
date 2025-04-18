import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/login';
import Passreset from './Pages/passreset'; 
import Redefpass from './Pages/redefpass';
import Register from './Pages/register';
import HomePage from './Pages/home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/passreset" element={<Passreset />} />
        <Route path="/redefpass" element={<Redefpass />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
