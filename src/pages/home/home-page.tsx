import { Outlet } from "react-router";
import { UsersTable } from "./ui/user-table/user-table";

export const HomePage = () => {
  return (
    <>
      <UsersTable />
      <Outlet />
    </>
  );
};
