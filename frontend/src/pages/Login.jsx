import AuthForm from "../components/AuthForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

// Page de connexion utilisateur
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Gère la soumission du formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Stocke les infos utilisateur dans le localStorage
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      // Redirige selon le rôle
      if (data.role === "user") navigate("/tasks");
      if (data.role === "admin") navigate("/admin");
    } else {
      console.log(data);
      toast.error(data.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {/* Utilisation du composant AuthForm pour la connexion */}
      <AuthForm
        title={"Connexion"}
        handleSubmit={handleSubmit}
        onChangeEmail={(e) => setEmail(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
      />
    </div>
  );
}
