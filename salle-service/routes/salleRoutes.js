const express = require('express');
const router = express.Router();
const { createSalle, getSalles } = require('../controllers/salleController');

// Route pour créer une salle (POST)
router.post('/', createSalle);

// Route pour obtenir toutes les salles (GET)
router.get('/', getSalles);

module.exports = router;
