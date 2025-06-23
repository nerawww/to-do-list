import { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MdLogout, MdDelete } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;

// Page d'administration pour gérer les utilisateurs
export default function Admin() {
  const modal = useRef();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Redirection si l'utilisateur n'est pas connecté
  if (!token) {
    return <Navigate to="/" />;
  }

  let decode;
  try {
    decode = jwtDecode(token);
  } catch (err) {
    console.error("Invalid token:", err);
    return <Navigate to="/" />;
  }

  // Redirection si l'utilisateur n'est pas admin
  if (!decode || decode.role !== "admin") {
    return <Navigate to="/" />;
  }

  // Récupère la liste des utilisateurs
  const fetchUser = async () => {
    const response = await fetch(`${API_URL}/admin/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Déconnexion de l'utilisateur
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Ouvre la modale de confirmation de suppression
  const confirmDelete = (id) => {
    console.log(id);
    setSelectedUser(id);
    modal.current.showModal();
  };

  // Supprime un utilisateur sélectionné
  const handleDelete = async () => {
    const response = await fetch(`${API_URL}/admin/user/${selectedUser}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      fetchUser();
    }
  };

  return (
    <div className="p-5">
      {/* En-tête avec bouton de déconnexion */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button className="btn btn-warning" onClick={logout}>
          <MdLogout className="size-5 cursor-pointer bg-slate-900 border rounded" />
        </button>
      </div>

      {/* Tableau des utilisateurs */}
      <table>
        <thead className="text-3xl">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.email !== localStorage.getItem("email"))
            .map((user) => (
              <tr key={user._id || user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => confirmDelete(user._id)}
                  >
                    <MdDelete className="size-5 cursor-pointer text-red-500 hover:text-red-700 bg-slate-900 border rounded" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modale de confirmation de suppression */}
      <dialog id="delete_confirm" className="modal" ref={modal}>
        <div className="modal-box">
          <CgDanger className="size-5 cursor-pointer text-red-500 hover:text-red-700 bg-slate-900 border rounded" />
          <p className="py-4">Êtes-vous sûr de supprimer l'utilisateur?</p>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("delete_confirm").close()
                }
              >
                Annuler
              </button>
              <button className="btn btn-error" onClick={handleDelete}>
                Confirmer
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
