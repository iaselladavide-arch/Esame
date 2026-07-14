const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const corsiController = require('../controllers/corsiController');

const router = express.Router();

router.get('/', protect, corsiController.getCorsi);
router.get('/:id', protect, corsiController.getCorsoById);

router.post('/', protect, authorize('referente'), corsiController.createCorso);
router.put('/:id', protect, authorize('referente'), corsiController.updateCorso);
router.put('/:id/disattiva', protect, authorize('referente'), corsiController.disattivaCorso);
router.delete('/:id', protect, authorize('referente'), corsiController.deleteCorso);

module.exports = router;
