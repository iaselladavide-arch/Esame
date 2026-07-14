require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const categorieRoutes = require('./routes/categorie');
const corsiRoutes = require('./routes/corsi');
const assegnazioniRoutes = require('./routes/assegnazioni');
const statisticheRoutes = require('./routes/statistiche');
const User = require('./models/User');
const Categoria = require('./models/Categoria');
const CorsoAcademy = require('./models/CorsoAcademy');
const AssegnazioneCorso = require('./models/AssegnazioneCorso');

const app = express();

const initializeDatabase = async () => {
  try {
    await connectDB();

    const userCount = await User.countDocuments();

    if (userCount === 0) {
      console.log('Database empty. Seeding with test data...');

      const categorie = await Categoria.insertMany([
        { nome: 'Sicurezza', descrizione: 'Corsi di sicurezza sul lavoro' },
        { nome: 'Sviluppo', descrizione: 'Corsi di sviluppo software' },
        { nome: 'Leadership', descrizione: 'Corsi di leadership' },
        { nome: 'Lingue', descrizione: 'Corsi di lingue straniere' }
      ]);

      const testUsers = [
        {
          nome: 'Mario',
          cognome: 'Rossi',
          email: 'mario@example.com',
          password: 'password123',
          ruolo: 'dipendente'
        },
        {
          nome: 'Francesca',
          cognome: 'Verdi',
          email: 'francesca@example.com',
          password: 'password123',
          ruolo: 'dipendente'
        },
        {
          nome: 'Referente',
          cognome: 'Academy',
          email: 'referente@example.com',
          password: 'password123',
          ruolo: 'referente'
        }
      ];

      for (let user of testUsers) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }

      const users = await User.insertMany(testUsers);

      const corsi = await CorsoAcademy.insertMany([
        {
          titolo: 'Sicurezza Generale',
          descrizione: 'Corso introduttivo sulla sicurezza nel lavoro',
          categoriaId: categorie[0]._id,
          durataOre: 8,
          obbligatorio: true,
          attivo: true
        },
        {
          titolo: 'JavaScript Avanzato',
          descrizione: 'Corso su JavaScript moderno e framework',
          categoriaId: categorie[1]._id,
          durataOre: 16,
          obbligatorio: false,
          attivo: true
        },
        {
          titolo: 'Leadership Efficace',
          descrizione: 'Tecniche di leadership per team leader',
          categoriaId: categorie[2]._id,
          durataOre: 12,
          obbligatorio: false,
          attivo: true
        },
        {
          titolo: 'Inglese Commerciale',
          descrizione: 'Inglese per il business',
          categoriaId: categorie[3]._id,
          durataOre: 20,
          obbligatorio: false,
          attivo: true
        }
      ]);

      const dataInizio = new Date();
      const dataFine = new Date(dataInizio.getTime() + 30 * 24 * 60 * 60 * 1000);

      await AssegnazioneCorso.insertMany([
        {
          corsoId: corsi[0]._id,
          dipendenteId: users[0]._id,
          dataAssegnazione: dataInizio,
          dataScadenza: dataFine,
          stato: 'Assegnato'
        },
        {
          corsoId: corsi[1]._id,
          dipendenteId: users[0]._id,
          dataAssegnazione: dataInizio,
          dataScadenza: dataFine,
          stato: 'Completato',
          dataCompletamento: new Date(dataInizio.getTime() + 10 * 24 * 60 * 60 * 1000)
        },
        {
          corsoId: corsi[2]._id,
          dipendenteId: users[1]._id,
          dataAssegnazione: dataInizio,
          dataScadenza: dataFine,
          stato: 'Assegnato'
        },
        {
          corsoId: corsi[3]._id,
          dipendenteId: users[1]._id,
          dataAssegnazione: dataInizio,
          dataScadenza: dataFine,
          stato: 'Assegnato'
        }
      ]);

      console.log('[OK] Database seeded successfully!');
      console.log('Test users created:');
      console.log('  - mario@example.com / password123 (dipendente)');
      console.log('  - francesca@example.com / password123 (dipendente)');
      console.log('  - referente@example.com / password123 (referente)');
    } else {
      console.log(`[OK] Database already has ${userCount} users`);
    }
  } catch (error) {
    console.error('[ERROR] Error initializing database:', error);
    process.exit(1);
  }
};

initializeDatabase();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

app.use('/api/utenti', authRoutes);
app.use('/api/categorie', categorieRoutes);
app.use('/api/corsi', corsiRoutes);
app.use('/api/assegnazioni-corsi', assegnazioniRoutes);
app.use('/api/statistiche', statisticheRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Errore del server' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
