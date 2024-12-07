import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/NavBar';
import AppRoutes from './routes';
import api from './api/axiosConfig';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Track login state properly
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await api.get('/check-auth');
        if (response && response.status === 200 && response.data.isAuthenticated) {
          setIsLoggedIn(true);
          setUser(response.data.user);
        } else {
          setIsLoggedIn(false); // If not authenticated
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsLoggedIn(false); // Assume the user is not logged in if the request fails
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = (user, token) => {
    setIsLoggedIn(true);
    setUser(user);
    localStorage.setItem('authToken', token); // Save token to localStorage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('authToken'); // Remove token on logout
  };

  if (isLoggedIn === null) {
    // Render loading state until login status is determined
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
      <AppRoutes onLogin={handleLogin} /> {/* Pass handleLogin to AppRoutes */}
    </Router>
  );
};

export default App;
