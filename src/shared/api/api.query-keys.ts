import { useQuery, type QueryOptions } from "@tanstack/react-query";
import { getUser, getUsers } from "./api.services";
import { UsersArraySchema, UserSchema } from "./api.contracts";

export const useGetUsers = (options?: QueryOptions) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers().then((res) => res.data),
    select: (data) => UsersArraySchema.parse(data),
    ...options,
  });
};

export const useGetUser = (id: string, options?: QueryOptions) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id).then((res) => res.data),
    select: (data) => UserSchema.parse(data),
    ...options,
  });
};
