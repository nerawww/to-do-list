const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");
const adminRoute = require("./routes/adminRoute");

const app = express();

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Active le support des cookies
app.use(cookieParser());

// Configuration de CORS pour autoriser le front-end à accéder à l'API
app.use(
  cors({
    origin: "https://to-do-list-frontend-qm84.onrender.com",
    credentials: true,
  })
);

// Déclaration des routes principales de l'application
app.use("", userRoute);
app.use("", taskRoute);
app.use("", adminRoute);

const PORT = process.env.PORT || 5000;

// Connexion à la base de données MongoDB puis lancement du serveur
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connexion à MongoDB réussie");

    app.listen(PORT, () =>
      console.log("Le serveur tourne sur le port " + PORT)
    );
  })
  .catch((e) => {
    console.error("Connexion à MongoDB échouée :", e.message);
    process.exit(1); // Arrête le serveur si la connexion échoue
  });
