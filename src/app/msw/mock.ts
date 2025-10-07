import type { User } from "@/shared/api/api.types";

export const SEED_USERS: User[] = [
  {
    id: crypto.randomUUID(),
    country: "US",
    firstName: "Ratatatat",
    lastName: "aaaaaa",
    age: 25,
  },
  {
    id: crypto.randomUUID(),
    country: "DE",
    firstName: "Anna",
    lastName: "Schmidt",
    age: 30,
  },
  {
    id: crypto.randomUUID(),
    country: "JP",
    firstName: "Yuki",
    lastName: "Tanaka",
    age: 22,
  },
  {
    id: crypto.randomUUID(),
    country: "CA",
    firstName: "Michael",
    lastName: "Brown",
    age: 28,
  },
  {
    id: crypto.randomUUID(),
    country: "FR",
    firstName: "Sophie",
    lastName: "Dubois",
    age: 27,
  },
  {
    id: crypto.randomUUID(),
    country: "AU",
    firstName: "Liam",
    lastName: "Wilson",
    age: 32,
  },
  {
    id: crypto.randomUUID(),
    country: "BR",
    firstName: "Camila",
    lastName: "Silva",
    age: 24,
  },
  {
    id: crypto.randomUUID(),
    country: "IN",
    firstName: "Arjun",
    lastName: "Patel",
    age: 29,
  },
  {
    id: crypto.randomUUID(),
    country: "IT",
    firstName: "Giulia",
    lastName: "Rossi",
    age: 26,
  },
  {
    id: crypto.randomUUID(),
    country: "ES",
    firstName: "Carlos",
    lastName: "Garcia",
    age: 31,
  },
];
