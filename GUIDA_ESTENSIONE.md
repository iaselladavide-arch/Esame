# Guida all'Estensione del Template

Questa guida mostra come estendere il template per il tuo caso d'uso specifico, usando l'esempio dei rimborsi spese.

## Passo 1: Creare i Modelli di Dati

### Backend: Creare il Modello della Categoria Spesa

Crea `backend/models/CategoriaSpesa.js`:

```javascript
const mongoose = require('mongoose');

const categoriaSpesaSchema = new mongoose.Schema({
  descrizione: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CategoriaSpesa', categoriaSpesaSchema);
```

### Backend: Creare il Modello della Richiesta di Rimborso

Crea `backend/models/RichiestaRimborso.js`:

```javascript
const mongoose = require('mongoose');

const richiestaRimborsoSchema = new mongoose.Schema({
  dataInserimento: {
    type: Date,
    default: Date.now
  },
  dataSpesa: {
    type: Date,
    required: true
  },
  categoriaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategoriaSpesa',
    required: true
  },
  importo: {
    type: Number,
    required: true,
    min: 0.01
  },
  descrizione: {
    type: String,
    required: true
  },
  riferimentoGiustificativo: String,
  stato: {
    type: String,
    enum: ['In attesa', 'Approvata', 'Rifiutata', 'Liquidata'],
    default: 'In attesa'
  },
  dipendenteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dataValutazione: Date,
  responsabileValutazioneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  motivazioneRifiuto: String,
  dataLiquidazione: Date
});

module.exports = mongoose.model('RichiestaRimborso', richiestaRimborsoSchema);
```

## Passo 2: Creare i Controller

### Backend: Controller per le Categorie

Crea `backend/controllers/categoriaController.js`:

```javascript
const CategoriaSpesa = require('../models/CategoriaSpesa');
const { sendSuccess, sendError } = require('../utils/response');

exports.getCategorie = async (req, res) => {
  try {
    const categorie = await CategoriaSpesa.find();
    sendSuccess(res, categorie);
  } catch (error) {
    sendError(res, error.message, 500);
  }
};

exports.createCategoria = async (req, res) => {
  try {
    const { descrizione } = req.body;

    if (!descrizione || descrizione.trim() === '') {
      return sendError(res, 'Descrizione è obbligatoria');
    }

    const categoria = new CategoriaSpesa({ descrizione: descrizione.trim() });
    await categoria.save();

    sendSuccess(res, categoria, 'Categoria creata', 201);
  } catch (error) {
    if (error.code === 11000) {
      return sendError(res, 'Categoria già esistente', 400);
    }
    sendError(res, error.message, 500);
  }
};
```

### Backend: Controller per le Richieste di Rimborso

Crea `backend/controllers/rimborsoController.js`:

```javascript
const RichiestaRimborso = require('../models/RichiestaRimborso');
const { sendSuccess, sendError } = require('../utils/response');

exports.getRimborsi = async (req, res) => {
  try {
    const { stato, categoria, mese, dipendente } = req.query;
    const filter = {};

    // Se l'utente è dipendente, vede solo i suoi rimborsi
    if (req.userRole === 'dipendente') {
      filter.dipendenteId = req.userId;
    } else if (dipendente) {
      // Se è admin e specifica un dipendente
      filter.dipendenteId = dipendente;
    }

    if (stato) filter.stato = stato;
    if (categoria) filter.categoriaId = categoria;
    if (mese) {
      const [year, month] = mese.split('-');
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
      filter.dataSpesa = { $gte: startDate, $lte: endDate };
    }

    const rimborsi = await RichiestaRimborso.find(filter)
      .populate('categoriaId', 'descrizione')
      .populate('dipendenteId', 'nome cognome')
      .populate('responsabileValutazioneId', 'nome cognome');

    sendSuccess(res, rimborsi);
  } catch (error) {
    sendError(res, error.message, 500);
  }
};

exports.createRimborso = async (req, res) => {
  try {
    const { dataSpesa, categoriaId, importo, descrizione, riferimentoGiustificativo } = req.body;

    // Validazioni
    if (!dataSpesa) return sendError(res, 'Data spesa è obbligatoria');
    if (!importo || importo <= 0) return sendError(res, 'Importo deve essere maggiore di zero');
    if (!categoriaId) return sendError(res, 'Categoria è obbligatoria');
    if (!descrizione || descrizione.trim() === '') return sendError(res, 'Descrizione è obbligatoria');

    const rimborso = new RichiestaRimborso({
      dataSpesa,
      categoriaId,
      importo,
      descrizione: descrizione.trim(),
      riferimentoGiustificativo,
      dipendenteId: req.userId
    });

    await rimborso.save();
    await rimborso.populate('categoriaId', 'descrizione');

    sendSuccess(res, rimborso, 'Rimborso creato', 201);
  } catch (error) {
    sendError(res, error.message, 500);
  }
};

exports.updateRimborso = async (req, res) => {
  try {
    const { id } = req.params;
    const rimborso = await RichiestaRimborso.findById(id);

    if (!rimborso) return sendError(res, 'Rimborso non trovato', 404);

    // Solo dipendente che ha creato il rimborso può modificarlo
    if (rimborso.dipendenteId.toString() !== req.userId) {
      return sendError(res, 'Non autorizzato', 403);
    }

    // Solo se in stato "In attesa"
    if (rimborso.stato !== 'In attesa') {
      return sendError(res, 'Rimborso non può essere modificato', 400);
    }

    Object.assign(rimborso, req.body);
    await rimborso.save();

    sendSuccess(res, rimborso);
  } catch (error) {
    sendError(res, error.message, 500);
  }
};

exports.approvaRimborso = async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return sendError(res, 'Solo admin possono approvare', 403);
    }

    const rimborso = await RichiestaRimborso.findById(req.params.id);
    if (!rimborso) return sendError(res, 'Rimborso non trovato', 404);

    rimborso.stato = 'Approvata';
    rimborso.dataValutazione = new Date();
    rimborso.responsabileValutazioneId = req.userId;
    await rimborso.save();

    sendSuccess(res, rimborso);
  } catch (error) {
    sendError(res, error.message, 500);
  }
};
```

