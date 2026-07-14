const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getCategorie, createCategoria } = require('../controllers/categorieController');

const router = express.Router();

router.get('/', protect, getCategorie);
router.post('/', protect, authorize('referente_academy'), createCategoria);

module.exports = router;
