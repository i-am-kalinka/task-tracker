// Turn an array into a string, and save it to localStorage
export function saveTask(arr) {
    localStorage.setItem("tasks", JSON.stringify(arr))
}
