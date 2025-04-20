const Salle = require('../models/Salle');
const produceMessage = require('../producer');

// Fonction pour créer une salle
const createSalle = async (req, res) => {
  const salle = req.body;

  try {
    const newSalle = await Salle.create(salle); // Sauvegarde dans MongoDB
    console.log('✅ Salle créée dans MongoDB :', newSalle);

    // Envoi du message Kafka
    await produceMessage('salle-topic', newSalle);

    res.status(201).json({ message: 'Salle créée', salle: newSalle });
  } catch (err) {
    console.error('❌ Erreur création salle:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Fonction pour obtenir la liste des salles
const getSalles = async (req, res) => {
  try {
    const salles = await Salle.find();
    res.json(salles);
  } catch (err) {
    console.error('❌ Erreur récupération des salles:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { createSalle, getSalles };
