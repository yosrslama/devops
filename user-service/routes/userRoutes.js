// routes/userRoutes.js
const express = require('express');
const { createUser, getUsers } = require('../controllers/userController');
const router = express.Router();

// Route pour créer un utilisateur
router.post('/', createUser);

// Route pour obtenir la liste des utilisateurs
router.get('/', getUsers);

module.exports = router;
