import React from 'react';  
import { BrowserRouter as Router } from 'react-router-dom';  
import AppRoutes from './routes'; 
import NavBar from './components/NavBar';
import styles from './styles/NavBar.module.css';  

const App = () => {  
  return (  
    <Router> 
      <NavBar className= {styles.Navbar}/>  
      <AppRoutes />  
    </Router>  
  );  
};  

export default App;  