const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const assegnazioniController = require('../controllers/assegnazioniController');

const router = express.Router();

router.get('/', protect, assegnazioniController.getAssegnazioni);
router.get('/:id', protect, assegnazioniController.getAssegnazioneById);

router.post('/', protect, authorize('referente'), assegnazioniController.createAssegnazione);
router.put('/:id', protect, authorize('referente'), assegnazioniController.updateAssegnazione);
router.delete('/:id', protect, authorize('referente'), assegnazioniController.deleteAssegnazione);
router.put('/:id/annulla', protect, authorize('referente'), assegnazioniController.annullaAssegnazione);

router.put('/:id/completa', protect, assegnazioniController.completaAssegnazione);

module.exports = router;
