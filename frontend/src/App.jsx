import "./App.css";
import Task from "./pages/Task";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Composant principal de l'application qui gère le routage
export default function App() {
  return (
    <BrowserRouter>
      {/* Définition des routes principales de l'application */}
      <Routes>
        <Route path="/tasks" element={<Task />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      {/* Affichage des notifications Toast */}
      <ToastContainer position="top-center" autoClose={1500} />
    </BrowserRouter>
  );
}
