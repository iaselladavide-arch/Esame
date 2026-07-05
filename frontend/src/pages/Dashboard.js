import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="welcome-card">
        <h2>Benvenuto, {user?.nome} {user?.cognome}!</h2>
        <p>Ruolo: <strong>{user?.ruolo}</strong></p>
        <p>Email: <strong>{user?.email}</strong></p>
      </div>

      {user?.ruolo === 'dipendente' && (
        <div className="dashboard-content">
          <h3>Area Dipendente</h3>
          <p>Qui potrai gestire le tue richieste di rimborso.</p>
          {/* Aggiungi i tuoi componenti specifici per dipendente */}
        </div>
      )}

      {user?.ruolo === 'admin' && (
        <div className="dashboard-content">
          <h3>Area Amministratore</h3>
          <p>Qui potrai visualizzare e approvare le richieste di rimborso.</p>
          {/* Aggiungi i tuoi componenti specifici per admin */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
