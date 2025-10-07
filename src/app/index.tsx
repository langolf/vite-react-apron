import { RouterProvider } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { queryClient } from "@/shared/lib/query-client";
import { router } from "./routes";
import "./index.css";

async function enableMocking() {
  if (import.meta.env.MODE !== "test") {
    const { worker } = await import("./msw/browser");
    return worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

React.startTransition(() => {
  enableMocking().then(() =>
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ErrorBoundary>
      </StrictMode>
    )
  );
});
