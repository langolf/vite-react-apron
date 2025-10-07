import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./table";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Table",
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  decorators: [],
  argTypes: {},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const users = [
  {
    id: "091d8d74-3bed-44a7-a94d-937c249ebe52",
    country: "United States",
    firstName: "John",
    lastName: "Doe",
    age: 25,
  },
  {
    id: "c3a39b16-c74b-4724-b17b-75e6743a23ad",
    country: "Germany",
    firstName: "Anna",
    lastName: "Schmidt",
    age: 30,
  },
  {
    id: "82a86090-0b0a-49af-bf00-fdffd0796ff9",
    country: "Japan",
    firstName: "Yuki",
    lastName: "Tanaka",
    age: 22,
  },
];

export const Default: Story = {
  args: {
    children: (
      <Table>
        <Table.Header className="border-b bg-muted/50">
          <Table.Row>
            <Table.Head className="px-4 py-3 text-left text-sm font-medium">
              Country
            </Table.Head>
            <Table.Head>First name</Table.Head>
            <Table.Head>Last name</Table.Head>
            <Table.Head>Age</Table.Head>
            <Table.Head>Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row className="border-b hover:bg-muted/50">
              <Table.Cell className="px-4 py-3 font-medium">
                {user.country}
              </Table.Cell>
              <Table.Cell>{user.firstName}</Table.Cell>
              <Table.Cell>{user.lastName}</Table.Cell>
              <Table.Cell>{user.age}</Table.Cell>
              <Table.Cell>
                <div className="flex gap-2">
                  <button className="btn btn-sm">Edit</button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    ),
  },
};
