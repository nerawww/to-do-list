const mongoose = require("mongoose");

// Schéma de données pour les utilisateurs
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // Champ obligatoire
    },
    email: {
      type: String,
      required: true, // Champ obligatoire
      unique: true, // L'email doit être unique dans la collection
    },
    password: {
      type: String,
      required: true, // Champ obligatoire (sera haché)
    },
    role: {
      type: String,
      default: "user", // Rôle par défaut
    },
    isVerified: {
      type: Boolean,
      default: false, // Statut de vérification du compte
    },
  },
  { timestamps: true } // Ajoute automatiquement createdAt et updatedAt
);

// Création du modèle User basé sur le schéma
const User = mongoose.model("User", userSchema);
module.exports = User;
