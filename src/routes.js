import React from 'react';  
import { Routes, Route } from 'react-router-dom'; // No need to import Router here  
import Login from './pages/Login';  
import Dashboard from './pages/Dashboard';  
import NotFound from './pages/NotFound';  

const AppRoutes = () => {  
  return (  
    <Routes>  
      <Route path="/" element={<Login />} />  
      <Route path="/dashboard" element={<Dashboard />} />  
      <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}  
    </Routes>  
  );  
};  

export default AppRoutes;  