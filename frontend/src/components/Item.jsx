import { MdDelete, MdEdit } from "react-icons/md";

// Composant pour afficher un élément de tâche individuel
export default function Item({ task, handleEdit, handleDelete }) {
  return (
    <div className="flex items-center justify-between gap-3 p-2 border-b">
      <div className="flex items-center gap-3 flex-1">
        {/* Checkbox pour le statut de la tâche */}
        <input
          type="checkbox"
          checked={task.status}
          readOnly
          className="checkbox checkbox-primary"
        />
        {/* Titre de la tâche */}
        <p className="flex-1">{task.title}</p>
      </div>
      {/* Boutons d'action */}
      <div className="flex items-center gap-2">
        {/* Bouton de modification */}
        <button onClick={handleEdit}>
          <MdEdit className="size-5 cursor-pointer text-blue-500 hover:text-blue-700 bg-slate-900 border rounded" />
        </button>
        {/* Bouton de suppression */}
        <button onClick={handleDelete}>
          <MdDelete className="size-5 cursor-pointer text-red-500 hover:text-red-700 bg-slate-900 border rounded" />
        </button>
      </div>
    </div>
  );
}
