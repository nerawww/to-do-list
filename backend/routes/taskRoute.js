const express = require("express");
const Task = require("../models/Task");
const verifyToken = require("../utils/verifyToken"); // Middleware d'authentification

const router = express.Router();

// Route pour récupérer toutes les tâches de l'utilisateur connecté
router.get("/task", verifyToken, async (req, res) => {
  try {
    // Récupération des tâches appartenant à l'utilisateur connecté
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des tâches" });
  }
});

// Créer une tâche
router.post("/task", verifyToken, async (req, res) => {
  try {
    const { title } = req.body;
    // const title = req.body.title;

    // Validation du titre de la tâche
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ message: "Ce champ est requis" });
    }

    // Vérifier si une tâche avec ce titre existe déjà pour cet utilisateur
    const existingTask = await Task.findOne({
      title: title.trim(),
      userId: req.user.id,
    });

    if (existingTask) {
      return res
        .status(400)
        .json({ message: "Une tâche avec ce titre existe déjà" });
    }

    // Création de la nouvelle tâche pour l'utilisateur connecté
    const task = { title, userId: req.user.id };
    await Task.create(task);
    res.status(201).json({ message: `La tâche "${task.title}" a été ajoutée` });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des tâches" });
  }
});

// Supprimer une tâche
router.delete("/task/:id", verifyToken, async (req, res) => {
  const { id } = req.params; // Récupération de l'ID depuis les paramètres
  // const id = req.params.id;

  try {
    // Recherche de la tâche à supprimer
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    // Suppression de la tâche
    await Task.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: `La tâche "${task.title}" a été supprimée` });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la tâche" });
  }
});

// Modifier une tâche
router.put("/task/:id", verifyToken, async (req, res) => {
  const { id } = req.params; // Récupération de l'ID depuis les paramètres
  // const id = req.params.id;
  const task = req.body; // Nouvelles données de la tâche

  // Mise à jour de la tâche
  await Task.findByIdAndUpdate(id, task);
  res.status(200).json({ message: `La tâche "${task.title}" a été modifiée` });
});

module.exports = router;
