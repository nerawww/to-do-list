const mongoose = require("mongoose");

// Définition du schéma d'un utilisateur
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // Le nom d'utilisateur est obligatoire
    },
    email: {
      type: String,
      required: true, // L'email est obligatoire
      unique: true, // L'email doit être unique
    },
    password: {
      type: String,
      required: true, // Le mot de passe est obligatoire
    },
    role: {
      type: String,
      default: "user", // Par défaut, le rôle est "user"
    },
    isVerified: {
      type: Boolean,
      default: false, // Par défaut, le compte n'est pas vérifié
    },
  },
  { timestamps: true } // Ajoute createdAt et updatedAt automatiquement
);

// Création du modèle User à partir du schéma
const User = mongoose.model("User", userSchema);

module.exports = User;
