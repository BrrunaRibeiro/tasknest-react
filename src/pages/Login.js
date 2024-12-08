import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import { Box, Typography, TextField, Button } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use the dynamically selected URL for login request
      const response = await axios.post(`${apiBaseUrl}login/`, {
        username: username,
        password: password,
      });

      console.log(response);
      if (response.status === 200) {
        // On successful login, call onLogin to update App.js state
        onLogin(user, access);
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data, error.response);
        setError(error.response.data.error || 'Invalid username or password');
      } else {
        setError('An error occurred. Please try again.');
        console.log('Login failed.', 'Error message:', error.message);
      }
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className={styles.Login}>
      <Box className={styles.container}>
        <Typography variant="h4" className={styles.title}>
          Login
        </Typography>
        <form onSubmit={handleLogin} className={styles.form}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit" variant="contained" color="primary" className={styles.button}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Login;  
