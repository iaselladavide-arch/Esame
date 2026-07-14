# Academy Aziendale - Gestione Percorsi Formativi

**Esame di Stato - Web Developer Full Stack (Verona)**

---

## 📍 URL APPLICAZIONE (LIVE)

- **Frontend**: https://app-davide-iasella.onrender.com
- **Backend**: https://app-davide-iasella-backend.onrender.com/api

---

## 🔑 CREDENZIALI DI TEST

### Dipendente
- **Email**: mario@example.com
- **Password**: password123

### Dipendente 2
- **Email**: francesca@example.com
- **Password**: password123

### Referente Academy (Amministratore)
- **Email**: referente@example.com
- **Password**: password123

---

## 🧪 STRUMENTI PER TESTARE LE API

### Collection Postman
File: `Academy_Aziendale.postman_collection.json`

**Endpoint di test inclusi:**
1. `POST /api/utenti/login` - Login Referente
2. `GET /api/corsi` - Visualizza tutti i corsi
3. `GET /api/statistiche/academy` - Statistiche di formazione

**Come importare:**
1. Apri Postman
2. File → Import → Seleziona `Academy_Aziendale.postman_collection.json`
3. Copia il token dal login
4. Setta la variabile `{{token}}` in Environments

---

## 📁 STRUTTURA PROGETTO

```
esame-template/
├── backend/
│   ├── config/              # Configurazione database
│   ├── models/              # Modelli Mongoose (User, Categoria, Corso, Assegnazione)
│   ├── routes/              # Route API (auth, corsi, categorie, assegnazioni, statistiche)
│   ├── controllers/          # Logica business
│   ├── middleware/           # Autenticazione e autorizzazione
│   ├── server.js            # Entry point
│   ├── resetDatabase.js     # Script per reset/seed del database
│   ├── package.json
│   ├── .env.example         # Template variabili ambiente
│   └── vercel.json          # Configurazione Render
│
├── frontend/
│   ├── public/              # File statici
│   ├── src/
│   │   ├── components/      # Header, ProtectedRoute
│   │   ├── pages/           # Home, Login, Register, Dashboard, AreaDipendente, AreaReferente
│   │   ├── context/         # AuthContext (gestione autenticazione)
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── .env.example         # Template variabili ambiente
│   └── vercel.json          # Configurazione Vercel
│
├── GUIDA_ESAME_ORALE.md     # Domande e risposte per esame orale
├── STACK_TECNOLOGICO.md     # Tecnologie usate e motivazioni
├── Academy_Aziendale.postman_collection.json
└── README_CONSEGNA.md       # Questo file

```

---

## 🚀 COME ESEGUIRE LOCALMENTE

### Prerequisiti
- Node.js 22.x o superiore
- npm 10.x o superiore
- MongoDB (locale o Atlas cloud)

### Setup Backend

```bash
cd backend
npm install

# Copia .env.example e compila le variabili
cp .env.example .env
# Modifica .env con le tue credenziali MongoDB

# Avvia il server
npm start
# Il backend sarà disponibile su http://localhost:5000
```

### Setup Frontend

```bash
cd frontend
npm install

# Copia .env.example (di solito non serve modificare per locale)
cp .env.example .env

# Avvia il dev server
npm start
# Il frontend sarà disponibile su http://localhost:3000
```

### Popolazione Database (Dati di Test)

Dopo il setup del backend, per creare i dati di test:

```bash
cd backend
node resetDatabase.js
```

Questo crea automaticamente:
- 2 dipendenti (mario@example.com, francesca@example.com)
- 1 referente (referente@example.com)
- 4 categorie di corsi
- 4 corsi di prova
- 4 assegnazioni di prova

---

## ✨ FUNZIONALITÀ IMPLEMENTATE

### Autenticazione
- ✅ Registrazione con validazione
- ✅ Login con JWT (7 giorni di validità)
- ✅ Logout
- ✅ Protezione delle route

