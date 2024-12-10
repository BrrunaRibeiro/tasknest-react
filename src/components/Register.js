import React, { useState } from 'react';
import styles from '../styles/Register.module.css';
import { Box, Typography, Button, IconButton, Snackbar, Alert } from '@mui/material';
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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const navigate = useNavigate();

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
    checkEmail(email);
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
      await api.post('/register/', { email, password, confirm_password: confirmPassword });
      setSnackbar({ open: true, message: 'Registration successful!', severity: 'success' });
      setTimeout(() => navigate('/'), 3000); // Redirect after a short delay
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      setSnackbar({ open: true, message: 'Registration failed. Please try again.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const passwordLengthValid = password.length >= 8;
  const showPasswordError = password.length > 0 && !passwordLengthValid;

  const confirmMatches = passwordMatch;
  const showConfirmError = confirmPassword.length > 0 && !confirmMatches;

  return (
    <>
      <div className={styles.background}></div>
      <Box className={styles.container}>
        <Typography variant="h4" className={styles.title}>
          Register
        </Typography>
        <form onSubmit={handleRegister} className={styles.form}>
          {/* Email Field */}
          <div className={styles.input}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              className={emailError ? styles.error : ''}
              placeholder="Enter your email"
            />
            {emailError && <span className={styles.inputHelperText}>{emailError}</span>}
          </div>

          {/* Password Field */}
          <div className={styles.input}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWithIcon}>
              <input
                id="password"
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className={showPasswordError ? styles.error : ''}
                placeholder="Enter your password"
              />
              <span className={passwordLengthValid ? styles.successIcon : styles.errorIcon}>
                {password.length > 0 && (passwordLengthValid ? '✓' : '✕')}
              </span>
              <IconButton onClick={togglePasswordVisibility} className={styles.iconButton}>
                {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            {showPasswordError && <span className={styles.inputHelperText}>Password must contain minimum 8 characters</span>}
          </div>

          {/* Confirm Password Field */}
          <div className={styles.input}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={styles.inputWithIcon}>
              <input
                id="confirmPassword"
                type={isPasswordVisible ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                className={showConfirmError ? styles.error : ''}
                placeholder="Confirm your password"
              />
              <span className={confirmMatches ? styles.successIcon : styles.errorIcon}>
                {confirmPassword.length > 0 && (confirmMatches ? '✓' : '✕')}
              </span>
              <IconButton onClick={togglePasswordVisibility} className={styles.iconButton}>
                {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            {showConfirmError && <span className={styles.inputHelperText}>Passwords must match</span>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            className={styles.button}
            disabled={!passwordMatch || !!emailError || !email || !password}
          >
            Register
          </Button>
        </form>
      </Box>

      {/* Snackbar for user feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Adjust position
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
