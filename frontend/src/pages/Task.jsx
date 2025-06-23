import Item from "../components/Item";
import TaskModal from "../components/TaskModal";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MdAdd, MdLogout } from "react-icons/md";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

// Page principale pour la gestion des tâches utilisateur
export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [headline, setHeadline] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Récupère la liste des tâches de l'utilisateur
  const fetchTasks = async () => {
    const response = await fetch(`${API_URL}/task`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, status: isChecked }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        fetchTasks();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } else {
      // Ajout d'une nouvelle tâche
      const response = await fetch(`${API_URL}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
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

    // Ferme la modale après soumission
    document.getElementById("my_modal_3").close();
  };

  // Déconnexion de l'utilisateur
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Redirection si l'utilisateur n'est pas connecté
  if (!token) {
    return <Navigate to={"/"} />;
  }

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

      {/* Modal pour ajouter ou éditer une tâche */}
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
