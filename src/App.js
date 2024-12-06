import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/NavBar'; // Adjust the path if needed
import AppRoutes from './routes'; // Import your routes file
import api from './api/axiosConfig';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in when the app loads
    const checkLoginStatus = async () => {
      try {
        const response = await api.get('/check-auth'); // Check if the user is logged in
        if (response.data.isAuthenticated) {
          setIsLoggedIn(true);
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Error checking auth status', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} user={user} />
      <AppRoutes /> {/* Use the AppRoutes component for your route management */}
    </Router>
  );
};

export default App;
