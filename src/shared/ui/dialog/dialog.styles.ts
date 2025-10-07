import { tv } from "tailwind-variants";

export const dialogStyles = tv({
  slots: {
    root: "",
    trigger: "",
    portal: "",
    overlay:
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-dialog-overlay-background",
    content:
      "rounded-xl bg-white shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 p-6 shadow-lg duration-200 md:max-w-lg",
    close: "size-4 rounded-full",
    closeButton:
      "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-6 right-6 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
    header: "flex flex-col gap-2 text-center md:text-left mb-3",
    footer: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
    title: "text-headline-h2 leading-none font-semibold",
    description: "text-muted-foreground text-sm",
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
