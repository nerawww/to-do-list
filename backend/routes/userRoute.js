const express = require("express");
const bcrypt = require("bcrypt"); // Pour le hachage des mots de passe
const jwt = require("jsonwebtoken"); // Pour la génération de tokens JWT
const User = require("../models/User");
const nodemailer = require("nodemailer");

const router = express.Router();

// Route d'inscription d'un nouvel utilisateur
router.get("/register", async (req, res) => {
  // Destructuration des données reçues
  const { username, email, password } = req.body;
  // const username = req.body.username;
  // const email = req.body.email;
  // const password = req.body.password;

  // Vérification si l'utilisateur existe déjà
  const existingUser = await User.findOne({ email: decode.email });
  if (existingUser) {
    return res.status(400).json({ message: "Mauvaise requête" });
  }

  // Hachage du mot de passe avec un salt de 10
  const hash = await bcrypt.hash(password, 10);

  // Création du nouvel utilisateur avec le mot de passe haché
  await User.create({ username, email, password: hash });
  res.status(201).json({ message: "Un utilisateur a été ajouté" });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

const token = jwt.sign(
  {
    email: email,
  },
  process.env.JWT_SECRET
);

const link = `http://localhost:5000/validate/${email}`;

const mailOptions = {
  from: process.env.EMAIL_FROM,
  to: email,
  subject: "Validation",
  text: "Veuillez cliquer sur le lien afin de valider votre inscription",
  html: `<a href=${link}>Cliquer</a>`,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) return console.log(error);
  console.log("Email envoyé", info);
});

router.post("/validate/:token", async (req, res) => {
  const { token } = req.params;
  const decode = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne(decode.email);
  if (user) {
    user.isVerified = true;
    user.save();
  }
  res.status(200).json({ message: "Email validé avec succès" });
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
