const mongoose = require('mongoose');

const assegnazioneSchema = new mongoose.Schema({
  corsoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CorsoAcademy',
    required: [true, 'Corso è obbligatorio']
  },
  dipendenteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Dipendente è obbligatorio']
  },
  dataAssegnazione: {
    type: Date,
    default: Date.now
  },
  dataScadenza: {
    type: Date,
    required: [true, 'Data scadenza è obbligatoria']
  },
  stato: {
    type: String,
    enum: ['Assegnato', 'Completato', 'Scaduto', 'Annullato'],
    default: 'Assegnato'
  },
  dataCompletamento: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AssegnazioneCorso', assegnazioneSchema);
