import { createBrowserRouter } from "react-router";
import { HomePage } from "@/pages/home/home-page";
import { Layout } from "@/shared/ui/layout/layout";
import { UpdateUserDialog } from "@/features/user/update-user/update-user-dialog";
import { CreateUserDialog } from "@/features/user/create-user/create-user-dialog";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: HomePage,
        children: [
          {
            path: "users/create",
            Component: CreateUserDialog,
          },
          {
            path: "users/:userId",
            Component: UpdateUserDialog,
          },
        ],
      },
      {
        path: "*",
        Component: HomePage,
      },
    ],
  },
]);
