// Composant modal pour ajouter une nouvelle tâche
export default function TaskModal({ handleSubmit, title, onChange }) {
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h2>Ajouter une nouvelle tâche</h2>
          {/* Formulaire de création de tâche */}
          <form
            onSubmit={handleSubmit}
            method="dialog"
            className="flex flex-col gap-3"
          >
            {/* if there is a button in form, it will close the modal */}
            {/* Bouton de fermeture du modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>
            {/* Champ de saisie du titre de la tâche */}
            <input
              type="text"
              value={title}
              className="input input-primary w-full mt-5"
              required
              placeholder="Saisir le nom de la tâche"
              onChange={onChange}
            />
            <button className="btn btn-primary">Ajouter</button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
