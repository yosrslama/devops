// Importation des modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Vérifier si MONGO_URI est défini
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI n\'est pas défini dans le fichier .env');
  process.exit(1); // Arrêter l'exécution du programme si MONGO_URI n'est pas défini
}

// Affichage de la variable MONGO_URI pour vérifier qu'elle est bien chargée
console.log("MONGO_URI =", process.env.MONGO_URI);  // Affiche l'URL MongoDB dans la console

// Créer une application Express
const app = express();
const port = process.env.PORT || 5002;  // Port par défaut ou celui spécifié dans .env
const mongoUri = process.env.MONGO_URI;  // URI de la base de données MongoDB depuis les variables d'environnement

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Connexion à MongoDB avec Mongoose
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connexion à MongoDB réussie');
})
.catch(err => {
  console.error('❌ Erreur de connexion à MongoDB :', err);
});

// Définir une route simple pour tester
app.get('/', (req, res) => {
  res.send('Bienvenue sur le service de réservation !');
});

// Lancer le serveur sur le port défini
app.listen(port, () => {
  console.log(`🚀 Serveur en écoute sur http://localhost:${port}`);
});
