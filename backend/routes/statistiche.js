const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const statisticheController = require('../controllers/statisticheController');

const router = express.Router();

router.get('/academy', protect, authorize('referente'), statisticheController.getStatistiche);

module.exports = router;
