const express = require("express");
const bcrypt = require("bcrypt"); // Pour le hachage des mots de passe
const jwt = require("jsonwebtoken"); // Pour la génération de tokens JWT
const User = require("../models/User");

const router = express.Router();

// Route d'inscription d'un nouvel utilisateur
router.post("/register", async (req, res) => {
  // Destructuration des données reçues
  const { username, email, password } = req.body;
  // const username = req.body.username;
  // const email = req.body.email;
  // const password = req.body.password;
  
  // Vérification si l'utilisateur existe déjà
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Mauvaise requête" });
  }
  
  // Hachage du mot de passe avec un salt de 10
  const hash = await bcrypt.hash(password, 10);
  
  // Création du nouvel utilisateur avec le mot de passe haché
  await User.create({ username, email, password: hash });
  res.status(201).json({ message: "Un utilisateur a été ajouté" });
});

// Route de connexion d'un utilisateur
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  // Recherche de l'utilisateur par email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Identifiants invalides" });
  }
  
  // Vérification du mot de passe
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).json({ message: "Identifiants invalides" });
  }
  
  // Génération du token JWT avec les informations utilisateur
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET
  );
  
  // Envoi de la réponse avec les données utilisateur et le token
  res.status(200).json({ email: user.email, role: user.role, token: token });
});

module.exports = router;
