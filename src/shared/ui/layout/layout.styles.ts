import { tv } from "tailwind-variants";

export const layoutStyles = tv({
  slots: {
    root: "flex min-h-screen flex-col",
    header: "container mx-auto flex items-center justify-between px-4 py-6",
    main: "container mx-auto flex-1 px-4 py-6",
    footer: "container mx-auto px-4 py-4",
  },
});
