// Importation de mongoose pour la gestion de la base de données
const mongoose = require("mongoose");

// Définition du schéma utilisateur
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Ajoute createdAt et updatedAt automatiquement
);

// Création du modèle User à partir du schéma
const User = mongoose.model("User", userSchema);

module.exports = User;
