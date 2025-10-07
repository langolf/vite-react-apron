import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@/shared/ui/dialog";
import { Button, ButtonGroup } from "@/shared/ui/button/button";
import { Input } from "@/shared/ui/input/input";
import { Select } from "@/shared/ui/select";
import { useUpdateUserMutation } from "./api/use-update-user-mutation";
import { countries, countryKeys } from "@/shared/config/countries";
import { UpdateUserSchema } from "@/shared/api/api.contracts";
import { Form } from "@/shared/ui/form";
import type z from "zod";
import { useGetUser } from "@/shared/api/api.query-keys";

type UpdateUserForm = z.infer<typeof UpdateUserSchema>;

export function UpdateUserDialog() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [open, setOpen] = useState(true);

  const { data: user, isLoading } = useGetUser(userId!);

  const form = useForm<UpdateUserForm>({
    resolver: zodResolver(UpdateUserSchema),
    values: user,
  });

  const { mutate: updateUser } = useUpdateUserMutation({
    onSuccess: () => {
      setOpen(false);
      navigate("/");
    },
  });

  function onSubmit(values: UpdateUserForm) {
    if (userId) {
      updateUser({ id: userId, data: values });
    }
  }

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

  if (isLoading) {
    return null;
  }

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Dialog.Content className="sm:max-w-md">
        <Dialog.Header>
          <Dialog.Title>Edit user</Dialog.Title>
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
                    <Select
                      {...field}
                      defaultValue={countries[field.value]}
                      onValueChange={field.onChange}
                    >
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
                    data-testid="age"
                    placeholder="Age"
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
              >
                Cancel
              </Button>

              <Button
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
