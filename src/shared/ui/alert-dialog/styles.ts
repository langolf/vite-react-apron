import { tv } from "tailwind-variants";

export const alertDialogStyles = tv({
  slots: {
    root: "",
    trigger: "",
    portal: "",
    overlay:
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
    content:
      "bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg p-6 shadow-lg duration-200 sm:max-w-lg",
    header: "flex flex-col gap-2 text-center sm:text-left",
    footer: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
    title: "text-lg font-semibold",
    description: "text-muted-foreground text-sm",
    action: "",
    cancel: "",
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
