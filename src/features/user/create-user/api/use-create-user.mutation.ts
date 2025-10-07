import {
  useMutation,
  type DefaultError,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/query-client";

import { createUser } from "@/shared/api/api.services";
import type { CreateUser, User } from "@/shared/api/api.types";

export function useCreateUserMutation(
  options: Pick<
    UseMutationOptions<CreateUser, DefaultError, CreateUser, unknown>,
    "onSuccess" | "onError" | "onSettled"
  > = {}
) {
  return useMutation({
    mutationFn: async (data: CreateUser) => {
      const response = await createUser(data);

      if (!response?.data) {
        throw new Error("Failed to create user: No data returned");
      }

      return response.data;
    },
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUsers = queryClient.getQueryData<User[]>(["users"]);

      if (previousUsers) {
        const optimisticUser: User = {
          id: crypto.randomUUID(),
          ...newUser,
        };
        queryClient.setQueryData<User[]>(
          ["users"],
          [...previousUsers, optimisticUser]
        );
      }

      return { previousUsers };
    },
    onError: (_err, _newUser, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    ...options,
  });
}
