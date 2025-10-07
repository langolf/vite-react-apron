import { test, expect } from "@playwright/test";

test.describe("User Creation", () => {
  test("should create a new user successfully", async ({ page }) => {
    // Navigate to the home page
    await page.goto("/");

    // Wait for the page to load
    await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();

    // Get initial row count
    const tableRows = page.locator("tbody tr");
    const initialCount = await tableRows.count();

    // Click the "Add user" button
    await page.getByRole("button", { name: "Add user" }).click();

    // Wait for dialog to open
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Add user" })).toBeVisible();

    // Fill in the form
    await page.getByRole("combobox", { name: /country/i }).click();
    await page.getByRole("option", { name: "United States" }).click();

    await page.getByLabel(/first name/i).fill("John");
    await page.getByLabel(/last name/i).fill("Doe");
    await page.getByTestId("age").fill("25");

    // Click Save button
    await page.getByTestId("save-button").click();

    // Wait for dialog to close
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // Verify the new user appears in the table
    await expect(page.getByText("John")).toBeVisible();
    await expect(page.getByText("Doe")).toBeVisible();

    // Verify row count increased by 1
    const newCount = await tableRows.count();
    expect(newCount).toBe(initialCount + 1);

    // Verify the new row contains the entered data
    const newRow = page.locator("tbody tr").filter({ hasText: "John" });
    await expect(newRow.getByText("United States")).toBeVisible();
    await expect(newRow.getByText("John")).toBeVisible();
    await expect(newRow.getByText("Doe")).toBeVisible();
    await expect(newRow.getByText("25")).toBeVisible();
  });

  test.describe("Age Verification", () => {
    test("should reject user under minimum age for United States (21)", async ({
      page,
    }) => {
      await page.goto("/");
      await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();

      // Click the "Add user" button
      await page.getByRole("button", { name: "Add user" }).click();
      await expect(page.getByRole("dialog")).toBeVisible();

      // Fill in the form with age 20 (below US minimum of 21)
      await page.getByRole("combobox", { name: /country/i }).click();
      await page.getByRole("option", { name: "United States" }).click();

      await page.getByLabel(/first name/i).fill("John");
      await page.getByLabel(/last name/i).fill("Doe");
      await page.getByTestId("age").fill("20");

      // Click Save button
      await page.getByTestId("save-button").click();

      // Verify error message appears
      await expect(
        page.getByText("Age does not meet minimum for selected country")
      ).toBeVisible();

      // Verify dialog is still open (form not submitted)
      await expect(page.getByRole("dialog")).toBeVisible();
    });

    test("should accept user at minimum age for United States (21)", async ({
      page,
    }) => {
      await page.goto("/");
      await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();

      await page.getByRole("button", { name: "Add user" }).click();
      await expect(page.getByRole("dialog")).toBeVisible();

      // Fill in the form with age 21 (exactly US minimum)
      await page.getByRole("combobox", { name: /country/i }).click();
      await page.getByRole("option", { name: "United States" }).click();

      await page.getByLabel(/first name/i).fill("Jane");
      await page.getByLabel(/last name/i).fill("Smith");
      await page.getByTestId("age").fill("21");

      await page.getByTestId("save-button").click();

      // Verify dialog closes (form submitted successfully)
      await expect(page.getByRole("dialog")).not.toBeVisible();

      // Verify the new user appears in the table
      await expect(page.getByText("Jane")).toBeVisible();
      await expect(page.getByText("Smith")).toBeVisible();
    });

    test("should reject user under minimum age for United Kingdom (25)", async ({
      page,
    }) => {
      await page.goto("/");
      await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();

      await page.getByRole("button", { name: "Add user" }).click();
      await expect(page.getByRole("dialog")).toBeVisible();

      // Fill in the form with age 24 (below UK minimum of 25)
      await page.getByRole("combobox", { name: /country/i }).click();
      await page.getByRole("option", { name: "United Kingdom" }).click();

      await page.getByLabel(/first name/i).fill("Alice");
      await page.getByLabel(/last name/i).fill("Brown");
      await page.getByTestId("age").fill("24");

      await page.getByTestId("save-button").click();

      // Verify error message appears
      await expect(
        page.getByText("Age does not meet minimum for selected country")
      ).toBeVisible();

      // Verify dialog is still open
      await expect(page.getByRole("dialog")).toBeVisible();
    });

    test("should accept user at minimum age for United Kingdom (25)", async ({
      page,
    }) => {
      await page.goto("/");
      await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();

      await page.getByRole("button", { name: "Add user" }).click();
      await expect(page.getByRole("dialog")).toBeVisible();

      // Fill in the form with age 25 (exactly UK minimum)
      await page.getByRole("combobox", { name: /country/i }).click();
      await page.getByRole("option", { name: "United Kingdom" }).click();

      await page.getByLabel(/first name/i).fill("Bob");
      await page.getByLabel(/last name/i).fill("EKEKEKKEKEKKEEK");
      await page.getByTestId("age").fill("25");

      await page.getByTestId("save-button").click();

      // Verify dialog closes (form submitted successfully)
      await expect(page.getByRole("dialog")).not.toBeVisible();

      // Verify the new user appears in the table
      await expect(page.getByText("Bob")).toBeVisible();
      await expect(page.getByText("EKEKEKKEKEKKEEK")).toBeVisible();
    });

    test("should reject user under minimum age for default countries (18)", async ({
      page,
    }) => {
      await page.goto("/");
      await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();

      await page.getByRole("button", { name: "Add user" }).click();
      await expect(page.getByRole("dialog")).toBeVisible();

      // Fill in the form with age 17 (below default minimum of 18)
      await page.getByRole("combobox", { name: /country/i }).click();
      await page.getByRole("option", { name: "Germany" }).click();

      await page.getByLabel(/first name/i).fill("Hans");
      await page.getByLabel(/last name/i).fill("Mueller");
      await page.getByTestId("age").fill("17");

      await page.getByTestId("save-button").click();

      // Verify error message appears
      await expect(
        page.getByText("Age does not meet minimum for selected country")
      ).toBeVisible();

      // Verify dialog is still open
      await expect(page.getByRole("dialog")).toBeVisible();
    });

    test("should accept user at minimum age for default countries (18)", async ({
      page,
    }) => {
      await page.goto("/");
      await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();

      await page.getByRole("button", { name: "Add user" }).click();
      await expect(page.getByRole("dialog")).toBeVisible();

      // Fill in the form with age 18 (exactly default minimum)
      await page.getByRole("combobox", { name: /country/i }).click();
      await page.getByRole("option", { name: "France" }).click();

      await page.getByLabel(/first name/i).fill("Marieaaaaaaaa");
      await page.getByLabel(/last name/i).fill("DuboisSSSSSSSSS");
      await page.getByTestId("age").fill("18");

      await page.getByTestId("save-button").click();

      // Verify dialog closes (form submitted successfully)
      await expect(page.getByRole("dialog")).not.toBeVisible();

      // Verify the new user appears in the table
      await expect(page.getByText("Marieaaaaaaaa")).toBeVisible();
      await expect(page.getByText("DuboisSSSSSSSSS")).toBeVisible();
    });
  });
});
