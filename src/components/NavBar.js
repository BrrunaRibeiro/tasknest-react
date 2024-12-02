import React from 'react';  
import { Link } from 'react-router-dom';  

const Navbar = () => {  
  return (  
    <nav style={{ padding: '10px', backgroundColor: '#1976d2', color: 'white' }}>  
      <Link to="/" style={{ marginRight: '10px', color: 'white', textDecoration: 'none' }}>  
        Login  
      </Link>  
      <Link to="/register" style={{ marginRight: '10px', color: 'white', textDecoration: 'none' }}>  
        Register  
      </Link>  
      <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>  
        Dashboard  
      </Link>  
    </nav>  
  );  
};  

export default Navbar;  