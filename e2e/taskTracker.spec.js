import { test, expect } from "@playwright/test";

test("displays the Task Tracker page", async ({ page }) => {

    // Navigate to the task tracker
    await page.goto("http://127.0.0.1:5500/Beginner%20Projects/Task%20Tracker/index.html");

    // Create a locator for the heading
    const heading = page.getByRole("heading", { name: "To-Do List" });

    // Verify that the chosen locator is being displayed
    await expect(heading).toBeVisible();

});


test("allows users to add a task and preserves it after reloading", async ({ page }) => {

    await page.goto("http://127.0.0.1:5500/Beginner%20Projects/Task%20Tracker/index.html");

    const taskInput = page.getByLabel("Enter your task:");
    await taskInput.fill("Study JavaScript");

    const addButton = page.getByRole("button", { name: "Add" });
    await addButton.click();

    // We also test that the task is being added to the correct location,
    // here: the unordered list with the id "uncompletedTasks".
    const taskList = page.locator("#uncompletedTasks");
    const task = taskList.getByText("Study JavaScript");

    await expect(task).toBeVisible();
    await page.reload();
    await expect(task).toBeVisible();

});


test("prevents users from adding an empty task and explains why", async ({ page }) => {

    await page.goto("http://127.0.0.1:5500/Beginner%20Projects/Task%20Tracker/index.html");

    // Arrange
    const items = page.locator("#uncompletedTasks li");
    const count = await items.count();
    const addButton = page.getByRole("button", { name: "Add" });
    const message = page.locator("#emptyTaskMessage");
    const taskInput = page.getByLabel("Enter your task:");

    // Act
    await expect(message).not.toBeVisible();  // Verifying that it was hidden before the click
    await taskInput.fill("     ");
    await addButton.click();

    // Assert
    await expect(items).toHaveCount(count);
    await expect(message).toBeVisible();

});


test("allows users to delete a specific task", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/Beginner%20Projects/Task%20Tracker/index.html");

    const taskInput = page.getByLabel("Enter your task:");
    const addButton = page.getByRole("button", { name: "Add" });

    await taskInput.fill("Buy Groceries");
    await addButton.click();

    await taskInput.fill("Study JavaScript");
    await addButton.click();

    const taskItems = page.locator("#uncompletedTasks li");
    const groceryTask = taskItems.filter({
        hasText: "Buy Groceries"
    });
    const studyTask = taskItems.filter({
        hasText: "Study Javascript"
    });

    // Filtering to get the right corresponding delete button
    const deleteButton = groceryTask.getByRole("button", {
        name: "Delete"
    });
    await deleteButton.click();

    // Check DOM existance
    await expect(groceryTask).toHaveCount(0);
    await expect(studyTask).toHaveCount(1);

    // Verify persistance
    await page.reload();
    await expect(groceryTask).toHaveCount(0);
    await expect(studyTask).toHaveCount(1);
});
