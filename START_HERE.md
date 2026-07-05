# 🎯 START HERE - Inizia da Qui

Ciao! 👋 Hai appena ricevuto un **template completo** per il tuo esame. Leggi questo file per capire da dove iniziare.

---

## 🚀 TRE OPZIONI DI UTILIZZO

Scegli in base a quello che vuoi fare:

### Opzione 1️⃣: "Voglio testarlo SUBITO in locale" (5 min)

Se vuoi vedere come funziona il template:

```bash
# 1. Terminal 1
cd C:\Users\user\Desktop\Esame\esame-template\backend
npm install
npm start

# 2. Terminal 2
cd C:\Users\user\Desktop\Esame\esame-template\frontend
npm install
npm start

# 3. Si aprirà http://localhost:3000
# Login con: mario@example.com / password123
```

👉 **Leggi**: [QUICK_START.md](./QUICK_START.md)

---

### Opzione 2️⃣: "Voglio customizzarlo per il MIO caso d'uso" (Variabile)

Se vuoi adattare il template per rimborsi spese, gestione studenti, o qualunque cosa:

1. Innanzitutto fai l'Opzione 1️⃣ (test locale)
2. Poi leggi: [GUIDA_ESTENSIONE.md](./GUIDA_ESTENSIONE.md)
3. Crea i tuoi modelli (es: Rimborso, Categoria, Studente)
4. Implementa la logica
5. Crea le pagine React

👉 **Esempio**: La guida mostra come creare il sistema di rimborsi dal documento PDF che ti è stato dato.

---

### Opzione 3️⃣: "Voglio deployarlo PUBBLICO su Vercel + Railway" (15 min)

Se vuoi avere un URL pubblico da mostrare agli esaminatori:

1. Innanzitutto fai l'Opzione 1️⃣ (test locale)
2. Leggi: [DEPLOY_STEP_BY_STEP.md](./DEPLOY_STEP_BY_STEP.md)
3. Crea account GitHub, Railway, Vercel
4. Segui i passi di deploy
5. Avrai URL pubblici come:
   - `https://tuo-nome-esame-template.vercel.app` (Frontend)
   - `https://esame-template-backend.railway.app` (Backend)

👉 **Importante**: Il deploy è GRATUITO con Railway e Vercel!

---

### Opzione 4️⃣: "Voglio customizzarlo E deployarlo" ⭐

Se vuoi il set completo:

1. Opzione 1️⃣ (test locale)
2. Opzione 2️⃣ (personalizza)
3. Opzione 3️⃣ (deploy)

Quando fai `git push`, Vercel e Railway si aggiornano automaticamente! ✅

---

## 📚 Mappa dei File (Leggi in Quest'Ordine)

```
1. START_HERE.md (← Sei qui)
   ↓
2. QUICK_START.md (Avvia il progetto localmente)
   ↓
3. README.md (Capisce la struttura)
   ↓
4. GUIDA_ESTENSIONE.md (Personalizza per il tuo caso)
   ↓
5. DEPLOY_STEP_BY_STEP.md (Deploy su Vercel + Railway)
   ↓
6. INDICE_COMPLETO.md (Hai un dubbio? Consulta qui)
```

---

## ⚡ Quick Commands

### Setup e Test (una sola volta)

```bash
cd backend
npm install
node seedDatabase.js
npm start
```

In un altro terminal:
```bash
cd frontend
npm install
npm start
```

### Git Workflow (quando modifichi il codice)

```bash
git add .
git commit -m "Aggiungi funzionalità XYZ"
git push origin main
```

→ Vercel e Railway si aggiornano automaticamente!

---

## 🎓 Cosa C'è Già nel Template

✅ **Autenticazione**: Login, Signup, JWT  
✅ **Autorizzazione**: Ruoli (dipendente/admin)  
✅ **Database**: MongoDB già connesso  
✅ **Validazione**: Server-side con express-validator  
✅ **Frontend**: React con Context API  
✅ **Styling**: CSS professionale e responsive  
✅ **Dati di Test**: 3 utenti pre-creati  
✅ **Documentazione**: Guide passo-passo  
✅ **Deployment**: Configurato per Vercel + Railway  

---

## ❌ Cosa Devi Fare Tu

Per il TUO caso d'uso specifico (rimborsi, studenti, inventario, etc.):

