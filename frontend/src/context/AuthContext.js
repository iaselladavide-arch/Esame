import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });

  const register = useCallback(async (nome, cognome, email, password, confirmPassword, ruolo = 'dipendente') => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/utenti/register', {
        nome,
        cognome,
        email,
        password,
        confirmPassword,
        ruolo
      });
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Errore nella registrazione';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [api]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/utenti/login', { email, password });
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Errore nel login';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [api]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  const fetchMe = useCallback(async () => {
    if (!token) return;
    try {
      const response = await api.get('/utenti/me');
      setUser(response.data.user);
    } catch (err) {
      logout();
    }
  }, [token, api, logout]);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      error,
      register,
      login,
      logout,
      fetchMe,
      api
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
