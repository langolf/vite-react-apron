import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { tableStyles } from "./table.styles";

function TableRoot({ className, ...props }: React.ComponentProps<"table">) {
  const { container, table } = tableStyles();
  return (
    <div
      data-slot="table-container"
      className={container({ class: className })}
    >
      <table data-slot="table" className={table()} {...props} />
    </div>
  );
}

function TableHeader(props: React.ComponentProps<"thead">) {
  const { header } = tableStyles();
  return <thead data-slot="table-header" className={header()} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  const { body } = tableStyles();
  return (
    <tbody data-slot="table-body" className={body(className)} {...props} />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  const { footer } = tableStyles();
  return (
    <tfoot
      data-slot="table-footer"
      className={footer({ class: className })}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  const { row } = tableStyles();
  return (
    <tr
      data-slot="table-row"
      {...props}
      className={row({ class: className })}
    />
  );
}

function TableHead({
  className,
  sortable,
  sortDirection,
  children,
  onClick,
  ...props
}: React.ComponentProps<"th"> & {
  sortable?: boolean;
  sortDirection?: "asc" | "desc";
}) {
  const { head } = tableStyles();
  return (
    <th onClick={onClick} {...props} className={head({ class: className })}>
      <div className="flex items-center gap-2">
        {children}
        {sortable && (
          <div className="flex flex-col">
            <ChevronUp
              className={cn(
                "h-3 w-3 -mb-1.5",
                sortDirection === "asc"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            />
            <ChevronDown
              className={cn(
                "h-3 w-3",
                sortDirection === "desc"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            />
          </div>
        )}
      </div>
    </th>
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  const { cell } = tableStyles();
  return (
    <td
      data-slot="table-cell"
      {...props}
      className={cell({ class: className })}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  const { caption } = tableStyles();
  return (
    <caption
      data-slot="table-caption"
      {...props}
      className={caption({ class: className })}
    />
  );
}

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Caption: TableCaption,
});
