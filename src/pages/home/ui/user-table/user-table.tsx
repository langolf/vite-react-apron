import { Link } from "react-router";
import { Table } from "@/shared/ui/table/table";
import { DeleteUserAlert } from "@/features/user/delete-user/delete-user-alert";
import { Button } from "@/shared/ui/button/button";
import { countries, type CountryCode } from "@/shared/config/countries";
import { useTableSort } from "./lib/use-table-sort";
import { useGetUsers } from "@/shared/api/api.query-keys";

const columns = [
  { key: "country", label: "Country" },
  { key: "firstName", label: "First name" },
  { key: "lastName", label: "Last name" },
  { key: "age", label: "Age" },
  { key: "actions", label: "Actions" },
] as const;

export function UsersTable() {
  const { data } = useGetUsers();

  const {
    sortedData,
    sortColumn,
    sortDirection,
    setSortColumn,
    setSortDirection,
  } = useTableSort(data);

  // Cycle through: asc -> desc -> null
  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  if (data?.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-12 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          No users found
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Get started by adding your first user
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-full overflow-auto">
      <Table>
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.Head
                key={col.key}
                onClick={() =>
                  col.key !== "actions" ? handleSort(col.key) : undefined
                }
                className={
                  col.key !== "actions" ? "cursor-pointer select-none" : ""
                }
                sortable={col.key !== "actions"}
                sortDirection={
                  sortColumn === col.key && sortDirection
                    ? sortDirection
                    : undefined
                }
              >
                {col.key !== "actions" ? col.label : ""}
              </Table.Head>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sortedData?.map((row, idx) => (
            <Table.Row key={`{row.id}-${idx}`}>
              {columns.map((col) => {
                return (
                  <Table.Cell key={`${row.id}-${col.key}`}>
                    {col.key !== "actions" ? (
                      (countries[row[col.key] as CountryCode] ?? row[col.key])
                    ) : (
                      <div className="flex gap-2 justify-end">
                        <Link to={`/users/${row.id}`}>
                          <Button>Edit</Button>
                        </Link>

                        <DeleteUserAlert
                          userId={row.id}
                          userName={`${row.firstName} ${row.lastName}`}
                        />
                      </div>
                    )}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
