import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import toast from "daisyui/components/toast";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;
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
    const response = await fetch(`${API_URL}/login`, {
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
      localStorage.setItem("username", data.username);
      if (data.role === "user") {
        navigate("/tasks");
      }
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        console.log(response);
        toast.error("Identifiants invalides");
      }
      // Redirection vers la page des tâches
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
      <AuthForm
        title={"Connexion"}
        handleSubmit={handleSubmit}
        onChangeUsername={(e) => setUsername(e.target.value)}
        onChangeEmail={(e) => setEmail(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
      />
    </div>
  );
}
