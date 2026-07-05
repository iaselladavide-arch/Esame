require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/database');

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing users
    await User.deleteMany({});

    // Create test users
    const users = [
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
        nome: 'Admin',
        cognome: 'User',
        email: 'admin@example.com',
        password: 'password123',
        ruolo: 'admin'
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log('Database seeded successfully!');
    console.log('Test users:');
    createdUsers.forEach(user => {
      console.log(`Email: ${user.email}, Password: password123, Role: ${user.ruolo}`);
    });

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
