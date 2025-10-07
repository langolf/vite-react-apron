import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  decorators: [],
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    placeholder: "Type here...",
    variant: "default",
  },
};

export const Error: Story = {
  args: {
    placeholder: "Type here...",
    variant: "error",
  },
};
export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};
