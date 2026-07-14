const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome è obbligatorio'],
    trim: true,
    minlength: [2, 'Nome deve avere almeno 2 caratteri']
  },
  cognome: {
    type: String,
    required: [true, 'Cognome è obbligatorio'],
    trim: true,
    minlength: [2, 'Cognome deve avere almeno 2 caratteri']
  },
  email: {
    type: String,
    required: [true, 'Email è obbligatoria'],
    unique: [true, 'Email già registrata'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email non valida']
  },
  password: {
    type: String,
    required: [true, 'Password è obbligatoria'],
    minlength: [6, 'Password deve avere almeno 6 caratteri'],
    select: false
  },
  ruolo: {
    type: String,
    enum: ['dipendente', 'referente'],
    default: 'dipendente'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
