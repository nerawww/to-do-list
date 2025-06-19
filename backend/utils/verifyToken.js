const jwt = require("jsonwebtoken");

// Middleware pour vérifier l'authentification JWT
const verifyToken = async (req, res, next) => {
  // Récupération de l'en-tête Authorization
  const authHeaders = req.headers.authorization;

  // Vérification de la présence et du format de l'en-tête
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Accès non autorisé" });
  }

  // Extraction du token depuis l'en-tête Authorization
  const token = req.headers.authorization.split(" ")[1];

  try {
    console.log(token);
    // Vérification de la présence du token
    if (!token) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    // Vérification et décodage du token JWT
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode; // Ajout des informations utilisateur à la requête
    next(); // Passage au middleware suivant
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Token non valide" });
  }
};

module.exports = verifyToken;
