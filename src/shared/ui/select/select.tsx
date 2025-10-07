/**
 * Select Component - Compound Pattern
 *
 * This Select component follows the Compound Component pattern, where the main Select component
 * acts as a container and exposes sub-components as properties.
 *
 * Usage (Compound Pattern - Recommended):
 * ```tsx
 * <Select value={value} onValueChange={setValue}>
 *   <Select.Trigger>
 *     <Select.Value placeholder="Select an option" />
 *   </Select.Trigger>
 *   <Select.Content>
 *     <Select.Item value="option1">Option 1</Select.Item>
 *     <Select.Item value="option2">Option 2</Select.Item>
 *     <Select.Item value="option3">Option 3</Select.Item>
 *   </Select.Content>
 * </Select>
 * ```
 */

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { selectStyles } from "./select.styles";

/*
 * SelectRoot Component
 * The main Select component that provides the select context.
 */
const SelectRoot = SelectPrimitive.Root;

/*
 * SelectGroup Component
 * Groups related select items together.
 */
const SelectGroup = SelectPrimitive.Group;

/*
 * SelectValue Component
 * Displays the selected value or placeholder.
 */
const SelectValue = SelectPrimitive.Value;

/*
 * SelectScrollUpButton Component
 * Button to scroll up in the select dropdown.
 */
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => {
  const { scrollUpButton } = selectStyles();
  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={scrollUpButton({ class: className })}
      {...props}
    >
      <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  );
});
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

/*
 * SelectScrollDownButton Component
 * Button to scroll down in the select dropdown.
 */
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => {
  const { scrollDownButton } = selectStyles();
  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={scrollDownButton({ class: className })}
      {...props}
    >
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  );
});
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

/*
 * SelectTrigger Component
 * The trigger button that opens the select dropdown.
 */
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const { trigger } = selectStyles();
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={trigger({ class: className })}
      role="combobox"
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/*
 * SelectContent Component
 * The dropdown content container for select items.
 */
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => {
  const { content, viewport } = selectStyles({ position });
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={content({ class: className })}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className={viewport()}>
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

/*
 * SelectLabel Component
 * A label for a group of select items.
 */
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => {
  const { label } = selectStyles();
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={label({ class: className })}
      {...props}
    />
  );
});
SelectLabel.displayName = SelectPrimitive.Label.displayName;

/*
 * SelectItem Component
 * An individual selectable item in the dropdown.
 */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  const { item } = selectStyles();
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={item({ class: className })}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;

/*
 * SelectSeparator Component
 * A visual separator between select items or groups.
 */
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => {
  const { separator } = selectStyles();
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={separator({ class: className })}
      {...props}
    />
  );
});
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// Compound Select Component with all sub-components attached as properties
const Select = Object.assign(SelectRoot, {
  Group: SelectGroup,
  Value: SelectValue,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
  ScrollUpButton: SelectScrollUpButton,
  ScrollDownButton: SelectScrollDownButton,
});

export { Select };
