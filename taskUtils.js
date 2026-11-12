// Example of a PURE FUNCTION:

// 1) Explicit inputs: 
// Your function receives tasksArr and taskID as parameters. 
// It doesn't need to access the application's global tasks variable.

// 2) Predictable output: 
// Given the same array and ID, it returns an array containing the same remaining tasks.

// 3) No mutation of the original array: 
// .filter() creates a new array instead of modifying tasksArr.

// 4) No external dependencies: 
// Your function doesn't interact with localStorage, the DOM, or browser events.

export function removeTask(tasksArr, taskID) {
    return tasksArr.filter(e => e.id !== taskID);
}


export function getNextTaskId(tasksArr) {

    // Return an array containing all ids
    const ids = tasksArr.map(todo => todo.id);

    // Check for an empty array
    if (ids.length === 0) {
        return 0;
    }

    // Get the currently largest id
    const idCounter = Math.max(...ids);

    return idCounter + 1;

}
