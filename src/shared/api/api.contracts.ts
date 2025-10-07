import z from "zod";
import { CountryEnum } from "@/shared/config/countries";

// This is strange requirement for name: 5+. Let's do 3+
const nameValidation = z
  .string()
  .min(3, "Name is required")
  .max(20)
  .regex(
    /^[a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F]+$/,
    "First name must contain only letters"
  );

const ageValidation = (data: { country: string; age: number }) => {
  switch (data.country) {
    case "GB": // United Kingdom
    case "IE": // Ireland
      return data.age >= 25;
    case "US": // United States
      return data.age >= 21;
    default:
      return data.age >= 18;
  }
};

export const UserSchema = z.object({
  id: z.string(),
  country: CountryEnum,
  firstName: nameValidation.refine((val) => val.length > 0, {
    message: "First name is required",
  }),
  lastName: nameValidation.refine((val) => val.length > 0, {
    message: "Last name is required",
  }),
  age: z.coerce.number<number>().int().min(1).max(150),
});

export const CreateUserSchema = UserSchema.omit({ id: true }).refine(
  ageValidation,
  {
    message: "Age does not meet minimum for selected country",
    path: ["age"],
  }
);

export const UpdateUserSchema = UserSchema.omit({ id: true }).refine(
  ageValidation,
  {
    message: "Age does not meet minimum for selected country",
    path: ["age"],
  }
);

export const UsersArraySchema = z.array(UserSchema);

export const ApiErrorDataDtoSchema = z.object({
  errors: z.record(z.string(), z.array(z.string())),
});

export const ApiErrorDataSchema = z.array(z.string());
