require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/database');
const User = require('./models/User');
const Categoria = require('./models/Categoria');
const CorsoAcademy = require('./models/CorsoAcademy');
const AssegnazioneCorso = require('./models/AssegnazioneCorso');

const resetDatabase = async () => {
  try {
    await connectDB();
    console.log('Connesso a MongoDB');

    console.log('Eliminando dati esistenti...');
    await User.deleteMany({});
    await Categoria.deleteMany({});
    await CorsoAcademy.deleteMany({});
    await AssegnazioneCorso.deleteMany({});
    console.log('[OK] Dati eliminati');

    console.log('Creando categorie...');
    const categorie = await Categoria.insertMany([
      { nome: 'Sicurezza', descrizione: 'Corsi di sicurezza sul lavoro' },
      { nome: 'Sviluppo', descrizione: 'Corsi di sviluppo software' },
      { nome: 'Leadership', descrizione: 'Corsi di leadership' },
      { nome: 'Lingue', descrizione: 'Corsi di lingue straniere' }
    ]);
    console.log(`[OK] ${categorie.length} categorie create`);

    console.log('Creando utenti...');
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
    console.log(`[OK] ${users.length} utenti creati`);

    console.log('Creando corsi...');
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
    console.log(`[OK] ${corsi.length} corsi creati`);

    console.log('Creando assegnazioni...');
    const dataInizio = new Date();
    const dataFine = new Date(dataInizio.getTime() + 30 * 24 * 60 * 60 * 1000);

    const assegnazioni = await AssegnazioneCorso.insertMany([
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
    console.log(`[OK] ${assegnazioni.length} assegnazioni create`);

    console.log('\n[OK] DATABASE RESET COMPLETATO!\n');
    console.log('Credenziali di test:');
    console.log('  - mario@example.com / password123 (dipendente)');
    console.log('  - francesca@example.com / password123 (dipendente)');
    console.log('  - referente@example.com / password123 (referente)');

    process.exit(0);
  } catch (error) {
    console.error('[ERROR] Errore:', error.message);
    process.exit(1);
  }
};

resetDatabase();
