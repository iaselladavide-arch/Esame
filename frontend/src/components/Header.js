import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to={user ? '/dashboard' : '/'} className="logo">
          Academy Aziendale
        </Link>
        <nav className="nav">
          {user ? (
            <>
              <span className="user-info">
                {user.nome} {user.cognome} ({user.ruolo})
              </span>
              <button onClick={handleLogout} className="btn btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-link">Login</Link>
              <Link to="/register" className="btn btn-primary">Registrati</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
