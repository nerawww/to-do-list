import AuthForm from "../components/AuthForm";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

// Page d'inscription utilisateur
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Gestion de la soumission du formulaire d'inscription
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      // Affichage d'une erreur si échec
      console.log(response);
      toast.error(response.statusText);
    } else {
      // Affichage d'un succès si inscription réussie
      toast.success(response.statusText);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {/* Utilisation du composant AuthForm pour l'inscription */}
      <AuthForm
        isRegistered={true}
        handleSubmit={handleSubmit}
        onChangeUsername={(e) => setUsername(e.target.value)}
        onChangeEmail={(e) => setEmail(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
      />
      {/* Affichage des notifications */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
