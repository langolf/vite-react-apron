/**
 * AlertDialog Component - Compound Pattern
 *
 * This AlertDialog component follows the Compound Component pattern, where the main AlertDialog component
 * acts as a container and exposes sub-components as properties.
 *
 * Usage (Compound Pattern - Recommended):
 * ```tsx
 * <AlertDialog open={open} onOpenChange={setOpen}>
 *   <AlertDialog.Trigger asChild>
 *     <Button variant="destructive">Delete Account</Button>
 *   </AlertDialog.Trigger>
 *   <AlertDialog.Content>
 *     <AlertDialog.Header>
 *       <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
 *       <AlertDialog.Description>
 *         This action cannot be undone. This will permanently delete your account.
 *       </AlertDialog.Description>
 *     </AlertDialog.Header>
 *     <AlertDialog.Footer>
 *       <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
 *       <AlertDialog.Action>Continue</AlertDialog.Action>
 *     </AlertDialog.Footer>
 *   </AlertDialog.Content>
 * </AlertDialog>
 * ```
 */

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { buttonStyles } from "../button/styles";
import { alertDialogStyles } from "./styles";

/*
 * AlertDialogRoot Component
 * The main AlertDialog component that provides the alert dialog context.
 */
function AlertDialogRoot({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  React.useEffect(() => {
    const root = document.getElementById("root");
    const { open } = props;
    root?.classList.toggle("blur-[3px]", Boolean(open));
  }, [props]);

  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

/*
 * AlertDialogTrigger Component
 * The trigger element that opens the alert dialog.
 */
function AlertDialogTrigger({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  const { trigger } = alertDialogStyles();
  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      className={trigger({ class: className })}
      {...props}
    />
  );
}

/*
 * AlertDialogPortal Component
 * Portal for rendering the alert dialog outside the normal DOM tree.
 */
function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

/*
 * AlertDialogOverlay Component
 * The overlay that covers the screen behind the alert dialog.
 */
function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  const { overlay } = alertDialogStyles();
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={overlay({ class: className })}
      {...props}
    />
  );
}

/*
 * AlertDialogContent Component
 * The main content container for the alert dialog.
 */
function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  const { content } = alertDialogStyles();
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={content({ class: className })}
        {...props}
      />
    </AlertDialogPortal>
  );
}

/*
 * AlertDialogHeader Component
 * Container for the alert dialog title and description.
 */
function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { header } = alertDialogStyles();
  return (
    <div
      data-slot="alert-dialog-header"
      className={header({ class: className })}
      {...props}
    />
  );
}

/*
 * AlertDialogFooter Component
 * Container for the alert dialog action buttons.
 */
function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { footer } = alertDialogStyles();
  return (
    <div
      data-slot="alert-dialog-footer"
      className={footer({ class: className })}
      {...props}
    />
  );
}

/*
 * AlertDialogTitle Component
 * The title element for the alert dialog.
 */
function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  const { title } = alertDialogStyles();
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={title({ class: className })}
      {...props}
    />
  );
}

/*
 * AlertDialogDescription Component
 * The description element for the alert dialog.
 */
function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  const { description } = alertDialogStyles();
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={description({ class: className })}
      {...props}
    />
  );
}

/*
 * AlertDialogAction Component
 * The primary action button for the alert dialog.
 */
function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={buttonStyles({ class: className })}
      {...props}
    />
  );
}

/*
 * AlertDialogCancel Component
 * The cancel button for the alert dialog.
 */
function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={buttonStyles({ variant: "stroked", class: className })}
      {...props}
    />
  );
}

// Compound AlertDialog Component with all sub-components attached as properties
const AlertDialog = Object.assign(AlertDialogRoot, {
  Trigger: AlertDialogTrigger,
  Portal: AlertDialogPortal,
  Overlay: AlertDialogOverlay,
  Content: AlertDialogContent,
  Header: AlertDialogHeader,
  Footer: AlertDialogFooter,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
});

export { AlertDialog };
