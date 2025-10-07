import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";

const meta = {
  title: "Select",
  component: Select,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
  decorators: [],
  argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: (
      <>
        <Select.Trigger className="w-[180px]">
          <Select.Value placeholder="Select a fruit" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="blueberry">Blueberry</Select.Item>
          <Select.Item value="grape">Grape</Select.Item>
          <Select.Item value="pineapple">Pineapple</Select.Item>
          <Select.Item value="raspberry">Raspberry</Select.Item>
          <Select.Item value="strawberry">Strawberry</Select.Item>
        </Select.Content>
      </>
    ),
  },
};
