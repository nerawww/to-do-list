import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Page de connexion utilisateur
export default function Login() {
  // États pour les champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook pour la navigation

  // Fonction de soumission du formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log("J'ai empêché le rafraîchissement de la page");

    // Envoi des données de connexion au serveur
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // Stockage des données utilisateur dans le localStorage
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      localStorage.setItem("token", data.token);
      // Redirection vers la page des tâches
      navigate("/tasks");
      // const payload = jwtDecode(data);
      // console.log(payload);
    }
  };

  // Redirection automatique si l'utilisateur est déjà connecté
  if (localStorage.getItem("token")) {
    return <Navigate to={"/tasks"} />;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      {/* Formulaire de connexion centré */}
      <form
        onSubmit={handleSubmit}
        className="w-[500px] p-5 flex flex-col gap-2 shadow-xl"
      >
        <h1 className="text-center text-3xl font-bold">Connexion</h1>
        {/* Champ email */}
        <input
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="Email..."
          className="w-full input input-primary"
        />
        {/* Champ mot de passe */}
        <input
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          placeholder="Mot de passe..."
          className="w-full input input-primary"
        />
        <button className="btn btn-primary">Se connecter</button>
        {/* Lien vers la page d'inscription */}
        <Link to={"/register"} className="underline text-right">
          Créer un compte
        </Link>
      </form>
    </div>
  );
}
