import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';   
import styles from '../styles/Login.module.css'; // Import the CSS module  

const Login = () => {  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [loading, setLoading] = useState(false);   
  const [error, setError] = useState('');  
  const navigate = useNavigate();  

  const handleLogin = async (e) => {  
    e.preventDefault();  
    setLoading(true);   
    setError('');   

    try {   
      const response = await axios.post('https://tasknest-backend-c911b6c54076.herokuapp.com/api/login', {  
        username: username,   
        password: password,  
      });  

      if (response.status === 200) {  
        localStorage.setItem('token', response.data.token);   
        navigate('/dashboard');  
      }  
    } catch (error) {  
      if (error.response) {  
        setError(error.response.data.error || 'Invalid username or password');   
      } else {  
        setError('An error occurred. Please try again.');   
      }  
    } finally {  
      setLoading(false);   
    }  
  };  

  return (  
    <div className={styles.container}>  
      <h1>Login</h1>  
      <form onSubmit={handleLogin} className={styles.form}>  
        <input  
          type="text"  
          placeholder="Username"  
          value={username}  
          onChange={(e) => setUsername(e.target.value)}  
          className={styles.input}  
          required   
        />  
        <input  
          type="password"  
          placeholder="Password"  
          value={password}  
          onChange={(e) => setPassword(e.target.value)}  
          className={styles.input}  
          required   
        />  
        {error && <p className={styles.error}>{error}</p>}   
        <button type="submit" className={styles.button} disabled={loading}>  
          {loading ? 'Logging in...' : 'Login'}  
        </button>  
      </form>  
    </div>  
  );  
};  

export default Login;