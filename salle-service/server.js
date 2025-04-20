const express = require('express');
const dotenv = require('dotenv');
const salleRoutes = require('./routes/salleRoutes'); // <- Ce fichier ici
const connectDB = require('./config/db'); // Si tu utilises une fonction de connexion à Mongo

dotenv.config();

const app = express();
app.use(express.json());

// Connecter la base de données
connectDB(); // si tu as cette fonction

// 👇 Branchement des routes
app.use('/api/salles', salleRoutes);

// ✅ Ajoute une route GET / pour éviter "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Salle Service fonctionne ✅');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Salle-service en cours d’exécution sur le port ${PORT}`);
});
