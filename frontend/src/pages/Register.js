import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    password: '',
    confirmPassword: '',
    ruolo: 'dipendente'
  });
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.nome.trim() || !formData.cognome.trim()) {
      setError('Nome e cognome non possono essere vuoti');
      return;
    }

    if (!formData.email || !formData.password) {
      setError('Tutti i campi sono obbligatori');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Le password non coincidono');
      return;
    }

    if (formData.password.length < 6) {
      setError('La password deve avere almeno 6 caratteri');
      return;
    }

    try {
      await register(
        formData.nome,
        formData.cognome,
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.ruolo
      );
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Registrazione</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Mario"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cognome">Cognome</label>
              <input
                id="cognome"
                type="text"
                name="cognome"
                value={formData.cognome}
                onChange={handleChange}
                placeholder="Rossi"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Almeno 6 caratteri"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Conferma Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Ripeti la password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ruolo">Ruolo</label>
            <select name="ruolo" id="ruolo" value={formData.ruolo} onChange={handleChange}>
              <option value="dipendente">Dipendente</option>
              <option value="admin">Amministratore</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Registrazione in corso...' : 'Registrati'}
          </button>
        </form>
        <p className="auth-link">
          Hai già un account? <Link to="/login">Accedi</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
