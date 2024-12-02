import React, { useState } from 'react';  
import styles from '../styles/Register.module.css'; // Import the CSS module  
import { Box, Typography, TextField, Button } from '@mui/material';  

const Register = () => {  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  

  const handleRegister = (e) => {  
    e.preventDefault();  
    console.log('Register:', { email, password });  
    // Add API call for registration  
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
