import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NavBar.module.css'; 
import api from '../api/axiosConfig';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../assets/images/favicon-32x32.png'; // Import image directly

const Navbar = ({ isLoggedIn }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await api.logout(); // Make sure this method logs the user out properly
    // Optionally update the `isLoggedIn` state to false
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        {/* Use imported logo */}
        <img src={logo} alt="Logo" className={styles.logo} />
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
              + Add Task
            </Link>

            {/* Avatar for logged-in users */}
            <IconButton onClick={handleAvatarClick}>
              {/* Default Avatar image */}
              <Avatar src="/path/to/default-avatar.png" />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                className: styles.menuPaper,
              }}
            >
              <MenuItem disabled className={styles.menuItem}>
                {/* You can customize this text or add a generic fallback */}
                Welcome, User
              </MenuItem>
              <MenuItem onClick={handleLogout} className={styles.menuItem}>
                <LogoutIcon style={{ marginRight: '8px' }} />
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
