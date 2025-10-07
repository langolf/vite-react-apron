import { tv } from "tailwind-variants";

export const buttonStyles = tv({
  base: [
    "inline-flex items-center justify-center rounded-lg font-bold duration-300 ease-in-out transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  ],
  variants: {
    variant: {
      filled: "bg-black text-white hover:bg-black hover:scale-104",
      stroked:
        "border-2 border-black-alpha-20 bg-white text-gray-700 hover:bg-black-alpha-10 hover:border-black-alpha-10",
      ghost: "hover:bg-gray-100 text-gray-700",
      danger:
        "bg-button-destructive-background text-black hover:bg-button-destructive-background-hover hover:text-button-destructive-text",
    },
    shape: {
      rounded: "rounded-full",
    },
    with: {
      icon: "p-2 border-0 bg-white text-gray-700",
    },
    size: {
      sm: "h-8 px-4 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    },
    // special values for specific placements
    placement: {
      formActions: "h-11 px-5",
    },
  },
  compoundVariants: [{ icon: true, size: "sm", className: "block" }],
  defaultVariants: {
    variant: "stroked",
    size: "sm",
  },
});
