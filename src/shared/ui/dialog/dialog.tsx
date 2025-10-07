/**
 * Dialog Component - Compound Pattern
 *
 * This Dialog component follows the Compound Component pattern, where the main Dialog component
 * acts as a container and exposes sub-components as properties.
 *
 * Usage (Compound Pattern - Recommended):
 * ```tsx
 * <Dialog open={open} onOpenChange={setOpen}>
 *   <Dialog.Trigger asChild>
 *     <Button>Open Dialog</Button>
 *   </Dialog.Trigger>
 *   <Dialog.Content>
 *     <Dialog.Header>
 *       <Dialog.Title>Dialog Title</Dialog.Title>
 *       <Dialog.Description>Dialog description text here.</Dialog.Description>
 *     </Dialog.Header>
 *     <Dialog.Footer>
 *       <Button>Close</Button>
 *     </Dialog.Footer>
 *   </Dialog.Content>
 * </Dialog>
 * ```
 */

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { dialogStyles } from "./dialog.styles";

/*
 * DialogRoot Component
 * The main Dialog component that provides the dialog context.
 */
function DialogRoot({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  // This is bad, I know :)
  React.useEffect(() => {
    const root = document.getElementById("root");
    const { open } = props;
    root?.classList.toggle("blur-[3px]", Boolean(open));
  }, [props]);

  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

/*
 * DialogTrigger Component
 * The trigger element that opens the dialog.
 */
function DialogTrigger({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  const { trigger } = dialogStyles();
  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      className={trigger({ class: className })}
      {...props}
    />
  );
}

/*
 * DialogPortal Component
 * Portal for rendering the dialog outside the normal DOM tree.
 */
function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

/*
 * DialogClose Component
 * A close button component for the dialog.
 */
function DialogClose({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  const { close } = dialogStyles();
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      className={close({ class: className })}
      {...props}
    />
  );
}

/*
 * DialogOverlay Component
 * The overlay that covers the screen behind the dialog.
 */
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  const { overlay } = dialogStyles();
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={overlay({ class: className })}
      {...props}
    />
  );
}

/*
 * DialogContent Component
 * The main content container for the dialog.
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  const { content, closeButton } = dialogStyles();
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={content({ class: className })}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className={closeButton()}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/*
 * DialogHeader Component
 * Container for the dialog title and description.
 */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { header } = dialogStyles();
  return (
    <div
      data-slot="dialog-header"
      className={header({ class: className })}
      {...props}
    />
  );
}

/*
 * DialogFooter Component
 * Container for the dialog action buttons.
 */
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  const { footer } = dialogStyles();
  return (
    <div
      data-slot="dialog-footer"
      className={footer({ class: className })}
      {...props}
    />
  );
}

/*
 * DialogTitle Component
 * The title element for the dialog.
 */
function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  const { title } = dialogStyles();
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={title({ class: className })}
      {...props}
    />
  );
}

/*
 * DialogDescription Component
 * The description element for the dialog.
 */
function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  const { description } = dialogStyles();
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={description({ class: className })}
      {...props}
    />
  );
}

// Compound Dialog Component with all sub-components attached as properties
const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Close: DialogClose,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
});

DialogRoot.displayName = "ApronDialog";

export { Dialog };
