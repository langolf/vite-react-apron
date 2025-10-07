import { editUser } from "@/shared/api/api.services";
import type { User, UpdateUser } from "@/shared/api/api.types";
import { queryClient } from "@/shared/lib/query-client";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

export function useUpdateUserMutation(
  options?: Pick<
    UseMutationOptions<
      User,
      Error,
      { id: string; data: UpdateUser },
      { previousUsers?: User[] }
    >,
    "onSuccess" | "onError" | "onSettled" | "onMutate"
  >
) {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateUser }) => {
      const result = await editUser(id, data);
      if (!result) {
        throw new Error("Failed to update user");
      }
      return result.data;
    },

    onMutate: async ({ id, data }): Promise<{ previousUsers?: User[] }> => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUsers = queryClient.getQueryData<User[]>(["users"]);

      if (previousUsers) {
        queryClient.setQueryData<User[]>(
          ["users"],
          previousUsers.map((user) =>
            user.id === id ? { ...user, ...data } : user
          )
        );
      }

      return { previousUsers };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({
        queryKey: ["user", variables.id],
      });
    },
    ...options,
  });
}
