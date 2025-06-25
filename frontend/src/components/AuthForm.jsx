import { Link } from "react-router-dom";

// Formulaire d'authentification réutilisable pour connexion/inscription
export default function AuthForm({
  isRegistered,
  handleSubmit,
  onChangeUsername,
  onChangeEmail,
  onChangePassword,
}) {
  return (
    <div>
      <form
        className="w-[500px] p-5 flex flex-col gap-2 shadow-xl"
        onSubmit={handleSubmit}
      >
        {/* Titre dynamique selon le contexte */}
        <h1 className="text-center text-3xl font-bold">
          {isRegistered ? "Inscription" : "Connexion"}
        </h1>

        {/* Champ pour le nom d'utilisateur (uniquement à l'inscription) */}
        {isRegistered && (
          <input
            required
            type="text"
            placeholder="Nom d'utilisateur..."
            className="input input-primary w-full"
            onChange={onChangeUsername}
          />
        )}

        {/* Champ email */}
        <input
          required
          type="email"
          placeholder="Email..."
          className="input input-primary w-full"
          onChange={onChangeEmail}
        />

        {/* Champ mot de passe */}
        <input
          required
          type="password"
          placeholder="Mot de passe..."
          className="input input-primary w-full"
          onChange={onChangePassword}
        />

        {/* Bouton de validation */}
        <button className="btn btn-primary">
          {isRegistered ? "S'inscrire" : "Se connecter"}
        </button>

        {/* Lien pour basculer entre connexion et inscription */}
        {isRegistered ? (
          <Link to={"/"} className="underline text-right">
            Se connecter
          </Link>
        ) : (
          <Link to={"/register"} className="underline text-right">
            S'inscrire
          </Link>
        )}
      </form>
    </div>
  );
}