1. Crea i tuoi **modelli** nel backend (`backend/models/`)
2. Implementa la **logica** nei controller (`backend/controllers/`)
3. Crea le **API** nelle route (`backend/routes/`)
4. Crea le **pagine** nel frontend (`frontend/src/pages/`)
5. Aggiungi i **dati di test** in `backend/seedDatabase.js`

→ La [GUIDA_ESTENSIONE.md](./GUIDA_ESTENSIONE.md) ti mostra come fare con esempi!

---

## 🔐 Credenziali di Test

Quando avvii il progetto (localmente o deployato), questi account sono automaticamente creati:

```
Email: mario@example.com
Password: password123
Ruolo: dipendente

Email: francesca@example.com
Password: password123
Ruolo: dipendente

Email: admin@example.com
Password: password123
Ruolo: admin
```

---

## 🎯 Timeline Consigliata

### Settimana 1
- [ ] Leggi QUICK_START.md
- [ ] Avvia il template localmente
- [ ] Prova il login con credenziali di test
- [ ] Comprendi la struttura del progetto

### Settimana 2-3
- [ ] Leggi GUIDA_ESTENSIONE.md
- [ ] Crea i tuoi modelli
- [ ] Implementa la logica
- [ ] Crea le pagine React
- [ ] Testa il tutto localmente

### Ultima Settimana
- [ ] (Opzionale) Leggi DEPLOY_STEP_BY_STEP.md
- [ ] (Opzionale) Deploy su Vercel + Railway
- [ ] Test finale dei link pubblici
- [ ] Pronto per l'esame!

---

## 🆘 Domande Frequenti

**D: Devo usare questo template?**
A: NO! È solo una base. Puoi usare altro se preferisci. Ma è già pronto, testato e deployabile.

**D: Posso aggiungere altre tecnologie?**
A: SÌ! Puoi aggiungere quello che vuoi (librerie, componenti, servizi). Il template è solo una base.

**D: Devo deployare per forza?**
A: NO! Il deployment è **opzionale**. Puoi testare tutto localmente. Ma mostrare un URL pubblico all'esame è un plus.

**D: E se sbaglio il deploy?**
A: Nessun problema! Puoi sempre cancellare il progetto su Railway/Vercel e rifare. È gratuito e veloce.

**D: Come cambio il database per il MIO caso d'uso?**
A: Crea i tuoi modelli! Vedi [GUIDA_ESTENSIONE.md](./GUIDA_ESTENSIONE.md) - Sezione "Passo 1: Creare i Modelli di Dati"

**D: Posso usare questo template per più esami?**
A: SÌ! È una base riutilizzabile. Basta fare un fork del repository e personalizzarlo.

---

## 📊 Struttura Cartelle

```
C:\Users\user\Desktop\Esame\esame-template\
├── backend/
│   ├── config/          ← Configurazione DB
│   ├── models/          ← Tuoi modelli (crea qui!)
│   ├── controllers/      ← Logica API (modifica qui!)
│   ├── routes/          ← API routes (crea qui!)
│   ├── middleware/      ← Auth, validazioni
│   ├── utils/
│   ├── seedDatabase.js  ← Dati di test (modifica qui!)
│   ├── server.js
│   ├── .env             ← Non committare!
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/       ← Tue pagine (crea qui!)
│   │   ├── components/  ← Componenti riusabili
│   │   ├── context/     ← Auth context
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
└── File di documentazione
    ├── START_HERE.md ← Sei qui
    ├── QUICK_START.md
    ├── README.md
    ├── GUIDA_ESTENSIONE.md
    ├── DEPLOY_STEP_BY_STEP.md
    ├── DEPLOYMENT.md
    └── INDICE_COMPLETO.md
```

---

## 🎬 Primo Passo

Apri il terminale e vai a:

```bash
cd C:\Users\user\Desktop\Esame\esame-template
```

Poi leggi:

📖 **[QUICK_START.md](./QUICK_START.md)**

Questa guida ti farà partire in **5 minuti**!

---

## ✨ In Bocca al Lupo

Hai tutto quello che ti serve per creare un'applicazione web full-stack professionale.

Il template è pronto, documentato, e testato.

Ora tocca a te customizzarlo e farci magia! ✨

Buona fortuna con l'esame! 🚀

---

**P.S.** Se hai domande, consulta [INDICE_COMPLETO.md](./INDICE_COMPLETO.md) - ha le risposte a tutto!
