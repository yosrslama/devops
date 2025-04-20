// Charge les variables d'environnement
require('dotenv').config();

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const session = require('express-session'); // Importation de express-session
const produceMessage = require('./producer');

const app = express();

// Vérifie que le script se lance bien
console.log("🚀 Lancement de l'application...");

// Session avec cookies (utilisation de express-session)
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret-session', // Clé secrète de la session
  resave: false,
  saveUninitialized: true,
}));

// Initialisation de Passport
app.use(passport.initialize());
app.use(passport.session());

// Configuration de la stratégie Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    const user = {
      email: profile.emails[0].value,
      name: profile.displayName,
      role: 'user'
    };
    return done(null, user);
  }
));

// Sérialisation de l'utilisateur
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Route d'authentification avec Google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback après la connexion Google
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  async function(req, res) {
    const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Envoi du message à Kafka
    await produceMessage('user-topic', req.user);

    res.json({ token });
  }
);

// Route protégée avec JWT
app.get('/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Token manquant' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ msg: 'Bienvenue !', user: decoded });
  } catch (err) {
    res.status(403).json({ msg: 'Token invalide' });
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
