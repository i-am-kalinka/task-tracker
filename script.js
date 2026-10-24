// Look for that function in the same folder as this file
import { saveTask } from "./functions.js";

// Use an array to store tasks because we have a collection of the same type of thing
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

        // Create a "save" button
        const saveButton = document.createElement("button");
        saveButton.type = "button";
        saveButton.textContent = "Save";
        saveButton.hidden = true;

        // Create a "cancel" button
        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.textContent = "Cancel";
        cancelButton.hidden = true;

        // Create an "edit" button
        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit";
        // Listen for a click on that button
        editButton.addEventListener("click", function () {
            // Identify the task associated with the clicked button <-- Why? Needed?
            const toBeEdited = element.id;
        
            // Hide original task description, edit button, delete button
            titleSpan.hidden = true;
            editButton.hidden = true;
            deleteButton.hidden = true;

            // Un-hide input field, save button, cancel button
            editDescription.hidden = false;
            saveButton.hidden = false;
            cancelButton.hidden = false;

            // Save (in local storage) ?
        });

        saveButton.addEventListener("click", function () {
            // tasks.text = editDescription.value;
            // console.log(tasks, tasks.text);
        });

        // Checking for completion
        if (element.completed === false) {

            // Each newly created listItem becomes a child of the <ul>
            uncompletedTasks.appendChild(listItem);

            listItem.append(titleSpan); // <--

            listItem.prepend(checkbox);
            listItem.appendChild(deleteButton);
            listItem.appendChild(editButton);

            listItem.append(editDescription); // <--
            listItem.append(saveButton); // <--
            listItem.append(cancelButton); // <--
        }

    }
}


// When the add button is clicked, the text from the input field is added as a new task
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
let idCounter;
// Submit also works when the user presses Enter
taskForm.addEventListener("submit", function (event) {
    // Changing the normal form submission behavior to prevent page reloading
    event.preventDefault();
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

    tasks.push(
        {
            id: idCounter,
            text: taskInput.value,
            completed: false
        }
    );
    // Saving to local storage as text
    saveTask(tasks);
    displayUncompleted();

    // Small check
    console.log(tasks);
});


const uncompletedTasks = document.getElementById("uncompletedTasks");

displayUncompleted();





// When user clicks save, overwrite the content/name with the new input.
/*
- When the button is clicked, the editing mode is entered
    - The "edit" button disappears
    - A "save" and a "cancel" button appear
        - Only when "save" is clicked, the changes are updated
        - Refreshing the website preserves saved edits
    - A field for input appears, containing the current task/description
        - The changes are linked to the object property "task.text"
            - The other properties should remain unchanged
        - The changes are only applied to the selected task
    - Can the user edit multiple tasks at once, or should we somehow discard edits when another task is clicked?

Save behavior — your implementation plan
1. Detect that the user clicked Save.
2. Read the new description from the input.
3. Update the selected task object's description.
4. Persist the modified tasks.
5. Return the interface to its normal display mode.

*/