import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/shared/ui/button/button";
import { Dialog } from "./dialog";
import { FormStoryComponent } from "@/shared/ui/form/form.stories";

const meta: Meta<typeof Dialog> = {
  title: "Dialog",
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const FormDialogStoryComponent = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="stroked">Open Form Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content className="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>Add user</Dialog.Title>
        </Dialog.Header>
        <FormStoryComponent />
      </Dialog.Content>
    </Dialog>
  );
};
export const FormDialog: Story = {
  render: () => <FormDialogStoryComponent />,
};
