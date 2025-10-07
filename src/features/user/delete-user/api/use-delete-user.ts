import { deleteUser } from "@/shared/api/api.services";
import type { User } from "@/shared/api/api.types";
import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/query-client";

export function useDeleteUser(
  options?: UseMutationOptions<
    string,
    Error,
    string,
    { previousUsers?: User[] }
  >
) {
  return useMutation({
    mutationKey: ["users", "delete"],
    mutationFn: (id: string) => {
      return deleteUser(id);
    },
    onMutate: async (id): Promise<{ previousUsers?: User[] }> => {
      await queryClient.cancelQueries({ queryKey: [""] });

      const previousUsers = queryClient.getQueryData<User[]>(["users"]);

      if (previousUsers) {
        queryClient.setQueryData<User[]>(
          ["users"],
          previousUsers.filter((user) => user.id !== id)
        );
      }

      return { previousUsers };
    },
    onError: (_err, _id, context) => {
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
