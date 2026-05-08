import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.navLink}>HN Scraper</Link>
      </div>
      <div style={styles.links}>
        <Link to="/" style={styles.navLink}>Home</Link>
        
        {token ? (
          <>
            <Link to="/bookmarks" style={styles.navLink}>Bookmarks</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          
          <>
            <Link to="/login" style={styles.navLink}>Login</Link>
            <Link to="/register" style={styles.registerBtn}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};


const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 30px',
    backgroundColor: '#ff6600', 
    color: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    fontFamily: '"Segoe UI", Roboto, sans-serif'
  },
  logo: {
    fontSize: '1.4rem',
    fontWeight: 'bold'
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '16px',
    transition: 'opacity 0.3s'
  },
  logoutBtn: {
    backgroundColor: '#fff',
    color: '#ff6600',
    border: 'none',
    padding: '6px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  registerBtn: {
    backgroundColor: '#333',
    color: '#fff',
    textDecoration: 'none',
    padding: '6px 15px',
    borderRadius: '5px',
    fontSize: '14px',
    fontWeight: 'bold'
  }
};

export default Navbar;