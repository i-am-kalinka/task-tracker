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
