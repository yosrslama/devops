// controllers/userController.js
const User = require('../models/User');
const produceMessage = require('../producer');

// Créer un nouvel utilisateur
const createUser = async (req, res) => {
  const { name, email, role } = req.body;

  try {
    // Créer l'utilisateur dans MongoDB
    const user = new User({ name, email, role });
    await user.save();
    console.log('Utilisateur créé :', user);

    // Envoyer le message à Kafka
    await produceMessage('user-topic', user);

    res.status(201).json({ message: 'Utilisateur créé', user });
  } catch (err) {
    console.error('Erreur création utilisateur:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer les utilisateurs
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error('Erreur récupération utilisateurs:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { createUser, getUsers };
