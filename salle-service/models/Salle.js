const mongoose = require('mongoose');

// Schéma pour les salles
const salleSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    capacite: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Exporter le modèle Salle
module.exports = mongoose.model('Salle', salleSchema);
