# Deploy Step-by-Step: Completo Visivo

Segui questa guida per deployare il template in 15 minuti.

---

## 🎯 Obiettivi Finali

Dopo questo processo avrai:
- ✅ Backend deployato su Railway
- ✅ Frontend deployato su Vercel
- ✅ Database MongoDB funzionante
- ✅ Credenziali di test già caricate
- ✅ URL pubblico per mostrare l'esame

---

## FASE 1: Creazione Repository GitHub (5 min)

### Step 1.1: Crea Account GitHub (se non hai)

1. Vai su https://github.com/join
2. Completa la registrazione
3. Verifica l'email

### Step 1.2: Crea Nuovo Repository

1. Dopo il login, clicca l'icona **+** in alto a destra
2. Seleziona **"New repository"**
3. Compila:
   - **Repository name**: `esame-template`
   - **Description**: "Full-stack web application template with auth"
   - **Public** (importante per Vercel/Railway)
   - **NON** selezionare "Add a README file"
   - **NON** selezionare ".gitignore"
4. Clicca **"Create repository"**

### Step 1.3: Collega il Repository Locale

Apri PowerShell nella cartella `C:\Users\user\Desktop\Esame\esame-template` e esegui:

```powershell
git branch -M main
git remote add origin https://github.com/TUO_USERNAME/esame-template.git
git push -u origin main
```

Sostituisci `TUO_USERNAME` con il tuo username GitHub.

**Risultato atteso**: Vedrai i file apparire su GitHub.

---

## FASE 2: Deploy Backend su Railway (5 min)

### Step 2.1: Crea Account Railway

1. Vai su https://railway.app
2. Clicca **"Start Free"**
3. Seleziona **"Login with GitHub"**
4. Autorizza Railway ad accedere ai tuoi repository

### Step 2.2: Crea Progetto su Railway

1. Nel dashboard Railway, clicca **"New Project"**
2. Seleziona **"Deploy from GitHub repo"**
3. Seleziona il repository `esame-template`
4. Railway analizzerà il progetto...
5. Vedrai due opzioni: backend e frontend
6. **Clicca su BACKEND** (la cartella `/backend`)

### Step 2.3: Configura Variabili di Ambiente

Dopo aver selezionato il backend:

1. Vai al tab **"Variables"**
2. Clicca **"Add Variable"**
3. Aggiungi le seguenti variabili (una per una):

```
MONGODB_URI = mongodb+srv://iasella_db_user:557QmUu5NBy45ex9@camposportivodatabase.igm6ipb.mongodb.net/esame_template

JWT_SECRET = esame_secret_key_2024_change_in_prod

PORT = 8000

NODE_ENV = production

FRONTEND_URL = https://TUO_USERNAME-esame-template.vercel.app
```

Sostituisci `TUO_USERNAME` con il tuo username GitHub.

4. **Important**: Clicca il pulsante **"Deploy"** o aspetta l'auto-deploy

### Step 2.4: Ottieni l'URL del Backend

1. Aspetta che la build finisca (vedrai uno checkmark verde ✅)
2. Vai al tab **"Settings"**
3. Nella sezione **"Domains"** copia l'URL (es: `https://esame-template-backend-prod.up.railway.app`)
4. **Salva questo URL**, lo userai nel passo 3

---

## FASE 3: Deploy Frontend su Vercel (5 min)

### Step 3.1: Crea Account Vercel

1. Vai su https://vercel.com
2. Clicca **"Sign Up"**
3. Seleziona **"Continue with GitHub"**
4. Autorizza Vercel

### Step 3.2: Import Progetto

1. Nel dashboard Vercel, clicca **"Add New..."** → **"Project"**
2. Clicca **"Import Git Repository"**
3. Seleziona `esame-template`
4. Clicca **"Import"**

### Step 3.3: Configurazione Build

Apparirà una schermata di configurazione:

