import React, { useState } from 'react';  
import styles from '../styles/Login.module.css'; // Import the CSS module  
import { Box, Typography, TextField, Button } from '@mui/material';  

const Login = () => {  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  

  const handleLogin = (e) => {  
    e.preventDefault();  
    console.log('Login:', { email, password });  
    // Add API call for login  
  };  

  return (  
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
        <Button type="submit" variant="contained" color="primary" className={styles.button}>  
          Login  
        </Button>  
      </form>  
    </Box>  
  );  
};  

export default Login;  
