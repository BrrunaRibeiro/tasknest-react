import React, { useState } from 'react';  
import styles from '../styles/Register.module.css';  
import { Box, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';  
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';  
import CloseIcon from '@mui/icons-material/Close';  
import Visibility from '@mui/icons-material/Visibility';  
import VisibilityOff from '@mui/icons-material/VisibilityOff';  
import api from '../api/axiosConfig.js';  
import { useNavigate } from 'react-router-dom';

const Register = () => {  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [confirmPassword, setConfirmPassword] = useState('');  
  const [emailError, setEmailError] = useState('');  
  const [passwordMatch, setPasswordMatch] = useState(false);  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);  

  const navigate = useNavigate(); 

  // Check if email is already registered  
  const checkEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:8000/api/check-email/?email=${email}`);
      if (response.ok) {
        const data = await response.json();
        if (data.email_exists) {
          setEmailError('This email is already registered.');
        } else {
          setEmailError('');
        }
      } else {
        throw new Error('Failed to check email.');
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setEmailError('Could not validate email. Please try again later.');
    }
  };

  const handleEmailBlur = () => {  
    checkEmail(email); // Trigger validation when the email field loses focus  
  };  

  const handlePasswordChange = (value) => {  
    setPassword(value);
    const isValidLength = value.length >= 8;
    setPasswordMatch(isValidLength && value === confirmPassword);
  };  

  const handleConfirmPasswordChange = (value) => {  
    setConfirmPassword(value);
    const isValidLength = password.length >= 8;
    setPasswordMatch(isValidLength && value === password);
  };  

  const togglePasswordVisibility = () => {  
    setIsPasswordVisible(!isPasswordVisible);  
  };  

  const handleRegister = async (e) => {  
    e.preventDefault();  

    try {  
      const response = await api.post('/register/', { email, password, confirm_password: confirmPassword });  
      console.log('Registration successful:', response.data);  
      alert('Registration successful!');
      navigate('/'); // Redirect to login page after successful registration
    } catch (error) {  
      console.error('Registration failed:', error.response ? error.response.data : error.message);  
      alert('Registration failed. Please try again.');  
    }  
  };  

  // Password Validation
  const passwordLengthValid = password.length >= 8;
  const showPasswordError = password.length > 0 && !passwordLengthValid;

  const confirmMatches = passwordMatch;
  const showConfirmError = confirmPassword.length > 0 && !confirmMatches;

  return (
    <>
      <div className={styles.background}></div> {/* Background */}
      <Box className={styles.container}>
        <Typography variant="h4" className={styles.title}>
          Register
        </Typography>
        <form onSubmit={handleRegister} className={styles.form}>
          {/* Email Field */}
          <TextField  
            label="Email"  
            variant="outlined"  
            fullWidth  
            value={email}  
            onChange={(e) => setEmail(e.target.value)}  
            onBlur={handleEmailBlur}  
            error={!!emailError}  
            helperText={emailError}  
            className={styles.input}  
          />

          {/* Password Field */}
          <TextField
            label="Password"
            type={isPasswordVisible ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className={styles.input}
            error={showPasswordError}
            helperText={showPasswordError ? 'Password must contain minimum 8 characters' : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                  {password.length > 0 &&
                    (passwordLengthValid ? (
                      <CheckCircleOutlineIcon color="success" />
                    ) : (
                      <CloseIcon color="error" />
                    ))}
                </InputAdornment>
              ),
            }}
          />

          {/* Confirm Password Field */}
          <TextField
            label="Confirm Password"
            type={isPasswordVisible ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            className={styles.input}
            error={showConfirmError}
            helperText={showConfirmError ? 'Passwords must match' : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                  {confirmPassword.length > 0 &&
                    (confirmMatches ? (
                      <CheckCircleOutlineIcon color="success" />
                    ) : (
                      <CloseIcon color="error" />
                    ))}
                </InputAdornment>
              ),
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={styles.button}
            disabled={!passwordMatch || !!emailError || !email || !password}
          >
            Register
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Register;
