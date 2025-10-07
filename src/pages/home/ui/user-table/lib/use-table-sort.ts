import type { User } from "@/shared/api/api.types";
import React, { useState } from "react";

type SortDirection = "asc" | "desc" | null;

export const useTableSort = (data?: User[]) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const sortedData = React.useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    return (
      data &&
      [...data].sort((a, b) => {
        const aValue = a[sortColumn as keyof typeof a];
        const bValue = b[sortColumn as keyof typeof b];

        if (aValue === bValue) return 0;

        const comparison = aValue < bValue ? -1 : 1;
        return sortDirection === "asc" ? comparison : -comparison;
      })
    );
  }, [data, sortColumn, sortDirection]);

  return {
    sortedData,
    sortColumn,
    sortDirection,
    setSortColumn,
    setSortDirection,
  };
};
