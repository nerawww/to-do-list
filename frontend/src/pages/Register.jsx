import { useState } from "react";
import AuthForm from "../components/AuthForm";

const API_URL = import.meta.env.VITE_API_URL;
// Page d'inscription d'un nouvel utilisateur
export default function Register() {
  // États pour les champs du formulaire
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     console.log("J'ai empêché le rafraîchissement de la page");
  //       const response = await fetch(`${API_URL}/register`);

  // Fonction de soumission du formulaire d'inscription
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log("J'ai empêché le rafraîchissement de la page");
    console.log(username, email, password);

    // Envoi des données d'inscription au serveur
    fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {/* Formulaire d'inscription centré */}
      <AuthForm
        isRegistered={true}
        handleSubmit={handleSubmit}
        onChangeUsername={(e) => setUsername(e.target.value)}
        onChangeEmail={(e) => setEmail(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
      />
    </div>
  );
}
