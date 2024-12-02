import React from 'react';  
import { AppBar, Toolbar, Typography, Button } from '@mui/material';  
import { useNavigate } from 'react-router-dom'; 
import styles from '../styles/NavBar.module.css';  
const Navbar = () => {  
  const navigate = useNavigate();

  const handleLogout = () => {  
    localStorage.removeItem('token'); 
    navigate('/'); 
  };  

  return (  
    <AppBar position="static" className={styles.navbar}>  
      <Toolbar>  
        <Typography variant="h6" className={styles.title}>  
          TaskNest  
        </Typography>  
        <Button color="inherit" onClick={handleLogout}>  
          Logout  
        </Button>  
      </Toolbar>  
    </AppBar>  
  );  
};  

export default Navbar;  