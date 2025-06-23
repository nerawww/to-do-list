const verifyToken = require("../utils/verifyToken");
const Task = require("../models/Task");
const User = require("../models/User");
const router = require("express").Router();

router.get("/admin/user", verifyToken, async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

router.dete("/admin/user/:id", verifyToken, async (req, res) => {
  const id = req.params.id;

  await Task.deleteMany({ userId: id });
  await User.findByIdAndDelete(id);

  res
    .status(200)
    .json({ message: "L'utilisateur et ses tâches ont été supprimés" });
});

module.exports = router;
