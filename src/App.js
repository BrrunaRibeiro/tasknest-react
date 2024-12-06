import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import NavBar from './components/NavBar';
import styles from './styles/NavBar.module.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userData = JSON.parse(localStorage.getItem('user'));

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} user={user} className={styles.Navbar} />
      <AppRoutes />
    </Router>
  );
};

export default App;
