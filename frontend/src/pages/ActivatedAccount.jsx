import { Link } from "react-router-dom";

// Page affichée après l'activation du compte utilisateur
export default function ActivatedAccount() {
  return (
    <div className="flex justify-center items-center bg-warning p-5">
      {/* Message de confirmation */}
      <p className="text-black">Activation de votre compte réussie !</p>
      {/* Lien pour retourner à la connexion ou autre page */}
      <Link className="link link-primary" />
    </div>
  );
}
