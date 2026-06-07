import { expect, test } from "@playwright/test";
import { enterHome } from "./helpers.js";

test("onboarding exposes the product promise and login entry points", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Farewise");
  await expect(page.getByRole("heading", { name: "Fly farther. Pay less." })).toBeVisible();
  await expect(page.getByText("$385", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Get started" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Already have an account/ })).toBeVisible();
});

test("sign-in form is labeled and enters the home page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Get started" }).click();

  await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
  await expect(page.getByLabel("EMAIL")).toHaveValue("alex@example.com");
  await expect(page.getByLabel("PASSWORD")).toHaveValue("farewise1");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();

  await expect(page.getByRole("heading", { name: "Good morning, Alex" })).toBeVisible();
});

test("guest access enters the same search experience", async ({ page }) => {
  await enterHome(page, "guest");
  await expect(page.getByRole("heading", { name: "Find your lowest fare" })).toBeVisible();
});
