const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const assegnazioniController = require('../controllers/assegnazioniController');

const router = express.Router();

router.get('/', protect, assegnazioniController.getAssegnazioni);
router.get('/:id', protect, assegnazioniController.getAssegnazioneById);

router.post('/', protect, authorize('referente_academy'), assegnazioniController.createAssegnazione);
router.put('/:id', protect, authorize('referente_academy'), assegnazioniController.updateAssegnazione);
router.delete('/:id', protect, authorize('referente_academy'), assegnazioniController.deleteAssegnazione);
router.put('/:id/annulla', protect, authorize('referente_academy'), assegnazioniController.annullaAssegnazione);

router.put('/:id/completa', protect, assegnazioniController.completaAssegnazione);

module.exports = router;
