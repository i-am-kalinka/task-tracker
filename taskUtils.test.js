// Pure Function Testing

import { test, expect } from "vitest";

import { removeTask } from "./taskUtils.js";
import { getNextTaskId } from "./taskUtils.js";


test("removes the specified task without modifying the original array", () => {

    // Arrange
    const tasks = [
        { id: 1, title: "Study" },
        { id: 2, title: "Exercise" },
        { id: 3, title: "Read" }
    ];

    // Act
    const result = removeTask(tasks, 2);

    // Assert
    expect(result).toEqual([
        { id: 1, title: "Study"},
        { id: 3, title: "Read" }
    ])
    expect(tasks).toEqual([
        { id: 1, title: "Study"},
        { id: 2, title: "Exercise"},
        { id: 3, title: "Read" }
    ])

});

test("keeps all tasks when the specified ID does not exist", () => {
    const tasks = [
        { id: 1, title: "Study" },
        { id: 2, title: "Exercise" }
    ];
    const result = removeTask(tasks, 99);
    expect(result).toEqual([
        { id: 1, title: "Study"},
        { id: 2, title: "Exercise" }
    ]);
});

test("returns an empty array when removing a task from an empty array", () => {
    const tasks = [];
    const result = removeTask(tasks, 1);
    expect(result).toEqual([]);
});

test("returns an empty array when the last task is removed", () => {
    const tasks = [
        { id: 1, title: "Study" }
    ];
    const result = removeTask(tasks, 1);
    expect(result).toEqual([
    ]);
});


test("returns id 0 if the array is empty", () => {
    const tasks = [];
    const result = getNextTaskId(tasks);
    expect(result).toBe(0);
});

test("returns an id higher by 1 than the only task", () => {
    const tasks = [{ id: 5, title: "Play" }];
    const result = getNextTaskId(tasks);
    expect(result).toBe(6);
});

test("uses the largest current id and increases it by 1", () => {
    const tasks = [
        { id: 6, title: "Eat" },
        { id: 1, title: "Study" },
        { id: 4, title: "Sleep" }
    ];
    const result = getNextTaskId(tasks);
    expect(result).toBe(7);
});
