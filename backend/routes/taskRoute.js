// Importation des modules nécessaires
const express = require("express");
const Task = require("../models/Task");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

// Route pour récupérer toutes les tâches de l'utilisateur connecté
router.get("/task", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des tâches" });
  }
});

// Route pour créer une nouvelle tâche
router.post("/task", verifyToken, async (req, res) => {
  try {
    const title = req.body.title;

    // Vérification du champ titre
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ message: "Ce champ est requis" });
    }

    const task = { title, userId: req.user.id };

    await Task.create(task);

    res.status(201).json({ message: `La tâche "${task.title}" a été ajoutée` });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Erreur lors de la création de la tâche" });
  }
});

// Route pour supprimer une tâche par son id
router.delete("/task/:id", verifyToken, async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }

    res
      .status(200)
      .json({ message: `La tâche "${deletedTask.title}" a été supprimée` });
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la tâche" });
  }
});

// Route pour modifier une tâche par son id
router.put("/task/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const task = req.body;

  try {
    await Task.findByIdAndUpdate(id, task);

    res
      .status(200)
      .json({ message: `La tâche "${task.title}" a été modifiée` });
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({ error: "Erreur lors de la modification de la tâche" });
  }
});

module.exports = router;
