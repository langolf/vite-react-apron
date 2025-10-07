import { useState } from "react";
import { useNavigate } from "react-router";
import { Dialog } from "@/shared/ui/dialog";
import { Button, ButtonGroup } from "@/shared/ui/button/button";
import { Input } from "@/shared/ui/input/input";
import { Select } from "@/shared/ui/select";
import { Form } from "@/shared/ui/form";
import { useCreateUserMutation } from "./api/use-create-user.mutation";
import type { CreateUser } from "@/shared/api/api.types";
import { CreateUserSchema } from "@/shared/api/api.contracts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { countries, CountryEnum, countryKeys } from "@/shared/config/countries";

type CreateUserForm = z.infer<typeof CreateUserSchema>;

export function CreateUserDialog() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(true);

  const form = useForm<CreateUserForm>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      firstName: "Alexander",
      lastName: "Langolf",
      country: CountryEnum.enum.AR,
      age: 10,
    },
  });

  const { mutate: createUser } = useCreateUserMutation({
    onSuccess: () => {
      setOpen(false);
      navigate("/");
    },
  });

  const onSubmit = (values: z.infer<typeof CreateUserSchema>) => {
    createUser(values as CreateUser);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      navigate("/");
    }
  };

  const handleCancelClick = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Add user</Dialog.Title>
        </Dialog.Header>

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
                        {countryKeys.map((country) => (
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
                    data-testid="age"
                    onChange={(e) =>
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
                onClick={handleCancelClick}
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
      </Dialog.Content>
    </Dialog>
  );
}
