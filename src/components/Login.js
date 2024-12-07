import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css'; // Importing the CSS module

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('login/', {
        username: email,  // Sending email as username
        password: password,
      });

      if (response.status === 200) {
        const { access, refresh, user } = response.data;

        // On successful login, call onLogin to update App.js state
        onLogin(user, access);

        // Save the tokens to localStorage
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className={styles.login}> 
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
