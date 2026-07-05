# 📚 Indice Completo - Template Esame

Questo file è la **mappa stradale** del tuo template. Consulta questi file nell'ordine giusto.

---

## 🚀 FASE 1: SETUP LOCALE (15 min)

Usa questi file per configurare il progetto localmente:

1. **[QUICK_START.md](./QUICK_START.md)** ← **LEGGI PRIMA QUESTO**
   - Come avviare il progetto in locale
   - Credenziali di test
   - Comandi base

2. **[README.md](./README.md)**
   - Documentazione completa del template
   - Struttura del progetto
   - Variabili di ambiente

---

## 🎨 FASE 2: PERSONALIZZAZIONE (Variabile)

Usa questi file per adattare il template al tuo caso d'uso:

3. **[GUIDA_ESTENSIONE.md](./GUIDA_ESTENSIONE.md)** ← **LEGGI QUESTO PER CUSTOMIZZARE**
   - Come creare nuovi modelli (es: Rimborso, Categoria)
   - Come creare controller e route
   - Come creare pagine React
   - Esempi pratici dal caso d'uso "rimborsi"

---

## 🌐 FASE 3: DEPLOYMENT (15 min)

Usa questi file per deployare su Railway + Vercel:

4. **[DEPLOY_STEP_BY_STEP.md](./DEPLOY_STEP_BY_STEP.md)** ← **LEGGI QUESTO PER DEPLOY**
   - Guida visuale passo-passo
   - Creazione repository GitHub
   - Deploy backend (Railway)
   - Deploy frontend (Vercel)
   - Test finale

5. **[DEPLOYMENT.md](./DEPLOYMENT.md)**
   - Guida dettagliata di deployment
   - Opzioni alternative
   - Troubleshooting
   - Configurazione avanzata

---

## 📂 STRUTTURA FILE IMPORTANTE

```
esame-template/
├── backend/
│   ├── config/database.js      ← Connessione MongoDB
│   ├── models/User.js          ← Modello User (base)
│   ├── routes/auth.js          ← API autenticazione
│   ├── controllers/            ← Logica API
│   ├── middleware/auth.js      ← Protezione route
│   ├── server.js               ← Entry point
│   ├── seedDatabase.js         ← Dati di test
│   ├── .env                    ← Variabili (NON committare)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── context/AuthContext.js  ← Gestione auth globale
│   │   ├── components/             ← Componenti riusabili
│   │   ├── pages/                  ← Pagine principali
│   │   └── App.js                  ← Router principale
│   ├── .env                    ← Variabili
│   └── package.json
│
└── File di Documentazione:
    ├── QUICK_START.md          ← Avvia il progetto (15 min)
    ├── GUIDA_ESTENSIONE.md     ← Come customizzare
    ├── DEPLOY_STEP_BY_STEP.md  ← Deploy tutorial
    └── DEPLOYMENT.md           ← Deploy avanzato
```

---

## 🎯 PERCORSI DI UTILIZZO

### Scenario 1: "Voglio solo testarlo localmente"

1. Leggi **QUICK_START.md**
2. Esegui i comandi
3. Accedi con mario@example.com / password123
4. Fine! ✅

---

### Scenario 2: "Voglio customizzarlo per il mio caso d'uso"

1. Leggi **QUICK_START.md** (setup locale)
2. Leggi **GUIDA_ESTENSIONE.md** (come aggiungere funzionalità)
3. Crea i tuoi modelli (es: Rimborso, Categoria)
4. Crea le tue pagine React
5. Testa localmente
6. Fine! ✅

---

### Scenario 3: "Voglio deployare il template come base per l'esame"

1. Leggi **QUICK_START.md** (setup locale)
2. Leggi **DEPLOY_STEP_BY_STEP.md** (deploy tutorial)
3. Crea account GitHub, Railway, Vercel
4. Segui i passi di deploy
5. Testa le URL pubbliche
6. Fine! ✅

---

### Scenario 4: "Voglio customizzare E deployare"

1. Leggi **QUICK_START.md** (setup)
2. Leggi **GUIDA_ESTENSIONE.md** (customizzazione)
3. Modifica il codice per il tuo caso d'uso
4. Testa localmente
5. Leggi **DEPLOY_STEP_BY_STEP.md** (deploy)
6. Deploya (Vercel + Railway aggiornano automaticamente)
7. Fine! ✅

