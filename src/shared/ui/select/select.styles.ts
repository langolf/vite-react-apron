import { tv } from "tailwind-variants";

export const selectStyles = tv({
  slots: {
    root: "",
    group: "",
    value: "",
    trigger:
      "flex h-10 w-full items-center justify-between rounded-md border-2 border-input border-grey-15 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    scrollUpButton:
      "bg-white flex cursor-default items-center justify-center py-1",
    scrollDownButton:
      "bg-white flex cursor-default items-center justify-center py-1",
    content:
      "relative w-full z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border-2 border-grey-15 bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    viewport: "p-1",
    label: "py-1.5 pl-8 pr-2 text-sm font-semibold",
    item: "bg-white relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    separator: "-mx-1 my-1 h-px bg-muted",
  },
  variants: {
    position: {
      popper: {
        content:
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        viewport:
          "bg-white h-[var(--radix-select-trigger-height)] w-[var(--radix-select-trigger-width)]",
      },
      "item-aligned": {},
    },
  },
  defaultVariants: {
    position: "popper",
  },
});
