const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // ✅ Charger .env AVANT toute chose

const app = express();
app.use(express.json());

// Vérifier que MONGO_URI est bien chargée
console.log('URI MongoDB :', process.env.MONGO_URI);

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur MongoDB :', err));

// Routes
app.get('/', (req, res) => res.send('User Service fonctionne ✅'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
