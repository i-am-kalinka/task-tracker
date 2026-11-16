# Manual Regression Testing - Checklist

## 1. Task Editing
- [ ] **Cancel an edit**
  - Enter edit mode and change a task's description.
  - Click Cancel.
  - Edit mode should close, and the original description should remain unchanged.
- [ ] **Reject invalid edits**
  - Edit an existing task and enter only whitespace.
  - The invalid description should not be saved.
  - The original task description should remain intact.

## 2. Task Completion
- [ ] **Mark a completed task as uncompleted**
  - The task should disappear from the completed page.
  - It should reappear on the uncompleted page with its checkbox unchecked.
  - Its status should persist after refreshing the page.

## 3. Empty States
- [ ] **Verify the empty-state message**
  - When no uncompleted tasks remain, the empty-state message should appear.
  - Adding a new task should hide the message again.

## 4. Navigation and Persistence
- [ ] **Navigate between pages**
  - Both navigation links should lead to the correct pages.
  - Navigating should not modify or delete any tasks.
- [ ] **Verify persistence after reopening the application**
  - Add, edit, or complete a task.
  - Close the browser tab and reopen the application.
  - All task descriptions and completion statuses should remain unchanged.

## 5. Layout and Usability
- [ ] **Test the mobile layout**
  - Use the browser's responsive design mode to simulate a narrow screen (e.g., 375px wide).
  - Text should remain readable and wrap appropriately.
  - Buttons and inputs should remain usable without overlapping.
  - No unintended horizontal scrolling should occur.
- [ ] **Test long task descriptions**
  - Create a task with a long description.
  - Text should wrap or otherwise remain readable without breaking the layout.
  - Editing and deleting the task should still work.
- [ ] **Check general usability**
  - Buttons, labels, and validation messages should be understandable.
  - Interactive elements should provide appropriate visual feedback.
  - The application should remain usable with keyboard navigation.

## 6. Final Verification
- [ ] Run all Vitest unit tests using `npm test`.
- [ ] Run all Playwright tests using `npm run test:e2e`.
- [ ] Check the browser console for unexpected JavaScript errors.