1. **Framework Preset**: Seleziona **"React"**
2. **Root Directory**: Seleziona la cartella **"frontend"** (importante!)
3. **Build and Output Settings**: Lascia di default
4. **Environment Variables**: Clicca per aggiungerla

Aggiungi una variabile:
```
REACT_APP_API_URL = https://TUO_URL_BACKEND/api
```

Dove `TUO_URL_BACKEND` è l'URL che hai salvato nel passo 2.4 (senza il `/api` alla fine).

Esempio:
```
REACT_APP_API_URL = https://esame-template-backend-prod.up.railway.app/api
```

5. Clicca **"Deploy"**

### Step 3.4: Attendi il Deploy

Vercel inizierà a buildare... aspetta circa 1-2 minuti.

Quando vedrai una pagina con il link del tuo sito (es: `https://esame-template-iasella.vercel.app`), il deploy è completato! ✅

---

## FASE 4: Test Finale (1 min)

### Step 4.1: Testa il Frontend

1. Clicca il link di Vercel dal passo precedente
2. Dovresti vedere la **home page** con pulsanti "Login" e "Registrati"

### Step 4.2: Test Login

1. Clicca **"Login"**
2. Inserisci:
   - Email: `mario@example.com`
   - Password: `password123`
3. Clicca **"Accedi"**
4. Dovresti vedere la **Dashboard** con il tuo nome

### Step 4.3: Test Registrazione

1. Torna indietro, clicca **"Registrati"**
2. Compila il form:
   - Nome: Mario
   - Cognome: Rossi
   - Email: marioprova@example.com
   - Password: password123
   - Conferma: password123
   - Ruolo: Dipendente
3. Clicca **"Registrati"**
4. Dovresti arrivare alla Dashboard del nuovo utente

---

## ✅ SUCCESS! Hai Deployato!

Se tutto funziona:
- ✅ Frontend su Vercel
- ✅ Backend su Railway
- ✅ Database MongoDB
- ✅ Credenziali di test
- ✅ Tutto funzionante e pubblico

---

## 🔗 Link da Salvare

Salva questi URL da qualche parte:

**Frontend (Vercel):**
```
https://TUO_USERNAME-esame-template.vercel.app
```

**Backend (Railway):**
```
https://esame-template-backend-prod.up.railway.app
```

**API Endpoint:**
```
https://esame-template-backend-prod.up.railway.app/api
```

---

## 📋 Credenziali di Test Deploy

Accedi con uno di questi account:

| Email | Password | Ruolo |
|-------|----------|-------|
| mario@example.com | password123 | Dipendente |
| francesca@example.com | password123 | Dipendente |
| admin@example.com | password123 | Admin |

---

## 🆘 Troubleshooting

### Errore: "Cannot find module 'express'"
- Vercel/Railway non ha installato le dipendenze
- Soluzione: Aspetta il rebuild automatico (5 min)

### Login non funziona
- Verifica che `REACT_APP_API_URL` sia corretto in Vercel
- Apri DevTools (F12) → Network → vedi se le richieste raggiungono Railway

### "CORS error"
- Significa che il backend non conosce l'URL del frontend
- Aggiorna `FRONTEND_URL` in Railway variables e rebuilda

### Database vuoto (no users visible)
- Aspetta che il backend finisca il primo deploy
- Railway esegue `seedDatabase.js` automaticamente (Procfile)

---

## 🔄 Come Aggiornare il Deploy

Quando modifichi il codice localmente:

```powershell
cd C:\Users\user\Desktop\Esame\esame-template
git add .
git commit -m "Descrizione cambiamenti"
git push origin main
```

**Automatic**: Vercel e Railway si aggiorneranno automaticamente!

---

## 🚀 Prossimi Passi

1. Modifica il template per il TUO caso d'uso (rimborsi, studenti, etc.)
2. Aggiungi i tuoi modelli e pagine
3. Fai commit e push → deploy automatico
4. Durante l'esame, mostra i link deployati agli esaminatori

Congratulazioni! 🎉
