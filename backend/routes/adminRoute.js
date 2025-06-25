const Task = require("../models/Task");
const User = require("../models/User");
const verifyToken = require("../utils/verifyToken");

const router = require("express").Router();

// Récupérer tous les utilisateurs (accès admin)
router.get("/admin/user", verifyToken, async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

// Supprimer un utilisateur et toutes ses tâches (accès admin)
router.delete("/admin/user/:id", verifyToken, async (req, res) => {
  const id = req.params.id;

  // Suppression des tâches liées à l'utilisateur
  await Task.deleteMany({ userId: id });

  // Suppression de l'utilisateur
  await User.findByIdAndDelete(id);

  res
    .status(200)
    .json({ message: "L'utilisateur et ses tâches ont été supprimés" });
});

module.exports = router;
