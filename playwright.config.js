import { defineConfig } from "@playwright/test";

export default defineConfig({
    // Tell Playwright where to find its tests
    testDir: "./e2e"
});
