# Quick Start - Avvia il Template in 5 Minuti

## 1. Installa le Dipendenze

### Terminal 1 - Backend
```bash
cd backend
npm install
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
```

## 2. Popola il Database

```bash
cd backend
node seedDatabase.js
```

Output:
```
Database seeded successfully!
Test users:
Email: mario@example.com, Password: password123, Role: dipendente
Email: francesca@example.com, Password: password123, Role: dipendente
Email: admin@example.com, Password: password123, Role: admin
```

## 3. Avvia il Server Backend

### Terminal 1
```bash
cd backend
npm start
```

Dovresti vedere:
```
Server running on port 5000
MongoDB Connected: camposportivodatabase.igm6ipb.mongodb.net
```

## 4. Avvia il Frontend

### Terminal 2
```bash
cd frontend
npm start
```

Si aprirà automaticamente `http://localhost:3000`

## 5. Prova l'Applicazione

1. Vai su http://localhost:3000
2. Clicca su "Registrati" oppure usa le credenziali di test
3. Accedi con: `mario@example.com` / `password123`
4. Vedi la dashboard

## Credenziali di Test

| Email | Password | Ruolo |
|-------|----------|-------|
| mario@example.com | password123 | Dipendente |
| francesca@example.com | password123 | Dipendente |
| admin@example.com | password123 | Admin |

## Comandi Utili

### Backend
```bash
npm start      # Avvia il server
npm run dev    # Avvia con nodemon (ricarica automatica)
```

### Frontend
```bash
npm start      # Avvia il dev server
npm run build  # Crea la build produzione
```

## Testare le API con curl

### Login
```bash
curl -X POST http://localhost:5000/api/utenti/login \
  -H "Content-Type: application/json" \
  -d '{"email":"mario@example.com","password":"password123"}'
```

Copia il `token` dalla risposta e usalo nei prossimi comandi:

### Get Current User
```bash
curl -X GET http://localhost:5000/api/utenti/me \
  -H "Authorization: Bearer <token>"
```

## File Importanti da Modificare

Quando inizi il tuo caso d'uso, modifica questi file:

### Backend
- `backend/models/` - Aggiungi i tuoi modelli
- `backend/controllers/` - Aggiungi la logica
- `backend/routes/` - Aggiungi le API
- `backend/seedDatabase.js` - Modifica i dati di test

### Frontend
- `frontend/src/pages/` - Aggiungi le tue pagine
- `frontend/src/components/` - Aggiungi componenti custom
- `frontend/src/App.js` - Aggiungi le route

## Troubleshooting

### Errore: ECONNREFUSED su port 5000
- MongoDB non è connesso
- Verifica la connection string in `.env`

### Errore: Cannot find module
- Assicurati di avere fatto `npm install`
- Elimina `node_modules` e fai `npm install` di nuovo

### Errore CORS
- Verifica che `FRONTEND_URL` nel backend `.env` sia corretto

## Prossimo Passo

Leggi `GUIDA_ESTENSIONE.md` per capire come aggiungere i tuoi modelli e pagine!