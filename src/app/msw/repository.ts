import type { CreateUser, UpdateUser, User } from "@/shared/api/api.types";
import { SEED_USERS } from "./mock";
const STORAGE_KEY = "apron-users-db";

export class UserRepository {
  private users: User[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.users = JSON.parse(stored);
      } else {
        // First run - seed with initial data
        this.users = SEED_USERS;
        this.saveToStorage();
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
      this.users = [...SEED_USERS];
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }

  getAll(): User[] {
    return [...this.users];
  }

  getById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(data: CreateUser): User {
    const newUser: User = {
      id: crypto.randomUUID(),
      ...data,
    };
    this.users.push(newUser);
    this.saveToStorage();
    return newUser;
  }

  update(id: string, data: UpdateUser): User | null {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return null;
    }

    // Merge with existing data
    this.users[index] = {
      ...this.users[index],
      ...data,
    };

    this.saveToStorage();
    return this.users[index];
  }

  delete(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return false;
    }

    this.users.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  // For testing - clear all data
  clear(): void {
    this.users = [];
    this.saveToStorage();
  }

  // For testing - reset to seed data
  reset(): void {
    this.users = [...SEED_USERS];
    this.saveToStorage();
  }
}
