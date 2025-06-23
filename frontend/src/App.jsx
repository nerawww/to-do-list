import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Task from "./pages/Task";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccountActivated from "./pages/AccountActivated";
import Admin from "./pages/Admin";
import { ToastContainer } from "react-toastify";

// Composant principal de l'application avec le routage
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page de connexion (accueil) */}
        <Route path="/" element={<Login />} />
        {/* Page de la liste des tâches */}
        <Route path="/tasks" element={<Task />} />
        {/* Page d'inscription */}
        <Route path="/register" element={<Register />} />
        {/* Page de confirmation d'activation de compte */}
        <Route path="/account-activated" element={<AccountActivated />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </BrowserRouter>
  );
}
