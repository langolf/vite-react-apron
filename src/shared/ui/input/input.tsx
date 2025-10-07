import * as React from "react";
import { tv } from "tailwind-variants";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "default" | "error";
};

const inputVariants = tv({
  base: [
    "w-full rounded-lg border-2 bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  ],
  variants: {
    variant: {
      default: "border-grey-15 focus:border-cyan-500 focus:ring-cyan-500",
      error: "border-red-500 focus:border-red-500 focus:ring-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`${inputVariants({ variant })} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "ApronInput";

export { Input };
