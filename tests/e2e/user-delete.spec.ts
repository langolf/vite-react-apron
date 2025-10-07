import { test, expect } from "@playwright/test";

test.describe("User Deletion", () => {
  test("should delete a user successfully", async ({ page }) => {
    // Navigate to the home page
    await page.goto("/");

    // Wait for the page to load
    await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();

    // Wait for the table to load with users
    const tableRows = page.locator("tbody tr");
    await expect(tableRows.first()).toBeVisible();

    // Get initial row count
    const initialCount = await tableRows.count();

    // Get the name of the user we're about to delete (from the first row)
    const firstRow = tableRows.first();
    const firstName = await firstRow.locator("td").nth(1).textContent();
    const lastName = await firstRow.locator("td").nth(2).textContent();
    const fullName = `${firstName} ${lastName}`;

    // Click the Delete button (trash icon) on the first user
    await page.getByRole("button", { name: "Delete user" }).first().click();

    // Wait for confirmation dialog to open
    await expect(page.getByRole("alertdialog")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Are you sure?" })
    ).toBeVisible();

    // Verify the dialog shows the user's name
    await expect(page.getByText(fullName)).toBeVisible();
    await expect(page.getByText(/This will permanently delete/i)).toBeVisible();

    // Click the Delete button in the confirmation dialog
    await page.getByRole("button", { name: "Delete", exact: true }).click();

    // Wait for dialog to close
    await expect(page.getByRole("alertdialog")).not.toBeVisible();

    // Verify row count decreased by 1
    await page.waitForTimeout(500); // Small delay to allow for UI update
    const newCount = await tableRows.count();
    expect(newCount).toBe(initialCount - 1);

    // Verify the deleted user is no longer in the table
    // This should not be visible anymore
    const deletedUserRow = page
      .locator("tbody tr")
      .filter({ hasText: firstName! });
    await expect(deletedUserRow).not.toBeVisible();
  });

  test("should cancel deletion without removing user", async ({ page }) => {
    await page.goto("/");

    // Wait for the table to load
    const tableRows = page.locator("tbody tr");
    await expect(tableRows.first()).toBeVisible();

    // Get initial row count
    const initialCount = await tableRows.count();

    // Get the name of the user (from the first row)
    const firstRow = tableRows.first();
    const firstName = await firstRow.locator("td").nth(1).textContent();
    const lastName = await firstRow.locator("td").nth(2).textContent();

    // Click the Delete button
    await page.getByRole("button", { name: "Delete user" }).first().click();

    // Wait for confirmation dialog
    await expect(page.getByRole("alertdialog")).toBeVisible();

    // Click Cancel button
    await page.getByRole("button", { name: "Cancel" }).click();

    // Wait for dialog to close
    await expect(page.getByRole("alertdialog")).not.toBeVisible();

    // Verify row count hasn't changed
    const newCount = await tableRows.count();
    expect(newCount).toBe(initialCount);

    // Verify the user is still in the table
    await expect(page.getByText(firstName!)).toBeVisible();
    await expect(page.getByText(lastName!)).toBeVisible();
  });

  test("should handle deletion of multiple users sequentially", async ({
    page,
  }) => {
    await page.goto("/");

    // Wait for the table to load
    const tableRows = page.locator("tbody tr");
    await expect(tableRows.first()).toBeVisible();

    // Get initial row count
    const initialCount = await tableRows.count();

    // Delete first user
    await page.getByRole("button", { name: "Delete user" }).first().click();
    await expect(page.getByRole("alertdialog")).toBeVisible();
    await page.getByRole("button", { name: "Delete", exact: true }).click();
    await expect(page.getByRole("alertdialog")).not.toBeVisible();

    // Wait a moment for the UI to update
    await page.waitForTimeout(500);

    // Verify one user was deleted
    const currentCount = await tableRows.count();
    expect(currentCount).toBe(initialCount - 1);

    // Delete another user if there are still users remaining
    if (currentCount > 0) {
      await page.getByRole("button", { name: "Delete user" }).first().click();
      await expect(page.getByRole("alertdialog")).toBeVisible();
      await page.getByRole("button", { name: "Delete", exact: true }).click();
      await expect(page.getByRole("alertdialog")).not.toBeVisible();

      // Wait a moment for the UI to update
      await page.waitForTimeout(500);

      // Verify another user was deleted
      const finalCount = await tableRows.count();
      expect(finalCount).toBe(currentCount - 1);
    }
  });
});
