// Look for that function in the same folder as this file
import { saveTask } from "./functions.js";

// An array for task storage since we have a collection of the same type of thing
const exampleTasks = [
    {
        id: 0,
        text: "One Example To-Do",
        completed: true
    },
    {
        id: 1,
        text: "Another Example To-Do",
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
        // Create a delete button for each task
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(e => e.id !== element.id);
            saveTask(tasks);
            displayUncompleted();
        });
        // Create a checkbox for each task
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
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
        titleSpan.textContent = element.text;

        // Create an input field containing the task description that is hidden at first
        const editDescription = document.createElement("input");
        editDescription.value = element.text;
        editDescription.hidden = true;

        function exitEditMode() {
                titleSpan.hidden = false;
                editButton.hidden = false;
                deleteButton.hidden = false;
                editDescription.hidden = true;
                saveButton.hidden = true;
                cancelButton.hidden = true;
            }

        // Create a "save" button
        const saveButton = document.createElement("button");
        saveButton.type = "button";
        saveButton.textContent = "Save";
        saveButton.hidden = true;
        saveButton.addEventListener("click", function () {
            // Input validation
            const trimmedTask = editDescription.value.trim();
            if (trimmedTask.length === 0) {
                emptyTaskMessage.hidden = false;
            } else {
                emptyTaskMessage.hidden = true;
                // Update the description
                element.text = editDescription.value;
                titleSpan.textContent = editDescription.value;
                exitEditMode();
                saveTask(tasks);
            }
        });

        // Create a "cancel" button
        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.textContent = "Cancel";
        cancelButton.hidden = true;
        cancelButton.addEventListener("click", function () {
            // Discard the new entry
            editDescription.value = titleSpan.textContent;
            // Change the UI back to reading mode
            exitEditMode();
        });

        // Create an "edit" button
        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit";
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
            listItem.appendChild(deleteButton);
            listItem.appendChild(editButton);
            listItem.appendChild(saveButton);
            listItem.appendChild(cancelButton);
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
        // Assign a new unique id to the new task
        const ids = tasks.map(function(todo) {
        return todo.id;
        })
        // Turn the array into a list with the spread operator, and get the largest id
        idCounter = Math.max(...ids);
        // Handle edge cases, such as if the array is empty
        if (ids.length === 0) {
            idCounter = 0;
        } else {
            idCounter +=1;
        }
        // Add new task to the array
        tasks.push(
            {
            id: idCounter,
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


/*
1. Add click-able link to completed.js for returning to main page
2. After clean up, merge my branch and update Github
3. Learn some CSS
4. Automated tests?
*/ 