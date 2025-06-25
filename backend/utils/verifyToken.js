const jwt = require("jsonwebtoken");

// Middleware pour vérifier la présence et la validité du token JWT
async function verifyToken(req, res, next) {
  const token = req.cookies.token;
  console.log(req.cookies);

  // Vérifie si le token est présent
  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  try {
    // Vérifie et décode le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajoute les infos utilisateur à la requête
    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);

    return res.status(403).json({ message: "Token non valide" });
  }
}

module.exports = verifyToken;
