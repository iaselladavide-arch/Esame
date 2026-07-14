# Academy Aziendale - Gestione Percorsi Formativi

Applicazione web full-stack per la gestione dei percorsi formativi dei dipendenti, con autenticazione e autorizzazione basate su ruoli.

## Tecnologie

- **Frontend**: React 18
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Autenticazione**: JWT

## Struttura del Progetto

```
esame-template/
├── backend/
│   ├── config/          # Configurazione database
│   ├── models/          # Modelli Mongoose
│   ├── routes/          # Route API
│   ├── controllers/      # Logica API
│   ├── middleware/       # Middleware (autenticazione, validazione)
│   ├── .env             # Variabili di ambiente
│   ├── server.js        # Entry point backend
│   ├── package.json
│   └── seedDatabase.js  # Script per dati iniziali
└── frontend/
    ├── public/          # File statici
    ├── src/
    │   ├── components/  # Componenti React
    │   ├── pages/       # Pagine
    │   ├── context/     # Context API (autenticazione)
    │   ├── App.js       # Componente principale
    │   └── index.js     # Entry point
    ├── .env             # Variabili di ambiente
    └── package.json
```

## Setup Iniziale

### 1. Backend

```bash
cd backend
npm install
node seedDatabase.js    # Popola il DB con dati di test
npm start              # Avvia il server (dev: npm run dev)
```

Il backend sarà disponibile su `http://localhost:5000`

#### Credenziali di Test

- **Dipendente 1**: mario@example.com / password123
- **Dipendente 2**: francesca@example.com / password123
- **Referente Academy**: referente@example.com / password123

### 2. Frontend

```bash
cd frontend
npm install
npm start              # Avvia il server di sviluppo
```

Il frontend sarà disponibile su `http://localhost:3000`

## Caratteristiche Implementate

### Autenticazione
- ✅ Registrazione con validazione
- ✅ Login con JWT
- ✅ Logout
- ✅ Protezione delle route

### Autorizzazione
- ✅ Controllo basato su ruoli (dipendente/referente_academy)
- ✅ Middleware di autenticazione server-side
- ✅ Protezione delle pagine frontend

### Validazione
- ✅ Validazione client-side
- ✅ Validazione server-side con express-validator
- ✅ Hash delle password con bcrypt

### Gestione Percorsi Formativi
- ✅ Catalogo corsi con categorie
- ✅ Assegnazione corsi ai dipendenti
- ✅ Tracking completamento corsi
- ✅ Statistiche di formazione aggregati

## Funzionalità Implementate

### Aggiungere un Nuovo Modello

1. Crea il file in `backend/models/TuoModello.js`:

```javascript
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  // I tuoi campi
});

module.exports = mongoose.model('TuoModello', schema);
```

2. Crea il controller in `backend/controllers/tuoController.js`

3. Crea le route in `backend/routes/tuoRoute.js`:

```javascript
const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const controller = require('../controllers/tuoController');

const router = express.Router();

router.get('/', protect, controller.getAll);
router.post('/', protect, controller.create);

module.exports = router;
```

4. Registra le route in `backend/server.js`:

```javascript
app.use('/api/tuomodello', require('./routes/tuoRoute'));
```

### Aggiungere una Nuova Pagina nel Frontend

1. Crea il file in `frontend/src/pages/MiaPagina.js`

2. Usa il hook `useAuth()` per accedere ai dati dell'utente:

```javascript
import { useAuth } from '../context/AuthContext';

const MiaPagina = () => {
  const { user, api } = useAuth();

  // Usa api per fare le richieste autenticate
  // api.get('/tuomodello'), api.post(), ecc.
};
```

3. Aggiungi la route in `frontend/src/App.js`:

```javascript
<Route
  path="/mia-pagina"
  element={
    <ProtectedRoute requiredRole="admin">
      <MiaPagina />
    </ProtectedRoute>
  }
/>
```

## API Disponibili

### Autenticazione

```
POST /api/utenti/register
POST /api/utenti/login
GET /api/utenti/me (protetto)
```

## Variabili di Ambiente

### Backend (.env)
```
MONGODB_URI=mongodb+srv://iasella_db_user:557QmUu5NBy45ex9@camposportivodatabase.igm6ipb.mongodb.net/esame_template
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Testing delle API

Usa Postman, Insomnia o curl per testare le API:

```bash
# Registrazione
curl -X POST http://localhost:5000/api/utenti/register \
  -H "Content-Type: application/json" \
  -d '{"nome":"Mario","cognome":"Rossi","email":"mario@test.com","password":"password123","confirmPassword":"password123"}'

# Login
curl -X POST http://localhost:5000/api/utenti/login \
  -H "Content-Type: application/json" \
  -d '{"email":"mario@test.com","password":"password123"}'

# Get Me (con token)
curl -X GET http://localhost:5000/api/utenti/me \
  -H "Authorization: Bearer <token>"
```

## Deployment

### Frontend

La cartella `build/` creata con `npm build` può essere deployata su:
- Vercel
- Netlify
- Firebase Hosting

### Backend

Il backend può essere deployato su:
- Heroku
- Railway
- Render
- AWS/Google Cloud

Assicurati di impostare le variabili di ambiente corrette nel servizio di hosting.

## Troubleshooting

### CORS Error
Verifica che `FRONTEND_URL` nel backend `.env` corrisponda all'URL del tuo frontend.

### Errore di Connessione MongoDB
Verifica che la connection string in `MONGODB_URI` sia corretta e che l'indirizzo IP sia whitelistato.

### Token Non Valido
Assicurati che `JWT_SECRET` sia lo stesso nel backend.

## Note Importanti

1. **Cambia il JWT_SECRET in produzione** - Non usare il valore di default!
2. **Valida sempre lato server** - Le validazioni frontend sono solo per UX
3. **Proteggi le API sensibili** - Usa il middleware `authorize()` per controllare i ruoli
4. **Backup del database** - Assicurati di avere backup regolari

## Come Estendere l'Applicazione

L'applicazione è già completa per il caso d'uso della gestione dei percorsi formativi. Per personalizzarla ulteriormente:

1. Modifica le categorie di corsi nel `seedDatabase.js`
2. Aggiungi ulteriori campi ai modelli (es: valutazione, feedback)
3. Crea endpoint API aggiuntivi per nuove funzionalità
4. Estendi il frontend con nuove pagine e componenti
5. Configura le variabili di ambiente per il tuo ambiente di deployment

Buona fortuna! 🚀
