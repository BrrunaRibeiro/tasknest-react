import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/images/favicon-32x32.png';

const NavBar = ({ isLoggedIn, user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    setAnchorEl(null);
    navigate('/'); // Redirect to landing page
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <Link to="/" className={styles.navLink}>
          Home
        </Link>
        {isLoggedIn ? (
          <Link to="/dashboard" className={styles.navLink}>
            Dashboard
          </Link>) :
          ('')
        }
      </div>

      <div className={`${styles.navLinks} ${styles.desktopOnly}`}>
        {!isLoggedIn ? (
          <>
            <Link to="/login" className={`${styles.button} ${styles.loginButton}`}>
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
                Welcome {user?.username || 'User'}
              </MenuItem>
              <MenuItem onClick={handleLogout} className={styles.menuItem}>
                <LogoutIcon style={{ marginRight: '8px' }} />
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </div>

      <div className={`${styles.hamburgerMenu} ${styles.mobileOnly}`}>
        <IconButton onClick={toggleDropdown}>
          <MenuIcon />
        </IconButton>
      </div>

      {dropdownVisible && (
        <div className={`${styles.dropdownMenu} ${styles.mobileOnly}`}>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className={styles.dropdownLink}>
                Login
              </Link>
              <Link to="/register" className={styles.dropdownLink}>
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className={styles.dropdownLink}>
                Dashboard
              </Link>
              <Link to="/create-task" className={styles.dropdownLink}>
                + Add Task
              </Link>
              <Link to="#" onClick={handleLogout} className={styles.dropdownLink}>
                Logout
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
