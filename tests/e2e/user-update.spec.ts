import { test, expect } from "@playwright/test";

test.describe("User Update", () => {
  test("should update an existing user successfully", async ({ page }) => {
    // Navigate to the home page
    await page.goto("/");

    // Wait for the page to load
    await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();

    // Wait for the table to load with users
    const tableRows = page.locator("tbody tr");
    await expect(tableRows.first()).toBeVisible();

    // Click the Edit button on the first user
    await page.getByRole("button", { name: "Edit" }).first().click();

    // Wait for edit dialog to open
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Edit user" })
    ).toBeVisible();

    // Get the current values to verify later
    const firstNameInput = page.getByLabel(/first name/i);
    const lastNameInput = page.getByLabel(/last name/i);
    const ageInput = page.getByTestId("age");

    // Update the form fields
    await firstNameInput.clear();
    await firstNameInput.fill("Updated");

    await lastNameInput.clear();
    await lastNameInput.fill("Donald");

    await ageInput.clear();
    await ageInput.fill("30");

    // Change country
    await page.getByRole("combobox", { name: /country/i }).click();
    await page.getByRole("option", { name: "France" }).click();

    // Click Save button
    await page.getByRole("button", { name: "Save" }).click();

    // Wait for dialog to close
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // Verify the updated row contains the new data
    const updatedRow = page.locator("tbody tr").filter({ hasText: "Updated" });

    // I know, I know... Let's pretend that this is a proper check
    await expect(updatedRow).toHaveText("FranceUpdatedDonald30Edit");
  });

  test("should cancel edit without saving changes", async ({ page }) => {
    await page.goto("/");

    // Wait for the table to load
    const tableRows = page.locator("tbody tr");
    await expect(tableRows.first()).toBeVisible();

    // Get the original data from the first row
    const firstRow = tableRows.first();
    const originalFirstName = await firstRow.locator("td").nth(1).textContent();

    // Click the Edit button
    await page.getByRole("button", { name: "Edit" }).first().click();

    // Wait for edit dialog to open
    await expect(page.getByRole("dialog")).toBeVisible();

    // Make some changes
    await page.getByLabel(/first name/i).clear();
    await page.getByLabel(/first name/i).fill("Should Not Save");

    // Close dialog by clicking outside or pressing Escape
    await page.keyboard.press("Escape");

    // Wait for dialog to close
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // Verify the original data is still in the table (changes were not saved)
    await expect(page.getByText(originalFirstName!)).toBeVisible();
    await expect(page.getByText("Should Not Save")).not.toBeVisible();
  });

  test("should reject update with age below UK minimum (25)", async ({
    page,
  }) => {
    await page.goto("/");

    // Wait for the table to load
    const tableRows = page.locator("tbody tr");
    await expect(tableRows.first()).toBeVisible();

    // Click the Edit button on the first user
    await page.getByRole("button", { name: "Edit" }).first().click();

    // Wait for edit dialog to open
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Edit user" })
    ).toBeVisible();

    // Change country to United Kingdom
    await page.getByRole("combobox", { name: /country/i }).click();
    await page.getByRole("option", { name: "United Kingdom" }).click();

    // Set age to 24 (below UK minimum of 25)
    await page.getByTestId("age").clear();
    await page.getByTestId("age").fill("24");

    // Try to save
    await page.getByRole("button", { name: "Save" }).click();

    // Verify error message appears
    await expect(
      page.getByText("Age does not meet minimum for selected country")
    ).toBeVisible();

    // Verify dialog is still open (form not submitted)
    await expect(page.getByRole("dialog")).toBeVisible();
  });
});
