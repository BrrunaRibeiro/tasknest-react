import React from 'react';  
import { AppBar, Toolbar, Typography, Button } from '@mui/material';  
import { useNavigate } from 'react-router-dom';  

const Navbar = () => {  
  const navigate = useNavigate();  

  const handleLogout = () => {  
    localStorage.removeItem('token');  
    navigate('/');  
  };  

  return (  
    <AppBar position="static">  
      <Toolbar>  
        <Typography variant="h6" style={{ flexGrow: 1 }}>  
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