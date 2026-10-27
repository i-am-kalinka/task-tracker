import { saveTask } from "../functions.js";

// Retrieve the tasks from local storage
const savedTasks = localStorage.getItem("tasks");

// Convert the string back to an array
let tasks = JSON.parse(savedTasks);

// Store a reference to the HTML element with id="completedTasks"
const completedTasks = document.getElementById("completedTasks");

// Re-usable function to show currently completed tasks
function displayCompleted() {
    completedTasks.textContent = "";
    for (let element of tasks) {
        const listItem = document.createElement("li");
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(e => e.id !== element.id);
            saveTask(tasks);
            displayCompleted();
        });
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        // Make the checkbox match the (value of) data
        checkbox.checked = element.completed;
        checkbox.addEventListener("change", function () {
            // Make the data match the (value of) checkbox
            element.completed = checkbox.checked;
            saveTask(tasks);
            displayCompleted();
        });
        const titleSpan = document.createElement("span");
        titleSpan.textContent = element.text;
        const editDescription = document.createElement("input");
        editDescription.value = element.text;
        editDescription.hidden = true;
        const saveButton = document.createElement("button");
        saveButton.type = "button";
        saveButton.textContent = "Save";
        saveButton.hidden = true;
        saveButton.addEventListener("click", function () {
            element.text = editDescription.value;
            titleSpan.textContent = editDescription.value;
            function exitEditMode() {
                titleSpan.hidden = false;
                editButton.hidden = false;
                deleteButton.hidden = false;
                editDescription.hidden = true;
                saveButton.hidden = true;
                cancelButton.hidden = true;
            }
            exitEditMode();
            saveTask(tasks);
        });
        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.textContent = "Cancel";
        cancelButton.hidden = true;
        cancelButton.addEventListener("click", function () {
            editDescription.value = titleSpan.textContent;
            exitEditMode();
        });
        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit";
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
            listItem.appendChild(deleteButton);
            listItem.appendChild(editButton);
            listItem.appendChild(saveButton);
            listItem.appendChild(cancelButton);
        }
    }
}

// Show currently completed tasks (the examples)
displayCompleted();