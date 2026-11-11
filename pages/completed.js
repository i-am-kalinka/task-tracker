import { saveTask } from "../functions.js";

import { createDeleteButton } from "../functions.js";
import { createEditDescription } from "../functions.js";
import { createCheckbox } from "../functions.js";
import { createSaveButton } from "../functions.js";
import { createCancelButton } from "../functions.js";
import { createEditButton } from "../functions.js";

let savedTasks;

if (savedTasks === null) {
    // Assign an empty array if there are no tasks
    savedTasks = [];
} else {
    // Retrieve the tasks from local storage
    savedTasks = localStorage.getItem("tasks");
}

// Convert the string back to an array
let tasks = JSON.parse(savedTasks);

// Store a reference to the HTML element with id="completedTasks"
const completedTasks = document.getElementById("completedTasks");

// For the case that an invalid input is entered
const emptyTaskMessage = document.getElementById("emptyTaskMessage");
emptyTaskMessage.hidden = true;

// Re-usable function to show currently completed tasks
function displayCompleted() {
    completedTasks.textContent = "";
    for (let element of tasks) {
        const listItem = document.createElement("li");
        listItem.classList.add("listItem");
        const deleteButton = createDeleteButton();
        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(e => e.id !== element.id);
            saveTask(tasks);
            displayCompleted();
        });
        const checkbox = createCheckbox();
        // Make the checkbox match the (value of) data
        checkbox.checked = element.completed;
        checkbox.addEventListener("change", function () {
            // Make the data match the (value of) checkbox
            element.completed = checkbox.checked;
            saveTask(tasks);
            displayCompleted();
        });
        const titleSpan = document.createElement("span");
        titleSpan.classList.add("titleSpan");
        titleSpan.textContent = element.text;
        const editDescription = createEditDescription();
        editDescription.value = element.text;
        function exitEditMode() {
            titleSpan.hidden = false;
            editButton.hidden = false;
            deleteButton.hidden = false;
            editDescription.hidden = true;
            saveButton.hidden = true;
            cancelButton.hidden = true;
        }
        const saveButton = createSaveButton();
        saveButton.addEventListener("click", function () {
            // Input validation
            const trimmedTask = editDescription.value.trim();
            if (trimmedTask.length === 0) {
                emptyTaskMessage.hidden = false;
            } else {
                emptyTaskMessage.hidden = true;
                element.text = editDescription.value;
                titleSpan.textContent = editDescription.value;
                exitEditMode();
                saveTask(tasks);
            }
        });
        const cancelButton = createCancelButton();
        cancelButton.addEventListener("click", function () {
            editDescription.value = titleSpan.textContent;
            exitEditMode();
        });
        const editButton = createEditButton();
        editButton.addEventListener("click", function () {
            titleSpan.hidden = true;
            editButton.hidden = true;
            deleteButton.hidden = true;
            editDescription.hidden = false;
            saveButton.hidden = false;
            cancelButton.hidden = false;
        });
        if (element.completed === true) {
            completedTasks.appendChild(listItem);
            listItem.prepend(checkbox);
            listItem.append(titleSpan);
            listItem.append(editDescription);
            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);
            listItem.appendChild(saveButton);
            listItem.appendChild(cancelButton);
        }
    }
}

// Show currently completed tasks (the examples)
displayCompleted();