import { expect } from "@playwright/test";

export async function enterHome(page, method = "signin") {
  await page.goto("/");
  await page.getByRole("button", { name: "Get started" }).click();

  if (method === "guest") {
    await page.getByRole("button", { name: "Continue as guest" }).click();
  } else {
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
  }

  await expect(page.getByRole("heading", { name: "Good morning, Alex" })).toBeVisible();
}

export async function enterFlightDetail(page) {
  await enterHome(page);
  await page.getByRole("button", { name: "Search lowest fares" }).click();
  await page.getByRole("button", { name: /Skyline Air BEST VALUE/ }).click();
  await expect(page.getByRole("heading", { name: "Flight details" })).toBeVisible();
}

export function captureConsoleErrors(page) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}
