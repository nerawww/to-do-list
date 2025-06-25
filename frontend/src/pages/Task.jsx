import Item from "../components/Item";
import TaskModal from "../components/TaskModal";
import { useEffect, useState } from "react";
import { MdAdd, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

// Page principale pour la gestion des tâches
export default function Task() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [headline, setHeadline] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Récupération des tâches depuis l'API
  const fetchTasks = async () => {
    const response = await fetch(`${API_URL}/task`, {
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setTasks(data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Ouvre la modale pour ajouter une tâche
  const handleAdd = () => {
    document.getElementById("my_modal_3").showModal();
    setHeadline("Ajouter une tâche");
    setTitle("");
    setIsEdit(false);
  };

  // Ouvre la modale pour éditer une tâche existante
  const handleEdit = (task) => {
    setHeadline("Modifier une tâche");
    setId(task._id);
    setTitle(task.title);
    setIsChecked(task.status);
    setIsEdit(true);
    document.getElementById("my_modal_3").showModal();
  };

  // Supprime une tâche
  const handleDelete = async (id) => {
    const response = await fetch(`${API_URL}/task/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      fetchTasks();
      toast.warning(data.message);
    }
  };

  // Gère la soumission du formulaire (ajout ou modification)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      // Modification d'une tâche existante
      const response = await fetch(`${API_URL}/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title, status: isChecked }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        fetchTasks();
        // toast.success(data.message);
        Swal.fire("La tâche a été modifiée", "", "success");
      } else {
        // toast.error(data.message);
        Swal.fire("La tâche n'a pas pu être modifiée", "", "error");
      }
    } else {
      // Ajout d'une nouvelle tâche
      const response = await fetch(`${API_URL}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "Aplication/json",
        },
        credentials: "include",
        body: JSON.stringify({ title }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setTitle("");
        fetchTasks();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
    // Fermeture de la modale après soumission
    document.getElementById("my_modal_3").close();
  };

  // Déconnexion de l'utilisateur
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-[500px] m-auto p-5 shadow-2xl rounded">
      {/* En-tête avec informations utilisateur et bouton de déconnexion */}
      <div className="flex justify-between items-center bg-slate-500 text-white p-5 mb-3 h-16 rounded">
        <p>
          {localStorage.getItem("username")} - {localStorage.getItem("role")}
        </p>
        <button className="btn btn-square" onClick={logout}>
          <MdLogout className="size-5 text-blue-500 hover:text-blue-700 bg-slate-900 border rounded mx-2.5" />
        </button>
      </div>

      {/* Titre et bouton pour ajouter une tâche */}
      <div className="flex justify-between">
        <h1 className="text-3xl text-center my-3">Liste de tâches</h1>
        <button type="button">
          <MdAdd
            className="size-5 cursor-pointer text-green-500 hover:text-green-700 bg-slate-900 border rounded mx-2.5"
            onClick={handleAdd}
          />
        </button>
      </div>

      {/* Liste des tâches */}
      {tasks.map((task) => (
        <Item
          key={task._id}
          task={task}
          handleEdit={() => handleEdit(task)}
          handleDelete={() => handleDelete(task._id)}
        />
      ))}

      {/* Modale pour ajouter/éditer une tâche */}
      <TaskModal
        headline={headline}
        title={title}
        isChecked={isChecked}
        isEdit={isEdit}
        handleSubmit={handleSubmit}
        onChangeTitle={(e) => setTitle(e.target.value)}
        onChangeStatus={(e) => setIsChecked(e.target.checked)}
      />
    </div>
  );
}
