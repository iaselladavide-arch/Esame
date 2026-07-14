import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './AreaReferente.css';

const AreaReferente = () => {
  const { api } = useAuth();
  const [tab, setTab] = useState('corsi');
  const [corsi, setCorsi] = useState([]);
  const [assegnazioni, setAssegnazioni] = useState([]);
  const [statistiche, setStatistiche] = useState([]);
  const [dipendenti, setDipendenti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formCorso, setFormCorso] = useState({ titolo: '', descrizione: '', categoriaId: '', durataOre: '' });
  const [formAssegnazione, setFormAssegnazione] = useState({ dipendenteId: '', corsoId: '', dataScadenza: '' });
  const [categorie, setCategorie] = useState([]);

  useEffect(() => {
    if (tab === 'corsi') fetchCorsi();
    else if (tab === 'assegnazioni') fetchAssegnazioni();
    else if (tab === 'statistiche') fetchStatistiche();
  }, [tab]);

  useEffect(() => {
    fetchCategorie();
    fetchDipendenti();
  }, []);

  const fetchCategorie = async () => {
    try {
      console.log('[INFO] Caricando categorie...');
      const response = await api.get('/categorie');
      console.log('[OK] Categorie caricate:', response.data.data);
      setCategorie(response.data.data || []);
    } catch (error) {
      console.error('[ERROR] Errore nel caricamento categorie:', error);
      console.error('Dettagli:', error.response?.data);
      alert('Errore nel caricamento categorie: ' + (error.response?.data?.message || error.message));
    }
  };

  const fetchDipendenti = async () => {
    try {
      const response = await api.get('/utenti/dipendenti');
      setDipendenti(response.data.data || []);
    } catch (error) {
      console.error('Errore nel caricamento dipendenti:', error);
    }
  };

  const fetchCorsi = async () => {
    try {
      setLoading(true);
      const response = await api.get('/corsi');
      setCorsi(response.data.data || []);
    } catch (error) {
      console.error('Errore nel caricamento corsi:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssegnazioni = async () => {
    try {
      setLoading(true);
      const response = await api.get('/assegnazioni-corsi');
      setAssegnazioni(response.data.data || []);
    } catch (error) {
      console.error('Errore nel caricamento assegnazioni:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistiche = async () => {
    try {
      setLoading(true);
      const response = await api.get('/statistiche/academy');
      setStatistiche(response.data.data || []);
    } catch (error) {
      console.error('Errore nel caricamento statistiche:', error);
    } finally {
      setLoading(false);
    }
  };

  const createCorso = async (e) => {
    e.preventDefault();
    try {
      console.log('[REQUEST] Invio corso:', formCorso);
      await api.post('/corsi', formCorso);
      setFormCorso({ titolo: '', descrizione: '', categoriaId: '', durataOre: '' });
      fetchCorsi();
    } catch (error) {
      console.error('Errore nella creazione corso:', error);
      console.error('[RESPONSE] Risposta errore:', error.response?.data);
    }
  };

  const deleteCorso = async (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questo corso?')) {
      try {
        await api.delete(`/corsi/${id}`);
        fetchCorsi();
      } catch (error) {
        console.error('Errore nella cancellazione:', error);
        alert(error.response?.data?.message || 'Errore nella cancellazione');
      }
    }
  };

  const createAssegnazione = async (e) => {
    e.preventDefault();
    try {
      console.log('[REQUEST] Invio assegnazione:', formAssegnazione);
      await api.post('/assegnazioni-corsi', formAssegnazione);
      setFormAssegnazione({ dipendenteId: '', corsoId: '', dataScadenza: '' });
      fetchAssegnazioni();
    } catch (error) {
      console.error('Errore nella creazione assegnazione:', error);
      console.error('[RESPONSE] Risposta errore:', error.response?.data);
      alert(error.response?.data?.message || 'Errore nella creazione assegnazione');
    }
  };

  const deleteAssegnazione = async (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questa assegnazione?')) {
      try {
        await api.delete(`/assegnazioni-corsi/${id}`);
        fetchAssegnazioni();
      } catch (error) {
        console.error('Errore nella cancellazione:', error);
      }
    }
  };

  if (loading) return <div className="loading">Caricamento...</div>;

  return (
    <div className="area-referente">
      <h2>Area Referente Academy</h2>

      <div className="tabs">
        <button className={tab === 'corsi' ? 'active' : ''} onClick={() => setTab('corsi')}>
          Catalogo Corsi
        </button>
        <button className={tab === 'assegnazioni' ? 'active' : ''} onClick={() => setTab('assegnazioni')}>
          Assegnazioni
        </button>
        <button className={tab === 'statistiche' ? 'active' : ''} onClick={() => setTab('statistiche')}>
          Statistiche
        </button>
      </div>

      {tab === 'corsi' && (
        <div className="tab-content">
          <div className="form-section">
            <h3>Nuovo Corso</h3>
            <form onSubmit={createCorso}>
              <input
                type="text"
                placeholder="Titolo"
                value={formCorso.titolo}
                onChange={(e) => setFormCorso({ ...formCorso, titolo: e.target.value })}
                required
              />
              <textarea
                placeholder="Descrizione"
                value={formCorso.descrizione}
                onChange={(e) => setFormCorso({ ...formCorso, descrizione: e.target.value })}
                required
              />
              <select
                value={formCorso.categoriaId}
                onChange={(e) => setFormCorso({ ...formCorso, categoriaId: e.target.value })}
                required
              >
                <option value="">Seleziona categoria</option>
                {categorie.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.nome}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Durata (ore)"
                min="1"
                value={formCorso.durataOre}
                onChange={(e) => setFormCorso({ ...formCorso, durataOre: parseInt(e.target.value) })}
                required
              />
              <button type="submit" className="btn btn-primary">Crea Corso</button>
            </form>
          </div>

          <div className="corsi-section">
            <h3>Corsi Disponibili ({corsi.length})</h3>
            {corsi.map(corso => (
              <div key={corso._id} className="item">
                <h4>{corso.titolo}</h4>
                <p>{corso.descrizione}</p>
                <p><strong>Durata:</strong> {corso.durataOre} ore</p>
                <p><strong>Stato:</strong> {corso.attivo ? '✅ Attivo' : '❌ Inattivo'}</p>
                <button onClick={() => deleteCorso(corso._id)} className="btn btn-danger">Elimina</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'assegnazioni' && (
        <div className="tab-content">
          <div className="form-section">
            <h3>Nuova Assegnazione</h3>
            <form onSubmit={createAssegnazione}>
              <select
                value={formAssegnazione.dipendenteId}
                onChange={(e) => setFormAssegnazione({ ...formAssegnazione, dipendenteId: e.target.value })}
                required
              >
                <option value="">Seleziona dipendente</option>
                {dipendenti.map(dip => (
                  <option key={dip._id} value={dip._id}>{dip.nome} {dip.cognome}</option>
                ))}
              </select>
              <select
                value={formAssegnazione.corsoId}
                onChange={(e) => setFormAssegnazione({ ...formAssegnazione, corsoId: e.target.value })}
                required
              >
                <option value="">Seleziona corso</option>
                {corsi.map(c => (
                  <option key={c._id} value={c._id}>{c.titolo}</option>
                ))}
              </select>
              <input
                type="date"
                value={formAssegnazione.dataScadenza}
                onChange={(e) => setFormAssegnazione({ ...formAssegnazione, dataScadenza: e.target.value })}
                required
              />
              <button type="submit" className="btn btn-primary">Assegna Corso</button>
            </form>
          </div>

          <h3>Assegnazioni Esistenti</h3>
          <table className="tabella">
            <thead>
              <tr>
                <th>Dipendente</th>
                <th>Corso</th>
                <th>Data Scadenza</th>
                <th>Stato</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {assegnazioni.map(ass => (
                <tr key={ass._id}>
                  <td>{ass.dipendenteId?.nome} {ass.dipendenteId?.cognome}</td>
                  <td>{ass.corsoId?.titolo}</td>
                  <td>{new Date(ass.dataScadenza).toLocaleDateString('it-IT')}</td>
                  <td><span className={`stato stato-${ass.stato.toLowerCase()}`}>{ass.stato}</span></td>
                  <td>
                    <button onClick={() => deleteAssegnazione(ass._id)} className="btn btn-small btn-danger">
                      Elimina
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'statistiche' && (
        <div className="tab-content">
          <h3>Statistiche di Completamento</h3>
          <table className="tabella">
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Assegnati</th>
                <th>Completati</th>
                <th>Percentuale</th>
              </tr>
            </thead>
            <tbody>
              {statistiche.map((stat, idx) => (
                <tr key={idx}>
                  <td>{stat.categoriaNome}</td>
                  <td>{stat.numeroAssegnazioni}</td>
                  <td>{stat.numeroCompletamenti}</td>
                  <td>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${stat.percentualeCompletamento}%` }}
                      />
                      <span>{stat.percentualeCompletamento}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AreaReferente;
