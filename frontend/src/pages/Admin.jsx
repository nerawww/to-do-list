import { useEffect, useState, useRef } from "react";
import { MdLogout, MdDelete } from "react-icons/md";
import { CgDanger } from "react-icons/cg";

const API_URL = import.meta.env.VITE_API_URL;

// Page d'administration pour la gestion des utilisateurs
export default function Admin() {
  const modal = useRef();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Récupération de la liste des utilisateurs
  const fetchUser = async () => {
    const response = await fetch(`${API_URL}/admin/user`, {
      credentials: "include",
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

  // Affichage de la modale de confirmation de suppression
  const confirmDelete = (id) => {
    console.log(id);
    setSelectedUser(id);
    modal.current.showModal();
  };

  // Suppression d'un utilisateur
  const handleDelete = async () => {
    const response = await fetch(`${API_URL}/admin/user/${selectedUser}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      fetchUser();
    }
  };

  return (
    <div className="flex justify-center items-center flex-col p-5 gap-5">
      <div className="flex justify-center items-center gap-5">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {/* Bouton de déconnexion */}
        <button className="btn btn-square" onClick={logout}>
          <MdLogout className="size-5 text-blue-500 hover:text-blue-700 bg-slate-900 border rounded mx-2.5" />
        </button>
      </div>
      <table>
        <thead className="text-3xl">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Affichage de la liste des utilisateurs sauf l'utilisateur courant */}
          {users
            .filter((user) => user.email !== localStorage.getItem("email"))
            .map((user) => (
              <tr key={user._id || user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {/* Bouton pour supprimer un utilisateur */}
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
