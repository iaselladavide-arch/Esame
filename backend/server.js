require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const User = require('./models/User');

const app = express();

// Connect to database and seed if empty
const initializeDatabase = async () => {
  try {
    await connectDB();

    // Check if database is empty
    const userCount = await User.countDocuments();

    if (userCount === 0) {
      console.log('Database empty. Seeding with test data...');

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
          nome: 'Admin',
          cognome: 'User',
          email: 'admin@example.com',
          password: 'password123',
          ruolo: 'admin'
        }
      ];

      await User.insertMany(testUsers);
      console.log('✅ Database seeded successfully!');
      console.log('Test users created:');
      console.log('  - mario@example.com / password123 (dipendente)');
      console.log('  - francesca@example.com / password123 (dipendente)');
      console.log('  - admin@example.com / password123 (admin)');
    } else {
      console.log(`✅ Database already has ${userCount} users`);
    }
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
};

// Initialize database
initializeDatabase();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/utenti', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Errore del server' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
