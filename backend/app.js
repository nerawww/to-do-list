// Importation des modules nécessaires
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Chargement des variables d'environnement

// Importation des routes
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");

// Création de l'instance Express
const app = express();

// Middlewares
app.use(express.json()); // Permet de lire les données json envoyées
app.use(cors()); // Autorise les requêtes cross-origin
app.use("", userRoute); // Utilisation des routes utilisateur
app.use("", taskRoute); // Utilisation des routes de tâches

// Port d'écoute depuis les variables d'environnement ou 5000 par défaut
const PORT = process.env.PORT || 5000;

// Connexion à MongoDB et démarrage du serveur
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connexion à MongoDB réussie");
    // Démarrage du serveur après connexion réussie à la base
    app.listen(PORT, () =>
      console.log("Le serveur tourne sur le port " + PORT)
    );
  })
  .catch((e) => console.log(e)); // Gestion des erreurs de connexion
