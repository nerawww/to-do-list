import AuthForm from "../components/AuthForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

// Page de connexion utilisateur
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Gestion de la soumission du formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Redirection vers la page des tâches si connexion réussie
      console.log(response);
      const token = document.cookie.split("=")[1];
      const decode = jwtDecode(token);
      if (decode === "user") {
        navigate("/tasks");
      }
      if (decode === "admin") {
        navigate("/admin");
        localStorage.setItem("email", decode.email);
        localStorage.setItem("username", decode.username);
        localStorage.setItem("role", decode.role);
      }
    } else {
      // Affichage d'une erreur si échec
      console.log(data);
      toast.error(data.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {/* Utilisation du composant AuthForm */}
      <AuthForm
        title={"Connexion"}
        handleSubmit={handleSubmit}
        onChangeEmail={(e) => setEmail(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
      />
    </div>
  );
}
