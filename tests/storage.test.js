// Side-Effect Testing

import { test, expect } from "vitest";
import { beforeEach, afterEach, vi } from "vitest";

import { saveTask } from "../js/functions";


const data = {};

function setItem(key, value) {
    data[key] = value;
}

function getItem(key) {
    if ( Object.hasOwn(data, key) ) {
        return data[key];
    } else {
        return null;
    }
}

function clear() {
    for (const key of Object.keys(data)) {
        delete data[key];
    }
}

const localStorageMock = {
    setItem: setItem,
    getItem: getItem,
    clear: clear
};


beforeEach(() => {
    // Clear previously stored data before each test
    localStorageMock.clear();
    
    // Temporarily replace the global localStorage reference in the test environment
    vi.stubGlobal("localStorage", localStorageMock);
});

afterEach(() => {
    // Restore the original global localStorage reference
    vi.unstubAllGlobals();
});

test("tasks are successfully added to the storage with their data intact", () => {

    // Arrange
    const tasks = [
        { id: 1, title: "Study" }
    ];

    // Act
    saveTask(tasks);
    const result = JSON.parse(localStorageMock.getItem("tasks"));

    // Assert
    expect(result).toEqual(tasks);

}); 
