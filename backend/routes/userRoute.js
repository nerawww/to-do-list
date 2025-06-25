const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();

// Inscription d'un nouvel utilisateur
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Vérification des champs obligatoires
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Mauvaise requête" });
  }

  // Vérifie si l'utilisateur existe déjà
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Mauvaise requête" });
  }

  // Hash du mot de passe
  const hash = await bcrypt.hash(password, 10);

  // Création de l'utilisateur
  await User.create({ username, email, password: hash });

  // Configuration du transporteur d'email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Génération du token d'activation
  const token = jwt.sign(
    {
      email: email,
    },
    process.env.JWT_SECRET
  );

  // Envoie le token dans un cookie httpOnly
  res.cookie("token", token, {
    httpOnly: false,
    secure: true,
    sameSite: "None",
    maxAge: 2 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Connexion réussie" });

  // Préparation de l'email d'activation
  const activationLink = `https://to-do-list-8y10.onrender.com/validate/${token}`;
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Activation de votre compte",
    html: `<p>Bonjour ${username},</p>
    <p>Merci de vous être inscrit. Veuillez cliquer ici pour activer votre compte :</p>
    <a href="${activationLink}">${activationLink}</a>`,
  };

  // Envoi de l'email d'activation
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);
    console.log("Email envoyé", info);
  });

  res.status(201).json({
    message: "Veuillez vérifier votre email pour valider votre compte",
  });
});

// Validation du compte utilisateur via le lien d'activation
router.get("/validate/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable" });

    user.isVerified = true;
    await user.save();

    res
      .status(200)
      .redirect(
        "https://to-do-list-frontend-xw6j.onrender.com/activated-account"
      );
  } catch {
    res.status(400).send("Lien invalide ou expiré");
  }
});

// Connexion d'un utilisateur
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

  // Vérifie si le compte est activé
  if (!user.isVerified) {
    return res.status(403).json({
      message: "Compte non activé",
    });
  }

  // Génération du token JWT pour la session
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      username: user.username,
    },
    process.env.JWT_SECRET
  );

  res.status(200).json({
    email: user.email,
    role: user.role,
    username: user.username,
    token: token,
  });
});

// Déconnexion de l'utilisateur (suppression du cookie)
router.get("/logout", (req, res) => {
  res.clearCookie("token");
});

module.exports = router;
