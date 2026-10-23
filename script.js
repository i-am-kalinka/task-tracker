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


        // Create an edit button
        const editButton = document.createElement("button");
        editButton.type = "button";
        // Listen for a click on that button
        editButton.addEventListener("click", function () {
            // Identify the task associated with the clicked button
            const toBeEdited = element.id;
            // Turn task description into an input field
            const editDescription = document.createElement("input");
                // How to connect with selected task?
            // The input field already contains the current task name/description
                // append?
            // Hide the "edit" and "delete" button
            editButton.hidden = true;
            deleteButton.hidden = true;
            // Save (in local storage)
        });


        // Checking for completion
        if (element.completed === false) {
            
            // Re-assigning listItem.textContent directly replaces everything inside the <li> with the new text.
            // The span lets us change the text without replacing everything else, e.g. buttons.
            let titleSpan = document.createElement("span");
            titleSpan.textContent = element.text;
            listItem.append(titleSpan);

            // Each newly created listItem becomes a child of the <ul>
            uncompletedTasks.appendChild(listItem);
            listItem.prepend(checkbox);
            listItem.appendChild(deleteButton);
            listItem.appendChild(editButton);
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




// Editing a task

/*
PROBLEM DECOMPOSITION
- A button beside the task, looking like a gear.
- (Maybe combine later editing and deletion into one page.)
- Display the content/name of the chosen task, e.g. as a text line.
- User can write in that text line, i.e. edit (add/delete) characters.
- When user clicks save, overwrite the content/name with the new input.
*/

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
*/