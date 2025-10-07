import { z } from "zod";
import type { CountryEnum } from "@/shared/config/countries";
import type {
  ApiErrorDataDtoSchema,
  ApiErrorDataSchema,
  CreateUserSchema,
  UpdateUserSchema,
  UserSchema,
} from "./api.contracts";

export type ApiErrorDataDto = z.infer<typeof ApiErrorDataDtoSchema>;
export type ApiErrorData = z.infer<typeof ApiErrorDataSchema>;
export type User = z.infer<typeof UserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type Country = z.infer<typeof CountryEnum>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
