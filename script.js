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
            // Update the description
            element.text = editDescription.value;
            titleSpan.textContent = editDescription.value;
            exitEditMode();
            saveTask(tasks);
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



// 1. Work through the ChatGPT itinerary
// 2. After clean up, merge my branch and update Github
// 3. CSS
// 4. Automated tests?


// 1.1) 
// I created a "exitEditMode()" function in the "script.js" file.
// This way, I'm able to have this code only once, while calling the function twice.
// Is this enough? I tried to make this function in the "functions.js" file to not repeat
// it across files, but it didn't know things defined elsewhere such as "title.span".

// 1.2)
// I just forgot one line, right?
// I think I fixed it now, please check.

// 1.3)
// Is it really a problem though if an old ID is reused?
// If the task was deleted, it's ID should free up - I don't see an issue.

// 2)
// a: Works.
// b: Works.
// c: Works.
// d: Works.
// e: Works.
// f: Works.
// g: Works.
// h: Works.
// i: Works.
// j: Works.
// k: Works.
// l: Works.
    // Notes:
    // I can add a task without a description.
    // I can edit multiple tasks at the same time.
    // I can save a task after removing description.
        // Many spaces are still saved as if nothing is there.

// 3)
// How do I do this? How do I check for a certain type?
// My first idea would be an if-statement that checks for "type === String".

// 4)
// At first, the functionality worked after reloading the page, but something like a click didn't
// change the UI. Therefore, I put this piece of code into the displayUncomplete() function. Now,
// when the last task is deleted, the message shows up BUT after adding a new tasks it doesn't go
// aways. I'm not sure how to fix this.
// Also, I'm not sure if this is the best way to do it, i.e. with ".filter". I tried a for-loop
// and a while-loop too but they led to infinite loading and I didn't know how to fix that.