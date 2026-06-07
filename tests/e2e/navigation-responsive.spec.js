import { expect, test } from "@playwright/test";
import { captureConsoleErrors, enterHome } from "./helpers.js";

test("bottom navigation reaches every primary section", async ({ page }) => {
  await enterHome(page);

  const destinations = [
    ["Deals", "Explore deals"],
    ["Trips", "Trips"],
    ["Alerts", "Price alerts"],
    ["Profile", "Profile"],
    ["Home", "Good morning, Alex"]
  ];

  for (const [button, heading] of destinations) {
    await page.getByRole("button", { name: button, exact: true }).click();
    await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
  }
});

test("alert cards open the price forecast", async ({ page }) => {
  await enterHome(page);
  await page.getByRole("button", { name: "Alerts", exact: true }).click();
  await page.getByRole("button", { name: /Chicago → Tokyo/ }).click();
  await expect(page.getByRole("heading", { name: "Price forecast" })).toBeVisible();
});

test("the application has no horizontal overflow", async ({ page }) => {
  await enterHome(page);

  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    body: document.body.scrollWidth,
    root: document.documentElement.scrollWidth
  }));

  expect(dimensions.body).toBeLessThanOrEqual(dimensions.viewport);
  expect(dimensions.root).toBeLessThanOrEqual(dimensions.viewport);
});

test("the primary flow produces no browser errors", async ({ page }) => {
  const errors = captureConsoleErrors(page);

  await enterHome(page);
  await page.getByRole("button", { name: "Search lowest fares" }).click();
  await page.getByRole("button", { name: /Skyline Air BEST VALUE/ }).click();
  await page.getByRole("button", { name: "Compare 6 booking sites" }).click();

  expect(errors).toEqual([]);
});
