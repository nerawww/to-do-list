// Importation des modules nécessaires
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Importation des routes
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");
const adminRoute = require("./routes/adminRoute");

// Création de l'application Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour autoriser les requêtes cross-origin
app.use(cors());

// Utilisation des routes
app.use("", userRoute);
app.use("", taskRoute);
app.use("", adminRoute);

// Définition du port d'écoute
const PORT = process.env.PORT || 5000;

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connexion à MongoDB réussie");

    // Démarrage du serveur après la connexion à la base de données
    app.listen(PORT, () =>
      console.log("Le serveur tourne sur le port " + PORT)
    );
  })
  .catch((e) => console.log("Connexion à MongoDB échouée :", e));
