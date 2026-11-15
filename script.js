// Look for that function in the same folder as this file
import { saveTask } from "./functions.js";

import { createDeleteButton } from "./functions.js";
import { createEditDescription } from "./functions.js";
import { createCheckbox } from "./functions.js";
import { createSaveButton } from "./functions.js";
import { createCancelButton } from "./functions.js";
import { createEditButton } from "./functions.js";

import { removeTask } from "./taskUtils.js";
import { getNextTaskId } from "./taskUtils.js"

// An array for task storage since we have a collection of the same type of thing
const exampleTasks = [
    {
        id: 0,
        text: "Completed To-Do Example",
        completed: true
    },
    {
        id: 1,
        text: "Uncompleted To-Do Example",
        completed: false
    }
];

// Declare using "let" to allow re-assignment
let tasks;

// Retrieve the tasks from local storage
const savedTasks = localStorage.getItem("tasks");

// Use localStorage if it contains something, otherwise use the examples
if (savedTasks !== null) {
    tasks = JSON.parse(savedTasks);
} else {
    tasks = exampleTasks;
}

// For the case that an invalid input is entered
const emptyTaskMessage = document.getElementById("emptyTaskMessage");
emptyTaskMessage.hidden = true;

const uncompletedTasks = document.getElementById("uncompletedTasks");
// Display all uncompleted tasks on the main page
// It's supposed to be called whenever a new task is added = "rendering"
function displayUncompleted() {
    // Assign to an empty string to prevent duplicates
    uncompletedTasks.textContent = "";
    for (let element of tasks) {
        // Create a list item for each task
        const listItem = document.createElement("li");
        listItem.classList.add("listItem");
        // Create a delete button for each task
        const deleteButton = createDeleteButton();
        deleteButton.addEventListener("click", function() {
            // tasks = tasks.filter(e => e.id !== element.id);
            tasks = removeTask(tasks, element.id);
            saveTask(tasks);
            displayUncompleted();
        });
        // Create a checkbox for each task
        const checkbox = createCheckbox();
        // Make the checkbox match the (value of) data
        checkbox.checked = element.completed;
        // Change the boolean state
        checkbox.addEventListener("change", function () {
            // Take the checkbox's current state and assign it to the task object's completed property
            element.completed = checkbox.checked;
            saveTask(tasks);
            // Updating the UI
            displayUncompleted();
        });

        // Re-assigning listItem.textContent directly replaces everything inside the <li> with the new text.
        // The span lets us change the text without replacing everything else, e.g. buttons.
        const titleSpan = document.createElement("span");
        titleSpan.classList.add("titleSpan");
        titleSpan.textContent = element.text;

        // Create an input field containing the task description that is hidden at first
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

        // Create a "save" button
        const saveButton = createSaveButton();
        saveButton.addEventListener("click", function () {
            // Input validation
            const trimmedTask = editDescription.value.trim();
            if (trimmedTask.length === 0) {
                emptyTaskMessage.hidden = false;
            } else {
                emptyTaskMessage.hidden = true;
                // Update the description
                element.text = trimmedTask;
                titleSpan.textContent = element.text;
                editDescription.value = element.text;
                exitEditMode();
                saveTask(tasks);
            }
        });

        // Create a "cancel" button
        const cancelButton = createCancelButton();
        cancelButton.addEventListener("click", function () {
            // Discard the new entry
            editDescription.value = titleSpan.textContent;
            // Change the UI back to reading mode
            exitEditMode();
        });

        // Create an "edit" button
        const editButton = createEditButton();
        // Listen for a click on that button
        editButton.addEventListener("click", function () {
            // Hide original task description, edit button, delete button
            titleSpan.hidden = true;
            editButton.hidden = true;
            deleteButton.hidden = true;
            // Un-hide input field, save button, cancel button
            editDescription.hidden = false;
            saveButton.hidden = false;
            cancelButton.hidden = false;
        });

        // Check for completion
        if (element.completed === false) {
            // Each newly created listItem becomes a child of the <ul>
            uncompletedTasks.appendChild(listItem);
            // Build the content of the <li> element
            listItem.prepend(checkbox);
            // .append accepts Node objects and DOMStrings
            listItem.append(titleSpan);
            listItem.append(editDescription);
            // .appendChild accepts only Node objects
            listItem.appendChild(editButton);
            listItem.appendChild(saveButton);
            listItem.appendChild(cancelButton);
            listItem.appendChild(deleteButton);
            // listItem.append(emptyStateMessage);
        }
    }
    const emptyStateMessage = document.getElementById("emptyStateMessage");
    if (tasks.filter(e => e.completed === false).length === 0) {
        emptyStateMessage.hidden = false;
    } else {
        emptyStateMessage.hidden = true;
    }
    // .some() => Does at least one element satisfy this condition?
}

// When the add button is clicked, the text from the input field is added as a new task
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
taskInput.classList.add("container1");
let idCounter;
// Submit also works when the user presses Enter
taskForm.addEventListener("submit", function (event) {
    // Changing the normal form submission behavior to prevent page reloading
    event.preventDefault();
    // Input validation
    // 1. Remove unncessary spaces
    const trimmedTask = taskInput.value.trim();
    // 2. Prevent blank descriptions
    if (trimmedTask.length === 0) {
        emptyTaskMessage.hidden = false;
    } else {
        emptyTaskMessage.hidden = true;
        // Get the next available id (using a pure function)
        const nextId = getNextTaskId(tasks);
        // Add new task to the array
        tasks.push(
            {
            id: nextId,
            text: trimmedTask,
            completed: false
            }
        );
        // Saving to local storage as text
        saveTask(tasks);
        displayUncompleted();

        // Small check
        console.log(tasks);
    }
});

displayUncompleted();
