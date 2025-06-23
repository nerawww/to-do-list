// Composant modal pour ajouter une nouvelle tâche
export default function TaskModal({
  headline,
  title,
  isEdit,
  isChecked,
  handleSubmit,
  onChangeTitle,
  onChangeStatus,
}) {
  return (
    <div>
      {/* Modal d'ajout de tâche */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h2>{headline}</h2>
          {/* Formulaire de création de tâche */}
          <form
            method="dialog"
            className="flex flex-col gap-3"
            onSubmit={handleSubmit}
          >
            {/* Bouton de fermeture du modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
              type="button" // Important pour éviter de soumettre le formulaire
            >
              ✕
            </button>
            {/* Champ de saisie du titre de la tâche et checkbox en mode édition */}
            <div className="flex items-center gap-2 mt-5">
              {isEdit && (
                <input
                  type="checkbox"
                  checked={isChecked}
                  className="checkbox checkbox-primary"
                  onChange={onChangeStatus}
                />
              )}
              <input
                type="text"
                value={title}
                className="input input-primary w-full"
                required
                placeholder="Saisir le nom de la tâche"
                onChange={onChangeTitle}
              />
            </div>
            {/* Bouton pour valider l'ajout de la tâche */}
            <button className="btn btn-primary" type="submit">
              Enregistrer
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
