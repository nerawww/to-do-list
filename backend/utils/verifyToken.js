// Importation du module jsonwebtoken pour la gestion des tokens JWT
const jwt = require("jsonwebtoken");

// Middleware pour vérifier la validité du token JWT dans les requêtes protégées
async function verifyToken(req, res, next) {
  const authHeaders = req.headers.authorization;

  // Vérifie si le header Authorization existe et commence par "Bearer "
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Accès non autorisé" });
  }

  // Récupère le token depuis le header
  const token = authHeaders.split(" ")[1];

  try {
    // Vérifie et décode le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajoute les infos de l'utilisateur décodées à la requête
    req.user = decoded;

    // Passe au middleware suivant
    next();
  } catch (err) {
    console.error(err);

    // Token invalide ou expiré
    return res.status(403).json({ message: "Token non valide" });
  }
}