---

## 🔐 Credenziali di Test

Quando avvii il backend (localmente o deployato), questi account sono automaticamente creati:

```
Email: mario@example.com
Password: password123
Ruolo: Dipendente

Email: francesca@example.com
Password: password123
Ruolo: Dipendente

Email: admin@example.com
Password: password123
Ruolo: Admin
```

---

## ⚙️ Tecnologie Usate

| Layer | Tecnologia | Versione |
|-------|-----------|---------|
| **Frontend** | React | 18.2.0 |
| **Backend** | Node.js + Express | 18.17.0 |
| **Database** | MongoDB Atlas | Cloud |
| **Autenticazione** | JWT | - |
| **Password Hashing** | bcryptjs | 2.4.3 |
| **Deploy Backend** | Railway | Cloud |
| **Deploy Frontend** | Vercel | Cloud |

---

## 🎓 Cosa è Già Fatto (NON devi fare)

✅ Autenticazione con JWT
✅ Registrazione e Login
✅ Password hashing con bcrypt
✅ Middleware di protezione route
✅ Validazione server-side
✅ Context API per stato globale
✅ Componenti React base
✅ Stile CSS responsive
✅ Configurazione MongoDB
✅ Seed script per dati di test
✅ File di deployment (.env, Procfile, vercel.json)
✅ Documentazione completa

---

## 🔧 Cosa Devi Fare per il Tuo Caso D'Uso

❌ → ✅ Creare i tuoi modelli (Rimborso, Categoria, ecc.)
❌ → ✅ Implementare i controller specifici
❌ → ✅ Creare le route API specifiche
❌ → ✅ Creare le pagine React per la UI
❌ → ✅ Aggiungere i dati di test specifici
❌ → ✅ Testare tutto
❌ → ✅ (Opzionale) Deployare

---

## 📞 Quick Reference

### Avviare Localmente
```bash
cd backend && npm install && npm start        # Terminal 1
cd frontend && npm install && npm start       # Terminal 2
```

### Popolare Database
```bash
cd backend
node seedDatabase.js
```

### Testare API
```bash
curl -X POST http://localhost:5000/api/utenti/login \
  -H "Content-Type: application/json" \
  -d '{"email":"mario@example.com","password":"password123"}'
```

### Git Workflow
```bash
git add .
git commit -m "Descrizione cambio"
git push origin main
```

---

## 📊 Checklist Esame

- [ ] Leggi QUICK_START.md
- [ ] Avvia il progetto localmente
- [ ] Accedi con credenziali di test
- [ ] Leggi GUIDA_ESTENSIONE.md
- [ ] Crea i tuoi modelli
- [ ] Implementa la logica
- [ ] Crea le pagine
- [ ] Testa tutto
- [ ] (Opzionale) Leggi DEPLOY_STEP_BY_STEP.md
- [ ] (Opzionale) Deploya su Vercel + Railway
- [ ] (Opzionale) Testa i link pubblici
- [ ] Pronto per l'esame! 🎉

---

## 🆘 Problemi Comuni

**P: Come cambio il JWT_SECRET?**
A: Vedi in `backend/.env` o nella variabile di Railway `JWT_SECRET`

**P: Come aggiungo un nuovo modello?**
A: Vedi "Passo 1: Creare i Modelli di Dati" in GUIDA_ESTENSIONE.md

**P: Come cambio l'indirizzo del backend nel frontend?**
A: Modifica `REACT_APP_API_URL` in `frontend/.env` o nelle variabili Vercel

**P: Il login non funziona sul deploy.**
A: Controlla che `REACT_APP_API_URL` in Vercel sia l'URL corretto di Railway

**P: Come aggiorno il deploy dopo aver cambiato il codice?**
A: Fai `git push` → Vercel e Railway si aggiornano automaticamente

---

## 📚 Risorse Esterne

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)

---

## 🎯 Summary

Hai un **template completo, pronto per essere usato**, con:
- ✅ Tutta l'infrastruttura necessaria
- ✅ Autenticazione e autorizzazione
- ✅ Documentazione passo-passo
- ✅ Pronto per il deployment
- ✅ Dati di test inclusi

**Tutto quello che devi fare è customizzarlo per il TUO caso d'uso e testarlo!**

Buona fortuna con l'esame! 🚀
