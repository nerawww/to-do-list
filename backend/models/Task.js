// Importation de mongoose pour la gestion de la base de données
const mongoose = require("mongoose");

// Définition du schéma de tâche
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Création du modèle Task à partir du schéma
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
