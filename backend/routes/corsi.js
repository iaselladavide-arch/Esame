const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const corsiController = require('../controllers/corsiController');

const router = express.Router();

// Tutti gli utenti autenticati possono visualizzare
router.get('/', protect, corsiController.getCorsi);
router.get('/:id', protect, corsiController.getCorsoById);

// Solo referente Academy
router.post('/', protect, authorize('referente_academy'), corsiController.createCorso);
router.put('/:id', protect, authorize('referente_academy'), corsiController.updateCorso);
router.put('/:id/disattiva', protect, authorize('referente_academy'), corsiController.disattivaCorso);
router.delete('/:id', protect, authorize('referente_academy'), corsiController.deleteCorso);

module.exports = router;
