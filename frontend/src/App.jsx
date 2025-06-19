import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Importation des composants de pages
import Task from "./pages/Task";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccountActivated from "./pages/AccountActivated";

// Composant principal de l'application avec le routage
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Route de connexion (page d'accueil) */}
          <Route path="/" element={<Login />} />
          {/* Route de la liste des tâches */}
          <Route path="/tasks" element={<Task />} />
          {/* Route d'inscription */}
          <Route path="/register" element={<Register />} />
          {/* Route de confirmation d'activation de compte */}
          <Route path="/account-activated" element={<AccountActivated />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