## Passo 3: Creare le Route

Crea `backend/routes/rimborsi.js`:

```javascript
const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const rimborsoController = require('../controllers/rimborsoController');
const { body } = require('express-validator');

const router = express.Router();

router.get('/', protect, rimborsoController.getRimborsi);
router.post('/', protect, [
  body('dataSpesa').notEmpty(),
  body('categoriaId').notEmpty(),
  body('importo').isFloat({ min: 0.01 }),
  body('descrizione').notEmpty().trim()
], rimborsoController.createRimborso);
router.put('/:id', protect, rimborsoController.updateRimborso);
router.put('/:id/approva', protect, authorize('admin'), rimborsoController.approvaRimborso);

module.exports = router;
```

Registra in `server.js`:

```javascript
app.use('/api/rimborsi', require('./routes/rimborsi'));
```

## Passo 4: Creare le Pagine React

### Frontend: Lista Rimborsi

Crea `frontend/src/pages/ListaRimborsi.js`:

```javascript
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './ListaRimborsi.css';

const ListaRimborsi = () => {
  const { api, user } = useAuth();
  const [rimborsi, setRimborsi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtri, setFiltri] = useState({
    stato: '',
    categoria: '',
    mese: ''
  });

  useEffect(() => {
    fetchRimborsi();
  }, [filtri]);

  const fetchRimborsi = async () => {
    try {
      const params = new URLSearchParams();
      if (filtri.stato) params.append('stato', filtri.stato);
      if (filtri.categoria) params.append('categoria', filtri.categoria);
      if (filtri.mese) params.append('mese', filtri.mese);

      const response = await api.get(`/rimborsi?${params}`);
      setRimborsi(response.data.data);
    } catch (error) {
      console.error('Errore nel caricamento:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFiltri({
      ...filtri,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <div>Caricamento...</div>;

  return (
    <div className="lista-rimborsi">
      <h2>I miei Rimborsi</h2>

      <div className="filtri">
        <select name="stato" value={filtri.stato} onChange={handleFilterChange}>
          <option value="">Tutti gli stati</option>
          <option value="In attesa">In attesa</option>
          <option value="Approvata">Approvata</option>
          <option value="Rifiutata">Rifiutata</option>
          <option value="Liquidata">Liquidata</option>
        </select>

        <input
          type="month"
          name="mese"
          value={filtri.mese}
          onChange={handleFilterChange}
        />
      </div>

      <table className="rimborsi-table">
        <thead>
          <tr>
            <th>Data Spesa</th>
            <th>Categoria</th>
            <th>Importo</th>
            <th>Descrizione</th>
            <th>Stato</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {rimborsi.map(rimborso => (
            <tr key={rimborso._id}>
              <td>{new Date(rimborso.dataSpesa).toLocaleDateString()}</td>
              <td>{rimborso.categoriaId?.descrizione}</td>
              <td>€{rimborso.importo.toFixed(2)}</td>
              <td>{rimborso.descrizione}</td>
              <td>
                <span className={`stato stato-${rimborso.stato.toLowerCase()}`}>
                  {rimborso.stato}
                </span>
              </td>
              <td>
                {rimborso.stato === 'In attesa' && (
                  <>
                    <button>Modifica</button>
                    <button>Elimina</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaRimborsi;
```

## Passo 5: Popolare il Database Iniziale

Modifica `backend/seedDatabase.js` per aggiungere categorie e rimborsi:

```javascript
const CategoriaSpesa = require('./models/CategoriaSpesa');
const RichiestaRimborso = require('./models/RichiestaRimborso');

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear collections
    await User.deleteMany({});
    await CategoriaSpesa.deleteMany({});
    await RichiestaRimborso.deleteMany({});

    // Create users
    const users = await User.insertMany([
      // ... existing users code
    ]);

    // Create categories
    const categorie = await CategoriaSpesa.insertMany([
      { descrizione: 'Trasferta' },
      { descrizione: 'Pasto' },
      { descrizione: 'Parcheggio' },
      { descrizione: 'Pedagio' }
    ]);

    // Create sample requests
    const rimborsi = await RichiestaRimborso.insertMany([
      {
        dataSpesa: new Date('2024-01-15'),
        categoriaId: categorie[0]._id,
        importo: 150.00,
        descrizione: 'Trasferta Milano',
        dipendenteId: users[0]._id,
        stato: 'In attesa'
      }
      // ... altre richieste
    ]);

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};
```

## Checklist per l'Implementazione

- [ ] Creare tutti i modelli di dati
- [ ] Implementare tutti i controller
- [ ] Creare tutte le route API
- [ ] Testare le API con Postman
- [ ] Creare le pagine React
- [ ] Implementare la logica di filtri e ricerca
- [ ] Aggiungere la validazione client-side
- [ ] Testare il flusso completo dell'applicazione
- [ ] Popolare il database con dati realistici
- [ ] Testare l'autenticazione e autorizzazione

Buona implementazione! 🚀
