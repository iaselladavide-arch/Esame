import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="home-container">
        <div className="home-content">
          <h1>Benvenuto</h1>
          <p>Sei già autenticato come {user.nome} {user.cognome}</p>
          <Link to="/dashboard" className="btn btn-primary">
            Vai alla Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>App Template</h1>
        <p>Applicazione web full-stack con autenticazione</p>
        <div className="home-buttons">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Registrati
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
