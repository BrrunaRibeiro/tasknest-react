import React, { useState } from 'react';  
import styles from '../styles/Register.module.css'; // Import the CSS module  
import { Box, Typography, TextField, Button } from '@mui/material';  
import api from '../api/axiosConfig.js';

const Register = () => {  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  

  const handleRegister = async (e) => {  
    e.preventDefault(); // Prevent page reload  
    console.log('Register:', { email, password }); 
  
    try {  
      // Make the API call to the backend  
      const response = await api.post('/register/', { email, password });  
      console.log('API Response:', response); 
      // Handle success
      console.log('Registration successful:', response.data);  
      alert('Registration successful!'); // Provide feedback to the user  
    } catch (error) {  
      // Handle error 
      console.error('Registration failed:', error.response ? error.response.data : error.message);  
      alert('Registration failed. Please try again.');  
    }  
  };  

  return (  
    <Box className={styles.container}>  
      <Typography variant="h4" className={styles.title}>  
        Register  
      </Typography>  
      <form onSubmit={handleRegister} className={styles.form}>  
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
          Register  
        </Button>  
      </form>  
    </Box>  
  );  
};  

export default Register;  
