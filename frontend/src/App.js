import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import React from 'react';
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/home" />} />
      <Route path='home' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
    </Routes>
  );
}

export default App;
