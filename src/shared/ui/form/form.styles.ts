import { tv } from "tailwind-variants";

export const formStyles = tv({
  slots: {
    root: "w-100 grid gap-3",
    item: "grid gap-3",
    label: "text-grey-60 font-normal",
    message: "pl-3 text-button-destructive-background text-sm",
    actions: "mt-4",
  },
  variants: {
    variant: {
      default: {},
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
