import type { AxiosRequestConfig } from "axios";
import {
  CreateUserSchema,
  UpdateUserSchema,
  UsersArraySchema,
  UserSchema,
} from "./api.contracts";
import type { CreateUser, UpdateUser } from "./api.types";
import { responseContract } from "./api.lib";
import { api } from "./api.transport";

export function getUsers(config?: AxiosRequestConfig) {
  return api.get(`/users`, config).then(responseContract(UsersArraySchema));
}

export function getUser(id: string, config?: AxiosRequestConfig) {
  return api.get(`/users/${id}`, config).then(responseContract(UserSchema));
}

export async function createUser(
  createUserDto: CreateUser,
  config?: AxiosRequestConfig
) {
  const data = CreateUserSchema.safeParse(createUserDto);

  if (!data.success) {
    return;
  }

  return api
    .post("/users", data.data, config)
    .then(responseContract(CreateUserSchema));
}

export function editUser(
  id: string,
  values: Partial<UpdateUser>,
  config?: AxiosRequestConfig
) {
  const data = UpdateUserSchema.safeParse(values);

  if (!data.success) {
    return;
  }

  return api
    .put(`/users/${id}`, data.data, config)
    .then(responseContract(UserSchema));
}

export function deleteUser(id: string, config?: AxiosRequestConfig) {
  return api.delete(`/users/${id}`, config).then((res) => res.data);
}
