import React from 'react';
import { useAuth } from '../context/AuthContext';
import AreaDipendente from './AreaDipendente';
import AreaReferente from './AreaReferente';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="welcome-card">
        <h2>Benvenuto, {user?.nome} {user?.cognome}!</h2>
        <p>Ruolo: <strong>{user?.ruolo === 'referente' ? 'Referente Academy' : 'Dipendente'}</strong></p>
        <p>Email: <strong>{user?.email}</strong></p>
      </div>

      {user?.ruolo === 'dipendente' && <AreaDipendente />}
      {user?.ruolo === 'referente' && <AreaReferente />}
    </div>
  );
};

export default Dashboard;
