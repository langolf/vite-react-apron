import { useState } from "react";
import { Trash2 } from "lucide-react";
import { AlertDialog } from "@/shared/ui/alert-dialog";
import { useDeleteUser } from "./api/use-delete-user";
import { Button } from "@/shared/ui/button/button";

interface DeleteUserAlertProps {
  userId: string;
  userName: string;
}

export function DeleteUserAlert({ userId, userName }: DeleteUserAlertProps) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteUser } = useDeleteUser({
    onSuccess: (id) => {
      setOpen(false);
      console.log(`User with id ${id} deleted successfully`); // You can replace this with a toast notification");
    },
  });

  const handleDelete = () => {
    deleteUser(userId);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <Button with="icon" aria-label="Delete user" variant="danger">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This will permanently delete <strong>{userName}</strong>. This
            action cannot be undone.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action
            onClick={handleDelete}
            className="bg-button-destructive-background border-none text-button-destructive-text hover:bg-button-destructive-background-hover"
          >
            Delete
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
