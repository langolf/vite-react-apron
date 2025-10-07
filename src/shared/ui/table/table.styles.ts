import { tv } from "tailwind-variants";

export const tableStyles = tv({
  slots: {
    container: "p-4 bg-white rounded-lg border-1 border-grey-5 w-fit md:w-full",
    table: "w-full",
    header: "border-b-1 border-grey-10",
    body: "divide-y divide-grey-10 [&_tr:last-child]:border-0",
    footer: "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
    row: "transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
    head: "px-2 py-3 text-left font-normal text-label-16 text-grey-60",
    cell: "px-2 py-4",
    caption: "mt-4 text-sm text-muted-foreground",
  },
});
