// Composant modal pour ajouter ou éditer une tâche
export default function TaskModal({
  headline,
  title,
  isChecked,
  isEdit,
  handleSubmit,
  onChangeTitle,
  onChangeStatus,
}) {
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          {/* Titre du modal */}
          <h2 className="text-2xl">{headline}</h2>

          {/* Formulaire pour saisir ou modifier une tâche */}
          <form
            method="dialog"
            className="flex flex-col gap-3"
            onSubmit={handleSubmit}
          >
            {/* Bouton pour fermer le modal */}
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mt-5">
              {/* Champ pour le titre de la tâche */}
              <input
                required
                type="text"
                value={title}
                placeholder="Saisir le nom de la tâche..."
                className="input input-primary w-full"
                onChange={onChangeTitle}
              />

              {/* Checkbox pour le statut, affichée seulement en mode édition */}
              {isEdit && (
                <input
                  type="checkbox"
                  checked={isChecked}
                  className="checkbox checkbox-primary"
                  onChange={onChangeStatus}
                />
              )}
            </div>

            {/* Bouton pour enregistrer la tâche */}
            <button className="btn btn-primary" type="submit">
              Enregistrer
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
