import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./form";
import { Input } from "@/shared/ui/input/input";
import { Button, ButtonGroup } from "@/shared/ui/button/button";
import { useForm } from "react-hook-form";
import { Select } from "@/shared/ui/select/select";
import { CreateUserSchema } from "@/shared/api/api.contracts";
import {
  countries,
  CountryEnum,
  countryKeys,
  type Country,
} from "@/shared/config/countries";

const meta = {
  title: "Form",
  component: Form,
  parameters: {
    layout: "centered",
  },
  decorators: [],
  args: {} as any, // Placeholder for required args
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormStoryComponent = () => {
  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      firstName: "Alexander",
      lastName: "Langolf",
      country: CountryEnum.enum.AR,
      age: 10,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreateUserSchema>) {
    console.log(values);
  }

  return (
    <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <Form.Field
        control={form.control}
        name="country"
        render={({ field }) => {
          return (
            <Form.Item>
              <Form.Label>Country</Form.Label>
              <Form.Control>
                <Select {...field} onValueChange={field.onChange}>
                  <Select.Trigger aria-label="Country">
                    <Select.Value placeholder="Select a country" />
                  </Select.Trigger>
                  <Select.Content>
                    {countryKeys.map((country: Country) => (
                      <Select.Item
                        key={country}
                        value={country}
                        role="option"
                        aria-label={`${countries[country]}`}
                      >
                        {countries[country]}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
              </Form.Control>
              <Form.Message />
            </Form.Item>
          );
        }}
      />

      <Form.Field
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <Form.Item>
            <Form.Label>First name</Form.Label>
            <Form.Control>
              <Input {...field} placeholder="First name" />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <Form.Item>
            <Form.Label>Last name</Form.Label>
            <Form.Control>
              <Input {...field} placeholder="Last name" />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={form.control}
        name="age"
        render={({ field }) => (
          <Form.Item>
            <Form.Label>Age</Form.Label>
            <Form.Control>
              <Input
                {...field}
                type="number"
                placeholder="Age"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(parseInt(e.target.value, 10))
                }
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Actions>
        <ButtonGroup>
          <Button
            type="button"
            variant="stroked"
            placement="formActions"
            data-testid="cancel-button"
          >
            Cancel
          </Button>
          <Button
            data-testid="save-button"
            type="submit"
            variant="filled"
            className="flex-grow-1 ml-auto"
            placement="formActions"
          >
            Save
          </Button>
        </ButtonGroup>
      </Form.Actions>
    </Form>
  );
};

export const Default: Story = {
  render: () => <FormStoryComponent />,
};
