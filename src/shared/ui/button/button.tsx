import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "tailwind-variants";
import { buttonStyles } from "./styles";

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonStyles> & {
    asChild?: boolean;
  };

const Button = ({ asChild = false, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      type="button"
      {...props}
      className={buttonStyles(props)}
    />
  );
};

const ButtonGroup = (
  props: React.PropsWithChildren<React.ComponentProps<"div">>
) => {
  return (
    <div
      className="flex items-center gap-2"
      data-slot="button-group"
      {...props}
    />
  );
};

Button.displayName = "ApronButton";
ButtonGroup.displayName = "ApronButtonGroup";

export { Button, ButtonGroup };
