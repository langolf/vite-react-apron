import { http, HttpResponse } from "msw";
import { UserRepository } from "./repository";

import { z } from "zod";
import {
  CreateUserSchema,
  UpdateUserSchema,
  UserSchema,
} from "@/shared/api/api.contracts";

const repository = new UserRepository();

export const handlers = [
  // GET /api/user

  http.get("/api/users/:id", async ({ params }) => {
    try {
      const user = repository.getById(String(params.id));
      return HttpResponse.json(user);
    } catch (error) {
      console.error("Error fetching users:", error);
      return HttpResponse.json(
        { error: "Failed to fetch users" },
        { status: 500 }
      );
    }
  }),

  // GET /api/users
  http.get("/api/users", () => {
    try {
      const users = repository.getAll();
      return HttpResponse.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return HttpResponse.json(
        { error: "Failed to fetch users" },
        { status: 500 }
      );
    }
  }),

  // POST /api/users
  http.post("/api/users", async ({ request }) => {
    try {
      const body = await request.json();

      // Validate request body
      const validatedData = CreateUserSchema.parse(body);

      // Create user
      const newUser = repository.create(validatedData);

      // Validate response
      const validatedUser = UserSchema.parse(newUser);

      return HttpResponse.json(validatedUser, { status: 201 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return HttpResponse.json(
          { error: "Validation failed", details: error.issues },
          { status: 400 }
        );
      }
      console.error("Error creating user:", error);
      return HttpResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }
  }),

  // PUT /api/users/:id
  http.put("/api/users/:id", async ({ params, request }) => {
    try {
      const { id } = params;

      if (typeof id !== "string") {
        return HttpResponse.json({ error: "Invalid user ID" }, { status: 400 });
      }

      const body = await request.json();

      // Validate request body
      const validatedData = UpdateUserSchema.parse(body);

      // Get existing user to merge with updates
      const existingUser = repository.getById(id);
      if (!existingUser) {
        return HttpResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Merge and validate the complete user object
      const mergedUser = { ...existingUser, ...validatedData };
      UserSchema.parse(mergedUser); // Validate merged result

      // Update user
      const updatedUser = repository.update(id, validatedData);

      if (!updatedUser) {
        return HttpResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Validate response
      const validatedUser = UserSchema.parse(updatedUser);

      return HttpResponse.json(validatedUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return HttpResponse.json(
          { error: "Validation failed", details: error.issues },
          { status: 400 }
        );
      }
      console.error("Error updating user:", error);
      return HttpResponse.json(
        { error: "Failed to update user" },
        { status: 500 }
      );
    }
  }),

  // DELETE /api/users/:id
  http.delete("/api/users/:id", ({ params }) => {
    try {
      const { id } = params;

      if (typeof id !== "string") {
        return HttpResponse.json({ error: "Invalid user ID" }, { status: 400 });
      }

      const deleted = repository.delete(id);

      if (!deleted) {
        return HttpResponse.json({ error: "User not found" }, { status: 404 });
      }

      return HttpResponse.json({ ok: true });
    } catch (error) {
      console.error("Error deleting user:", error);
      return HttpResponse.json(
        { error: "Failed to delete user" },
        { status: 500 }
      );
    }
  }),
];
