const mongoose = require('mongoose');

const corsoSchema = new mongoose.Schema({
  titolo: {
    type: String,
    required: [true, 'Titolo corso è obbligatorio'],
    trim: true
  },
  descrizione: {
    type: String,
    required: [true, 'Descrizione è obbligatoria']
  },
  categoriaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: [true, 'Categoria è obbligatoria']
  },
  durataOre: {
    type: Number,
    required: [true, 'Durata è obbligatoria'],
    min: [1, 'Durata deve essere maggiore di 0']
  },
  obbligatorio: {
    type: Boolean,
    default: false
  },
  attivo: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CorsoAcademy', corsoSchema);
