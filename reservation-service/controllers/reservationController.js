// controllers/reservationController.js
const Reservation = require('../models/Reservation');
const produceMessage = require('../producer');

const createReservation = async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    const saved = await newReservation.save();

    console.log('✅ Réservation enregistrée :', saved);

    await produceMessage('reservation-topic', saved);

    res.status(201).json({ message: 'Réservation créée', reservation: saved });
  } catch (err) {
    console.error('❌ Erreur création réservation:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { createReservation, getReservations };
