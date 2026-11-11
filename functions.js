// Turn an array into a string, and save it to localStorage
export function saveTask(arr) {
    localStorage.setItem("tasks", JSON.stringify(arr))
}

export function createDeleteButton() {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("button", "button-delete");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    return deleteButton;
}
export function createEditDescription() {
    const editDescription = document.createElement("input");
    editDescription.classList.add("editDescription");
    editDescription.hidden = true;

    return editDescription;
}

export function createCheckbox() {
    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";

    return checkbox;
}

export function createSaveButton() {
    const saveButton = document.createElement("button");
    saveButton.classList.add("button", "button-save");
    saveButton.type = "button";
    saveButton.textContent = "Save";
    saveButton.hidden = true;

    return saveButton;
}

export function createCancelButton() {
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("button", "button-cancel");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";
    cancelButton.hidden = true;

    return cancelButton;
}

export function createEditButton() {
    const editButton = document.createElement("button");
    editButton.classList.add("button", "button-edit");
    editButton.type = "button";
    editButton.textContent = "Edit";

    return editButton;
}