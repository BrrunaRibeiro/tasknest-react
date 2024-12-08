import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskCreate from './components/TaskCreate';
import TaskDetail from './components/TaskDetail';
import TaskList from './components/TaskList';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

const AppRoutes = ({ onLogin }) => {
  return (
    <Routes>
      {/* Login and Register Routes */}
      <Route path="/" element={<Login onLogin={onLogin} />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard and Task Management Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/create-task" element={<TaskCreate />} />
      <Route path="/tasks/:id" element={<TaskDetail />} />

      {/* Catch-All Route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
