import React from 'react';  
import { Link } from 'react-router-dom';  
import styles from '../styles/NavBar.module.css'; // Ensure this path is correct  

const Navbar = ({ isLoggedIn, onLogout }) => {  
  return (  
    <nav className={styles.navbar}>  
      <div className={styles.logoContainer}>  
        <img src="/path/to/logo.png" alt="Logo" className={styles.logo} /> {/* Replace with your logo path */}  
        <Link to="/dashboard" className={styles.navLink}>  
          Dashboard  
        </Link>  
      </div>  
      <div className={styles.navLinks}>  
        {!isLoggedIn ? (  
          <>  
            <Link to="/" className={styles.button}>  
              Login  
            </Link>  
            <Link to="/register" className={styles.button}>  
              Register  
            </Link>  
          </>  
        ) : (  
          <>  
            <Link to="/create-task" className={styles.button}>  
              +  
            </Link>  
            <button onClick={onLogout} className={styles.button}>  
              Logout  
            </button>  
          </>  
        )}  
      </div>  
    </nav>  
  );  
};  

export default Navbar;