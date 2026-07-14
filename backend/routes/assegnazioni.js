const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const assegnazioniController = require('../controllers/assegnazioniController');

const router = express.Router();

// Tutti gli utenti autenticati possono visualizzare
router.get('/', protect, assegnazioniController.getAssegnazioni);
router.get('/:id', protect, assegnazioniController.getAssegnazioneById);

// Solo referente Academy per creare e modificare
router.post('/', protect, authorize('referente_academy'), assegnazioniController.createAssegnazione);
router.put('/:id', protect, authorize('referente_academy'), assegnazioniController.updateAssegnazione);
router.delete('/:id', protect, authorize('referente_academy'), assegnazioniController.deleteAssegnazione);
router.put('/:id/annulla', protect, authorize('referente_academy'), assegnazioniController.annullaAssegnazione);

// Dipendente può completare solo le proprie assegnazioni
router.put('/:id/completa', protect, assegnazioniController.completaAssegnazione);

module.exports = router;
