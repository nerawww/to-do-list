import { useEffect } from "react";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import Item from "../components/Item";
import TaskModal from "../components/TaskModal";

// Page principale de gestion des tâches
export default function Task() {
  // États de l'application
  const [tasks, setTasks] = useState([]); // Liste des tâches
  const [title, setTitle] = useState(""); // Titre pour nouvelle tâche
  const [editedTitle, setEditedTitle] = useState(""); // Titre pour édition
  const [isChecked, setIsChecked] = useState(false); // État de la checkbox

  // Récupération du token d'authentification
  const token = localStorage.getItem("token");

  // Fonction pour récupérer toutes les tâches depuis le serveur
  const fetchTasks = async () => {
    const response = await fetch("http://localhost:5000/task", {
      headers: {
        Authorization: `Bearer ${token}`, // Ajout du token d'authentification
      },
    });
    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    }
  };

  // Récupération des tâches au montage du composant
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fonction pour gérer l'édition d'une tâche
  const handleEdit = async (task) => {
    setEditedTitle(task.title);
    setIsChecked(task.status);
  };

  // Fonction pour supprimer une tâche
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/task/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      fetchTasks(); // Rechargement de la liste après suppression
    }
  };

  // Fonction pour soumettre une nouvelle tâche
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/task", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });
    if (response.ok) {
      const data = await response.json();
      setTitle(""); // Réinitialisation du champ
      fetchTasks(); // Rechargement de la liste après ajout
    }
    document.getElementById("my_modal_3").close(); // Fermeture du modal
  };

  return (
    <div className="w-[500px] m-auto p-5 shadow-2xl rounded">
      <h1 className="text-3xl text-center my-3">Liste de tâches</h1>
      {/* Bouton pour ouvrir le modal d'ajout de tâche */}
      <button>
        <MdAdd
          className="size-5 cursor-pointer text-green-500 hover:text-green-700 bg-slate-900 border rounded mx-2.5"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        />
      </button>
      {/* Liste des tâches */}
      {tasks.map((task) => (
        <Item
          key={task._id}
          task={task}
          handleEdit={() => handleEdit(task)}
          handleDelete={() => handleDelete(task._id)}
        />
      ))}
      {/* Modal pour ajouter une tâche */}
      <TaskModal
        handleSubmit={handleSubmit}
        title={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Section d'édition de tâche (interface d'édition inline) */}
      <div className="flex items-center justify-between gap-3 p-2 border-b m-5">
        <div className="flex items-center gap-3 flex-1">
          {/* Checkbox pour le statut */}
          <input
            type="checkbox"
            checked={isChecked}
            className="checkbox checkbox-primary"
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          {/* Champ d'édition du titre */}
          <input
            type="text"
            value={editedTitle}
            className="input input-primary flex-1"
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          {/* Bouton de validation des modifications */}
          <button className="btn btn-primary btn-sm">Modifier</button>
        </div>
      </div>
    </div>
  );
}
