import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NavBar.module.css'; 
import api from '../api/axiosConfig';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = ({ isLoggedIn, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await api.logout();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src="/path/to/logo.png" alt="Logo" className={styles.logo} />
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

            <IconButton onClick={handleAvatarClick}>
              <Avatar src={user.avatar || '/path/to/default-avatar.png'} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  marginTop: '40px',
                  minWidth: '150px',
                },
              }}
            >
              <MenuItem disabled>
                {user.username || user.email}
              </MenuItem>
              <MenuItem onClick={handleLogout}>
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
