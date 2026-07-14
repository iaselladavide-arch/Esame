# Deploy su Render - Guida Semplice

Questa guida ti farà deployare l'applicazione su **Render in 10 minuti**.
Quando finisci, avrai il sito live con dati di test pronti per l'esame.

**URL che avrai:**
- Frontend: `https://app-davide-iasella.onrender.com`
- Backend: `https://app-davide-iasella-backend.onrender.com/api`

---

## 📋 Prerequisiti

- Account GitHub (gratuito)
- Account Render (gratuito)

---

## FASE 1: Push su GitHub (2 min)

### Step 1: Crea Repository su GitHub

1. Vai a https://github.com/new
2. Compila:
   - **Repository name**: `esame`
   - **Description**: Template esame
   - **Public** ✅
   - NON selezionare "Add README"
3. Clicca **"Create repository"**

### Step 2: Push il Codice

Copia-incolla questi comandi nel PowerShell:

```powershell
cd C:\Users\user\Desktop\Esame\esame
git branch -M main
git remote add origin https://github.com/TUO_USERNAME/esame.git
git push -u origin main
```

**⚠️ Sostituisci `TUO_USERNAME` con il tuo username GitHub!**

Aspetta che finisca (vedrai righe di output).

---

## FASE 2: Deploy Backend su Render (4 min)

### Step 1: Crea Account Render

1. Vai a https://render.com
2. Clicca **"Sign up"**
3. Seleziona **"Sign up with GitHub"**
4. Autorizza Render

### Step 2: Crea il Backend Service

1. Nel dashboard Render, clicca **"New +"**
2. Seleziona **"Web Service"**
3. Seleziona **"Deploy existing code from a repository"**
4. Clicca **"Connect account"** (se richiesto)
5. Seleziona il repository `esame`
6. Clicca **"Connect"**

### Step 3: Configura il Backend

Apparirà una form. Compila così:

```
Name: app-davide-iasella-backend
Environment: Node
Region: (lascia il default, es. Frankfurt)
Branch: main
Build Command: cd backend && npm install
Start Command: cd backend && npm start
```

Clicca **"Advanced"** e aggiungi le **Environment Variables**:

```
MONGODB_URI = mongodb+srv://iasella_db_user:557QmUu5NBy45ex9@camposportivodatabase.igm6ipb.mongodb.net/esame
JWT_SECRET = esame_secret_key_2024
PORT = 8000
NODE_ENV = production
FRONTEND_URL = https://app-davide-iasella.onrender.com
```

Clicca **"Create Web Service"**.

Aspetta il deploy (2-3 minuti). Vedrai una schermata con l'URL quando è finito.

**Salva questo URL**: `https://app-davide-iasella-backend.onrender.com`

---

## FASE 3: Deploy Frontend su Render (4 min)

### Step 1: Crea il Frontend Service

1. Nel dashboard Render, clicca **"New +"**
2. Seleziona **"Static Site"** (NON Web Service!)
3. Seleziona **"Connect repository"**
4. Seleziona `esame`

### Step 2: Configura il Frontend

Compila così:

```
Name: app-davide-iasella
Environment: (lascia blank)
Build Command: cd frontend && npm install && npm run build
Publish directory: frontend/build
```

Clicca **"Create Static Site"**.

Aspetta il deploy (1-2 minuti).

### Step 3: Aggiungi le Environment Variables

1. Nel dashboard di Render, vai al tuo Frontend service
2. Clicca **"Environment"**
3. Clicca **"Add Environment Variable"**
4. Aggiungi:
   ```
   Name: REACT_APP_API_URL
   Value: https://app-davide-iasella-backend.onrender.com/api
   ```
5. Clicca **"Save"**

Render farà il rebuild automaticamente.

---

## ✅ TEST FINALE

Aspetta che entrambi i deploy finiscono (vedrai status "Live" ✅).

### Test 1: Vai al Frontend

Clicca il link di Render del tuo frontend. Dovresti vedere la home page.

### Test 2: Prova il Login

1. Clicca "Login"
2. Inserisci: `mario@example.com` / `password123`
3. Dovresti arrivare alla Dashboard

Se funziona → **PERFETTO! Hai finito!** ✅

---

## 🎉 FATTO!

Adesso hai:
- ✅ Backend deployato e live
- ✅ Frontend deployato e live
- ✅ Database MongoDB funzionante
- ✅ Dati di test pronti
- ✅ URL pubblico per mostrare all'esame

Salva questi URL da qualche parte:

```
Frontend: https://app-davide-iasella.onrender.com
Backend: https://app-davide-iasella-backend.onrender.com/api
```

---

## 🆘 Se non funziona?

### Errore: "Cannot find module"
→ Aspetta il rebuild automatico (5-10 min)

### Login non funziona
→ Controlla che `REACT_APP_API_URL` nel frontend sia l'URL corretto del backend

### "Waiting for Dyno to boot"
→ È il container che si sta avviando. Aspetta 30 secondi.

### Database vuoto
→ Render esegue il seeding automatico al primo avvio se il database è vuoto

---

## 🔄 Come Aggiornare il Deploy

Quando modifichi il codice:

```bash
git add .
git commit -m "Descrizione cambio"
git push origin main
```

Render si aggiorna automaticamente! ✅

---

## 💡 Durante l'Esame

Quando l'esaminatore ti chiede il sito:

1. Apri il link Frontend
2. Mostra il login
3. Accedi con le credenziali di test
4. Dimostra la dashboard
5. FINITO! ✅

Non devi fare NIENTE durante l'esame, è tutto già live e funzionante.

---

## 📝 Credenziali di Test Live

```
mario@example.com / password123 (Dipendente)
francesca@example.com / password123 (Dipendente)
referente@example.com / password123 (Referente Academy)
```

---

Buona fortuna! 🚀
