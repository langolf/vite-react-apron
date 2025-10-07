import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AlertDialog } from "./alert-dialog";
import { Button } from "@/shared/ui/button/button";

const meta = {
  title: "AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  decorators: [],
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const AlertDialogStoryComponent = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <Button variant="stroked">Open Alert Dialog</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel asChild>
            <Button variant="stroked">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action className="bg-button-destructive-background border-none text-button-destructive-text hover:bg-button-destructive-background-hover">
            Delete
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export const Primary: Story = {
  render: () => <AlertDialogStoryComponent />,
};
