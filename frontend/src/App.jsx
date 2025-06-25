import "./App.css";
import Task from "./pages/Task";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import ActivatedAccount from "./pages/ActivatedAccount";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Composant principal de l'application
export default function App() {
  return (
    // Configuration du routeur pour la navigation entre les pages
    <BrowserRouter>
      <Routes>
        {/* Route pour la page des tâches */}
        <Route path="/tasks" element={<Task />} />

        {/* Route pour la page de connexion */}
        <Route path="/" element={<Login />} />

        {/* Route pour la page d'inscription */}
        <Route path="/register" element={<Register />} />

        {/* Route pour la page d'administration */}
        <Route path="/admin" element={<Admin />} />

        {/* Route pour la page d'activation de compte */}
        <Route path="/activated-account" element={<ActivatedAccount />} />
      </Routes>

      {/* Affichage des notifications Toast */}
      <ToastContainer position="top-center" autoClose={1500} />
    </BrowserRouter>
  );
}
