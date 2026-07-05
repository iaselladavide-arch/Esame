# Deployment Guida Completa

Questo template è pronto per essere deployato gratuitamente su **Railway** (Backend) e **Vercel** (Frontend).

## 🔧 Prerequisiti

- Account GitHub (opzionale ma consigliato)
- Account Railway (gratuito)
- Account Vercel (gratuito)

## 📋 Step 1: Preparazione del Repository

### Opzione A: Con GitHub (Consigliato)

1. Vai su https://github.com/new
2. Crea un nuovo repository (nome: `esame-template`)
3. Non aggiungere README, .gitignore, license
4. Clona il repo:

```bash
cd C:\Users\user\Desktop\Esame
git clone https://github.com/TUO_USERNAME/esame-template.git
cd esame-template
```

5. Copia i file dal template nella directory clonata
6. Poi esegui:

```bash
git add .
git commit -m "Initial commit: template full-stack"
git push -u origin main
```

### Opzione B: Senza GitHub (Locale)

Salta direttamente al passo 2, userai Railway CLI.

---

## 🚀 Step 2: Deployare il Backend su Railway

### Metodo A: Con GitHub (Più semplice)

1. Vai su https://railway.app
2. Accedi con GitHub (autorizza l'accesso)
3. Clicca **"New Project"** → **"Deploy from GitHub repo"**
4. Seleziona il tuo repository `esame-template`
5. Railway rileverà automaticamente il backend
6. Attendi il deployment

### Metodo B: Senza GitHub (Railway CLI)

1. Installa Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login:
```bash
railway login
```

3. Dal folder root del template, crea il progetto:
```bash
cd backend
railway init
```

4. Configura le variabili di ambiente in Railway:

   Nel dashboard Railway:
   - Clicca sul tuo progetto
   - **Variables** tab
   - Aggiungi le seguenti variabili:

```
MONGODB_URI=mongodb+srv://iasella_db_user:557QmUu5NBy45ex9@camposportivodatabase.igm6ipb.mongodb.net/esame_template
JWT_SECRET=esame_secret_key_change_in_production_2024
PORT=8000
NODE_ENV=production
FRONTEND_URL=https://esame-template-frontend.vercel.app
```

5. Deploy:
```bash
railway up
```

---

## 🎨 Step 3: Deployare il Frontend su Vercel

1. Vai su https://vercel.com
2. **Sign Up** con GitHub (o email)
3. Clicca **"New Project"**
4. Seleziona il repository `esame-template`
5. Seleziona **"Next.js"** come framework (o "React" se chiede)
6. Configura le **Environment Variables**:
   - Clicca su "Environment Variables"
   - Aggiungi:
     ```
     REACT_APP_API_URL=https://esame-template-backend.railway.app/api
     ```
   - Sostituisci `esame-template-backend` con il nome effettivo di Railway

7. Clicca **"Deploy"**
8. Attendi il deployment (circa 1-2 minuti)

---

## 🔄 Step 4: Collegare Frontend e Backend

Dopo il deployment, aggiorna il `.env` del frontend in Vercel:

1. Nel dashboard Vercel del tuo progetto
2. **Settings** → **Environment Variables**
3. Modifica `REACT_APP_API_URL` con l'URL effettivo del backend da Railway

---

## ✅ Verificare il Deployment

### Test del Backend

```bash
# Test login API
curl -X POST https://tuo-backend-url/api/utenti/login \
  -H "Content-Type: application/json" \
  -d '{"email":"mario@example.com","password":"password123"}'
```

### Test del Frontend

Visita il link Vercel (es: `https://esame-template.vercel.app`)

Dovresti vedere:
- ✅ Home page con pulsanti Login/Registrati
- ✅ Login con `mario@example.com` / `password123`
- ✅ Dashboard funzionante
- ✅ Dati correttamente ricaricati dal backend

---

## 📝 Credenziali di Test Deploy

Questi account sono automaticamente creati quando il backend parte:

| Email | Password | Ruolo |
|-------|----------|-------|
| mario@example.com | password123 | dipendente |
| francesca@example.com | password123 | dipendente |
| admin@example.com | password123 | admin |

---

## 🔧 Configurazione Avanzata

### Cambiare il JWT Secret

**IMPORTANTE**: In produzione, cambia il `JWT_SECRET`!

1. Genera un nuovo secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

2. Aggiorna in Railway:
   - Dashboard → Settings → Environment Variables
   - Modifica `JWT_SECRET` con il nuovo valore

### Aggiungere il Tuo Dominio Personalizzato

Railway e Vercel offrono domini gratuiti `.app`. Per usare un dominio personalizzato:

**Railway:**
- Settings → Domains
- Aggiungi il tuo dominio
- Configura i DNS (istruzioni fornite da Railway)

**Vercel:**
- Settings → Domains
- Aggiungi il tuo dominio
- Configura i DNS (istruzioni fornite da Vercel)

---

## 🐛 Troubleshooting

### Backend non si avvia (Railway)
- Verifica la connection string MongoDB
- Controlla i log: **Logs** nel dashboard Railway
- Assicurati che `MONGODB_URI` sia corretta

### Frontend mostra errore CORS
- Verifica che `FRONTEND_URL` nel backend `.env` corrisponda al URL Vercel
- Attendi 5 minuti per il rebuid automatico

### Login non funziona
- Verifica che `REACT_APP_API_URL` punti al backend corretto
- Apri DevTools (F12) → Network → controlla le richieste
- Vedi che le credenziali corrispondano: `mario@example.com` / `password123`

### Database vuoto
- Nel backend Railway, esegui manualmente:
  ```bash
  railway run node seedDatabase.js
  ```
- O aggiorna il file `seedDatabase.js` e fai un nuovo push

---

## 📊 URL Finali dopo Deploy

**Backend**: `https://[project-name]-backend.railway.app`  
**Frontend**: `https://[project-name].vercel.app`

Sostituisci `[project-name]` con il nome effettivo dei tuoi progetti.

---

## 💰 Costi

- **Railway**: Gratuito con crediti iniziali (~$5)
- **Vercel**: Gratuito illimitato per frontend
- **MongoDB Atlas**: Gratuito (cluster condiviso)

**Totale**: Gratuito! 🎉

---

## 🔄 Come Aggiornare il Deploy dopo Modifiche

### Se usi GitHub:

```bash
git add .
git commit -m "Aggiornamento feature XYZ"
git push origin main
```

Railway e Vercel si riaggiornano automaticamente!

### Se usi Railway CLI:

```bash
railway up
```

---

## ❌ Reset del Database

Per riportare il database ai dati originali:

1. Vai al backend Railway
2. Terminal → Esegui:
   ```bash
   node seedDatabase.js
   ```

---

Buon deployment! 🚀

Se hai problemi, controlla i log nel dashboard di Railway/Vercel per dettagli degli errori.
