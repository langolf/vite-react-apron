import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { fn } from "storybook/test";
import { Button } from "@/shared/ui/button/button";
import { Trash } from "lucide-react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  decorators: [],

  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SecondaryButton: Story = {
  args: {
    children: "Button",
    variant: "stroked",
  },
};

export const CtaButton: Story = {
  args: {
    children: "+ Call to Action",
    variant: "filled",
    size: "lg",
  },
};

export const IconButton: Story = {
  args: {
    children: React.createElement(Trash, { className: "h-4 w-4" }),
    variant: "stroked",
    // @ts-ignore
    icon: true,
  },
};
