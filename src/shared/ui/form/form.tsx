/**
 * Form Component - Compound Pattern
 *
 * This form component follows the Compound Component pattern, where the main Form component
 * acts as a container and exposes sub-components as properties.
 *
 * Usage (Compound Pattern - Recommended):
 * ```tsx
 * <Form form={form} onSubmit={handleSubmit}>
 *   <Form.Field name="username" render={({ field }) => (
 *     <Form.Item>
 *       <Form.Label>Username</Form.Label>
 *       <Form.Control>
 *         <Input {...field} />
 *       </Form.Control>
 *       <Form.Message />
 *     </Form.Item>
 *   )} />
 *   <Form.Actions>
 *     <Button type="submit">Submit</Button>
 *   </Form.Actions>
 * </Form>
 * ```
 */

import { Label } from "@/shared/ui/label/label";
import type { ComponentProps } from "react";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { FormProvider } from "react-hook-form";
import { useFormField } from "./lib/use-form-field";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Controller, type ControllerProps } from "react-hook-form";
import { Slot } from "@radix-ui/react-slot";
import type { FormFieldContextValue, FormItemContextValue } from "./types";
import { formStyles } from "./form.styles";

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

/*
 * FormField Component
 * Wraps react-hook-form's Controller to connect form fields to the form state.
 */
function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

/*
 * FormItem Component
 * Provides context for form items and generates unique IDs for accessibility.
 */
function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();
  const { item } = formStyles();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={item({ class: className })}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

/*
 * FormLabel Component
 * Renders a label for a form field, linking it to the corresponding input.
 * Uses Radix UI's Label primitive for accessibility.
 */
function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();
  const { label } = formStyles();
  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={label({ class: className })}
      htmlFor={formItemId}
      {...props}
    />
  );
}

/*
 * FormControl Component
 * Wraps the input/control element, linking it to the form item and managing ARIA attributes.
 */
function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

/*
 * FormMessage Component
 * Displays validation error messages for the form field.
 */
function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;
  const { message } = formStyles();
  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={message({ class: className })}
      {...props}
    >
      {body}
    </p>
  );
}

/*
 * FormActions Component
 * Container for form action buttons (e.g., submit, cancel).
 */
function FormActions({ children, ...props }: ComponentProps<"div">) {
  const { actions } = formStyles();
  return (
    <div {...props} className={actions({ class: props.className })}>
      {children}
    </div>
  );
}

/*
 * FormRoot Component
 * The main Form component that provides the form context and handles submission.
 */
function FormRoot<TFormValues extends FieldValues>({
  children,
  ...props
}: React.ComponentProps<"form"> & { form: UseFormReturn<TFormValues> }) {
  const { root } = formStyles();
  return (
    <FormProvider {...props.form}>
      <form {...props} className={root({ class: props.className })}>
        {children}
      </form>
    </FormProvider>
  );
}

// Compound Form Component with all sub-components attached as properties
const Form = Object.assign(FormRoot, {
  Field: FormField,
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Message: FormMessage,
  Actions: FormActions,
});

export { Form, FormFieldContext, FormItemContext };
