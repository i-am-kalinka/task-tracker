import { saveTask } from "../functions.js";

// Retrieve the tasks from local storage
const savedTasks = localStorage.getItem("tasks");

// Convert the string back to an array
const tasks = JSON.parse(savedTasks);

// Store a reference to the HTML element with id="completedTasks"
const completedTasks = document.getElementById("completedTasks");

// Re-usable function to show currently completed tasks
function displayCompleted() {
    completedTasks.textContent = "";
    for (let element of tasks) {
        const listItem = document.createElement("li");
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(e => e.id ==! element.id);
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
        if (element.completed === true) {
            listItem.textContent = element.text;
            completedTasks.appendChild(listItem);
            listItem.prepend(checkbox);
            listItem.appendChild(deleteButton);
        }
    }
}

// Show currently completed tasks (the examples)
displayCompleted();
