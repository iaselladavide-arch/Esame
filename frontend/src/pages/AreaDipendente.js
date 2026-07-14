import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AreaDipendente.css';

const AreaDipendente = () => {
  const { api, user } = useAuth();
  const [assegnazioni, setAssegnazioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState({ stato: '', categoria: '' });

  useEffect(() => {
    fetchAssegnazioni();
  }, [filtro]);

  const fetchAssegnazioni = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filtro.stato) params.append('stato', filtro.stato);
      if (filtro.categoria) params.append('categoria', filtro.categoria);

      const response = await api.get(`/assegnazioni-corsi?${params}`);
      setAssegnazioni(response.data.data || []);
    } catch (error) {
      console.error('Errore nel caricamento:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeCorso = async (assegnazioneId) => {
    try {
      await api.put(`/assegnazioni-corsi/${assegnazioneId}/completa`);
      fetchAssegnazioni();
    } catch (error) {
      console.error('Errore nel completamento:', error);
    }
  };

  if (loading) return <div className="loading">Caricamento...</div>;

  return (
    <div className="area-dipendente">
      <h2>I Miei Corsi</h2>

      <div className="filtri">
        <select
          value={filtro.stato}
          onChange={(e) => setFiltro({ ...filtro, stato: e.target.value })}
        >
          <option value="">Tutti gli stati</option>
          <option value="Assegnato">Assegnato</option>
          <option value="Completato">Completato</option>
          <option value="Scaduto">Scaduto</option>
        </select>
      </div>

      {assegnazioni.length === 0 ? (
        <p className="no-data">Nessun corso assegnato</p>
      ) : (
        <div className="corsi-list">
          {assegnazioni.map((assegnazione) => (
            <div key={assegnazione._id} className="corso-card">
              <h3>{assegnazione.corsoId?.titolo}</h3>
              <p><strong>Categoria:</strong> {assegnazione.corsoId?.categoriaId?.nome}</p>
              <p><strong>Durata:</strong> {assegnazione.corsoId?.durataOre} ore</p>
              <p><strong>Descrizione:</strong> {assegnazione.corsoId?.descrizione}</p>
              <p><strong>Data Scadenza:</strong> {new Date(assegnazione.dataScadenza).toLocaleDateString('it-IT')}</p>
              <p className={`stato stato-${assegnazione.stato.toLowerCase()}`}>
                <strong>Stato:</strong> {assegnazione.stato}
              </p>

              {assegnazione.stato === 'Assegnato' && (
                <button
                  onClick={() => completeCorso(assegnazione._id)}
                  className="btn btn-primary"
                >
                  Segna come Completato
                </button>
              )}

              {assegnazione.stato === 'Completato' && (
                <p className="data-completamento">
                  Completato il: {new Date(assegnazione.dataCompletamento).toLocaleDateString('it-IT')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AreaDipendente;