### Ruoli e Autorizzazione
- ✅ **Dipendente**: Visualizza solo i suoi corsi, può marcare come completati
- ✅ **Referente Academy**: Gestisce catalogo, assignazioni, statistiche

### Gestione Corsi
- ✅ Catalogo corsi con categorie
- ✅ Creazione, modifica, disattivazione corsi (referente only)
- ✅ Non può essere eliminato un corso con assegnazioni

### Gestione Assegnazioni
- ✅ Assegnazione corsi ai dipendenti
- ✅ Tracking stato: Assegnato, Completato, Scaduto, Annullato
- ✅ Stato "Scaduto" automatico quando supera dataScadenza
- ✅ Filtraggio per stato, categoria, dipendente

### Statistiche
- ✅ Aggregazione per mese e categoria
- ✅ Numero corsi assegnati vs completati
- ✅ Percentuale di completamento
- ✅ Visibile solo ai referenti

### Validazioni
- ✅ Email obbligatoria e univoca
- ✅ Password hashate con bcrypt
- ✅ Durata corso > 0
- ✅ Data scadenza >= data assegnazione
- ✅ Data completamento >= data assegnazione
- ✅ Validazioni lato server obbligatorie

---

## 🛠️ TECNOLOGIE USATE

| Componente | Tecnologia |
|-----------|-----------|
| **Frontend** | React 18 + Context API + Axios |
| **Backend** | Node.js + Express 4.18 + JWT |
| **Database** | MongoDB Atlas (cloud) + Mongoose |
| **Autenticazione** | JWT + bcryptjs |
| **Deployment** | Render (backend) + Vercel (frontend) |
| **Testing API** | Postman |

---

## 📖 DOCUMENTAZIONE AGGIUNTIVA

Leggere i seguenti file per prepararsi all'esame orale:

1. **GUIDA_ESAME_ORALE.md**
   - Domande e risposte dettagliate per ogni file
   - Come rispondere bene alla commissione
   - Argomenti difficili spiegati

2. **STACK_TECNOLOGICO.md**
   - Motivazioni di ogni scelta tecnologica
   - Architettura generale
   - Come scalare l'applicazione

---

## 🐛 TROUBLESHOOTING

### Errore: "Token non valido"
- **Soluzione**: Logout e login di nuovo
- Cancella localStorage (F12 → Application → Local Storage → Clear)

### Errore: "Connessione a MongoDB fallita"
- **Soluzione**: Verifica MONGODB_URI in .env
- Assicurati che IP sia whitelistato in MongoDB Atlas

### Errore: "CORS Error"
- **Soluzione**: Verifica FRONTEND_URL nel backend .env
- Deve corrispondere all'URL del tuo frontend

### Errore: "Cannot find module"
- **Soluzione**: Esegui `npm install` nella cartella
- Elimina `node_modules` e reinstalla se persiste

---

## ✅ CHECKLIST COMMISSIONE

- [x] Frontend deployato e raggiungibile
- [x] Backend deployato e raggiungibile
- [x] Autenticazione e autorizzazione funzionanti
- [x] Ruoli e permessi implementati
- [x] Gestione corsi completa
- [x] Gestione assegnazioni completa
- [x] Statistiche aggregate funzionanti
- [x] Validazioni server-side implementate
- [x] Dati di test realistici creati
- [x] Collection Postman per testare API
- [x] Codice organizzato e leggibile
- [x] Documentazione completa

---

## 📞 CONTATTI E INFO

**Candidato**: Davide Iasella
**Email**: iltuoiase@gmail.com
**Repository**: https://github.com/iaselladavide-arch/Esame
**Data Consegna**: [Data esame]

---

## 📝 NOTE FINALI

1. **Il database viene auto-seedato** la prima volta che il backend viene avviato
2. **Usare Postman** per testare le API in dettaglio
3. **La guida esame orale** contiene risposte per tutte le possibili domande
4. **Tutto è deployato** - non serve eseguire localmente per testare

**L'applicazione è completa e pronta per l'esame! 🚀**

