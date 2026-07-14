const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome categoria è obbligatorio'],
    unique: true,
    trim: true
  },
  descrizione: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Categoria', categoriaSchema);
