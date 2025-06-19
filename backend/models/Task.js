const mongoose = require("mongoose");

// Schéma de données pour les tâches
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Le titre est obligatoire
  },
  status: {
    type: Boolean,
    default: false, // Par défaut, une tâche n'est pas terminée
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Référence vers l'utilisateur propriétaire
    ref: "User", // Référence au modèle User
  },
});

// Création du modèle Task basé sur le schéma
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
//module.exports = mongoose.model("Task", taskSchema);
