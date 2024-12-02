import React from 'react';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Login from './pages/Login';  
import Dashboard from './pages/Dashboard';  
import NotFound from './pages/NotFound';  

const AppRoutes = () => {  
  return (  
    <Router>  
      <Routes>  
        <Route path="/" element={<Login />} />  
        <Route path="/dashboard" element={<Dashboard />} />  
        <Route path="*" element={<NotFound />} />  
      </Routes>  
    </Router>  
  );  
};  

export default AppRoutes;  