const mongoose = require("mongoose");

// Définition du schéma d'une tâche
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Le titre est obligatoire
  },
  status: {
    type: Boolean,
    default: false, // Par défaut, la tâche n'est pas terminée
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Référence à l'utilisateur propriétaire de la tâche
  },
});

// Création du modèle Task à partir du schéma
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
