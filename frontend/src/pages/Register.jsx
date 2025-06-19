import { useState } from "react";

// Page d'inscription d'un nouvel utilisateur
export default function Register() {
  // États pour les champs du formulaire
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     console.log("J'ai empêché le rafraîchissement de la page");
  //       const response = await fetch("http://localhost:5000/register");

  // Fonction de soumission du formulaire d'inscription
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log("J'ai empêché le rafraîchissement de la page");
    console.log(username, email, password);

    // Envoi des données d'inscription au serveur
    fetch("http://localhost:5000/register", {
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
      <form
        onSubmit={handleSubmit}
        className="w-[500px] p-5 flex flex-col gap-2 shadow-xl"
      >
        <h1 className="text-center text-3xl font-bold">Inscription</h1>
        {/* Champ nom d'utilisateur */}
        <input
          onChange={(e) => setUsername(e.target.value)}
          required
          type="text"
          placeholder="Nom d'utilisateur..."
          className="input input-primary w-full"
        />
        {/* Champ email */}
        <input
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="Email..."
          className="input input-primary w-full"
        />
        {/* Champ mot de passe */}
        <input
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          placeholder="Mot de passe..."
          className="input input-primary w-full"
        />
        <button className="btn btn-primary">S'inscrire</button>
      </form>
    </div>
  );
}
