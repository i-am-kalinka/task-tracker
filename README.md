# Task Tracker
- My second project in JavaScript.
- Here, I start learning more about HTML and CSS.

## Notes
- DOM = Document Object Model -> A tree of elements.
- ol = ordered list, ul = unordered list, li = list item
- ...
- localStorage is used for persistent stage, can only store Strings
- ...
- persistance & application state ?

- An anonymus function doesn't need a name because it is directly given to the method,
- and it is not referred to else where.

### Example of Bug Fixing
- Observe: Deleting one task removes multiple tasks.
- Form a hypothesis: Maybe the IDs or saving logic are wrong.
- Gather evidence: Use console.table() to inspect the array.
- ISOLATE THE PROBLEM: Compare the array before and after .filter().
- Find the root cause: =! was assigning a value instead of comparing values.
- Fix and verify: Replace it with !== and test deletion again.


// objects → representing one task
// arrays → storing all tasks
// push() → adding data
// filter() → filtering/removing data
// forEach() or map() → processing collections
// functions → organizing repeated operations
// DOM manipulation → displaying data
    //document.getElementById(...)
    // document.querySelector(...)
    // element.value
    // element.textContent
    // document.createElement(...)
    // element.append(...)
    // element.remove()
    // element.classList
    // addEventListener(...)
// events → reacting to the user
// localStorage → persistent data
// JSON → converting objects to/from strings


# The roadmap I'd recommend for you
1. Learn Git and GitHub [DONE]
   - Start here
   - Learn repositories, commits, branches, diffs, and pushing to GitHub. Use your existing Task Tracker as your first repository.
   - Goal: Experiment without keeping old code commented out or worrying about breaking your project.
2. Finish and polish your to-do app [DONE]
   - Add editing, input validation, an empty-state message, and some CSS. Keep using vanilla JavaScript.
   - Goal: Complete a small application end-to-end, including edge cases and usability.
3. Learn more JavaScript and basic testing [DONE]
   - Practice functions, scope, closures, array methods, objects, modules, error handling, and asynchronous JavaScript
   - Start writing small automated tests.
   - Goal: Understand why your code works and how to verify it systematically.
4. Build a second project using an API
   - For example, a weather dashboard, movie search app, or GitHub profile explorer. Learn fetch(), promises, async/await JSON responses, and HTTP.
   - Goal: Work with data that comes from outside your application.
5. Learn TypeScript, then React
   - TypeScript teaches you to describe and check data types. React introduces component-based UI development and state management.
   - Goal: Understand how larger frontend applications are structured.
6. Explore backend development and databases
   - Start with Node.js, HTTP servers, REST APIs, and SQL. Later, connect your frontend to your own backend.
   - Goal: Build a full-stack application that persists data.



Week 1 — Git + task editing
[X] Initialize a Git repository and make meaningful commits
[X] Implement editing a task
[X] Test deletion, editing, and persistence edge cases


Week 2 — CSS + usability
[X] Learn the box model and Flexbox
[X] Style your to-do app
[X] Add empty-input validation and useful feedback


Week 3 — JavaScript fundamentals
[ ] Practice array methods and closures + callbacks
[X] Learn basic unit testing
[X] Refactor one piece of business logic into a testable function


Week 4 — APIs + next project
[ ] Learn promises, fetch, and async/await
[ ] Request and display data from a public API
[ ] Begin a second small project


### Acceptance Criteria: Defining expected behavior (success) before implementation.


# Notes
- Unlike a <span> or <li>, an <input> is a void element. A void element cannot have child elements in HTML.
- ...
- Module = A JavaScript file that can share code with other JavaScript files using "export" and "import".
- ...



Next:
3.
A) Refactoring duplicated code [X]
- The UI when entering Edit Mode should be adapted! [X]
B) Learning automated testing [ ]
   - Unit tests and assertions [X]
   - Pure functions and edge cases [X]
   - Mocking and testing side effects [X]
   - Browser automation with Playwright [X]
   - Task creation, validation, deletion, and persistence [X]
   - Task completion and editing workflows [ ]
   - Final manual regression testing [ ]
C) Responsive design and accessibility [ ]
4.
- Some "minor" issues
- Update Readme, make project presentable for GitHub
5.
- API, HTTP, fetch(), Promise, async/await
- new project