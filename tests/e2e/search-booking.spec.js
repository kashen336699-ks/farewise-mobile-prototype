import { expect, test } from "@playwright/test";
import { enterFlightDetail, enterHome } from "./helpers.js";

test("search results show dates and comparable flights", async ({ page }) => {
  await enterHome(page);
  await page.getByRole("button", { name: "Search lowest fares" }).click();

  await expect(page.getByRole("heading", { name: "New York → London" })).toBeVisible();
  await expect(page.getByText("24 flights found")).toBeVisible();
  await expect(page.getByRole("button", { name: /Skyline Air BEST VALUE/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /North Atlantic LOWEST TOTAL/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /United Wings FASTEST/ })).toBeVisible();
});

test("flight detail exposes fare breakdown and forecast", async ({ page }) => {
  await enterFlightDetail(page);

  await expect(page.getByRole("heading", { name: "Skyline Air SA 204" })).toBeVisible();
  await expect(page.getByText("Total $385")).toBeVisible();
  await page.getByRole("button", { name: /Buy now/ }).click();

  await expect(page.getByRole("heading", { name: "Price forecast" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Price trend chart" })).toBeVisible();
  await expect(page.getByText("Confidence 84%")).toBeVisible();
});

test("booking comparison lists all providers and demo limitation", async ({ page }) => {
  await enterFlightDetail(page);
  await page.getByRole("button", { name: "Compare 6 booking sites" }).click();

  await expect(page.getByRole("heading", { name: "Compare booking sites" })).toBeVisible();
  for (const provider of ["Farewise Pick", "Skyline Air", "TripJet", "FlyNow"]) {
    await expect(page.getByText(provider, { exact: true })).toBeVisible();
  }
  await expect(page.getByText("Demo only: checkout is not available.")).toBeVisible();
});

test("back controls restore the previous page", async ({ page }) => {
  await enterFlightDetail(page);
  await page.getByRole("button", { name: "Go back" }).click();
  await expect(page.getByRole("heading", { name: "New York → London" })).toBeVisible();
  await page.getByRole("button", { name: "Go back" }).click();
  await expect(page.getByRole("heading", { name: "Good morning, Alex" })).toBeVisible();
});
